import { ActionIcon, Badge, Button, Card, PasswordInput, Popover, TextInput, createTheme } from '@mantine/core'

// Тема Mantine собрана из токенов DESIGN.md. Значения цветов дублируются
// CSS-переменными в index.css (--primary, --ink, --canvas, --panel и т. д.).

// Синяя палитра вокруг primary #2563EB (оттенок 6) и primary-hover #1D4ED8 (оттенок 7).
const blue = ['#EAF1FF', '#D6E4FF', '#ADC8FF', '#84ABFF', '#5B8EF5', '#3B78EF', '#2563EB', '#1D4ED8', '#1E40AF', '#1E3A8A']
// Тёплая тёмная палитра: canvas #F7F4EF (0), panel #EFE8DE (1), on-surface-muted #5A554F (5),
// ink-hover #2A2A2A (6), ink #151515 (7).
const ink = ['#F7F4EF', '#EFE8DE', '#E7DFD3', '#C9C1B6', '#9C958B', '#5A554F', '#2A2A2A', '#151515', '#0A0A0A', '#000000']

// Manrope — заголовки и интерфейс; Inter — только абзацы текста IELTS (index.css, .passage-body).
const SANS = 'Manrope, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'

// Варианты кнопок из DESIGN.md (button-primary, button-secondary, ... и пункты меню).
const BUTTON_VARIANTS = {
  primary: { bg: 'var(--ink)', hover: 'var(--ink-hover)', color: 'var(--on-ink)' },
  secondary: { bg: 'var(--surface)', hover: 'var(--surface-hover)', color: 'var(--on-surface)' },
  'secondary-on-surface': { bg: 'var(--panel)', hover: 'var(--panel-hover)', color: 'var(--on-surface)' },
  nav: { bg: 'transparent', hover: 'var(--panel)', color: 'var(--on-surface)' },
  // Активный пункт меню — чёрная «таблетка» (решение пользователя 2026-11-16)
  'nav-active': { bg: 'var(--ink)', hover: 'var(--ink)', color: 'var(--on-ink)' },
}
// Абсолютно все кнопки одного размера (DESIGN.md, label-lg): высота 44 px, шрифт 15 px / 600, отступы 20 px.
// Размеров у кнопок нет — проп size не используется.
const BUTTON_SIZE = { height: '44px', px: '20px', fz: '15px' }

export const theme = createTheme({
  colors: { blue, ink },
  primaryColor: 'blue',
  primaryShade: 6,
  white: '#FFFFFF',
  black: '#151515',
  fontFamily: SANS,
  headings: {
    fontFamily: SANS,
    fontWeight: '500',
    sizes: {
      // headline-display; на телефоне 34 px (index.css)
      h1: { fontSize: '48px', lineHeight: '1.1', fontWeight: '400' },
      h2: { fontSize: '30px', lineHeight: '1.2', fontWeight: '500' }, // headline-lg
      h3: { fontSize: '24px', lineHeight: '1.25', fontWeight: '500' }, // headline-md
      h4: { fontSize: '21px', lineHeight: '1.3', fontWeight: '500' }, // headline-sm
    },
  },
  fontSizes: { xs: '12px', sm: '13px', md: '15px', lg: '17px', xl: '20px' },
  lineHeights: { xs: '1.4', sm: '1.45', md: '1.5', lg: '1.6', xl: '1.7' },
  spacing: { xs: '4px', sm: '8px', md: '12px', lg: '16px', xl: '24px' },
  radius: { xs: '8px', sm: '8px', md: '14px', lg: '20px', xl: '24px' },
  defaultRadius: 'lg',
  focusRing: 'auto',
  components: {
    Button: Button.extend({
      defaultProps: { variant: 'secondary' },
      vars: (_theme, props) => {
        const v = BUTTON_VARIANTS[props.variant]
        const s = BUTTON_SIZE
        return {
          root: {
            '--button-height': s.height,
            '--button-padding-x': s.px,
            '--button-fz': s.fz,
            '--button-radius': '9999px',
            ...(v && {
              '--button-bg': v.bg,
              '--button-hover': v.hover,
              '--button-color': v.color,
              '--button-hover-color': v.color,
              '--button-bd': 'none',
            }),
          },
        }
      },
    }),
    Card: Card.extend({
      defaultProps: { radius: 'lg', padding: 20, withBorder: false, shadow: 'none' },
    }),
    Badge: Badge.extend({
      defaultProps: { radius: 'xl', size: 'lg', tt: 'none', fw: 600 },
      // label-md 13 px, отступы 6 / 12 px (DESIGN.md: badge-*, chip)
      vars: () => ({ root: { '--badge-fz': '13px', '--badge-padding-x': '12px', '--badge-height': '28px' } }),
    }),
    TextInput: TextInput.extend({
      defaultProps: { radius: 'md', size: 'md', variant: 'filled' },
    }),
    PasswordInput: PasswordInput.extend({
      defaultProps: { radius: 'md', size: 'md', variant: 'filled' },
    }),
    Popover: Popover.extend({
      defaultProps: { radius: 'lg', shadow: 'none', withinPortal: true },
    }),
    ActionIcon: ActionIcon.extend({
      defaultProps: { radius: 'xl' },
    }),
  },
})

// CSS-переменные Mantine, которые нужно привести к токенам DESIGN.md.
export const cssVariablesResolver = () => ({
  variables: {},
  light: {
    '--mantine-color-body': '#F7F4EF',
    '--mantine-color-text': '#151515',
    '--mantine-color-dimmed': '#5A554F',
    '--mantine-color-disabled': '#E7E1D8',
    '--mantine-color-disabled-color': '#9C958B',
    '--mantine-color-placeholder': '#5A554F',
    '--mantine-color-error': '#C62828',
  },
  dark: {},
})
