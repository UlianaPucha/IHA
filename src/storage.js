import { useEffect, useState } from 'react'
import passages from './data/passages.json'

// Данные, сохранённые до появления входа (план 08): нужны только для окна переноса.
export const LEGACY_VOCAB_KEY = 'ielts.vocab'
export const LEGACY_RESULTS_KEY = 'ielts.results'

// Ключ данных аккаунта: ielts.u.<userId>.vocab, .results, .drafts, .view, .cards
export const userKey = (userId, name) => `ielts.u.${userId}.${name}`

const isText = (x) => typeof x === 'string'
const isFilledText = (x) => isText(x) && x.trim() !== ''
const isNumber = (x) => typeof x === 'number' && Number.isFinite(x)
const isCount = (x) => Number.isInteger(x) && x >= 0
const isPlainObject = (x) => x !== null && typeof x === 'object' && !Array.isArray(x)

// ---------- Чтение и запись ----------
// Если localStorage недоступен (запрещён, переполнен), значения живут в памяти до перезагрузки.
// Память читается первой: в ней последние записи этой вкладки.
const memory = new Map()

export function isStorageAvailable() {
  try {
    const key = 'ielts.__check'
    localStorage.setItem(key, '1')
    localStorage.removeItem(key)
    return true
  } catch {
    return false
  }
}

export function readJSON(key) {
  if (memory.has(key)) return memory.get(key)
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? null : JSON.parse(raw)
  } catch {
    return null
  }
}

export function writeJSON(key, value) {
  memory.set(key, value)
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // localStorage недоступен — значение остаётся только в памяти
  }
}

export function removeKey(key) {
  memory.delete(key)
  try {
    localStorage.removeItem(key)
  } catch {
    // нечего удалять
  }
}

// ---------- Проверки формы данных (PRD, раздел 6) ----------
// Повреждённые записи отбрасываются, исправные остаются. Если повреждено всё значение,
// функция возвращает null — тогда используется значение по умолчанию.

const isVocabEntry = (w) =>
  isPlainObject(w) &&
  isText(w.id) &&
  isFilledText(w.word) &&
  isFilledText(w.translation) &&
  isText(w.example) &&
  isText(w.passageId) &&
  (w.status === 'learning' || w.status === 'known') &&
  isNumber(w.addedAt)

const isResult = (r) =>
  isPlainObject(r) &&
  isNumber(r.best) &&
  isNumber(r.total) &&
  isNumber(r.lastAt) &&
  r.best >= 0 &&
  r.best <= r.total

export const cleanVocab = (v) => (Array.isArray(v) ? v.filter(isVocabEntry) : null)

export const cleanResults = (v) =>
  isPlainObject(v) ? Object.fromEntries(Object.entries(v).filter(([, r]) => isResult(r))) : null

// Ответы: { [passageId]: { answers: { [questionId]: номер варианта }, checked } }.
// Ответы на неизвестные тексты и вопросы отбрасываются; «проверено» — только если отвечено всё.
export function cleanDrafts(v) {
  if (!isPlainObject(v)) return null
  const out = {}
  for (const [pid, d] of Object.entries(v)) {
    const passage = passages.find((p) => p.id === pid)
    if (!passage || !isPlainObject(d) || !isPlainObject(d.answers)) continue
    const answers = {}
    for (const q of passage.questions) {
      const a = d.answers[q.id]
      if (Number.isInteger(a) && a >= 0 && a < q.options.length) answers[q.id] = a
    }
    const allAnswered = passage.questions.every((q) => answers[q.id] !== undefined)
    out[pid] = { answers, checked: d.checked === true && allAnswered }
  }
  return out
}

const SCREENS = ['list', 'reading', 'vocab', 'cards']

// Экран: { screen, passageId }. Неизвестный экран или текст — «Тексты».
export function cleanView(v) {
  if (!isPlainObject(v) || !SCREENS.includes(v.screen)) return null
  const known = passages.some((p) => p.id === v.passageId)
  const passageId = known ? v.passageId : null
  if (v.screen === 'reading' && !passageId) return { screen: 'list', passageId: null }
  return { screen: v.screen, passageId }
}

// Сессия карточек: { queue: [id слов, которые осталось показать], answered, known }.
// Слова, которых уже нет в словаре, отбрасываются при показе (Flashcards.jsx).
export function cleanCards(v) {
  if (!isPlainObject(v) || !Array.isArray(v.queue) || !v.queue.every(isText)) return null
  if (!isCount(v.answered) || !isCount(v.known) || v.known > v.answered) return null
  return { queue: v.queue, answered: v.answered, known: v.known }
}

// Аккаунты: [{ id, email, salt, passwordHash, createdAt, legacyHandled }]
const isUser = (u) =>
  isPlainObject(u) &&
  isFilledText(u.id) &&
  isFilledText(u.email) &&
  isFilledText(u.salt) &&
  isFilledText(u.passwordHash) &&
  isNumber(u.createdAt) &&
  typeof u.legacyHandled === 'boolean'

export const cleanUsers = (v) => (Array.isArray(v) ? v.filter(isUser) : null)

export const cleanSession = (v) =>
  isPlainObject(v) && isFilledText(v.userId) && isNumber(v.at) ? { userId: v.userId, at: v.at } : null

export const cleanAuthDraft = (v) => (isPlainObject(v) && isText(v.email) ? { email: v.email } : null)

// Прочитать ключ и очистить; если значения нет или оно повреждено целиком — fallback.
export function load(key, fallback, clean) {
  const value = readJSON(key)
  if (value === null) return fallback
  if (!clean) return value
  return clean(value) ?? fallback
}

// Состояние, которое синхронизируется с localStorage (или с памятью, если хранилище недоступно).
export function useLocalStorage(key, fallback, clean) {
  const [value, setValue] = useState(() => load(key, fallback, clean))
  useEffect(() => {
    writeJSON(key, value)
  }, [key, value])
  return [value, setValue]
}
