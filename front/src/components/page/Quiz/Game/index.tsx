import React, { useRef, useEffect, useState } from "react";
import { Hands } from "@mediapipe/hands";
import * as h from "@mediapipe/hands";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import {
  UserCanvas,
  ProblemBox,
  ProblemImg,
  AnswerBox,
  QuizBox,
  ButtonBox,
  AnswerImg,
} from "./index.style";
import Modal from "../../Modal";

const hands = new Hands({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  },
});

hands.setOptions({
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});

const ModalStyle = {
  width: "1000px",
  height: "900px",
  display: "flex",
  "flex-direction": "column",
  alignItems: "center",
};

function QuizGame() {
  const [modal, setModal] = useState<boolean>(false);
  const [answer, setAnswer] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizNumber, setQuizNumber] = useState<number>(
    Math.floor(Math.random() * 10) + 1
  );
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const connect = drawConnectors;
  const [cameraOn, setCameraOn] = useState(false);
  let camera = null;

  const closeModal = () => {
    setModal(false);
  };

  const onResults: h.ResultsListener = (results) => {
    console.log(results);
    if (!canvasRef.current || !webcamRef.current?.video) {
      return;
    }

    canvasRef.current.width = webcamRef.current?.video.videoWidth;
    canvasRef.current.height = webcamRef.current?.video.videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    if (!canvasCtx) {
      return;
    }

    canvasCtx.save();

    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        connect(canvasCtx, landmarks, h.HAND_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 5,
        });
        drawLandmarks(canvasCtx, landmarks, {
          color: "#FF0000",
          lineWidth: 2,
        });
      }
    }
  };

  const nextQuiz = () => {
    setQuizNumber(Math.floor(Math.random() * 10) + 1);
    setModal(false);
  };

  useEffect(() => {
    if (cameraOn) {
      hands.onResults(onResults);
      if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null
      ) {
        if (!webcamRef.current?.video) {
          return;
        }

        camera = new cam.Camera(webcamRef.current?.video, {
          onFrame: async () => {
            if (!webcamRef.current?.video) {
              return;
            }
            await hands.send({ image: webcamRef.current?.video });
          },
          width: 640,
          height: 480,
        });
        camera.start();
      }
    }
  }, [cameraOn]);
  console.log(process.env.PUBLIC_URL);
  return (
    <ProblemBox>
      <Modal visible={modal} closeModal={closeModal} style={ModalStyle}>
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
          <Webcam
            ref={webcamRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
              zIndex: 9,
              width: 640,
              height: 480,
            }}
          />
          {cameraOn && <UserCanvas ref={canvasRef} />}
        </AnswerBox>
      </QuizBox>
      <ButtonBox>
        <button
          onClick={() => {
            setCameraOn(() => !cameraOn);
            camera = null;
          }}
        >
          녹화시작
        </button>
        <button
          onClick={() => {
            setModal(true);
            setAnswer(true);
            camera = null;
          }}
        >
          정답
        </button>
        <button
          onClick={() => {
            setModal(true);
            setAnswer(false);
            camera = null;
          }}
        >
          오답
        </button>
      </ButtonBox>
    </ProblemBox>
  );
}

export default QuizGame;
