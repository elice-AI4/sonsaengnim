import { createGlobalStyle, css } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    html {
        font-size: 62.5%;
    }

    ${({ theme }) => {
      return css`
        h1 {
          font-size: ${theme.text.largest};
          /* color: ${theme.colors.h1_color}; */
        }
      `;
    }}
`;
