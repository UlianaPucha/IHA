import { ActionIcon, Badge, Button, Card, Text, Title } from '@mantine/core'

function TrashIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Vocabulary({ vocab, onDelete, onReview, onToTexts }) {
  return (
    <section>
      <div className="toolbar">
        <Title order={1}>Словарь</Title>
        <Button variant="primary" onClick={onReview}>
          Повторить
        </Button>
      </div>

      {vocab.length === 0 ? (
        <Card className="empty">
          <Text c="dimmed" mb={16}>
            Словарь пуст. Откройте текст и нажмите на слово, чтобы добавить его сюда.
          </Text>
          <Button variant="secondary-on-surface" onClick={onToTexts}>
            К текстам
          </Button>
        </Card>
      ) : (
        <ul className="word-list">
          {vocab.map((w) => {
            const known = w.status === 'known'
            return (
              <Card component="li" key={w.id} className="word-item">
                <div className="word-text">
                  <strong lang="en">{w.word}</strong>
                  <Text size="md" c="dimmed">
                    {w.translation}
                  </Text>
                </div>
                <Badge
                  style={
                    known
                      ? { background: 'var(--success-soft)', color: 'var(--success-text)' }
                      : { background: 'var(--warning-soft)', color: 'var(--warning)' }
                  }
                >
                  {known ? '✓ выучено' : '● учу'}
                </Badge>
                <ActionIcon
                  variant="subtle"
                  size={44}
                  className="icon-delete"
                  onClick={() => onDelete(w.id)}
                  aria-label={`Удалить ${w.word}`}
                  title="Удалить"
                >
                  <TrashIcon />
                </ActionIcon>
              </Card>
            )
          })}
        </ul>
      )}
    </section>
  )
}
