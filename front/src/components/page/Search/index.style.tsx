import styled, { css, keyframes } from "styled-components";
import learningPage from "../../../src_assets/learning/learningPage.jpg";

const bounceImageA = keyframes`
    from {
        transform: translateY(5px) rotateZ(-45deg)
    }    
    to {
        transform: translateY(30px) rotateZ(-45deg)
    }
`;

const bounceImageB = keyframes`
    from {
        transform: translateY(-10px) rotateZ(10deg)
    }
    to {
        transform: translateY(25px) rotateZ(10deg)
    }
`;

const bounceImageC = keyframes`
    from {
        transform: translateY(5px) rotateZ(40deg)
    }
    to {
        transform:translateY(30px) rotateZ(40deg)
    }
`;

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
  background-image: url(${learningPage});
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

export const ButtonSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 2rem;

  cursor: pointer;

  border-radius: 20px;

  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

  &:hover {
    box-shadow: rgb(60, 64, 67, 0.3) 3px 3px 6px 0px inset,
      rgba(60, 64, 67, 0.15) -3px -3px 6px 1px inset;
  }

  ${({ theme }) => {
    return css`
      width: ${theme.learning.button.width};
      height: ${theme.learning.button.height};

      @media (max-width: 1800px) {
        width: ${theme.learning.button.mediumWidth};
        height: ${theme.learning.button.mediumHeight};
      }
      @media (max-width: 1200px) {
        width: ${theme.learning.button.smallWidth};
        height: ${theme.learning.button.smallHeight};
      }
    `;
  }}
`;

export const AlphabetButton = styled(ButtonSection)`
  background-color: #e2d2d2;
`;

export const AlphabetContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.img`
  width: 10rem;
  height: 10rem;
  @media (max-width: 1800px) {
    width: 8rem;
    height: 8rem;
  }
  @media (max-width: 1200px) {
    width: 7rem;
    height: 8rem;
  }
`;

export const ImageA = styled(Image)`
  animation: ${bounceImageA} 1s linear alternate infinite;
`;

export const ImageB = styled(Image)`
  animation: ${bounceImageB} 1s linear alternate infinite;
`;

export const ImageC = styled(Image)`
  animation: ${bounceImageC} 1s linear alternate infinite;
`;

export const WordButton = styled(ButtonSection)`
  background-color: #bfc8d7;
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

export const ImageWord = styled(Image)`
  width: 35rem;
  animation: ${bounceImageWord} 1s linear alternate infinite;
`;

// ///////////////////////////
export const SearchBar = styled.input`
  font-size: 40px;
  padding: 10px;
  margin: 10px;
  background: papayawhip;
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
  flex-wrap: wrap;
  justify-content: space-between;
  margin: auto;
  width: 80%;
  max-width: 1000px;
  flex: 0.6;
  padding: 4rem;
  margin-bottom: 4rem;
`;
