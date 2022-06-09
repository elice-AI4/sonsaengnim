import React from "react";
import ReactDOM from "react-dom";
import { Hands } from "@mediapipe/hands";
import * as HandsMP from "@mediapipe/hands";
import * as cam from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import Webcam from "react-webcam";
import { useRef, useEffect, useState } from "react";
import translator from "../utils/translator";
import predictor from "../utils/predictor";
import loadData from "../utils/loadData";

function Webcamdisplay() {
  const webcamRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);
  const [data, setData] = useState<any>(["안녕"]);

  const connect = drawConnectors;
  const landmark = drawLandmarks;

  async function onResults(results: any) {
    canvasRef.current.width = webcamRef.current.video.videoWidth;
    canvasRef.current.height = webcamRef.current.video.videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height,
    );
    if (results.multiHandLandmarks) {
      /** landmark를 통해 알파벳 예측하는 함수 사용 부분
       * const predicted = translator(results.multiHandLandmarks)
       */
      for (const landmarks of results.multiHandLandmarks) {
        connect(canvasCtx, landmarks, HandsMP.HAND_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 5,
        });
        landmark(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 2 });
      }
      const preprocessed = translator(results.multiHandLandmarks);
      let predicted = "undefined";
      if (preprocessed !== undefined) {
        predicted = predictor(data, preprocessed);
      }
      console.log(predicted);
    }
    canvasCtx.restore();
  }
  async function dataOnClick() {
    loadData().then(data => setData(data));
  }
  useEffect(() => {
    //loadData().then((data) => setData(data));
    const hands = new Hands({
      locateFile: file => {
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
      const camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await hands.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  });

  return (
    <div className="App">
      <div>
        <br></br>
        <button onClick={dataOnClick}>Load Data Button</button>
        <br></br>
      </div>
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginRight: "auto",
          marginLeft: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginRight: "auto",
          marginLeft: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
        }}
      ></canvas>
    </div>
  );
}

export default Webcamdisplay;
