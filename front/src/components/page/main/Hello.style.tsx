import styled, { css } from "styled-components";

export const HelloWorld = styled.h1``;

export const HelloLocal = styled.h2`
  ${({ theme }) => {
    return css`
      color: ${theme.colors.main};
    `;
  }}
`;

export const LocalStyled = styled.h3`
  color: blue;
`;
