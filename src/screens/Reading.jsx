import { useEffect, useMemo, useState } from 'react'
import { Badge, Button, Popover, Radio, Text, ThemeIcon, Title } from '@mantine/core'
import WordPopup from '../components/WordPopup.jsx'
import BottomBar from '../components/BottomBar.jsx'

// Попап слова не должен уходить под нижнюю панель: 68 px панели + 1 px линии + 8 px зазора.
const POPUP_BOUNDARY = { top: 8, right: 8, bottom: 77, left: 8 }
const POPUP_MIDDLEWARES = {
  flip: { padding: POPUP_BOUNDARY },
  shift: { padding: POPUP_BOUNDARY },
}

const LETTERS = ['A', 'B', 'C', 'D']
// Слово: буквы, допускаются внутренние апостроф и дефис.
const WORD_RE = /([A-Za-z]+(?:['’-][A-Za-z]+)*)/

// Абзац → предложения → токены (нечётные индексы — слова).
function splitParagraph(text) {
  const sentences = text.match(/[^.!?]+[.!?]*\s*/g) || [text]
  return sentences.map((s) => ({ sentence: s.trim(), tokens: s.split(WORD_RE) }))
}

export default function Reading({
  passage,
  answers,
  checked,
  onAnswer,
  onCheck,
  onRetry,
  vocab,
  onAddWord,
  onBack,
  onToVocab,
}) {
  // Открытый попап: id токена в тексте, слово, предложение-пример, готовая запись (если слово подсвечено).
  const [popup, setPopup] = useState(null) // { id, word, example, entry }

  const highlighted = useMemo(() => {
    const map = {}
    passage.words.forEach((w) => (map[w.word.toLowerCase()] = w))
    return map
  }, [passage])

  const paragraphs = useMemo(() => passage.paragraphs.map(splitParagraph), [passage])

  const total = passage.questions.length
  const answeredCount = passage.questions.filter((q) => answers[q.id] !== undefined).length
  const allAnswered = answeredCount === total
  const score = passage.questions.filter((q) => answers[q.id] === q.answer).length
  const savedByWord = new Map(vocab.map((w) => [w.word.toLowerCase(), w]))

  function openWord(id, token, sentence) {
    const key = token.toLowerCase()
    setPopup({ id, word: key, example: sentence, entry: highlighted[key] || null })
  }

  function closePopup() {
    setPopup(null)
  }

  // Popover закрывается по Esc, только когда фокус внутри него. После «В словарь»
  // поле ввода исчезает и фокус уходит, поэтому слушаем Esc на уровне окна.
  useEffect(() => {
    if (!popup) return
    const onKey = (e) => e.key === 'Escape' && setPopup(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [popup])

  function retry() {
    setPopup(null)
    onRetry()
    window.scrollTo(0, 0)
  }

  function renderWord(id, t, sentence) {
    const key = t.toLowerCase()
    const cls = ['word']
    if (highlighted[key]) cls.push('highlight')
    if (savedByWord.has(key)) cls.push('saved')
    const span = (
      <span className={cls.join(' ')} onClick={() => openWord(id, t, sentence)}>
        {t}
      </span>
    )
    if (popup?.id !== id) return <span key={id}>{span}</span>
    return (
      <Popover
        key={id}
        opened
        onChange={(o) => !o && closePopup()}
        onClose={closePopup}
        position="bottom-start"
        offset={6}
        width={290}
        middlewares={POPUP_MIDDLEWARES}
      >
        <Popover.Target>{span}</Popover.Target>
        <Popover.Dropdown className="word-popover">
          <WordPopup
            word={popup.word}
            example={popup.example}
            entry={popup.entry}
            saved={savedByWord.get(popup.word) || null}
            onAdd={(translation, example) =>
              onAddWord({ word: popup.word, translation, example, passageId: passage.id })
            }
            onClose={closePopup}
          />
        </Popover.Dropdown>
      </Popover>
    )
  }

  return (
    <section>
      <div className="toolbar">
        <Button onClick={onBack}>
          ← К текстам
        </Button>
      </div>

      <div className="reading">
        <article className="passage">
          <Title order={2}>{passage.title}</Title>
          <Text size="sm" c="dimmed" className="passage-hint">
            {checked
              ? 'Разберите ошибки и добавьте незнакомые слова в словарь — просто нажмите на слово.'
              : vocab.length === 0
                ? 'Нажмите на подсвеченное слово, чтобы увидеть перевод, или на любое другое, чтобы добавить его со своим переводом.'
                : 'Нажмите на слово, чтобы добавить его в словарь.'}
          </Text>
          <div className="passage-body">
            {paragraphs.map((sentences, pi) => (
              <p key={pi}>
                {sentences.map((s, si) =>
                  s.tokens.map((t, ti) => {
                    const id = `${pi}-${si}-${ti}`
                    if (ti % 2 === 0) return <span key={id}>{t}</span>
                    return renderWord(id, t, s.sentence)
                  }),
                )}
              </p>
            ))}
          </div>
        </article>

        <div className="questions">
          <div className="questions-head">
            <span className="questions-title">Вопросы</span>
            {checked && (
              <Badge style={{ background: 'var(--surface)', color: 'var(--on-surface)' }}>
                Правильно {score} из {total}
              </Badge>
            )}
          </div>

          {passage.questions.map((q, qi) => {
            const user = answers[q.id]
            const isRight = user === q.answer
            const titleId = `${passage.id}-${q.id}-title`
            return (
              <div key={q.id} className="question">
                <div className="question-title" id={titleId}>
                  {checked && (
                    <ThemeIcon
                      size={22}
                      radius="xl"
                      color={isRight ? 'var(--success)' : 'var(--error)'}
                      aria-label={isRight ? 'Верно' : 'Неверно'}
                    >
                      {isRight ? '✓' : '✗'}
                    </ThemeIcon>
                  )}
                  <span>
                    {qi + 1}. {q.text}
                  </span>
                </div>
                <Radio.Group
                  name={`${passage.id}-${q.id}`}
                  value={user === undefined ? null : String(user)}
                  onChange={(v) => onAnswer(q.id, Number(v))}
                  aria-labelledby={titleId}
                >
                  <div className="tiles">
                    {q.options.map((opt, oi) => {
                      const cls = ['option-tile']
                      if (!checked && user === oi) cls.push('is-selected')
                      if (checked && oi === q.answer) cls.push('is-correct')
                      else if (checked && oi === user) cls.push('is-incorrect')
                      else if (checked) cls.push('is-dimmed')
                      return (
                        <Radio.Card
                          key={oi}
                          value={String(oi)}
                          withBorder={false}
                          disabled={checked}
                          className={cls.join(' ')}
                        >
                          <span className="tile-letter">{LETTERS[oi]}</span>
                          <span>{opt}</span>
                        </Radio.Card>
                      )
                    })}
                  </div>
                </Radio.Group>
                {checked && !isRight && (
                  <p className="wrong-hint">Правильный ответ: {LETTERS[q.answer]}</p>
                )}
              </div>
            )
          })}

        </div>
      </div>

      {/* Кнопки только в нижней панели: до проверки — «Проверить», после — разбор */}
      {checked ? (
        <BottomBar mode="reading" split="narrow">
          <Button onClick={retry}>Пройти ещё раз</Button>
          <Button variant="primary" onClick={onToVocab}>
            В словарь
          </Button>
        </BottomBar>
      ) : (
        <BottomBar mode="reading">
          <Text size="sm" c="dimmed">
            Отвечено {answeredCount} из {total}
          </Text>
          <Button variant="primary" disabled={!allAnswered} onClick={onCheck}>
            Проверить
          </Button>
        </BottomBar>
      )}
    </section>
  )
}
