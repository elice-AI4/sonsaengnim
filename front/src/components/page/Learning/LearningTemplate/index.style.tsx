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
  min-height: 100vh;
`;

export const CopoyRightWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export const ButtonLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 2rem;
  text-decoration: none;
  color: white;
  width: 23rem;
  height: 6rem;
  background-color: rgb(70, 51, 255);
  font-size: 3rem;
  font-weight: 600;
  border-radius: 10px;
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
  margin-bottom: 4rem;
`;
