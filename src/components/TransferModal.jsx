import { Button, Modal, Text } from '@mantine/core'

// Окно «Перенести данные в аккаунт?» (план 08). Закрыть без ответа нельзя: нет крестика,
// не закрывается по Esc и клику мимо.
export default function TransferModal({ words, results, onTransfer, onSkip }) {
  return (
    <Modal
      opened
      onClose={() => {}}
      withCloseButton={false}
      closeOnEscape={false}
      closeOnClickOutside={false}
      centered
      size={420}
      radius="xl"
      padding={24}
      className="transfer-modal"
      title="Перенести данные в аккаунт?"
      classNames={{ title: 'transfer-title' }}
    >
      <Text size="md">
        В этом браузере есть слова ({words}) и результаты ({results}), сохранённые до входа. Перенести их в
        аккаунт?
      </Text>
      <div className="actions" style={{ marginTop: 24 }}>
        <Button variant="primary" onClick={onTransfer}>
          Перенести
        </Button>
        <Button variant="secondary-on-surface" onClick={onSkip}>
          Не переносить
        </Button>
      </div>
    </Modal>
  )
}
