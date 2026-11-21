import { useEffect, useState } from 'react'
import { Button, Card, ColorSwatch, Progress, Text, ThemeIcon, Title } from '@mantine/core'
import BottomBar from '../components/BottomBar.jsx'

// Перевод длиннее этого числа символов набирается мельче (20 px вместо 28 px).
const LONG_TRANSLATION = 40

const newSession = (words) => ({ queue: words.map((w) => w.id), answered: 0, known: 0 })

// session — сохранённая сессия { queue: [id слов, которые осталось показать], answered, known }
// или null (App хранит её в localStorage аккаунта). Сессия живёт до «В словарь» на итоге.
export default function Flashcards({ vocab, session, onSessionChange, onSetStatus, onBack, onToTexts }) {
  const [flipped, setFlipped] = useState(false)

  // Слова, удалённые из словаря, из колоды выпадают.
  const byId = new Map(vocab.map((w) => [w.id, w]))
  let current = session && { ...session, queue: session.queue.filter((id) => byId.has(id)) }
  if (current && current.queue.length === 0 && current.answered === 0) current = null
  // Новая сессия: слова со статусом «учу». Набор фиксируется в начале сессии.
  const learning = vocab.filter((w) => w.status === 'learning')
  const fresh = learning.length > 0 ? newSession(learning) : null
  const active = current ?? fresh

  // Новую сессию сразу сохраняем, чтобы колода не менялась после перезагрузки.
  useEffect(() => {
    if (!current && fresh) onSessionChange(fresh)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (vocab.length === 0) {
    return (
      <section>
        <div className="toolbar">
          <Title order={1}>Карточки</Title>
        </div>
        <Card className="empty">
          <Text c="dimmed" mb={16}>
            Словарь пуст — повторять пока нечего. Добавьте слова из текстов.
          </Text>
          <Button variant="secondary-on-surface" onClick={onToTexts}>
            К текстам
          </Button>
        </Card>
      </section>
    )
  }

  if (!active) {
    return (
      <section>
        <div className="toolbar">
          <Title order={1}>Карточки</Title>
        </div>
        <Card className="empty">
          <Title order={3}>Все слова в словаре выучены.</Title>
          <Text c="dimmed" mt={8} mb={20}>
            Можно повторить их ещё раз или добавить новые слова из текстов.
          </Text>
          <div className="actions" style={{ justifyContent: 'center' }}>
            <Button variant="primary" onClick={() => onSessionChange(newSession(vocab))}>
              Повторить все слова
            </Button>
            <Button variant="secondary-on-surface" onClick={onToTexts}>
              К текстам
            </Button>
          </div>
        </Card>
      </section>
    )
  }

  const { queue, answered, known } = active
  const total = answered + queue.length

  if (queue.length === 0) {
    const unknown = answered - known
    const percent = Math.round((known / answered) * 100)
    return (
      <section>
        <Card className="summary">
          <ThemeIcon
            size={52}
            radius="xl"
            style={{ background: 'var(--success-soft)', color: 'var(--success-text)' }}
            aria-hidden="true"
          >
            <span style={{ fontSize: 24, fontWeight: 700 }}>✓</span>
          </ThemeIcon>
          <Title order={3}>Сессия завершена</Title>
          <div className="score-display">
            {known} из {answered}
          </div>
          <Text c="dimmed" mt={6}>
            слов вы знаете
          </Text>
          <Progress.Root
            size={10}
            radius="xl"
            className="progress"
            style={{ background: 'var(--error-soft)' }}
            role="img"
            aria-label={`Знаю ${known}, не знаю ${unknown}`}
          >
            <Progress.Section value={percent} color="var(--success)" />
          </Progress.Root>
          <div className="legend">
            <span>
              <ColorSwatch color="var(--success)" size={8} withShadow={false} /> знаю {known}
            </span>
            <span>
              <ColorSwatch color="var(--error)" size={8} withShadow={false} /> не знаю {unknown}
            </span>
          </div>
          <Button
            variant="primary"
            onClick={() => {
              onSessionChange(null)
              onBack()
            }}
          >
            В словарь
          </Button>
        </Card>
      </section>
    )
  }

  const card = byId.get(queue[0])

  function answer(isKnown) {
    onSetStatus(card.id, isKnown ? 'known' : 'learning')
    onSessionChange({ queue: queue.slice(1), answered: answered + 1, known: known + (isKnown ? 1 : 0) })
    setFlipped(false)
  }

  return (
    <section>
      <div className="toolbar cards-head">
        <Title order={1}>Карточки</Title>
        <Text c="dimmed">
          {answered + 1} / {total}
        </Text>
      </div>

      {/* key по id: новая карточка появляется сразу лицом вверх, без обратного переворота */}
      <div key={card.id} className="flashcard" onClick={() => setFlipped(!flipped)}>
        <div className={flipped ? 'flashcard-inner flipped' : 'flashcard-inner'}>
          <div className="face front">
            <div className="flash-word" lang="en">
              {card.word}
            </div>
            <Text size="sm" c="dimmed">
              Нажмите, чтобы перевернуть
            </Text>
          </div>
          <div className="face back">
            <div className={card.translation.length > LONG_TRANSLATION ? 'flash-word long' : 'flash-word'}>
              {card.translation}
            </div>
            <Text size="sm" c="dimmed" className="example" lang="en">
              {card.example}
            </Text>
          </div>
        </div>
      </div>

      <BottomBar mode="cards" split="always">
        <Button onClick={() => answer(false)}>Не знаю</Button>
        <Button variant="primary" onClick={() => answer(true)}>
          Знаю
        </Button>
      </BottomBar>
    </section>
  )
}
