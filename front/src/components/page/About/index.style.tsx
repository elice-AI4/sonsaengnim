import { Link } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";

const sectionAnimation = keyframes`
 0% {
  opacity: 0;
  transform: translateY(-20px);
 }
 20% {
  opacity: 0;
 }
 to {
  opacity: 1;
  transform: translateY(0);
 }
`;

export const AboutContainer = styled.div`
  position: relative;
  transform: translateX(150px);
  width: calc(100vw - 150px);
  overflow-x: scroll;
`;

export const AboutMainPage = styled.div`
  margin: 0 auto 0 auto;
  min-width: 1000px;
`;

export const Description = styled.p`
  font-size: 3rem;
  font-weight: bold;
  margin: 1rem;
`;

export const ImpactWord = styled.span`
  color: #ff4500;
  font-size: 120%;
  position: relative;
`;

export const Section = styled.section`
  display: flex;
  padding: 3rem;
  width: 1400px;
  margin: auto;
  &.target {
    animation: 1.8s ${sectionAnimation};
  }
  &.non-target {
    opacity: 0;
  }

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
  flex: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const RightSection = styled.div`
  padding: 2rem;
  flex: 0.5;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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
  align-items: flex-start;
`;

export const ThirdSectionLeft = styled(LeftSection)`
  margin: auto 0 auto 0;
`;
export const ThirdSectionRight = styled(RightSection)`
  margin: auto 0 auto 0;
`;

// const startLinkAnimation = keyframes`
//   from {
//     font-size: 100%;
//   }
//   to {
//     font-size: 110%;
//   }
// `;

export const StartLink = styled(Link)`
  text-decoration: none;
`;
