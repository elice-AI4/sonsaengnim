import React, { useEffect, useState, useRef } from "react";
import {
  ProblemBox,
  ProblemImg,
  AnswerBox,
  QuizBox,
  TimerStartButton,
  StartButton,
  StartTriangle,
} from "./index.style";
import SolveModal from "./SolveModal";
import RecordModal from "./RecordModal";
import MediaPipeWebCam from "../../../MediaPipeWebCam";
import Timer from "../../../Timer";
import Loading from "../../../Loading";
import ReactTooltip from "react-tooltip";
import * as Api from "../../../../api";
import Modal from "../../Modal";
import ai_loading from "../../../../src_assets/modal/ai_loading.jpg";
import grading from "../../../../src_assets/modal/grading.jpg";

import Footer from "../../../Footer";
import { quizBackgroundCopyRights } from "../../../copyRights/copyRights";
import { saveTimeAtom } from "../../../../state";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

export const MAX_COUNT = 10;

export interface Score {
  ans: number;
  cur: number;
}

interface Word {
  word: string;
  wordImageURL: string;
}
const modalStyle = {
  width: "800px",
  height: "500px",
  display: "flex",
  "flex-direction": "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "0",
};

function QuizGame() {
  const navigate = useNavigate();
  const [modal, setModal] = useState<boolean>(false);
  const [rank, setRank] = useState<boolean>(false);
  const [answer, setAnswer] = useState<boolean>(false);
  const [score, setScore] = useState<Score>({ ans: 0, cur: 0 });
  const [finish, setFinish] = useState<boolean>(false);
  const [timer, setTimer] = useState<boolean>(false);
  const [quiz, setQuiz] = useState<Word[]>([]);
  const [quizNumber, setQuizNumber] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [problem, setProblem] = useState<Word>({ word: "", wordImageURL: "" });
  const [timeOver, setTimeOver] = useState<boolean>(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [problemCount, setProblemCount] = useState<number>(0);
  const [one, setOne] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState({
    loadingModal: false,
    waitingAnswerModal: false,
    correctModal: false,
    wrongModal: false,
  });
  const lazyStartTimerId: { current: any } = useRef(null);

  const handleInitial = () => {
    setScore({ ans: 0, cur: 0 });
    setModal(false);
    setRank(false);
    setFinish(false);
    setTimer(false);
  };
  const openModal = () => {
    setIsModalOpen((cur) => {
      return {
        ...cur,
        waitingAnswerModal: true,
      };
    });
  };
  const handleClickButton = () => {
    setIsModalOpen((cur) => {
      return {
        ...cur,
        loadingModal: true,
      };
    });

    lazyStartTimerId.current = setTimeout(() => {
      setCameraOn(true);
      setIsModalOpen((cur) => {
        return {
          ...cur,
          loadingModal: false,
        };
      });
    }, 2000);
  };

  const closeModal = () => {
    setModal(false);
    navigate("/");
  };
  const nextQuiz = () => {
    if (quizNumber === undefined) return;
    setQuizNumber(Math.floor(Math.random() * problemCount));
    setOne(true);
    setModal(false);
  };

  const [socketAnswer, setSocketAnswer] = useState<string[]>();
  const handleSetSocketAnswer = (answer: string[]) => {
    setSocketAnswer(answer);
  };
  useEffect(() => {
    Api.get("quiz").then((res) => {
      setQuiz(res.data);
      setProblemCount(res.data.length);
      setQuizNumber(Math.floor(Math.random() * problemCount));
    });
  }, []);

  const handleTimeOver = () => {
    setModal(true);
    setAnswer(false);
    setFinish(true);
    setTimeOver(true);
  };

  useEffect(() => {
    nextQuiz();
    setProblem(quiz[quizNumber]);
  }, [quiz]);

  useEffect(() => {
    if (!quiz[quizNumber]?.word || !quiz[quizNumber]?.wordImageURL) {
      return;
    }
    setProblem(quiz[quizNumber]);
  }, [quizNumber]);
  useEffect(() => {
    if (socketAnswer === undefined || socketAnswer.length === 0 || timeOver) {
      return;
    }
    if (socketAnswer.includes(problem.word) && one) {
      setOne(false);
      setAnswer(true);
      setScore((cur): Score => {
        const newScore: Score = { ...cur };
        newScore["ans"] += 1;
        newScore["cur"] += 1;
        return newScore;
      });
      setModal(true);
      setSocketAnswer(undefined);
    } else {
      setOne(false);
      setAnswer(false);
      setScore((cur): Score => {
        const newScore: Score = { ...cur };
        newScore["cur"] += 1;
        return newScore;
      });
      setModal(true);
      setSocketAnswer(undefined);
    }
    setIsModalOpen((cur) => {
      return {
        ...cur,
        waitingAnswerModal: false,
      };
    });
  }, [socketAnswer]);

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
      <Modal visible={isModalOpen.loadingModal} style={modalStyle}>
        <img src={ai_loading} alt="ai가 켜지길 기다리는중" />
      </Modal>
      <Modal visible={isModalOpen.waitingAnswerModal} style={modalStyle}>
        {!socketAnswer && <img src={grading} alt="채점중인 로봇" />}
      </Modal>
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
          timeOver={timeOver}
        ></SolveModal>
        {timer ? (
          <Timer finish={finish} handleTimeOver={handleTimeOver}></Timer>
        ) : (
          <TimerStartButton
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
          </TimerStartButton>
        )}
        <QuizBox>
          <ProblemImg src={problem?.wordImageURL}></ProblemImg>
          <AnswerBox>
            <MediaPipeWebCam
              cameraOn={cameraOn}
              handleOffMediapipe={handleOffMediapipe}
              isCameraSettingOn={isCameraSettingOn}
              handleSetSocketAnswer={handleSetSocketAnswer}
              openModal={openModal}
            />
            {timer && (
              <StartButton onClick={handleClickButton} cameraOn={cameraOn}>
                <StartTriangle cameraOn={cameraOn} />
              </StartButton>
            )}
          </AnswerBox>
        </QuizBox>
      </ProblemBox>
      <Footer
        aLinks={quizBackgroundCopyRights.aLinks}
        contents={quizBackgroundCopyRights.contents}
      />
    </>
  );
}

export default QuizGame;
