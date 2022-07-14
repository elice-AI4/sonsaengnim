import React from "react";
import { Score, MAX_COUNT } from "./index";
import {
  AnswerImg,
  NextButton,
  StopButton,
  TextP,
  RankRegisterButton,
  ExitButton,
} from "./index.style";
import Modal from "../../Modal";
import { useNavigate } from "react-router-dom";

const ModalStyle = {
  width: "1000px",
  height: "900px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

interface SolveProps {
  modal: boolean;
  closeModal(): void;
  answer: boolean;
  finish: boolean;
  score: Score;
  nextQuiz(): void;
  MoveRecord(): void;
  timeOver: boolean;
}

function SolveModal({
  modal,
  closeModal,
  answer,
  finish,
  score,
  nextQuiz,
  MoveRecord,
  timeOver,
}: SolveProps) {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate("/");
  };

  return (
    <Modal visible={modal} style={ModalStyle as React.CSSProperties}>
      {answer ? (
        <AnswerImg
          src={`${process.env.PUBLIC_URL}/quizgamepic/answer1.jpg`}
        ></AnswerImg>
      ) : (
        <AnswerImg
          src={`${process.env.PUBLIC_URL}/quizgamepic/wrong.jpg`}
        ></AnswerImg>
      )}
      <h1>{`맞힌 개수 ${score.ans}/${MAX_COUNT}`}</h1>
      {finish ? (
        <div>
          <RankRegisterButton onClick={MoveRecord}>
            순위 등록하러가기
          </RankRegisterButton>
          <ExitButton onClick={handleExit}>나가기</ExitButton>
        </div>
      ) : (
        <div>
          <NextButton onClick={nextQuiz}>다음 문제 풀기</NextButton>
          <StopButton onClick={closeModal}>그만하기</StopButton>
        </div>
      )}
      <TextP>{`남은 문제 : ${
        MAX_COUNT - score.cur >= 0 && MAX_COUNT - score.cur
      }`}</TextP>
      {timeOver && <TextP>시간 초과</TextP>}
    </Modal>
  );
}

export default SolveModal;
