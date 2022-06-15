import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import alphabetPage from "../../../../src_assets/learning/alphabetPage.jpg";

export const H1 = styled.h1`
  margin-bottom: 1rem;
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
  min-width: 1100px;

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

export const ButtonLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

export const DescriptionContainer = styled.section`
  width: 80%;
  flex: 0.4;
  padding: 4rem;
  margin-top: 5rem;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: auto;
  width: 80%;
  max-width: 1000px;
  flex: 0.6;
  padding: 4rem;
`;

export const MotionDiv = styled.div``;
