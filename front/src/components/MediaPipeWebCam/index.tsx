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

const flaskUrl = String(process.env.REACT_APP_FLASKPORT);

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

interface ServerToClientEvents {
  answer: (data: string[]) => void;
}
interface ClientToServerEvents {
  coordinate: (hands: MediapipeDataProps[]) => void;
}

interface WebCamProps {
  cameraOn: boolean;
  handleOffMediapipe: () => void;
  isCameraSettingOn: () => void;
  handleSetSocketAnswer?: (answer: string[]) => void;
  openModal?: () => void;
}

interface MediapipeDataProps {
  poseLandmarks: h.NormalizedLandmarkList;
  leftHandLandmarks: h.NormalizedLandmarkList;
  rightHandLandmarks: h.NormalizedLandmarkList;
}

function MediaPipeWebCam({
  cameraOn,
  handleOffMediapipe,
  isCameraSettingOn,
  handleSetSocketAnswer,
  openModal,
}: WebCamProps) {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [socket, setSocket] =
    useState<Socket<ServerToClientEvents, ClientToServerEvents>>();
  const [mediapipeData, setMediapipeData] = useState<MediapipeDataProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      return temp;
    });

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
      lineWidth: 3,
    });
    drawLandmarks(canvasCtx, results.poseLandmarks, {
      color: "#FF0000",
      lineWidth: 2,
    });
    drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS, {
      color: "#CC0000",
      lineWidth: 4,
    });
    drawLandmarks(canvasCtx, results.leftHandLandmarks, {
      color: "#00FF00",
      lineWidth: 2,
    });
    drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS, {
      color: "#00CC00",
      lineWidth: 4,
    });
    drawLandmarks(canvasCtx, results.rightHandLandmarks, {
      color: "#FF0000",
      lineWidth: 2,
    });
  };
  const startRef: { current: any } = useRef<Date>();
  const middleRef: { current: any } = useRef<Date>();
  const endRef: { current: any } = useRef<Date>();
  useEffect(() => {
    if (mediapipeData.length === 50) {
      startRef.current = new Date();
      // 50개가 다 차면 정답을 기다리는 모달을 띄우기 위함
      openModal && openModal();
      socket?.emit("coordinate", mediapipeData);
      middleRef.current = new Date();
      console.log("startRef 값 : ", startRef.current);
      console.log("middleRef 값 : ", middleRef.current);

      handleOffMediapipe();
    }
  }, [mediapipeData, openModal]);
  // useEffect(() => {
  //   if (mediapipeData.length === 50) {
  //     console.log("50개 채웠어요!");
  //     startRef.current = new Date();
  //     openModal && openModal();
  //     console.log("startRef 값 : ", startRef.current);
  //     for (let i = 0; i < mediapipeData.length - 30; i = i + 4) {
  //       console.log(i, "번째 socket 보냅니다!");
  //       socket?.emit("coordinate", mediapipeData.slice(i, i + 30));
  //     }
  //     handleOffMediapipe();
  //   }
  // }, [mediapipeData]);

  useEffect(() => {
    if (cameraOn) {
      holistic.onResults(onResults);
    } else {
      holistic.onResults(() => undefined);
      setMediapipeData([]);
    }
  }, [cameraOn]);

  useEffect(() => {
    if (!isLoading) {
      isCameraSettingOn();
    }
  }, [isLoading]);

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
          setIsLoading(false);
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
    setSocket(io(`${flaskUrl}`));
    console.log(flaskUrl);
    return () => {
      socket?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      const func = (data: string[]) => {
        endRef.current = new Date();
        // 소켓 답변 매개변수로 넘겨주는 함수
        handleSetSocketAnswer && handleSetSocketAnswer(data);
        console.log("endRef 값 : ", endRef.current);
        console.log("둘의 차이 : ", endRef.current - startRef.current);
        console.log("넘어온 값: ", data);
      };
      // 소켓 답변 얻어오는 함수
      socket.on("answer", func);

      return () => {
        socket.off("answer", func);
      };
    }
  }, [socket, handleSetSocketAnswer]);

  return (
    <>
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
          zIndex: 3,
          width: 640,
          height: 480,
        }}
      />
      {cameraOn && <UserCanvas ref={canvasRef} />}
    </>
  );
}

export default MediaPipeWebCam;
