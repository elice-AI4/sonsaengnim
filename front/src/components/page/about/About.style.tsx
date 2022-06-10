import styled, { css } from "styled-components";

export const AboutContainer = styled.div`
  ${({ theme }) => {
    return css`
      transform: translateY(${theme.navbar.height});
    `;
  }}
`;
