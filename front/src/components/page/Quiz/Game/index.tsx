import React, { useEffect, useState } from "react";
import {
  ProblemBox,
  ProblemImg,
  AnswerBox,
  QuizBox,
  ButtonBox,
  StartButton,
} from "./index.style";
import Modal from "../../Modal";
import SolveModal from "./SolveModal";
import RecordModal from "./RecordModal";
import { io, Socket } from "socket.io-client";
import MediaPipeWebCam from "./../../../MediaPipeWebCam";
import Timer from "../../../Timer";
import Loading from "../../../Loading";
import ReactTooltip from "react-tooltip";

export const MAX_COUNT = 1;
interface TestData {
  x: number;
  y: number;
  z: number;
  visibility: undefined;
}
export interface Score {
  ans: number;
  cur: number;
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
  const [rank, setRank] = useState<boolean>(false);
  const [answer, setAnswer] = useState<boolean>(false);
  const [score, setScore] = useState<Score>({ ans: 0, cur: 0 });
  const [finish, setFinish] = useState<boolean>(false);
  const [timer, setTimer] = useState<boolean>(false);
  const [quizNumber, setQuizNumber] = useState<number>(
    Math.floor(Math.random() * 10) + 1
  );
  const [isLoading, setIsLoading] = useState(true);

  const [cameraOn, setCameraOn] = useState(false);

  const [socket, setSocket] =
    useState<Socket<ServerToClientEvents, ClientToServerEvents>>();
  const handleInitial = () => {
    setScore({ ans: 0, cur: 0 });
    setModal(false);
    setRank(false);
    setFinish(false);
  };
  const closeModal = () => {
    setModal(false);
  };
  const closeRecord = () => {
    setRank(false);
  };

  const nextQuiz = () => {
    setQuizNumber(Math.floor(Math.random() * 10) + 1);
    setModal(false);
  };

  const [socketAnswer, setSocketAnswer] = useState<ServerToClientData>();

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
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

  const isCameraSettingOn = () => {
    if (isLoading === false) {
      return;
    }
    setIsLoading(false);
  };
  const handleOffMediapipe = () => {
    setCameraOn(false);
  };

  useEffect(() => {
    if (score.cur === MAX_COUNT) {
      setFinish(true);
    }
  });

  const MoveRecord = () => {
    setModal(false);
    setRank(true);
  };

  return (
    <>
      {isLoading && <Loading />}
      <ProblemBox
        quizBackImg={`${process.env.PUBLIC_URL}/quizgamepic/quizback3.jpg`}
      >
        <RecordModal
          rank={rank}
          score={score}
          handleInitial={handleInitial}
        ></RecordModal>
        <SolveModal
          modal={modal}
          closeModal={closeModal}
          answer={answer}
          finish={finish}
          score={score}
          nextQuiz={nextQuiz}
          MoveRecord={MoveRecord}
        ></SolveModal>
        {timer ? (
          <Timer finish={finish}></Timer>
        ) : (
          <StartButton
            onClick={() => setTimer(true)}
            data-tip="quiz-game"
            data-for="quiz-game"
          >
            게임 시작
            <ReactTooltip id="quiz-game" place="bottom">
              <video autoPlay width="300" muted loop>
                <source
                  src="http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191101/633265/MOV000256711_700X466.mp4"
                  type="video/mp4"
                />
              </video>
              <p style={{ textAlign: "right" }}>출처: 국립국어원</p>
            </ReactTooltip>
          </StartButton>
        )}
        <QuizBox>
          <ProblemImg
            src={`${process.env.PUBLIC_URL}/quizgamepic/p${quizNumber}.jpg`}
          ></ProblemImg>
          <AnswerBox>
            <MediaPipeWebCam
              cameraOn={cameraOn}
              handleOffMediapipe={handleOffMediapipe}
              isCameraSettingOn={isCameraSettingOn}
            />
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
              setScore((cur): Score => {
                const newScore: Score = { ...cur };
                newScore["ans"] += 1;
                newScore["cur"] += 1;
                console.log(newScore);
                return newScore;
              });
            }}
          >
            정답
          </button>
          <button
            onClick={() => {
              setModal(true);
              setAnswer(false);
              setScore((cur): Score => {
                const newScore: Score = { ...cur };
                newScore["cur"] += 1;
                return newScore;
              });
            }}
          >
            오답
          </button>
          {/* <button onClick={() => socket?.emit("coordinate", { testData })}>
            목업데이터 보내보기
          </button> */}
          {/* <h1>{socketAnswer && socketAnswer.data}</h1> */}
        </ButtonBox>
      </ProblemBox>
    </>
  );
}

export default QuizGame;
