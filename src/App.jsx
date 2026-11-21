import { useState } from 'react'
import { Button } from '@mantine/core'
import passages from './data/passages.json'
import {
  useLocalStorage,
  userKey,
  cleanVocab,
  cleanResults,
  cleanDrafts,
  cleanView,
  cleanCards,
} from './storage.js'
import { currentUser, legacyData, logout, needsLegacyPrompt, skipLegacy, transferLegacy } from './auth.js'
import Auth from './screens/Auth.jsx'
import PassageList from './screens/PassageList.jsx'
import Reading from './screens/Reading.jsx'
import Vocabulary from './screens/Vocabulary.jsx'
import Flashcards from './screens/Flashcards.jsx'
import TransferModal from './components/TransferModal.jsx'

const EMPTY_DRAFT = { answers: {}, checked: false }
const DEFAULT_VIEW = { screen: 'list', passageId: null }

// Шапка: на экране входа только «IELTS Reading», после входа — меню и «Выйти».
function TopBar({ children }) {
  return (
    <header className={children ? 'topbar has-nav' : 'topbar'}>
      <span className="brand">IELTS Reading</span>
      {children}
    </header>
  )
}

// Вход обязательный (план 08): без входа — экран «Вход», после входа — тренажёр этого аккаунта.
export default function App() {
  const [user, setUser] = useState(() => currentUser())
  const [legacyPrompt, setLegacyPrompt] = useState(() => {
    const u = currentUser()
    return u ? needsLegacyPrompt(u) : false
  })

  function handleLoggedIn(u) {
    setLegacyPrompt(needsLegacyPrompt(u))
    setUser(u)
  }

  function handleLogout() {
    logout()
    setLegacyPrompt(false)
    setUser(null)
  }

  if (!user) {
    return (
      <div className="app">
        <TopBar />
        <main>
          <Auth onLoggedIn={handleLoggedIn} />
        </main>
      </div>
    )
  }

  // Окно переноса показывается до того, как тренажёр прочитает данные аккаунта.
  if (legacyPrompt) {
    const legacy = legacyData()
    return (
      <div className="app">
        <TopBar />
        <main />
        <TransferModal
          words={legacy.vocab.length}
          results={Object.keys(legacy.results).length}
          onTransfer={() => {
            transferLegacy(user.id)
            setLegacyPrompt(false)
          }}
          onSkip={() => {
            skipLegacy(user.id)
            setLegacyPrompt(false)
          }}
        />
      </div>
    )
  }

  // key: у каждого аккаунта своё состояние, при смене аккаунта всё читается заново.
  return <Trainer key={user.id} userId={user.id} onLogout={handleLogout} />
}

function Trainer({ userId, onLogout }) {
  // Всё сохраняется в localStorage аккаунта — при перезагрузке ничего не слетает.
  // view.screen: 'list' | 'reading' | 'vocab' | 'cards'
  const [view, setView] = useLocalStorage(userKey(userId, 'view'), DEFAULT_VIEW, cleanView)
  // Ответы по каждому тексту: { [passageId]: { answers, checked } }
  const [drafts, setDrafts] = useLocalStorage(userKey(userId, 'drafts'), {}, cleanDrafts)
  const [vocab, setVocab] = useLocalStorage(userKey(userId, 'vocab'), [], cleanVocab)
  const [results, setResults] = useLocalStorage(userKey(userId, 'results'), {}, cleanResults)
  // Сессия карточек: { queue, answered, known } или null
  const [cards, setCards] = useLocalStorage(userKey(userId, 'cards'), null, cleanCards)

  const screen = view.screen
  const passage = passages.find((p) => p.id === view.passageId)
  const draft = (passage && drafts[passage.id]) || EMPTY_DRAFT

  function setScreen(next) {
    setView((v) => ({ ...v, screen: next }))
  }

  function openPassage(id) {
    setView({ screen: 'reading', passageId: id })
  }

  function setDraft(next) {
    setDrafts((prev) => ({ ...prev, [passage.id]: next }))
  }

  function checkAnswers() {
    const total = passage.questions.length
    const score = passage.questions.filter((q) => draft.answers[q.id] === q.answer).length
    setResults((prev) => {
      const old = prev[passage.id]
      const best = old ? Math.max(old.best, score) : score
      return { ...prev, [passage.id]: { best, total, lastAt: Date.now() } }
    })
    setDraft({ ...draft, checked: true })
  }

  function addWord(entry) {
    setVocab((prev) => {
      const key = entry.word.toLowerCase()
      if (prev.some((w) => w.word.toLowerCase() === key)) return prev
      return [
        ...prev,
        {
          id: `${key}-${Date.now()}`,
          word: key,
          translation: entry.translation,
          example: entry.example,
          passageId: entry.passageId,
          status: 'learning',
          addedAt: Date.now(),
        },
      ]
    })
  }

  function deleteWord(id) {
    setVocab((prev) => prev.filter((w) => w.id !== id))
  }

  function setWordStatus(id, status) {
    setVocab((prev) => prev.map((w) => (w.id === id ? { ...w, status } : w)))
  }

  const isListActive = screen === 'list' || screen === 'reading'
  const isVocabActive = screen === 'vocab' || screen === 'cards'

  return (
    <div className="app">
      <TopBar>
        <nav>
          <Button
            variant={isListActive ? 'nav-active' : 'nav'}
            aria-current={isListActive ? 'page' : undefined}
            onClick={() => setScreen('list')}
          >
            Тексты
          </Button>
          <Button
            variant={isVocabActive ? 'nav-active' : 'nav'}
            aria-current={isVocabActive ? 'page' : undefined}
            onClick={() => setScreen('vocab')}
          >
            Словарь
          </Button>
          <Button variant="nav" onClick={onLogout}>
            Выйти
          </Button>
        </nav>
      </TopBar>

      <main>
        {(screen === 'list' || (screen === 'reading' && !passage)) && (
          <PassageList passages={passages} results={results} onOpen={openPassage} />
        )}
        {screen === 'reading' && passage && (
          <Reading
            key={passage.id}
            passage={passage}
            answers={draft.answers}
            checked={draft.checked}
            onAnswer={(qid, oi) => setDraft({ ...draft, answers: { ...draft.answers, [qid]: oi } })}
            onCheck={checkAnswers}
            onRetry={() => setDraft(EMPTY_DRAFT)}
            vocab={vocab}
            onAddWord={addWord}
            onBack={() => setScreen('list')}
            onToVocab={() => setScreen('vocab')}
          />
        )}
        {screen === 'vocab' && (
          <Vocabulary
            vocab={vocab}
            onDelete={deleteWord}
            onReview={() => setScreen('cards')}
            onToTexts={() => setScreen('list')}
          />
        )}
        {screen === 'cards' && (
          <Flashcards
            vocab={vocab}
            session={cards}
            onSessionChange={setCards}
            onSetStatus={setWordStatus}
            onBack={() => setScreen('vocab')}
            onToTexts={() => setScreen('list')}
          />
        )}
      </main>
    </div>
  )
}
