import styled, { css } from "styled-components";

export const ProblemBox = styled.div<{ quizBackImg: string }>`
  background-image: ${(props) => `url(${props.quizBackImg})`};
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid green;
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

export const RecordBoard = styled.form<{ recordImg: string }>`
  background-image: ${(props) => `url(${props.recordImg})`};
  background-repeat: no-repeat;
  background-size: cover;
  width: 750px;
  height: 550px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const RecordName = styled.input`
  width: 300px;
  height: 40px;
  text-align: center;
  font-size: 20px;
`;

export const RecordScore = styled.body`
  width: 300px;
  height: 40px;
  font-size: 20px;
  text-align: center;
`;

export const RecordButton = styled.button`
  width: 200px;
  height: 50px;
  background-color: skyblue;
  font-size: 18px;
  font-weight: bold;
`;

export const RecordBox = styled.div`
  width: 350px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StartButton = styled.button`
  width: 200px;
  height: 50px;
  background-color: skyblue;
  font-size: 18px;
  font-weight: bold;
`;
