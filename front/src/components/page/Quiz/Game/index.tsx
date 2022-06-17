import React, { useRef, useEffect, useState } from "react";
import { Hands } from "@mediapipe/hands";
import * as h from "@mediapipe/hands";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { UserCanvas, ProblemBox, ProblemImg, AnswerBox } from "./index.style";
import Modal from "../../Modal";
import p1 from "./gamepic/p2.jpg";

function QuizGame() {
  const [modal, setModal] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const webcamRef2 = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const connect = drawConnectors;
  const [a, setA] = useState(false);
  let camera = null;

  const closeModal = () => {
    setModal(false);
  };

  const onResults: h.ResultsListener = (results) => {
    // console.log(results);
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
  useEffect(() => {
    if (a) {
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
  }, [a]);

  return (
    <ProblemBox>
      <Modal visible={modal} closeModal={closeModal} style={{ color: "red" }}>
        <h1>hello</h1>
      </Modal>
      <ProblemImg src={p1}></ProblemImg>
      <AnswerBox>
        <Webcam
          ref={a ? webcamRef : webcamRef2}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
            border: "3px solid blue",
          }}
        />
        <UserCanvas ref={canvasRef} />
      </AnswerBox>
      <button
        onClick={() => {
          setA(() => !a);
          camera = null;
        }}
      >
        클릭
      </button>
      <button
        onClick={() => {
          setModal(true);
          camera = null;
        }}
      >
        모달
      </button>
    </ProblemBox>
  );
}

export default QuizGame;
