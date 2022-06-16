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

export const AlphabetImage = styled.div`
  width: 60%;
  height: 240px;
  display: flex;
  border: 5px solid #2a306a;
  border-radius: 10px;
`;

export const CameraContainer = styled.section``;

export const AlphabetContainer = styled.section`
  width: 80%;
  margin: auto;
  min-width: 1200px;

  border: 1px solid;
  display: flex;
`;
