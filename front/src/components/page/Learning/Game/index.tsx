import React, { useEffect, useState } from "react";
import {
  Image,
  GameContainer,
  Sidebar,
  ImageUnderLine,
  ImageContainer,
  ButtonContainer,
  Button,
  CameraContainer,
  Moniter,
  CircleContainer,
  RedCircle,
  GreenCircle,
  BlueCircle,
  Explain,
  HR,
  StartButton,
  TopContainer,
  BottomContainer,
  StartTriangle,
} from "./index.style";
import { useLocation } from "react-router";
import Mediapipe from "../../../mediapipe/Mediapipe";
import * as Api from "../../../../api";
import ButtonList from "./buttonList/ButtonList";

interface VideoDataProps {
  _id: string;
  alphabet: string;
  handVideo: string;
  mouthVideo: string;
}

const LearningGame = () => {
  const { pathname } = useLocation();

  const [videos, setVideos] = useState<VideoDataProps[]>([]);
  const [curVideo, setCurVideo] = useState({
    handVideo: "",
    mouthVideo: "",
  });
  const [isAlphabetLearningPage, setIsAlphabetLearningPage] = useState(true);
  const [cameraOn, setCameraOn] = useState(false);
  const [isHandVideo, setIsHandVideo] = useState(true);

  const handleSetVideo = (index: number) => {
    setCurVideo({
      handVideo: videos[index].handVideo,
      mouthVideo: videos[index].mouthVideo,
    });
  };

  const handleClickButton = () => {
    setCameraOn(true);
  };
  const getVideos = async () => {
    const res = await Api.get("hands");
    setVideos(res.data);
    setCurVideo({
      handVideo: res.data[0]?.handVideo,
      mouthVideo: res.data[0]?.mouthVideo,
    });
  };

  useEffect(() => {
    try {
      getVideos();
      if (pathname.includes("alphabet") === true) {
        setIsAlphabetLearningPage(true);
      } else {
        setIsAlphabetLearningPage(false);
      }
    } catch (e: any) {
      throw new Error(e);
    }
  }, []);

  useEffect(() => {
    if (cameraOn === true) {
      const timer = setTimeout(() => {
        setCameraOn(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [cameraOn]);

  return (
    <GameContainer>
      <Sidebar>
        <ButtonContainer>
          <Button
            className={isHandVideo ? "target" : "non-target"}
            onClick={() => setIsHandVideo(!isHandVideo)}
          >
            손모양
          </Button>
          <Button
            className={!isHandVideo ? "target" : "non-target"}
            onClick={() => setIsHandVideo(!isHandVideo)}
          >
            입모양
          </Button>
        </ButtonContainer>
        <ImageContainer>
          <Image>
            {isAlphabetLearningPage ? (
              isHandVideo ? (
                <video
                  autoPlay
                  loop
                  controls
                  width="370"
                  key={curVideo.handVideo}
                >
                  <source src={curVideo.handVideo} type="video/mp4" />
                </video>
              ) : !isHandVideo ? (
                <video
                  autoPlay
                  loop
                  controls
                  width="370"
                  key={curVideo.mouthVideo}
                >
                  <source src={curVideo.mouthVideo} type="video/mp4" />
                </video>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </Image>
          <ImageUnderLine />
        </ImageContainer>
        {isAlphabetLearningPage === true ? (
          <ButtonList
            handleSetVideo={handleSetVideo}
            isAlphabetLearningPage={isAlphabetLearningPage}
          />
        ) : (
          <ButtonList
            handleSetVideo={handleSetVideo}
            isAlphabetLearningPage={isAlphabetLearningPage}
          />
        )}
      </Sidebar>
      <CameraContainer>
        <Moniter>
          <TopContainer>
            <CircleContainer>
              <RedCircle />
              <GreenCircle />
              <BlueCircle />
            </CircleContainer>
            <Explain>5초 동안 동작을 취해주세요.</Explain>
            <HR />
          </TopContainer>
          <BottomContainer>
            <Mediapipe cameraOn={cameraOn} />
            <StartButton onClick={handleClickButton} cameraOn={cameraOn}>
              <StartTriangle cameraOn={cameraOn} />
            </StartButton>
          </BottomContainer>
        </Moniter>
      </CameraContainer>
    </GameContainer>
  );
};

export default LearningGame;
