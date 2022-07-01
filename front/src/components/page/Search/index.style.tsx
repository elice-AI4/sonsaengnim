import styled, { css, keyframes } from "styled-components";
import searchPage from "../../../src_assets/search/searchPage.jpg";

const bounceImageWord = keyframes`
    from {
        transform: translateY(10px)
    }
    to {
        transform: translateY(40px)
    }
`;

export const LearningContainer = styled.div`
  position: relative;
  background-image: url(${searchPage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100vw;
  min-height: 100vh;
  min-width: 1000px;

  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const ContentsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  &:nth-child(1) {
    flex: 0.75;
  }
  &:nth-child(2) {
    flex: 0.25;
  }
`;

export const ButtonTitle = styled.h1`
  ${({ theme }) => {
    return css`
      font-size: ${theme.learning.button.title};
      @media (max-width: 1800px) {
        font-size: ${theme.learning.button.mediumTitle};
      }
    `;
  }}
`;

export const WordContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SearchBar = styled.input`
  font-size: 40px;
  padding: 10px;
  margin: 10px;
  background: white;
  border: none;
  border-radius: 3px;
  ::placeholder {
    color: plaevioletred;
  }
`;

export const SearchButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 2rem;
  text-decoration: none;
  color: white;
  width: 23rem;
  height: 6rem;
  background-color: rgb(70, 180, 180);
  font-size: 3rem;
  font-weight: 600;
  border-radius: 10px;
`;

export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0.5;
  margin: auto;
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0.3;
`;

export const ResultContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const VideoContainer = styled.div`
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0.5;
`;

export const H1 = styled.h1`
  margin-bottom: 1rem;
  justify-content: center;
  align-items: center;
`;
