import { createGlobalStyle, css } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    html {
        font-size: 62.5%;
        padding: 0;
        margin: 0;
    }
    body {
      padding: 0;
      margin: 0;
       -ms-overflow-style: none;
    }
    ::-webkit-scrollbar {
      display: none;
    }
    ${({ theme }) => {
      return css`
        h1 {
          font-size: ${theme.text.largest};
        }
      `;
    }}
`;
