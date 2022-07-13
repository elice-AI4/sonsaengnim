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
`;

export const ProblemImg = styled.img`
  width: 640px;
  height: 480px;
`;

export const AnswerBox = styled.div`
  width: 640px;
  height: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const QuizBox = styled.div`
  height: 480px;
  width: 1400px;
  display: flex;
  justify-content: space-around;
`;

export const AnswerImg = styled.img`
  width: 800px;
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

export const RecordScore = styled.div`
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
export const ExitButton = styled.button`
  width: 200px;
  height: 50px;
  background-color: crimson;
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

export const TimerStartButton = styled.button`
  width: 200px;
  height: 50px;
  background-color: skyblue;
  font-size: 18px;
  font-weight: bold;
`;
interface StartButtonProp {
  cameraOn: boolean;
}
export const StartButton = styled.div<StartButtonProp>`
  z-index: 10;
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

export const NextButton = styled.button`
  width: 200px;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  background-color: skyblue;
`;

export const StopButton = styled.button`
  width: 200px;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  background-color: pink;
`;

export const RankRegisterButton = styled.button`
  width: 200px;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  background-color: lemonchiffon;
`;

export const TextP = styled.p`
  font-size: 20px;
`;
