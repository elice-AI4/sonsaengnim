import styled, { css } from "styled-components";

export const NoCamContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  overflow: hidden;
`;

export const Sidebar = styled.aside`
  width: 500px;
  min-width: 500px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #a8c0ea;
`;

export const SidebarScroll = styled.div`
  width: 80%;
  height: 80%;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;

  border-radius: 3rem;
  padding: 3rem;
`;
export const ScrollBox = styled.div`
  width: 100%;
  height: 100%;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: block;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.learning.play.darkBlue};
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: white;
    border-radius: 5px;
  }
`;

export const ScrollItems = styled.div<{ clicked: boolean }>`
  width: 95%;
  height: 10%;
  font-size: 3rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;

  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.learning.play.darkBlue};
    color: white;
  }
  background-color: ${(props) =>
    props.clicked ? props.theme.learning.play.darkBlue : "transparent"};
  color: ${(props) => (props.clicked ? "white" : "black")};

  border: 2px solid ${(props) => props.theme.learning.play.darkBlue};

  font-weight: bold;
`;

export const ButtonContainer = styled.div`
  width: 60%;
  margin: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2rem;
  font-weight: 600;

  flex: 0.2;
`;

export const Button = styled.div<{ isHandVideo?: boolean }>`
  flex: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  height: 5rem;
  cursor: pointer;

  transition: all 0.3s ease-in;
  border-radius: 0.5rem;
  ${({ theme }) => {
    return css`
      &:hover {
        background-color: ${theme.learning.play.darkBlue};
        color: white;
      }
    `;
  }};

  background-color: ${(props) =>
    props.isHandVideo ? props.theme.learning.play.darkBlue : "transparent"};
  color: ${(props) => (props.isHandVideo ? "white" : "black")};
  border: 3px solid ${(props) => props.theme.learning.play.darkBlue};
`;

export const CircleContainer = styled.div`
  display: flex;
  align-self: flex-start;
`;

export const VideoContainer = styled.div`
  flex: 0.8;
`;

export const ImageContainer = styled.div`
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
  width: 560px;
  height: 420px;
  border-radius: 10px;
  margin-bottom: 3rem;
`;

export const FrontImage = styled.div<{ isHandVideo: boolean }>`
  backface-visibility: hidden;
  transform-style: preserve-3d;
  transition: transform ease 500ms;
  transform: rotateY(0deg);
  position: absolute;
  width: 560px;
  height: 420px;
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
  width: 560px;
  height: 420px;
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
