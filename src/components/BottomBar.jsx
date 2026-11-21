// Закреплённая нижняя панель с главными кнопками экрана (DESIGN.md, bottom-bar).
// mode: 'reading' — содержимое выровнено по колонке вопросов, 'cards' — по ширине карточки.
// split: 'always' — кнопки делят ширину поровну всегда, 'narrow' — только на узком экране.
// Перед панелью стоит распорка её высоты, чтобы панель не закрывала конец страницы.
export default function BottomBar({ mode, split, children }) {
  const slot = ['bottom-bar-slot']
  if (split) slot.push(`split-${split}`)
  return (
    <>
      <div className="bottom-bar-spacer" aria-hidden="true" />
      <div className={`bottom-bar bottom-bar--${mode}`}>
        <div className="bottom-bar-inner">
          <div className={slot.join(' ')}>{children}</div>
        </div>
      </div>
    </>
  )
}
