import styled, { css } from "styled-components";
import backgroundImg from "../../../../src_assets/learning/play/playPage.png";

export const GameContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
`;

export const Sidebar = styled.aside`
  width: 400px;
  min-height: 100vh;

  background-color: #a8c0ea;
  padding-top: 10rem;
`;

export const ButtonContainer = styled.div`
  width: 60%;
  margin: auto;

  display: flex;

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
      &:hover {
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
`;

export const Image = styled.div`
  height: 240px;
  display: flex;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 3rem;

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
  width: calc(100vw - 400px);
  min-height: 100vh;
  background-image: url(${backgroundImg});
`;

export const AlphabetContainer = styled.section`
  width: 80%;
  margin: auto;
  min-width: 1200px;

  border: 1px solid;
  display: flex;
`;
