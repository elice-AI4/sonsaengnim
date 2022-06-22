import React, { useRef, useEffect } from "react";
import { Hands } from "@mediapipe/hands";
import * as h from "@mediapipe/hands";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { StyledWebcam, UserCanvas } from "./Mediapipe.style";

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

interface MediapipeProps {
  cameraOn: boolean;
}

const Mediapipe = ({ cameraOn }: MediapipeProps) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const connect = drawConnectors;
  //   const [cameraOn, setCameraOn] = useState(false);
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

  return (
    <>
      <StyledWebcam
        ref={webcamRef}
        style={
          {
            //   position: "absolute",
            //   marginLeft: "auto",
            //   marginRight: "auto",
            //   textAlign: "center",
            //   zIndex: 9,
          }
        }
      />
      {cameraOn && <UserCanvas ref={canvasRef} />}
    </>
  );
};

export default Mediapipe;
