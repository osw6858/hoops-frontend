import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const CS = {
  Link: styled(Link)<{ $isBlock?: boolean }>`
    text-decoration-line: none;
    color: ${({ theme }) => theme.colors.black};
    cursor: ${(props) => (props.$isBlock ? 'not-allowed' : 'pointer')};
  `,
  DefaultContainer: styled.div`
    margin: 0 auto;
    padding-top: 6rem;
    padding-bottom: 3rem;
    background-color: inherit;
    height: fit-content;
    max-width: ${(props) => props.theme.width.default};
    min-height: ${(props) => props.theme.height.screen};
  `,
  LargeContainer: styled.div`
    margin: 0 auto;
    padding-top: 6rem;
    padding-bottom: 3rem;
    background-color: inherit;
    height: fit-content;
    max-width: ${(props) => props.theme.width.large};
    min-height: ${(props) => props.theme.height.screen};
  `,
  ValidWrapper: styled.div`
    display: flex;
    & > span {
      font-size: 1.2rem;
      color: red;
      margin-left: 0.6rem;
    }
  `,
  InputLabel: styled.label`
    font-size: 1.4rem;
    padding-bottom: 1rem;
    color: ${(props) => props.theme.colors.gray_500};
  `,
}
