---
version: alpha
name: IELTS Reading Trainer
description: Тёплый «учебный дашборд» (концепция 2, согласована и внедрена 2026-11-16, план 06; src/theme.js, src/index.css; актуально на 2026-11-16, включая решения пользователя после плана — список текстов в столбик, чёрный пункт меню, линия под шапкой, белая метка счёта; экран входа и окно переноса — план 08). Тёплый белый фон, бежевые плитки ответов, белые карточки, пастельные карточки текстов по темам, синий акцент, чёрные основные кнопки-«таблетки», заголовки и интерфейс Manrope, текст IELTS — Inter. Все кнопки одного размера (44 px, шрифт 15 px), главные действия чтения и карточек в закреплённой нижней панели.
colors:
  primary: "#2563EB"            # синий акцент: выбранный ответ, фокус, ссылки
  primary-hover: "#1D4ED8"
  ink: "#151515"                # основная кнопка действия, основной текст
  ink-hover: "#2A2A2A"
  on-ink: "#FFFFFF"
  canvas: "#F7F4EF"             # фон приложения, тёплый белый
  panel: "#EFE8DE"              # бежевые плитки ответов
  panel-hover: "#E7DFD3"
  surface: "#FFFFFF"            # карточки словаря, пустых состояний, итога; попап; флеш-карточка; вторичные кнопки
  surface-hover: "#F3EEE7"
  on-surface: "#151515"         # основной текст
  on-surface-muted: "#5A554F"   # подписи, подсказки (≥4.8:1 на canvas, panel, surface и всех пастелях)
  outline: "#E3DBCF"            # линии под шапкой и над нижней панелью
  disabled: "#E7E1D8"
  on-disabled: "#9C958B"
  topic-mint: "#CDEFDF"         # пастели — только фон карточек текстов в списке, по теме
  topic-peach: "#F9DDB8"
  topic-lavender: "#DCD5F8"
  topic-pink: "#F6C6C9"
  success: "#15803D"            # верный ответ, «выучено», «знаю»
  success-soft: "#DCF2E4"
  success-text: "#14532D"       # зелёный текст на success-soft
  error: "#C62828"              # ошибка, «не знаю»
  error-soft: "#FBE3E3"
  error-text: "#A61B1B"         # красный текст на error-soft
  warning: "#9A5A06"            # статус «учу»
  warning-soft: "#FCEBD2"
  highlight: "#FFE9A8"          # подсвеченное слово в тексте
typography:
  headline-display:             # «Тексты», «Словарь», «Карточки» — крупно и светло
    fontFamily: Manrope, system-ui, sans-serif
    fontSize: 48px
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: -0.02em
  headline-display-mobile:      # то же на ширине до 560 px
    fontFamily: Manrope, system-ui, sans-serif
    fontSize: 34px
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: -0.02em
  headline-lg:                  # название текста на экране чтения
    fontFamily: Manrope, system-ui, sans-serif
    fontSize: 30px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: -0.01em
  headline-md:                  # «Сессия завершена», заголовки пустых состояний
    fontFamily: Manrope, system-ui, sans-serif
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.25
  headline-sm:                  # название текста на пастельной карточке
    fontFamily: Manrope, system-ui, sans-serif
    fontSize: 21px
    fontWeight: 500
    lineHeight: 1.3
  title-md:                     # текст вопроса, слово в словаре, «Вопросы»
    fontFamily: Manrope, system-ui, sans-serif
    fontSize: 17px
    fontWeight: 600
    lineHeight: 1.4
  body-reading:                 # абзацы текста IELTS — единственное место с Inter
    fontFamily: Inter, system-ui, sans-serif
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.7
  body-md:                      # варианты ответа, перевод, обычный текст
    fontFamily: Manrope, system-ui, sans-serif
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:                      # подсказки, пример в попапе, «Отвечено 3 из 5»
    fontFamily: Manrope, system-ui, sans-serif
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.45
  label-lg:                     # абсолютно все кнопки с текстом, включая пункты меню
    fontFamily: Manrope, system-ui, sans-serif
    fontSize: 15px
    fontWeight: 600
    lineHeight: 1.2
  label-md:                     # метки-«таблетки»: тема, статус, счёт (не кнопки)
    fontFamily: Manrope, system-ui, sans-serif
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.2
  flash-word:                   # слово и короткий перевод на флеш-карточке (перевод длиннее 40 символов — 20 px)
    fontFamily: Manrope, system-ui, sans-serif
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.01em
  score-display:                # «2 из 3» в итоге сессии
    fontFamily: Manrope, system-ui, sans-serif
    fontSize: 44px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: -0.02em
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 32px
  3xl: 48px
  page-gutter: 16px             # боковой отступ на телефоне
  page-gutter-desktop: 32px
  content-max: 1160px
  card-gap: 12px                # промежуток между карточками
  tap-min: 44px                 # минимальная зона нажатия
  bottom-bar-height: 68px       # нижняя панель: кнопка 44 px + отступы 12 px сверху и снизу
rounded:
  none: 0px
  sm: 8px                       # подсветка слова
  md: 14px                      # поле ввода
  lg: 20px                      # плитки ответов, карточки словаря, попап
  xl: 24px                      # карточки текстов, флеш-карточка, итог сессии
  full: 9999px                  # кнопки, метки, пункты меню, полоски прогресса
components:
  button-primary:               # чёрная «таблетка»
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    height: 44px
    padding: 0 20px
  button-primary-hover:
    backgroundColor: "{colors.ink-hover}"
  button-primary-disabled:
    backgroundColor: "{colors.disabled}"
    textColor: "{colors.on-disabled}"
  button-secondary:             # белая «таблетка» на canvas и на пастели
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    height: 44px
    padding: 0 20px
  button-secondary-hover:
    backgroundColor: "{colors.surface-hover}"
  button-secondary-on-surface:  # вторичная на белой карточке (пустые состояния)
    backgroundColor: "{colors.panel}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    height: 44px
    padding: 0 20px
  nav-item:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    height: 44px
    padding: 0 20px
  nav-item-active:              # чёрная «таблетка» (решение пользователя 2026-11-16)
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
  top-bar:                      # шапка во всю ширину окна, линия outline снизу
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.on-surface}"
    height: 68px
    padding: 12px 32px
  icon-button:                  # корзина в словаре, крестик в попапе — белый круг
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-muted}"
    rounded: "{rounded.full}"
    height: 44px
    width: 44px
  passage-card:                 # карточка текста в списке, тема «Экология»
    backgroundColor: "{colors.topic-mint}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
    padding: 24px
  passage-card-history:         # тема «История»
    backgroundColor: "{colors.topic-peach}"
  passage-card-science:         # тема «Наука»
    backgroundColor: "{colors.topic-lavender}"
  passage-card-other:           # любая другая тема
    backgroundColor: "{colors.topic-pink}"
  chip:                         # белая метка на пастельной карточке: тема и число вопросов
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 6px 12px
  option-tile:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 14px 16px
  option-tile-hover:
    backgroundColor: "{colors.panel-hover}"
  option-tile-selected:         # белая плитка с синей обводкой 2 px внутри
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
  option-tile-correct:
    backgroundColor: "{colors.success-soft}"
    textColor: "{colors.on-surface}"
  option-tile-incorrect:
    backgroundColor: "{colors.error-soft}"
    textColor: "{colors.error-text}"
  option-tile-dimmed:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.on-disabled}"
  card:                         # карточки словаря, пустых состояний, итога сессии
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 20px
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    height: 44px
    padding: 0 14px
  popover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 16px
    width: 290px
  bottom-bar:                   # закреплённая нижняя панель: чтение и карточки
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.on-surface-muted}"
    typography: "{typography.body-sm}"
    height: "{spacing.bottom-bar-height}"
    padding: 12px 16px
  badge-learning:
    backgroundColor: "{colors.warning-soft}"
    textColor: "{colors.warning}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 6px 12px
  badge-known:
    backgroundColor: "{colors.success-soft}"
    textColor: "{colors.success-text}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 6px 12px
  badge-score:                  # «Правильно X из Y» — белая, как метка темы (решение пользователя 2026-11-16)
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 6px 12px
  word-highlight:
    backgroundColor: "{colors.highlight}"
    rounded: "{rounded.sm}"
  word-saved:
    backgroundColor: "{colors.success-soft}"
    rounded: "{rounded.sm}"
  flashcard:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
    height: 240px
  progress-track:
    backgroundColor: "{colors.error-soft}"
    rounded: "{rounded.full}"
    height: 10px
  progress-fill:
    backgroundColor: "{colors.success}"
    rounded: "{rounded.full}"
  auth-card:                    # карточка формы входа (план 08)
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
    padding: 24px
    width: 420px
  segmented-control:            # переключатель «Вход | Регистрация»: бежевая дорожка
    backgroundColor: "{colors.panel}"
    textColor: "{colors.on-surface-muted}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    padding: 4px
  segmented-control-active:     # выбранный сегмент — белая «таблетка» 44 px
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    height: 44px
  password-input:               # как text-input, справа кнопка «Показать пароль» 44×44
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    height: 44px
    padding: 0 14px
  form-error:                   # ошибка формы над кнопкой
    backgroundColor: "{colors.error-soft}"
    textColor: "{colors.error-text}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 10px 14px
  form-warning:                 # предупреждение: браузер не хранит данные
    backgroundColor: "{colors.warning-soft}"
    textColor: "{colors.warning}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 10px 14px
  modal:                        # окно «Перенести данные в аккаунт?»
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
    padding: 24px
    width: 420px
---

# IELTS Reading Trainer — дизайн

## Overview
Учебный тренажёр для русскоязычного студента, который готовится к IELTS Academic Reading. Тон тёплый и дружелюбный, но собранный. Много воздуха, крупные светлые заголовки, пастельные карточки текстов, чёрные «таблетки» для действий. Текст IELTS читается спокойно и ничем не перебивается.

Визуальный образец (концепция 2, 2026-11-16) — дашборд онлайн-курсов. Из него взяты только приёмы оформления: тёплая палитра, слои фона, формы, типографика. Его функции и элементы не переносятся. Логика, экраны, сценарий и тексты из PRD не меняются.

## Colors
- **Фон** — тёплый белый `canvas`. На нём белые карточки `surface` и бежевые плитки ответов `panel`. Блоки отделяются заливкой, а не рамками.
- **Синий `primary`** — единственный акцентный цвет:
  - выбранный ответ (обводка);
  - фокус;
  - ссылки.
- **Чёрный `ink`** — основная кнопка действия (одна на экран или блок), активный пункт меню и основной текст.
- **Пастели `topic-*`** — только фон карточек текстов в списке, по теме текста: Экология — мятный, История — персиковый, Наука — лавандовый, другие темы — розовый. Пастели ничего не означают, и на экране чтения, в словаре и на карточках их нет.
- **Зелёный и красный** — только смысловые цвета: верно или ошибка, «выучено» или «не знаю». Жёлтый — подсветка слов в тексте. Оранжевый — статус «учу».
- Текст на светлых смысловых фонах (`success-soft`, `error-soft`) — затемнённые `success-text` и `error-text`. Яркие `success` и `error` — только для значков, полосок и текста на белом.
- Контраст текста не ниже 4.5:1 (WCAG AA). Исключение по WCAG — надпись неактивной кнопки (`on-disabled` на `disabled`).

## Typography
- **Manrope** (геометрический гротеск) — заголовки и весь интерфейс: кнопки, меню, вопросы, ответы, словарь, карточки.
- **Inter** — только абзацы текста IELTS (`body-reading`), чтобы длинный текст читался привычно.
- **Заголовки экранов** крупные и светлые: 48 px, начертание 400, плотный межбуквенный интервал. На телефоне 34 px.
- Названия текстов и вопросы — 500–600, основной текст — 400. Тоньше 400 не используется, засечек нет.
- Оба шрифта поддерживают кириллицу и подключаются через Google Fonts. Без сети используется системный гротеск, приложение работает.

## Layout
- **Компоновка экранов из PRD не меняется:**
  - верхнее меню;
  - на экране чтения две колонки (текст 3/5, вопросы 2/5), на узком экране одна;
  - словарь и карточки — одна колонка.
- **Список текстов** — пастельные карточки одна под другой, в одну колонку на всю ширину контента на любом экране (решение пользователя 2026-11-16). Над ними — крупный заголовок «Тексты».
- **Шапка** (`top-bar`) — во всю ширину окна, линия `outline` снизу. Содержимое выровнено по ширине контента. После входа: «IELTS Reading» слева, справа «Тексты», «Словарь», «Выйти». На ширине до 560 px надпись «IELTS Reading» скрыта, чтобы три пункта поместились. На экране входа — только «IELTS Reading».
- **Экран входа** — крупный заголовок «Вход» и под ним карточка `auth-card` шириной до 420 px, оба по центру страницы по горизонтали (решение пользователя 2026-11-16). По вертикали — обычный отступ под шапкой.
- **Экран чтения** — текст и колонка вопросов на общем фоне `canvas`, без подложки. Бежевые только плитки ответов.
- Сетка отступов кратна 4 px: 4, 8, 12, 16, 24, 32, 48. Между карточками — 12 px.
- Ширина контента до 1160 px. Боковые отступы 16 px на телефоне и 32 px на десктопе.
- На ширине 375 px нет горизонтальной прокрутки.
- **Нижняя панель** (`bottom-bar`) на экранах чтения и карточек закреплена у нижнего края окна на всех ширинах. Сама панель во всю ширину окна, содержимое выровнено по сетке страницы:
  - на экране чтения на широком экране — по правой колонке вопросов (2/5), на узком — по ширине контента;
  - на карточках — по ширине флеш-карточки.
- Внизу страницы оставляется отступ высотой с панель (`bottom-bar-height`), чтобы панель не закрывала последний вопрос или текст.

## Elevation & Depth
Дизайн плоский. Глубина задаётся тёплыми слоями фона (`canvas` → `panel` / `surface`) и размером шрифта, а не тенями.
- Тень есть только у попапа слова, потому что он висит над текстом: мягкая `0 12px 32px rgba(21,21,21,0.12)`.
- Окно `modal` без тени: от страницы его отделяет затемнение фона (стандартный оверлей Mantine).
- Основная чёрная кнопка плоская, без «объёмной» кромки. При нажатии не смещается и не меняет размер.
- Шапка и нижняя панель отделяются от страницы линией 1 px цвета `outline`: шапка — по нижнему краю, панель — по верхнему. Других линий-разделителей нет.

## Shapes
- Кнопки, метки, пункты меню и полоски прогресса — полные «таблетки» (`full`).
- Карточки текстов, флеш-карточка и итог сессии — 24 px (`xl`).
- Плитки ответов, карточки словаря и попап — 20 px (`lg`).
- Поле ввода — 14 px (`md`). Подсветка слова — 8 px (`sm`).
- Рамок нет. Исключения — синяя обводка 2 px у выбранного ответа и у фокуса. Обе рисуются внутри элемента и не меняют его размер.

## Components
- **Кнопки.** Абсолютно все кнопки ровно 44 px (`tap-min`) в любом состоянии — активные, неактивные, при наведении и нажатии. Это касается и пунктов меню (`nav-item`), и кнопок-иконок (`icon-button`: корзина, крестик в попапе). Шрифт и отступы у всех кнопок с текстом одинаковые: `label-lg` — Manrope 15 px, 600, отступы 20 px слева и справа. Исключений нет: ни для меню, ни для шапки, ни для попапа, ни для узкого экрана. Кнопки различаются только цветом (роль) и шириной — по тексту или по месту (попап, нижняя панель). Плитки ответов A–D — не кнопки, их высота зависит от текста.
  - Основная чёрная `button-primary`:
    - «Проверить» — только в нижней панели;
    - «В словарь» в разборе, в итоге сессии и в попапе слова;
    - «Знаю», «Повторить», «Повторить все слова».
  - Вторичная белая `button-secondary` — на фоне `canvas` и на пастельных карточках: «Читать», «Пройти ещё раз», «Не знаю», «← К текстам».
  - Вторичная на белой карточке `button-secondary-on-surface` — бежевая: «К текстам» в пустых состояниях. Вторичная кнопка всегда отличается от фона заливкой, без рамки.
  - Неактивная — `button-primary-disabled`, как «Проверить», пока отвечены не все вопросы.
- **Меню «Тексты / Словарь»** — пункты-«таблетки» на `canvas`. Активный — чёрная «таблетка» с белым текстом, неактивный — тёмный текст без фона. Активный пункт меню не считается «основной кнопкой» в правиле «одна чёрная кнопка».
- **Карточка текста** `passage-card` — пастельный цвет темы, 24 px:
  - сверху белая метка `chip` «Экология · 5 вопросов»;
  - название — `headline-sm`;
  - отметка «Пройден, лучший результат 3/5» или «Не пройден» — `body-sm` цвета `on-surface-muted`;
  - внизу белая кнопка «Читать».
- **Варианты ответа A–D** — бежевые плитки `option-tile` в один столбец. Буква A–D видна, кружок радиокнопки скрыт, но для клавиатуры и экранного диктора это остаётся группа радиокнопок.
  - Выбранная плитка `option-tile-selected` — белая с синей обводкой 2 px внутри, высота не меняется.
  - После проверки: верный ответ — `option-tile-correct`, ошибочный выбор — `option-tile-incorrect` (зачёркнут), остальные — `option-tile-dimmed`.
- **Отметки ✓/✗** у вопросов — зелёный и красный значки. «Правильно X из Y» — белая метка `badge-score` с чёрным текстом.
- **Нижняя панель** `bottom-bar` — фон `canvas`, линия `outline` сверху, без тени.
  - Содержимое по экранам:
    - чтение, ответы: слева «Отвечено X из Y» (`body-sm`), справа «Проверить»;
    - чтение, разбор: «Пройти ещё раз» и «В словарь»;
    - карточки: «Не знаю» и «Знаю».
  - На широком экране кнопки обычной ширины, на узком делят ширину панели поровну. На карточках кнопки всегда делят ширину карточки.
  - Попап слова не должен уходить под панель: нижней границей для него служит верх панели. Если попап не помещается ни сверху, ни снизу, он лежит поверх панели.
  - В словаре, итоге сессии и пустых состояниях панели нет.
- **Словарь** — белые карточки `card` на `canvas`: слово (`title-md`), перевод, метки `badge-learning` / `badge-known`, корзина `icon-button`.
- **Поле перевода** — `text-input`, при фокусе синяя обводка 2 px.
- **Попап слова** — `popover`, белый, мягкая тень.
- **Шапка** `top-bar` — на фоне `canvas`, во всю ширину окна, линия `outline` снизу (как у нижней панели), высота 68 px.
- **Флеш-карточка** — `flashcard`, белая, 24 px, переворот 0,5 с. Слово и перевод — `flash-word`. 240 px — минимальная высота: длинный перевод растягивает карточку вниз, обе стороны всегда одной высоты. Перевод длиннее 40 символов набирается 20 px вместо 28 px. Длинные слова переносятся — так же в попапе и словаре.
- **Итог сессии** — белая карточка, крупный счёт `score-display`, полоска `progress-track` / `progress-fill`.
- **Форма входа** (`auth-card`, план 08):
  - сверху переключатель `segmented-control` «Вход | Регистрация» на всю ширину карточки; выбранный сегмент — белая «таблетка» 44 px. Это выбор режима, а не кнопка действия, поэтому он не чёрный;
  - поля «Email» (`text-input`) и «Пароль» (`password-input`) на фоне `canvas`, подписи над полями `body-md`, ошибка поля под ним цветом `error`;
  - кнопка «Показать пароль» внутри поля — `icon-button` 44×44 без фона;
  - ошибка формы `form-error` над кнопкой; предупреждение `form-warning`, если браузер не хранит данные;
  - одна чёрная кнопка `button-primary` на всю ширину: «Войти» / «Создать аккаунт». Во время проверки в ней индикатор загрузки, высота 44 px не меняется;
  - внизу подпись про демо-вход — `body-sm`, `on-surface-muted`.
- **Окно переноса** `modal` — белое, 24 px, без тени, на затемнённом фоне. Заголовок `headline-md`, текст `body-md`, кнопки «Перенести» (`button-primary`) и «Не переносить» (`button-secondary-on-surface`). Без крестика: закрывается только ответом.
- **«Выйти»** в шапке — `nav-item`, как неактивный пункт меню.

## Do's and Don'ts
**Делать**
- Одна чёрная основная кнопка на экран или блок действий.
- Синий — только для выбора, фокуса и ссылок.
- Разделять блоки тёплыми слоями фона и отступами.
- Пастели — только для карточек текстов в списке, по теме.
- Зоны нажатия не меньше 44 px, видимый фокус для клавиатуры.
- Сохранять тексты интерфейса и сценарий из PRD.

**Не делать**
- **Не переносить из образца:**
  - рамку браузера и мятный фон вокруг;
  - логотип;
  - боковую полосу иконок;
  - корзину с красной точкой;
  - уведомления и шестерёнку настроек;
  - аватары и стопки аватаров;
  - профиль, имя и «Friends» (после входа в шапке только «Выйти», email не показывается);
  - график Activity и выбор «Year»;
  - рейтинги со звёздами, «Top 10» и число студентов;
  - разделы «My courses» и «Featured course»;
  - фильтр-чипы по категориям;
  - эмодзи (👍).
- Не делать пастельные цвета смысловыми и не красить ими кнопки, плитки ответов, словарь и экран чтения.
- Не подкладывать бежевую панель под колонку вопросов: текст и вопросы на общем фоне.
- Не делать основные кнопки синими и не использовать зелёный как основной цвет.
- Не использовать тени, кроме попапа, и рамки, кроме синей обводки выбора и фокуса и линий под шапкой и над нижней панелью.
- Не набирать текст начертанием тоньше 400 и не использовать засечки. Inter — только для абзацев IELTS.
- Не делать кнопки выше или ниже 44 px и не выносить за их границы тени, обводки и смещения при нажатии. Не делать «компактных» или «крупных» кнопок: шрифт 15 px / 600 и отступы 20 px у всех.
- Не использовать градиенты, в том числе двухтонный диагональный фон карточек из образца.
- Не использовать эмодзи как иконки и не добавлять иконки, для которых нужна новая библиотека, без согласования.
- Не добавлять функции и экраны сверх PRD.
