import styled, { css } from "styled-components";

export const UserCanvas = styled.canvas`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  z-index: 9;
  width: 640px;
  height: 480px;
  border: 1px solid red;
`;

export const ProblemBox = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid yellow;
`;

export const ProblemImg = styled.img`
  width: 640px;
  height: 480px;
`;

export const AnswerBox = styled.div`
  width: 640px;
  height: 480px;
`;
