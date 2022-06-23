import React, { useRef, useEffect, useState } from "react";
import {
  Holistic,
  FACEMESH_TESSELATION,
  HAND_CONNECTIONS,
  POSE_CONNECTIONS,
} from "@mediapipe/holistic";
import * as cam from "@mediapipe/camera_utils";
import * as h from "@mediapipe/holistic";
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

const holistic = new Holistic({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
  },
});
holistic.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  enableSegmentation: true,
  smoothSegmentation: true,
  refineFaceLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});

/////////////////////////////////////////////

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
  const [quizNumber, setQuizNumber] = useState<number>(
    Math.floor(Math.random() * 10) + 1
  );
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [cameraOn, setCameraOn] = useState(false);

  let camera = null;

  const closeModal = () => {
    setModal(false);
  };

  const onResults: h.ResultsListener = (results) => {
    console.log("hand", results);
    console.log(results.segmentationMask);
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
    // canvasCtx.drawImage(
    //   results.segmentationMask,
    //   0,
    //   0,
    //   canvasElement.width,
    //   canvasElement.height
    // );
    canvasCtx.globalCompositeOperation = "source-in";
    canvasCtx.fillStyle = "#00FF00";
    canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

    canvasCtx.globalCompositeOperation = "destination-atop";
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );
    canvasCtx.globalCompositeOperation = "source-over";

    drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
      color: "#00FF00",
      lineWidth: 4,
    });
    drawLandmarks(canvasCtx, results.poseLandmarks, {
      color: "#FF0000",
      lineWidth: 2,
    });
    // drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION, {
    //   color: "#C0C0C070",
    //   lineWidth: 1,
    // });
    drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS, {
      color: "#CC0000",
      lineWidth: 5,
    });
    drawLandmarks(canvasCtx, results.leftHandLandmarks, {
      color: "#00FF00",
      lineWidth: 2,
    });
    drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS, {
      color: "#00CC00",
      lineWidth: 5,
    });
    drawLandmarks(canvasCtx, results.rightHandLandmarks, {
      color: "#FF0000",
      lineWidth: 2,
    });
  };

  const nextQuiz = () => {
    setQuizNumber(Math.floor(Math.random() * 10) + 1);
    setModal(false);
  };

  useEffect(() => {
    if (cameraOn) {
      console.log(webcamRef.current);
      holistic.onResults(onResults);
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
            await holistic.send({ image: webcamRef.current?.video });
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
