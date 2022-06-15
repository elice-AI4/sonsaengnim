import styled, { css } from "styled-components";

export const AboutContainer = styled.div`
  max-width: 1200px;
  margin: auto;
  border: 1px solid;
  ${({ theme }) => {
    return css`
      transform: translateY(${theme.navbar.height});
    `;
  }};
`;

export const AboutMainPage = styled.div`
  width: 100%;
`;
