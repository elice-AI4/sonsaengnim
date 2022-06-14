import { motion } from "framer-motion";
import styled, { css } from "styled-components";
import alphabetPage from "../../../../src_assets/learning/alphabetPage.jpg";

export const H1 = styled.h1`
  margin-bottom: 1rem;
  @media (max-width: 1270px) {
    /* font-size: 3rem; */
  }
`;

export const TemplateContainer = styled.div`
  background-image: url(${alphabetPage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;

  width: 100vw;
  min-width: 1400px;
  height: 100vh;

  ${({ theme }) => {
    return css`
      transform: translateY(${theme.navbar.height});
    `;
  }}
`;

export const ContentContainer = styled.div`
  width: 65vw;
  min-width: 1000px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
`;

export const Button = styled.button`
  width: 20rem;
  height: 5rem;
  background-color: rgb(70, 51, 255);
  color: white;
  font-size: 2rem;
  font-weight: 600;
`;

export const DescriptionContainer = styled.section`
  width: 80%;
  flex: 0.4;
  padding: 4rem;
  margin-top: 5rem;
`;

export const CardContainer = styled(motion.section)`
  margin: auto;
  width: 80%;

  flex: 0.6;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  padding: 4rem;
`;
