import React, { useRef, useEffect, useState } from "react";
import { Hands } from "@mediapipe/hands";
import * as h from "@mediapipe/hands";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { UserCanvas, ProblemBox, ProblemImg, AnswerBox } from "./index.style";
import p1 from "./gamepic/p2.jpg";

function Game() {
  const webcamRef = useRef<Webcam>(null);
  const webcamRef2 = useRef<Webcam>(null);
  console.log(webcamRef);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const connect = drawConnectors;
  const [a, setA] = useState(false);
  let camera = null;
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
  useEffect(() => {
    console.log(a);

    console.log("12312312312313", a);
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
    } else {
      if (!webcamRef2.current?.video) {
        return;
      }
      camera = new cam.Camera(webcamRef2.current?.video, {
        onFrame: async () => {
          if (!webcamRef2.current?.video) {
            return;
          }
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, [a]);
  console.log(webcamRef);
  console.log(webcamRef2);

  return (
    <ProblemBox>
      <ProblemImg src={p1}></ProblemImg>
      <AnswerBox>
        {a ? (
          <>
            <h1>기록 시작</h1>
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
                border: "3px solid blue",
              }}
            />
          </>
        ) : (
          <>
            <h1>그냥 카메라</h1>
            <Webcam
              ref={webcamRef2}
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
          </>
        )}
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
    </ProblemBox>
  );
}

export default Game;
