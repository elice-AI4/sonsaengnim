import styled, { css } from "styled-components";

export const ProblemBox = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export const ProblemImg = styled.img`
  width: 640px;
  height: 480px;
`;

export const AnswerBox = styled.div`
  width: 640px;
  height: 480px;
`;

export const QuizBox = styled.div`
  border: 1px solid red;
  height: 480px;
  width: 1400px;
  display: flex;
  justify-content: space-around;
`;

export const ButtonBox = styled.div`
  border: 1px solid blue;
  display: flex;
`;

export const AnswerImg = styled.img`
  width: 500px;
  height: 500px;
`;
