import React, { useRef, useEffect, useState } from "react";
import {
  Holistic,
  HAND_CONNECTIONS,
  POSE_CONNECTIONS,
} from "@mediapipe/holistic";
import * as cam from "@mediapipe/camera_utils";
import * as h from "@mediapipe/holistic";
import Webcam from "react-webcam";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { UserCanvas } from "./index.style";
import { Socket, io } from "socket.io-client";
import { interval, Subject, throttle } from "rxjs";

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

interface WebCamProps {
  cameraOn: boolean;
}

interface MediapipeDataProps {
  poseLandmarks: h.NormalizedLandmarkList;
  leftHandLandmarks: h.NormalizedLandmarkList;
  rightHandLandmarks: h.NormalizedLandmarkList;
}

interface ServerToClientData {
  data: boolean;
}

interface ServerToClientEvents {
  answer: (data: ServerToClientData) => void;
}
interface ClientToServerEvents {
  coordinate: (hands: MediapipeDataProps[]) => void;
}

function MediaPipeWebCam({ cameraOn }: WebCamProps) {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [subject, setSubject] = useState<Subject<MediapipeDataProps>>();
  const [socket, setSocket] =
    useState<Socket<ServerToClientEvents, ClientToServerEvents>>();
  const [socketAnswer, setSocketAnswer] = useState<ServerToClientData>();
  const [mediapipeData, setMediapipeData] = useState<MediapipeDataProps[]>([]);

  const onResults: h.ResultsListener = (results) => {
    if (!canvasRef.current || !webcamRef.current?.video || !cameraOn) {
      return;
    }
    const { poseLandmarks, leftHandLandmarks, rightHandLandmarks } = results;
    const data = {
      poseLandmarks,
      leftHandLandmarks,
      rightHandLandmarks,
    };
    setMediapipeData((cur) => {
      const temp = [...cur];
      temp.push(data);
      if (temp.length == 30) {
        console.log(temp);
        socket?.emit("coordinate", temp);
      }
      return temp;
    });

    // subject?.pipe(throttle(() => interval(1000))).subscribe((data) => {
    //   socket?.emit("coordinate", { data });
    //   // console.log(data);
    // });
    // subject?.next(data);

    canvasRef.current.width = webcamRef.current?.video.videoWidth;
    canvasRef.current.height = webcamRef.current?.video.videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    if (!canvasCtx) {
      return;
    }

    canvasCtx.save();

    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
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

  useEffect(() => {
    if (cameraOn) {
      holistic.onResults(onResults);
    } else {
      holistic.onResults(() => undefined);
      setMediapipeData([]);
    }
  }, [cameraOn]);

  useEffect(() => {
    let camera: cam.Camera | null = null;
    let isCanceled = false;

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      if (!webcamRef.current?.video) {
        return;
      }

      camera = new cam.Camera(webcamRef.current?.video, {
        onFrame: async () => {
          if (!webcamRef.current?.video || isCanceled) {
            return;
          }
          await holistic.send({ image: webcamRef.current?.video });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
    return () => {
      isCanceled = true;

      holistic.onResults(() => undefined);

      camera?.stop();
    };
  }, []);

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
    // const socket: Socket<ServerToClientEvents, ClientToServerEvents> =

    return () => {
      socket?.disconnect();
    };
  }, []);

  useEffect(() => {
    const sub = new Subject<MediapipeDataProps>();
    setSubject(sub);
  }, []);

  useEffect(() => {
    if (socket) {
      const func = (data: ServerToClientData) => {
        setSocketAnswer(data);
        console.log(data);
      };
      socket.on("answer", func);

      return () => {
        socket.off("answer", func);
      };
    }
  }, [socket]);

  return (
    <>
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
      <h1>{socketAnswer && socketAnswer.data}</h1>
    </>
  );
}

export default MediaPipeWebCam;
