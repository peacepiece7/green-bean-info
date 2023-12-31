import { COLOR, SPACE } from '@/styles/common'
import { ButtonHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  $variant?: 'default' | 'primary' | 'warn'
  $size?: 'small' | 'medium' | 'large'
}

export const Button = (props: ButtonProps) => {
  // * default props가 중복 선언되어 있지만 가독성을 위해 남겨둡니다.
  const { children, $variant = 'default', $size = 'medium', ...rest } = props

  return (
    <ButtonWrapper $variant={$variant} $size={$size} {...rest}>
      {children}
    </ButtonWrapper>
  )
}

const ButtonVariants = {
  default: css`
    color: ${COLOR.black};
    background-color: white;
    &:focus {
      background-color: ${COLOR.focus};
    }
  `,
  primary: css`
    color: ${COLOR.white};
    background-color: ${COLOR.gray};
    &:focus {
      background-color: ${COLOR.focus};
    }
  `,
  warn: css`
    color: ${COLOR.warning};
    background-color: ${COLOR.white};
    border: 1px solid ${COLOR.warning};
    &:focus {
      background-color: ${COLOR.focusLight};
    }
  `
}

const ButtomSizes = {
  small: css`
    width: 10rem;
  `,
  medium: css`
    width: 15rem;
  `,
  large: css`
    width: 20rem;
  `
}

const ButtonWrapper = styled.button<ButtonProps>`
  font-size: 1.6rem;
  padding: ${SPACE[3]} ${SPACE[6]};
  cursor: pointer;
  border: 1px solid ${COLOR.black};
  border-radius: 0.5rem;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${COLOR.tertiary};
  }
  ${(props) => ButtonVariants[props.$variant || 'default']};
  ${(props) => ButtomSizes[props.$size || 'medium']}
`
