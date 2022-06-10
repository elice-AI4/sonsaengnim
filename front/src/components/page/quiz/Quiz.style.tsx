import styled, { css, keyframes } from "styled-components";

const bounceImageA = keyframes`
    from {
        transform: translate(-30rem, -11rem) rotate(-30deg);
    }
    to {
        transform: translate(-30rem, -14rem) rotate(-30deg);
    }
`;

const bounceImageE = keyframes`
    from {
        transform: translate(-4rem, -23rem) rotate(-10deg);
    }
    to {
        transform: translate(-4rem, -20rem) rotate(-10deg);
    }
`;

const bounceImageH = keyframes`
    from {
        transform: translate(20rem, -15rem) rotate(15deg);

    }
    to {
        transform: translate(20rem, -18rem) rotate(15deg);


    }
`;

const bounceImageJ = keyframes`
    from {
        transform: translate(-30rem, 14rem) rotate(30deg);
    }
    to {
        transform: translate(-30rem, 17rem) rotate(30deg);
    }
`;

const bounceImageS = keyframes`
    from {
        transform: translate(-10rem, 20rem) rotate(-30deg);
    }
    to {
        transform: translate(-10rem, 23rem) rotate(-30deg);
    }
`;

const bounceImageX = keyframes`
    from {
        transform: translate(15rem, 24rem) rotate(30deg);
    }
    to {
        transform: translate(15rem, 21rem) rotate(30deg);
    }
`;

const bounceImageY = keyframes`
    from {
        transform: translate(30rem, 4rem) rotate(10deg);
    }
    to {
        transform: translate(30rem, 7rem) rotate(10deg);
    }
`;

export const QuizContainer = styled.div`
  max-width: 1200px;
  min-width: 860px;

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

export const Button = styled.button`
  width: 20rem;
  height: 5rem;

  background-color: orange;
  /* color: whitesmoke; */

  border: none;
  border-radius: 5px;

  cursor: pointer;

  font-size: 2rem;
  font-weight: 600;

  margin-top: 2rem;

  &:hover {
    opacity: 0.7;
  }
`;

export const QuizeImg = styled.img`
  transition: all 0.5s ease-in-out;
`;

export const ImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonCotainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    ${QuizeImg} {
      transform: scale(1.1);
    }
  }
`;

export const AlphabetImg = styled.img`
  position: absolute;
`;

export const AImg = styled(AlphabetImg)`
  animation: ${bounceImageA} 1s linear alternate infinite;
`;

export const EImg = styled(AlphabetImg)`
  animation: ${bounceImageE} 1s linear alternate infinite;
`;

export const HImg = styled(AlphabetImg)`
  animation: ${bounceImageH} 1s linear alternate infinite;
`;

export const JImg = styled(AlphabetImg)`
  animation: ${bounceImageJ} 1s linear alternate infinite;
`;

export const SImg = styled(AlphabetImg)`
  animation: ${bounceImageS} 1s linear alternate infinite;
`;

export const XImg = styled(AlphabetImg)`
  animation: ${bounceImageX} 1s linear alternate infinite;
`;

export const YImg = styled(AlphabetImg)`
  animation: ${bounceImageY} 1s linear alternate infinite;
`;
