export const COLOR = {
  primary: '#F08080',
  secondary: '#f4a9a8',
  tertiary: '#FFD3D8',
  focus: '#f4a9a8',
  focusLight: '#f4a9a8',

  yellow: '#F7E600',
  gray: '#787878',
  black: '#000000',
  white: '#FFFFFF',

  error: '#F14646',
  warning: '#EF8523',
  success: '#31A115'
} as const

export const TEXT = {
  color: {
    primary: '#212121',
    secondary: '#454f5d'
  },
  size: {
    xs: '1.4rem',
    sm: '1.5rem',
    base: '1.6rem',
    lg: '1.8rem',
    xl: '2rem',
    '2xl': '2.5em',
    '3xl': '3rem',
    '4xl': '3.5rem',
    '5xl': '4rem',
    '6xl': '4.5rem',
    '7xl': '5rem'
  }
} as const

export const LINE = {
  color: {
    primary: '#777777',
    secondary: '#BABABA'
  }
} as const

export const BG = {
  color: {
    primary: '#f8f8f8',
    secondary: 'rgba(0, 0, 0, 0.5);',
    white: '#FFFFFF',
    black: '#000000'
  }
} as const

export const SPACE = {
  '0.5': '0.125rem',
  '1': '0.25rem',
  '1.5': '0.375rem',
  '2': '0.5rem',
  '2.5': '0.625rem',
  '3': '0.75rem',
  '3.5': '0.875rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '7': '1.75rem',
  '8': '2rem',
  '9': '2.25rem',
  '10': '2.5rem',
  '11': '2.75rem',
  '12': '3rem',
  '14': '3.5rem',
  '16': '4rem',
  '20': '5rem',
  '24': '6rem',
  '28': '7rem'
} as const

export const WINDOW = {
  mobile: '375px',
  tablet: '768px',
  desktop: '1280px'
} as const

export const SHADOW = {
  sm: '0 0.8rem 1.6rem 0 rgba(0, 0, 0, 0.16)',
  base: '0 0.4rem 0.8rem 0 rgba(0, 0, 0, 0.16)',
  lg: '0 0.8rem 1.6rem 0 rgba(0, 0, 0, 0.16)',
  map: 'rgba(60, 64, 67, 0.3) 0px 1px 2px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'
} as const

export const TRANSITION = {
  to: (property: string) => `${property} 0.2s ease-in-out `,
  all: 'all 0.2s ease-in-out',
  fast: 'all 0.1s ease-in-out',
  slow: 'all 0.5s ease-in-out'
} as const

const theme = {
  color: COLOR,
  line: LINE,
  background: BG,
  text: TEXT,
  space: SPACE,
  shadow: SHADOW
}

/**
 * @description
 * ThemeProvider는 hydration 후 className이 변경되는 문제가 있음, use clinet에서 themeProvider를 사용하면 되지만,
 * 이렇게 되면 페이지미다 DX가 떨어지고 부분적으로 SSR에 제약이 생길 수 있으므로 사용하지 않음
 */
export type Theme = typeof theme

export default theme
