import React, { useEffect, useState } from "react";
import {
  ProblemBox,
  ProblemImg,
  AnswerBox,
  QuizBox,
  ButtonBox,
  AnswerImg,
} from "./index.style";
import Modal from "../../Modal";
import { io, Socket } from "socket.io-client";
import MediaPipeWebCam from "./../../../MediaPipeWebCam";

const MAX_COUNT = 10;
interface TestData {
  x: number;
  y: number;
  z: number;
  visibility: undefined;
}

interface ServerToClientData {
  data: number;
}

interface ServerToClientEvents {
  answer: (data: ServerToClientData) => void;
}
interface ClientToServerEvents {
  coordinate: (hands: { testData: TestData[] }) => void;
}

const testData: TestData[] = [
  {
    x: Math.random(),
    y: Math.random(),
    z: Math.random(),
    visibility: undefined,
  },
  {
    x: Math.random(),
    y: Math.random(),
    z: Math.random(),
    visibility: undefined,
  },
  {
    x: Math.random(),
    y: Math.random(),
    z: Math.random(),
    visibility: undefined,
  },
];
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

  const [socket, setSocket] =
    useState<Socket<ServerToClientEvents, ClientToServerEvents>>();

  const closeModal = () => {
    setModal(false);
  };

  const nextQuiz = () => {
    setQuizNumber(Math.floor(Math.random() * 10) + 1);
    setModal(false);
  };

  const [socketAnswer, setSocketAnswer] = useState<ServerToClientData>();

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
    // const socket: Socket<ServerToClientEvents, ClientToServerEvents> =

    return () => {
      socket?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      const func = (data: ServerToClientData) => {
        setSocketAnswer(data);
      };
      socket.on("answer", func);

      return () => {
        socket.off("answer", func);
      };
    }
  }, [socket]);

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
          <MediaPipeWebCam cameraOn={cameraOn} />
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
        <button onClick={() => socket?.emit("coordinate", { testData })}>
          목업데이터 보내보기
        </button>
        <h1>{socketAnswer && socketAnswer.data}</h1>
      </ButtonBox>
    </ProblemBox>
  );
}

export default QuizGame;
