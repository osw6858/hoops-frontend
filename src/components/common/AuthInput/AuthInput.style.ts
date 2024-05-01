import styled from 'styled-components'
import { theme } from '../../../styles/theme.ts'

export const S = {
  BasicInput: styled.input`
    width: 100%;
    height: 4.8rem;
    border: 0.1rem solid ${theme.colors.gray_400};
    border-radius: 0.8rem;
    padding-left: 1.5rem;
    outline: none;
    font-size: 1.6rem;
    color: ${theme.colors.gray_700};
  `,
}
