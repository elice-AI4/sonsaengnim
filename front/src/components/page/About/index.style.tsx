import styled, { css } from "styled-components";

export const AboutContainer = styled.div`
  ${({ theme }) => {
    return css`
      transform: translate(300px, ${theme.navbar.height});
    `;
  }};
`;

export const AboutMainPage = styled.div`
  width: 100%;
`;

export const Section = styled.section`
  width: 100%;
  ${({ theme }) => {
    return css`
      height: calc(100vh - ${theme.navbar.height});
    `;
  }}
  display: flex;
  padding: 3rem;
  /* justify-content: start; */
  border: 1px solid;
`;

export const LeftSection = styled.div`
  padding: 2rem;
  flex: 0.3;
  border: 1px solid;
`;
export const RightSection = styled.div`
  padding: 2rem;
  flex: 0.7;
  border: 1px solid;
`;

export const FirstSectionLeft = styled(LeftSection)``;
export const FirstSectionRight = styled(RightSection)``;
