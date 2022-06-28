import React, { useEffect, useRef, useState } from "react";
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
import * as Api from "../../../../api";
import ButtonList from "./buttonList/ButtonList";
import MediaPipeWebCam, { ServerToClientData } from "../../../MediaPipeWebCam";
import Loading from "../../../Loading";
import Modal from "../../Modal";

const ALPHABET_LENGTH = 26;

interface VideoDataProps {
  _id: string;
  english: string;
  handVideo: string;
  mouthVideo?: string;
}

const LearningGame = () => {
  const { pathname } = useLocation();

  const [videos, setVideos] = useState<VideoDataProps[]>([]);
  const [curVideo, setCurVideo] = useState({
    handVideo: "",
    mouthVideo: "",
  });
  const [wordList, setWordList] = useState<string[]>();
  const [isAlphabetLearningPage, setIsAlphabetLearningPage] = useState(true);
  const [cameraOn, setCameraOn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isHandVideo, setIsHandVideo] = useState(true);
  const [socketAnswer, setSocketAnswer] = useState<ServerToClientData>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lazyStartTimerId: { current: any } = useRef(null);

  const handleSetVideo = (index: number) => {
    if (isAlphabetLearningPage) {
      setCurVideo({
        handVideo: videos[index].handVideo,
        mouthVideo: String(videos[index].mouthVideo),
      });
    } else {
      setCurVideo({
        handVideo: videos[index + ALPHABET_LENGTH].handVideo,
        mouthVideo: String(videos[index + ALPHABET_LENGTH].mouthVideo),
      });
    }
  };

  const handleClickButton = () => {
    lazyStartTimerId.current = setTimeout(() => {
      setCameraOn(true);
    }, 1200);
  };
  const handleSetSocketAnswer = (answer: ServerToClientData) => {
    setSocketAnswer(answer);
    setIsModalOpen(false);
  };
  const getVideos = async (localIsAlphabet: boolean) => {
    const res = await Api.get("hands");
    setVideos(res.data);

    const words: VideoDataProps[] = res.data.slice(
      ALPHABET_LENGTH,
      res.data.length
    );
    const wordList = words.map((word) => {
      return word.english;
    });
    setWordList(wordList);

    if (localIsAlphabet) {
      setCurVideo({
        handVideo: res.data[0]?.handVideo,
        mouthVideo: res.data[0]?.mouthVideo,
      });
    } else {
      setCurVideo({
        handVideo: res.data[ALPHABET_LENGTH]?.handVideo,
        mouthVideo: "",
      });
    }
  };

  const handleOffMediapipe = () => {
    setCameraOn(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    try {
      const localIsAlphabet = pathname.includes("alphabet") === true;
      getVideos(localIsAlphabet);
      if (localIsAlphabet) {
        setIsAlphabetLearningPage(true);
      } else {
        setIsAlphabetLearningPage(false);
      }
    } catch (e: any) {
      throw new Error(e);
    }
  }, []);

  const isCameraSettingOn = () => {
    if (isLoading === false) return;
    setIsLoading(false);
  };

  useEffect(() => {
    return () => {
      if (lazyStartTimerId !== null) {
        clearTimeout(lazyStartTimerId.current);
      }
    };
  }, []);

  return (
    <>
      {isModalOpen && (
        <Modal
          visible={true}
          closeModal={() => {
            undefined;
          }}
        >
          hello
        </Modal>
      )}
      {isLoading && <Loading />}
      <GameContainer>
        <Sidebar>
          <ButtonContainer>
            <Button
              className={isHandVideo ? "target" : "non-target"}
              onClick={() => setIsHandVideo(!isHandVideo)}
            >
              손모양
            </Button>
            {isAlphabetLearningPage && (
              <Button
                className={!isHandVideo ? "target" : "non-target"}
                onClick={() => setIsHandVideo(!isHandVideo)}
              >
                입모양
              </Button>
            )}
          </ButtonContainer>
          <ImageContainer>
            <Image>
              {isAlphabetLearningPage ? (
                isHandVideo ? (
                  <video
                    autoPlay
                    loop
                    controls
                    width="430"
                    key={curVideo.handVideo}
                    style={{ borderRadius: "5px" }}
                  >
                    <source src={curVideo.handVideo} type="video/mp4" />
                  </video>
                ) : !isHandVideo ? (
                  <video
                    autoPlay
                    loop
                    controls
                    width="430"
                    key={curVideo.mouthVideo}
                    style={{ borderRadius: "5px" }}
                  >
                    <source src={curVideo.mouthVideo} type="video/mp4" />
                  </video>
                ) : (
                  <></>
                )
              ) : (
                <video
                  autoPlay
                  loop
                  controls
                  width="430"
                  key={curVideo.handVideo}
                  style={{ borderRadius: "5px" }}
                >
                  <source src={curVideo.handVideo} type="video/mp4" />
                </video>
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
              wordList={wordList}
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
              <Explain>오른손으로 동작을 취해주세요.</Explain>
              <HR />
            </TopContainer>
            <BottomContainer>
              <MediaPipeWebCam
                cameraOn={cameraOn}
                handleOffMediapipe={handleOffMediapipe}
                isCameraSettingOn={isCameraSettingOn}
                handleSetSocketAnswer={handleSetSocketAnswer}
                openModal={openModal}
              />
              <StartButton onClick={handleClickButton} cameraOn={cameraOn}>
                <StartTriangle cameraOn={cameraOn} />
              </StartButton>
            </BottomContainer>
          </Moniter>
        </CameraContainer>
      </GameContainer>
    </>
  );
};

export default LearningGame;
