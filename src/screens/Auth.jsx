import { useState } from 'react'
import { Button, Card, PasswordInput, SegmentedControl, Text, TextInput, Title } from '@mantine/core'
import { EMAIL_RE, MIN_PASSWORD, login, readAuthDraft, register, saveAuthDraft } from '../auth.js'
import { isStorageAvailable } from '../storage.js'

const MODES = [
  { value: 'login', label: 'Вход' },
  { value: 'register', label: 'Регистрация' },
]

const SUBMIT_ERRORS = {
  invalid: 'Неверный email или пароль',
  exists: 'Аккаунт с этим email уже есть. Войдите.',
  unavailable: 'Не удалось войти в этом браузере.',
}

// Экран «Вход» (план 08): mock-вход по email и паролю, см. src/auth.js.
export default function Auth({ onLoggedIn }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState(() => readAuthDraft())
  const [password, setPassword] = useState('')
  // Ошибки полей показываются после ухода из поля или нажатия кнопки.
  const [touched, setTouched] = useState({ email: false, password: false })
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [storageOk] = useState(() => isStorageAvailable())

  const emailError = EMAIL_RE.test(email.trim()) ? null : 'Введите email в формате name@example.com'
  const passwordError = password.length >= MIN_PASSWORD ? null : 'Пароль — не меньше 8 символов'

  function changeMode(next) {
    setMode(next)
    setSubmitError(null)
  }

  function changeEmail(value) {
    setEmail(value)
    setSubmitError(null)
    saveAuthDraft(value)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setTouched({ email: true, password: true })
    if (emailError || passwordError || loading) return
    setSubmitError(null)
    setLoading(true)
    const result = mode === 'login' ? await login(email, password) : await register(email, password)
    if (result.user) {
      onLoggedIn(result.user)
      return
    }
    setLoading(false)
    setSubmitError(SUBMIT_ERRORS[result.error] ?? SUBMIT_ERRORS.unavailable)
  }

  return (
    <section className="auth-screen">
      <div className="toolbar">
        <Title order={1}>Вход</Title>
      </div>

      <Card className="auth-card">
        <form onSubmit={handleSubmit} noValidate>
          <SegmentedControl
            className="auth-switch"
            fullWidth
            radius="xl"
            data={MODES}
            value={mode}
            onChange={changeMode}
            disabled={loading}
          />

          <TextInput
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => changeEmail(e.currentTarget.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            error={touched.email && emailError}
            disabled={loading}
            mt={20}
          />

          <PasswordInput
            label="Пароль"
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value)
              setSubmitError(null)
            }}
            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            error={touched.password && passwordError}
            description={mode === 'register' ? 'Не меньше 8 символов' : undefined}
            inputWrapperOrder={['label', 'input', 'description', 'error']}
            disabled={loading}
            rightSectionWidth={44}
            visibilityToggleButtonProps={{
              size: 44,
              'aria-label': 'Показать пароль',
              title: 'Показать пароль',
            }}
            mt={16}
          />

          {!storageOk && (
            <div className="form-warning" role="status">
              Браузер не разрешает сохранять данные: вход и слова сохранятся только до перезагрузки страницы.
            </div>
          )}
          {submitError && (
            <div className="form-error" role="alert">
              {submitError}
            </div>
          )}

          <Button type="submit" variant="primary" fullWidth loading={loading} mt={20}>
            {mode === 'login' ? 'Войти' : 'Создать аккаунт'}
          </Button>

          <Text size="sm" c="dimmed" mt={16}>
            Демо-вход: личность не проверяется, данные не защищены и хранятся только в этом браузере. Не
            используйте настоящий пароль.
          </Text>
        </form>
      </Card>
    </section>
  )
}
