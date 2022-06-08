import styled, { keyframes } from "styled-components";

const bounceImageA = keyframes`
    from {
        transform: translateY(10px) rotateZ(-45deg)
    }    
    to {
        transform: translateY(40px) rotateZ(-45deg)
    }
`;

const bounceImageB = keyframes`
    from {
        transform: translateY(0px) rotateZ(10deg)
    }
    to {
        transform: translateY(35px) rotateZ(10deg)
    }
`;

const bounceImageC = keyframes`
    from {
        transform: translateY(10px) rotateZ(40deg)
    }
    to {
        transform: translateY(40px) rotateZ(40deg)
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

export const LearningContainer = styled.section`
  max-width: 1200px;
  height: 100vh;
  max-height: 700px;

  margin: auto;
  border: 1px solid black;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContentsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AlphabetButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #e2d2d2;

  margin: 4rem;

  cursor: pointer;

  border-radius: 20px;

  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

  &:hover {
    box-shadow: rgb(60, 64, 67, 0.3) 3px 3px 6px 0px inset,
      rgba(60, 64, 67, 0.15) -3px -3px 6px 1px inset;
  }
`;

export const AlphabetContainer = styled.div`
  width: 380px;
  height: 150px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageA = styled.img`
  animation: ${bounceImageA} 1s linear alternate infinite;
`;

export const ImageB = styled.img`
  animation: ${bounceImageB} 1s linear alternate infinite;
`;

export const ImageC = styled.img`
  animation: ${bounceImageC} 1s linear alternate infinite;
`;

export const WordButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #bfc8d7;

  cursor: pointer;

  margin: 4rem;

  border-radius: 20px;

  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

  &:hover {
    box-shadow: rgb(60, 64, 67, 0.3) 3px 3px 6px 0px inset,
      rgba(60, 64, 67, 0.15) -3px -3px 6px 1px inset;
  }
`;

export const WordContainer = styled.div`
  width: 380px;

  height: 150px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageWord = styled.img`
  animation: ${bounceImageWord} 1s linear alternate infinite;
`;
