import styled, { css } from "styled-components";

export const AboutContainer = styled.div`
  transform: translateX(300px);
  width: calc(100vw - 300px);
  min-width: 1500px;
`;

export const AboutMainPage = styled.div`
  width: 100%;
`;

export const Section = styled.section`
  display: flex;
  padding: 3rem;

  &:first-child {
    ${({ theme }) => {
      return css`
        height: calc(100vh - ${theme.navbar.height});
      `;
    }}
  }
  &:not(first-child) {
    height: 100vh;
  }
`;

export const LeftSection = styled.div`
  padding: 2rem;
  flex: 0.4;
  /* border: 1px solid; */
`;
export const RightSection = styled.div`
  padding: 2rem;
  flex: 0.6;
  /* border: 1px solid; */
`;

export const Img = styled.img`
  width: 100%;
`;

export const FirstImg = styled(Img)``;
export const SecondImg = styled(Img)``;
export const ThirdImg = styled(Img)``;

export const FirstSectionLeft = styled(LeftSection)`
  margin: auto 0 auto 0;
`;
export const FirstSectionRight = styled(RightSection)`
  margin: auto 0 auto 0;
`;

export const SecondSectionLeft = styled(LeftSection)`
  margin: auto 0 auto 0;
`;
export const SecondSectionRight = styled(RightSection)`
  margin: auto 0 auto 0;
`;

export const ThirdSectionLeft = styled(LeftSection)`
  margin: auto 0 auto 0;
`;
export const ThirdSectionRight = styled(RightSection)`
  margin: auto 0 auto 0;
`;
