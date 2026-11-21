import { useState } from 'react'
import { Badge, Button, CloseButton, Text, TextInput } from '@mantine/core'

// Содержимое попапа слова. Позицию и закрытие по клику мимо / Esc даёт Popover из Mantine.
// entry — готовая запись для подсвеченного слова, иначе null (перевод вводит пользователь).
// saved — запись из словаря, если слово уже сохранено.
export default function WordPopup({ word, example, entry, saved, onAdd, onClose }) {
  const [translation, setTranslation] = useState('')

  function handleAdd(e) {
    e.preventDefault()
    if (entry) onAdd(entry.translation, entry.example)
    else if (translation.trim()) onAdd(translation.trim(), example)
  }

  const shownTranslation = saved ? saved.translation : entry?.translation
  const shownExample = saved ? saved.example : entry ? entry.example : example
  const known = saved?.status === 'known'

  return (
    <form onSubmit={handleAdd}>
      <div className="popup-head">
        <strong lang="en">{word}</strong>
        <CloseButton size={44} radius="xl" onClick={onClose} aria-label="Закрыть" />
      </div>

      {shownTranslation ? (
        <Text size="md">{shownTranslation}</Text>
      ) : (
        <TextInput
          data-autofocus
          autoFocus
          placeholder="Ваш перевод"
          aria-label="Ваш перевод"
          value={translation}
          onChange={(e) => setTranslation(e.currentTarget.value)}
          my={8}
        />
      )}

      <Text size="sm" c="dimmed" className="example" my={8}>
        {shownExample}
      </Text>

      {saved ? (
        <Badge
          style={
            known
              ? { background: 'var(--success-soft)', color: 'var(--success-text)' }
              : { background: 'var(--warning-soft)', color: 'var(--warning)' }
          }
        >
          ✓ В словаре · {known ? 'выучено' : 'учу'}
        </Badge>
      ) : (
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={!entry && !translation.trim()}
        >
          В словарь
        </Button>
      )}
    </form>
  )
}
