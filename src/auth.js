// Mock-вход по email и паролю (план 08).
// Проверяет форму и переходы, но НЕ подтверждает личность и НЕ защищает данные:
// «аккаунты» лежат в localStorage этого браузера, внешних систем нет.
import {
  LEGACY_RESULTS_KEY,
  LEGACY_VOCAB_KEY,
  cleanAuthDraft,
  cleanResults,
  cleanSession,
  cleanUsers,
  cleanVocab,
  load,
  readJSON,
  removeKey,
  userKey,
  writeJSON,
} from './storage.js'

const USERS_KEY = 'ielts.users'
const SESSION_KEY = 'ielts.session'
const AUTH_DRAFT_KEY = 'ielts.authDraft'

// Искусственная «проверка», чтобы было видно состояние загрузки — как будет с сервером.
const CHECK_DELAY = 500

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const MIN_PASSWORD = 8

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const normalizeEmail = (email) => email.trim().toLowerCase()
const toHex = (bytes) => [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('')

function randomSalt() {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  return toHex(bytes)
}

function newId() {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${randomSalt()}`
}

// SHA-256 от соли и пароля через встроенный Web Crypto. Это не защита, а только способ
// не хранить пароль открытым текстом.
async function hashPassword(salt, password) {
  const data = new TextEncoder().encode(`${salt}:${password}`)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return toHex(new Uint8Array(digest))
}

const loadUsers = () => load(USERS_KEY, [], cleanUsers)

function startSession(user) {
  writeJSON(SESSION_KEY, { userId: user.id, at: Date.now() })
  removeKey(AUTH_DRAFT_KEY)
}

// Кто вошёл сейчас (или null).
export function currentUser() {
  const session = cleanSession(readJSON(SESSION_KEY))
  if (!session) return null
  return loadUsers().find((u) => u.id === session.userId) ?? null
}

// Результат: { user } или { error: 'exists' | 'invalid' | 'unavailable' }.
export async function register(email, password) {
  await wait(CHECK_DELAY)
  try {
    const users = loadUsers()
    const normalized = normalizeEmail(email)
    if (users.some((u) => u.email === normalized)) return { error: 'exists' }
    const salt = randomSalt()
    const user = {
      id: newId(),
      email: normalized,
      salt,
      passwordHash: await hashPassword(salt, password),
      createdAt: Date.now(),
      legacyHandled: false,
    }
    writeJSON(USERS_KEY, [...users, user])
    startSession(user)
    return { user }
  } catch {
    return { error: 'unavailable' }
  }
}

export async function login(email, password) {
  await wait(CHECK_DELAY)
  try {
    const user = loadUsers().find((u) => u.email === normalizeEmail(email))
    if (!user) return { error: 'invalid' }
    if ((await hashPassword(user.salt, password)) !== user.passwordHash) return { error: 'invalid' }
    startSession(user)
    return { user }
  } catch {
    return { error: 'unavailable' }
  }
}

export function logout() {
  removeKey(SESSION_KEY)
}

// Email на экране входа (пароль не сохраняется никогда).
export const readAuthDraft = () => load(AUTH_DRAFT_KEY, { email: '' }, cleanAuthDraft).email
export const saveAuthDraft = (email) => writeJSON(AUTH_DRAFT_KEY, { email })

// ---------- Данные, сохранённые до появления входа ----------

export function legacyData() {
  return {
    vocab: load(LEGACY_VOCAB_KEY, [], cleanVocab),
    results: load(LEGACY_RESULTS_KEY, {}, cleanResults),
  }
}

// Показывать ли окно «Перенести данные в аккаунт?».
export function needsLegacyPrompt(user) {
  if (user.legacyHandled) return false
  const { vocab, results } = legacyData()
  return vocab.length > 0 || Object.keys(results).length > 0
}

function markLegacyHandled(userId) {
  writeJSON(
    USERS_KEY,
    loadUsers().map((u) => (u.id === userId ? { ...u, legacyHandled: true } : u)),
  )
}

// «Не переносить»: старые данные остаются, этому аккаунту окно больше не показывается.
export function skipLegacy(userId) {
  markLegacyHandled(userId)
}

// «Перенести»: слова без дублей по написанию, у результатов — лучший; старые ключи удаляются.
export function transferLegacy(userId) {
  const legacy = legacyData()
  const vocabKey = userKey(userId, 'vocab')
  const resultsKey = userKey(userId, 'results')

  const vocab = load(vocabKey, [], cleanVocab)
  const words = new Set(vocab.map((w) => w.word.toLowerCase()))
  const mergedVocab = [...vocab, ...legacy.vocab.filter((w) => !words.has(w.word.toLowerCase()))]

  const results = { ...load(resultsKey, {}, cleanResults) }
  for (const [pid, r] of Object.entries(legacy.results)) {
    const old = results[pid]
    results[pid] = old
      ? { best: Math.max(old.best, r.best), total: old.total, lastAt: Math.max(old.lastAt, r.lastAt) }
      : r
  }

  writeJSON(vocabKey, mergedVocab)
  writeJSON(resultsKey, results)
  removeKey(LEGACY_VOCAB_KEY)
  removeKey(LEGACY_RESULTS_KEY)
  markLegacyHandled(userId)
}
