import React, { useState } from "react";
import {
  ProblemBox,
  ProblemImg,
  AnswerBox,
  QuizBox,
  ButtonBox,
  AnswerImg,
} from "./index.style";
import Modal from "../../Modal";
import MediaPipeWebCam from "./../../../MediaPipeWebCam";

const MAX_COUNT = 10;

const ModalStyle = {
  width: "1000px",
  height: "900px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

function QuizGame() {
  const [modal, setModal] = useState<boolean>(false);
  const [answer, setAnswer] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [timer, setTimer] = useState<boolean>(false);
  const [quizNumber, setQuizNumber] = useState<number>(
    Math.floor(Math.random() * 10) + 1
  );

  const [cameraOn, setCameraOn] = useState(false);

  const closeModal = () => {
    setModal(false);
  };

  const nextQuiz = () => {
    setQuizNumber(Math.floor(Math.random() * 10) + 1);
    setModal(false);
  };

  return (
    <ProblemBox>
      <Modal
        visible={modal}
        closeModal={closeModal}
        style={ModalStyle as React.CSSProperties}
      >
        {answer ? (
          <>
            <h1>정답입니다!!!</h1>
            <AnswerImg
              src={`${process.env.PUBLIC_URL}/quizgamepic/answer.png`}
            ></AnswerImg>
          </>
        ) : (
          <>
            <h1>틀렸네?~~</h1>
            <AnswerImg
              src={`${process.env.PUBLIC_URL}/quizgamepic/wrong.jpg`}
            ></AnswerImg>
          </>
        )}
        <h1>{`${score}/10`}</h1>
        <div>
          <button onClick={nextQuiz}>다음 문제 풀기</button>
          <button onClick={closeModal}>포.기.하.기</button>
        </div>
      </Modal>
      <QuizBox>
        <ProblemImg
          src={`${process.env.PUBLIC_URL}/quizgamepic/p${quizNumber}.jpg`}
        ></ProblemImg>
        <AnswerBox>
          <MediaPipeWebCam cameraOn={cameraOn}></MediaPipeWebCam>
        </AnswerBox>
      </QuizBox>
      <ButtonBox>
        <button
          onClick={() => {
            setCameraOn(() => !cameraOn);
          }}
        >
          문제풀기
        </button>
        <button
          onClick={() => {
            setModal(true);
            setAnswer(true);
          }}
        >
          정답
        </button>
        <button
          onClick={() => {
            setModal(true);
            setAnswer(false);
          }}
        >
          오답
        </button>
      </ButtonBox>
    </ProblemBox>
  );
}

export default QuizGame;
