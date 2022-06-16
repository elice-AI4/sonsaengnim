import styled from "styled-components";

export const GameContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

export const Sidebar = styled.aside`
  width: 400px;
  height: 100vh;
  background-color: #a8c0ea;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const ImageContainer = styled.div`
  width: 60%;

  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Image = styled.div`
  height: 240px;
  display: flex;
  border: 5px solid #2a306a;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 3rem;
`;

export const ImageUnderLine = styled.div`
  width: 7rem;
  height: 0.8rem;
  border-radius: 10px;
  background-color: #2a306a;
`

export const CameraContainer = styled.section``;

export const AlphabetContainer = styled.section`
  width: 80%;
  margin: auto;
  min-width: 1200px;

  border: 1px solid;
  display: flex;
`;
