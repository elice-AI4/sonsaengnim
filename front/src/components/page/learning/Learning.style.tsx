import styled, { css, keyframes } from "styled-components";

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
        transform: translateY(30px) rotateZ(40deg)
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
interface CircleProps {
  clientX: string;
  clientY: string;
  isClick: boolean;
}
const circleImage = (props: CircleProps) => keyframes`
  from {    
    transform: translate(calc(${props.clientX}px - 50px), calc(${props.clientY}px - 50px)) scale(1.0)
  }
  to {
    transform: translate(calc(${props.clientX}px - 50px), calc(${props.clientY}px - 50px)) scale(30.0)
  }
`;

export const LearningContainer = styled.div`
  max-width: 1200px;
  height: 100vh;
  max-height: 700px;

  margin: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => {
    return css`
      transform: translateY(${theme.navbar.height});
    `;
  }}
`;

export const ContentsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AlphabetButton = styled.section`
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

  ${({ theme }) => {
    return css`
      width: ${theme.learning.button.width};
      height: ${theme.learning.button.height};
    `;
  }}
`;

export const AlphabetContainer = styled.div`
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

export const WordButton = styled.section`
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

  ${({ theme }) => {
    return css`
      width: ${theme.learning.button.width};
      height: ${theme.learning.button.height};
    `;
  }}
`;

export const ButtonTitle = styled.h1`
  ${({ theme }) => {
    return css`
      font-size: ${theme.learning.button.title};
    `;
  }}
`;

export const WordContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageWord = styled.img`
  animation: ${bounceImageWord} 1s linear alternate infinite;
`;

export const Circle = styled.div<CircleProps>`
  z-index: 998;
  position: absolute;
  transform: translate(0, 0);
  left: 0;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background-color: #e2d2d2;
  opacity: 0;

  animation: ${(props) =>
    props.isClick &&
    css`
      ${circleImage(props)} 0.5s linear alternate infinite;
      opacity: 1;
    `};
`;
