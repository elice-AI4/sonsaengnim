import React, { useEffect, useRef, useState } from "react";
import {
  FrontImage,
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
  PointBox,
  ImageRotateContainer,
  NoneDisplay,
  BackImage,
} from "./index.style";
import { useLocation } from "react-router";
import * as Api from "../../../../api";
import ButtonList from "./buttonList/ButtonList";
import MediaPipeWebCam, { ServerToClientData } from "../../../MediaPipeWebCam";
import Loading from "../../../Loading";
import Modal from "../../Modal";
import A from "../../../../src_assets/about/motivation.jpg";
import Footer from "../../../Footer";
import { learningGamecopyRights } from "../../../copyRights/copyRights";
import { imgSrc } from "./wordImageSrc";

const ALPHABET_LENGTH = 26;

interface VideoDataProps {
  _id: string;
  english: string;
  handVideo: string;
  mouthVideo?: string;
}

export interface curSelectedButtonProps {
  word: string;
  index: number;
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
  const [isModalOpen, setIsModalOpen] = useState({
    loadingModal: false,
    waitingModal: false,
    pointModal: false,
  });
  const [curSelectedButton, setCurSelectedButton] =
    useState<curSelectedButtonProps>({
      word: "",
      index: 0,
    });

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
    setIsModalOpen((cur) => {
      return {
        ...cur,
        loadingModal: true,
      };
    });

    lazyStartTimerId.current = setTimeout(() => {
      setCameraOn(true);
      setIsModalOpen((cur) => {
        return {
          ...cur,
          loadingModal: false,
        };
      });
    }, 2000);
  };
  const handleSetSocketAnswer = (answer: ServerToClientData) => {
    setSocketAnswer(answer);
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
    setIsModalOpen((cur) => {
      return {
        ...cur,
        waitingModal: true,
      };
    });
  };
  const handleSetCurSelectedButton = (data: curSelectedButtonProps) => {
    setCurSelectedButton(data);
  };

  useEffect(() => {
    console.log(curSelectedButton);
  }, [curSelectedButton]);

  useEffect(() => {
    try {
      const localIsAlphabet = pathname.includes("alphabet") === true;
      getVideos(localIsAlphabet);
      if (localIsAlphabet) {
        setIsAlphabetLearningPage(true);
        setCurSelectedButton({
          word: "A",
          index: 0,
        });
      } else {
        setIsAlphabetLearningPage(false);
        setCurSelectedButton({
          word: "angel",
          index: 0,
        });
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

  const checkAnswer = (): boolean | undefined => {
    if (Array.isArray(socketAnswer)) {
      return socketAnswer.find((answer: string) => {
        return answer === curSelectedButton.word.toLowerCase();
      });
    }
  };

  return (
    <>
      <Modal
        visible={isModalOpen.loadingModal}
        style={{
          width: "800px",
          height: "500px",
        }}
      >
        <img src={A} alt="" width="100%" height="100%" />
      </Modal>

      <Modal
        visible={isModalOpen.waitingModal}
        style={{
          width: "800px",
          height: "500px",
        }}
      >
        {!socketAnswer ? (
          <p>정답을 기다리고 있어요!</p>
        ) : checkAnswer() !== undefined ? (
          <>
            <p>정답이에요!</p>
            <button
              onClick={() => {
                setIsModalOpen((cur) => {
                  return {
                    ...cur,
                    waitingModal: false,
                  };
                });
                setSocketAnswer(undefined);
              }}
            >
              닫기
            </button>
            <PointBox
              initial={{ scale: 0, borderRadius: 0, rotate: 0 }}
              animate={{
                rotate: 360,
                scale: 1,
                borderRadius: "50%",
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 14,
              }}
            >
              <span>100점!</span>
            </PointBox>
          </>
        ) : (
          <>
            <p>다시 해 볼까요?</p>
            <button
              onClick={() => {
                setIsModalOpen((cur) => {
                  return {
                    ...cur,
                    waitingModal: false,
                  };
                });
                setSocketAnswer(undefined);
              }}
            >
              닫기
            </button>
            <button
              onClick={() => {
                setIsModalOpen((cur) => {
                  return {
                    ...cur,
                    waitingModal: false,
                  };
                });
                handleClickButton();
                setSocketAnswer(undefined);
              }}
            >
              다시하기
            </button>
          </>
        )}
      </Modal>
      {isLoading && <Loading />}
      <GameContainer>
        <Sidebar>
          <ButtonContainer>
            <Button
              className={isHandVideo ? "target" : "non-target"}
              onClick={() => {
                setIsHandVideo(!isHandVideo);
              }}
            >
              손모양
            </Button>
            {isAlphabetLearningPage ? (
              <Button
                className={!isHandVideo ? "target" : "non-target"}
                onClick={() => {
                  setIsHandVideo(!isHandVideo);
                }}
              >
                입모양
              </Button>
            ) : (
              <Button
                className={!isHandVideo ? "target" : "non-target"}
                onClick={() => {
                  setIsHandVideo(!isHandVideo);
                }}
              >
                그림
              </Button>
            )}
          </ButtonContainer>
          <ImageContainer>
            <NoneDisplay />
            {!isAlphabetLearningPage && (
              <>
                <FrontImage isHandVideo={isHandVideo}>
                  {isHandVideo && (
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
                </FrontImage>
                <BackImage isHandVideo={isHandVideo}>
                  {!isHandVideo && (
                    <img
                      src={imgSrc[curSelectedButton.index]}
                      alt=""
                      width="430"
                      height="auto"
                    />
                  )}
                </BackImage>
              </>
            )}

            <ImageUnderLine />
          </ImageContainer>
          {isAlphabetLearningPage === true ? (
            <ButtonList
              handleSetVideo={handleSetVideo}
              isAlphabetLearningPage={isAlphabetLearningPage}
              handleSetCurSelectedButton={handleSetCurSelectedButton}
            />
          ) : (
            <ButtonList
              handleSetVideo={handleSetVideo}
              isAlphabetLearningPage={isAlphabetLearningPage}
              wordList={wordList}
              handleSetCurSelectedButton={handleSetCurSelectedButton}
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
              <div style={{ position: "relative" }}>
                {/* <ImageTooltip imgSrc={imgSrc[curSelectedButton.index]} /> */}
                <Explain>오른손으로 학습해봐요.</Explain>
              </div>
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
          <Footer
            aLinks={learningGamecopyRights.aLinks}
            contents={learningGamecopyRights.contents}
          />
        </CameraContainer>
      </GameContainer>
    </>
  );
};

export default LearningGame;
