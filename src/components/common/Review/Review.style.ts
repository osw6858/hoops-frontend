import { styled } from 'styled-components'
import { theme } from '../../../styles/theme'

export const S = {
  Wrapper: styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    border-bottom: 2px solid ${theme.colors.gray_300};

    & p {
      font-size: 1.6rem;
      font-weight: 500;
      color: #000;
    }
  `,

  ImgContainer: styled.div`
    display: flex;
    gap: 5px;

    & img {
      width: 30px;
      height: 30px;
      cursor: pointer;
    }
  `,
}