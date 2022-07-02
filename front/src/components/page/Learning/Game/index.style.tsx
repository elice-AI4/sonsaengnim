import { motion } from "framer-motion";
import styled, { css } from "styled-components";
import backgroundImg from "../../../../src_assets/learning/play/playPage.png";

export const GameContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  overflow: hidden;
`;

export const Sidebar = styled.aside`
  width: 500px;
  min-width: 500px;
  min-height: 100vh;

  background-color: #a8c0ea;
  padding-top: 10rem;
`;

export const ButtonContainer = styled.div`
  width: 60%;
  margin: auto;

  display: flex;
  justify-content: center;

  font-size: 2rem;
  font-weight: 600;
`;
export const Button = styled.div`
  flex: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  height: 4rem;
  cursor: pointer;

  transition: all 0.3s ease-in;
  border-radius: 0.5rem;
  ${({ theme }) => {
    return css`
      &:hover,
      &.target {
        background-color: ${theme.learning.play.darkBlue};
        color: white;
      }
    `;
  }};
`;

export const ImageContainer = styled.div`
  width: 60%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;
  position: relative;
`;

export const ImageRotateContainer = styled.div`
  transform-style: preserve-3d;
  cursor: pointer;
`;

export const NoneDisplay = styled.div`
  width: 440px;
  height: 330px;
  border-radius: 10px;
  margin-bottom: 3rem;
`;

export const FrontImage = styled.div<{ isHandVideo: boolean }>`
  backface-visibility: hidden;
  transform-style: preserve-3d;
  transition: transform ease 500ms;
  transform: rotateY(0deg);
  position: absolute;
  width: 440px;
  height: 330px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 3rem;

  transform: ${({ isHandVideo }) =>
    isHandVideo ? "rotateY(0deg)" : "rotateY(180deg)"};

  ${({ theme }) => {
    return css`
      border: 5px solid ${theme.learning.play.darkBlue};
    `;
  }}
`;

export const BackImage = styled.div<{ isHandVideo: boolean }>`
  backface-visibility: hidden;
  transform-style: preserve-3d;
  transition: transform ease 500ms;
  transform: rotateY(-180deg);
  position: absolute;
  width: 440px;
  height: 330px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 3rem;

  transform: ${(props) =>
    props.isHandVideo ? "rotateY(-180deg)" : "rotateY(0deg)"};

  ${({ theme }) => {
    return css`
      border: 5px solid ${theme.learning.play.darkBlue};
    `;
  }}
`;

export const ImageUnderLine = styled.div`
  width: 7rem;
  height: 0.8rem;
  border-radius: 10px;
  ${({ theme }) => {
    return css`
      background-color: ${theme.learning.play.darkBlue};
    `;
  }}
`;

export const CameraContainer = styled.section`
  width: 100vw;
  min-width: 1000px;
  min-height: 100vh;
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AlphabetContainer = styled.section`
  width: 80%;
  margin: auto;
  min-width: 1200px;

  border: 1px solid;
  display: flex;
`;

export const Moniter = styled.section`
  width: 80rem;
  height: 80rem;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 5rem;

  padding: 4rem;
  ${({ theme }) => {
    return css`
      background-color: ${theme.learning.play.cyan};
    `;
  }}
`;
export const CopyRightsWrapper = styled.div``;

export const Circle = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  margin-right: 2rem;
`;

export const CircleContainer = styled.div`
  display: flex;
`;

export const RedCircle = styled(Circle)`
  background-color: red;
`;

export const GreenCircle = styled(Circle)`
  background-color: #0dac00;
`;
export const BlueCircle = styled(Circle)`
  background-color: #3a86ff;
`;

export const Explain = styled.h1`
  ${({ theme }) => {
    return css`
      color: ${theme.learning.play.darkBlue};
      text-align: center;
      font-size: 2.5rem;
      font-weight: 700;
    `;
  }}
`;

export const HR = styled.div`
  width: 50%;
  height: 0.5rem;
  border-radius: 0.5rem;
  margin: auto;
  ${({ theme }) => {
    return css`
      background-color: ${theme.learning.play.darkBlue};
    `;
  }}
`;

interface StartButtonProp {
  cameraOn: boolean;
}

export const StartButton = styled.div<StartButtonProp>`
  z-index: 9;
  width: 10rem;
  height: 7rem;
  border-radius: 1.5rem;
  position: absolute;

  ${({ theme }) => {
    return css`
      background-color: ${theme.learning.play.darkBlue};
    `;
  }}
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: ${(props) => (props.cameraOn ? "auto" : "pointer")};
  transition: opacity 0.5s ease;
  opacity: ${(props) => (props.cameraOn ? 0 : 1)};
`;

export const TopContainer = styled.div`
  width: 100%;
  flex: 0.2;
  display: flex;
  flex-direction: column;
`;

export const BottomContainer = styled.div`
  flex: 0.8;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface StartTriangleProp {
  cameraOn: boolean;
}

export const StartTriangle = styled.div<StartTriangleProp>`
  border-bottom: 20px solid transparent;
  border-top: 20px solid transparent;
  border-left: 30px solid white;
  transition: opacity 0.5s ease;
  opacity: ${(props) => (props.cameraOn ? 0 : 1)};
`;

export const PointBox = styled(motion.div)`
  width: 15rem;
  height: 15rem;
  background-color: orange;
  position: absolute;
  right: -75px;
  top: -75px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  font-weight: bold;
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  width: 800px;
  background-color: white;
  padding: 5px 0 5px 0;
`;

export const ModalButton = styled.div`
  display: inline-block;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  font-size: 3rem;
  text-align: center;
  color: #3a86ff;
`;
