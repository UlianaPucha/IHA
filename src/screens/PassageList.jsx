import { Badge, Button, Card, Text, Title } from '@mantine/core'

// Пастельный цвет карточки по теме (DESIGN.md: passage-card*). Любая другая тема — розовая.
const TOPIC_CLASS = {
  Экология: 'topic-mint',
  История: 'topic-peach',
  Наука: 'topic-lavender',
}

export default function PassageList({ passages, results, onOpen }) {
  return (
    <section>
      <div className="toolbar">
        <Title order={1}>Тексты</Title>
      </div>
      {passages.length === 0 && (
        <Card className="empty">
          <Text c="dimmed">Тексты пока не добавлены.</Text>
        </Card>
      )}
      <ul className="passage-list">
        {passages.map((p) => {
          const r = results[p.id]
          const topicClass = TOPIC_CLASS[p.topic] || 'topic-other'
          return (
            <Card component="li" key={p.id} className={`passage-card ${topicClass}`}>
              <Badge className="chip">
                {p.topic} · {p.questions.length} вопросов
              </Badge>
              <Title order={4} lang="en">
                {p.title}
              </Title>
              <Text size="sm" c="dimmed">
                {r ? `Пройден, лучший результат ${r.best}/${r.total}` : 'Не пройден'}
              </Text>
              <Button onClick={() => onOpen(p.id)}>Читать</Button>
            </Card>
          )
        })}
      </ul>
    </section>
  )
}
