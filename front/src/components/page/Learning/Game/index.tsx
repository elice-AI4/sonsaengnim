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
  ModalButton,
  ModalButtonContainer,
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
import ai_loading from "../../../../src_assets/modal/ai_loading.jpg";
import grading from "../../../../src_assets/modal/grading.jpg";
import none_user_correct from "../../../../src_assets/modal/none_user_correct.jpg";
import user_correct from "../../../../src_assets/modal/user_correct.jpg";
import wrong_answer from "../../../../src_assets/modal/wrong_answer.jpg";
import { useAtom } from "jotai";
import { loginAtom } from "../../../../state";

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

const modalStyle = {
  width: "800px",
  height: "500px",
  display: "flex",
  "flex-direction": "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "0",
};

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
    waitingAnswerModal: false,
    correctModal: false,
    wrongModal: false,
  });
  const [curSelectedButton, setCurSelectedButton] =
    useState<curSelectedButtonProps>({
      word: "",
      index: 0,
    });
  const lazyStartTimerId: { current: any } = useRef(null);
  const [isLogin] = useAtom(loginAtom);

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

  // socket에서 보내온 응답을 저장한다. ["a", "b", "c"]
  const handleSetSocketAnswer = (answer: ServerToClientData) => {
    setSocketAnswer(answer);
    if (checkAnswer(answer) !== undefined) {
      setIsModalOpen((cur) => {
        return {
          ...cur,
          waitingAnswerModal: false,
          correctModal: true,
        };
      });
    } else {
      setIsModalOpen((cur) => {
        return {
          ...cur,
          waitingAnswerModal: false,
          wrongModal: true,
        };
      });
    }
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
        waitingAnswerModal: true,
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

  const checkAnswer = (answer: ServerToClientData): boolean | undefined => {
    if (Array.isArray(answer)) {
      return answer.find((ans: string) => {
        return ans === curSelectedButton.word.toLowerCase();
      });
    }
  };

  return (
    <>
      <Modal visible={isModalOpen.loadingModal} style={modalStyle}>
        <img src={ai_loading} alt="ai가 켜지길 기다리는중" />
      </Modal>

      <Modal visible={isModalOpen.correctModal} style={modalStyle}>
        {isLogin && <img src={user_correct} alt="로그인 유저가 정답인 경우!" />}
        {!isLogin && (
          <img src={none_user_correct} alt="비로그인 유저가 정답인 경우!" />
        )}
        <ModalButtonContainer>
          <ModalButton
            onClick={() => {
              setIsModalOpen((cur) => {
                return {
                  ...cur,
                  correctModal: false,
                };
              });
              setSocketAnswer(undefined);
            }}
          >
            닫기
          </ModalButton>
          <ModalButton
            onClick={() => {
              setIsModalOpen((cur) => {
                return {
                  ...cur,
                  correctModal: false,
                };
              });
              setSocketAnswer(undefined);
              handleClickButton();
            }}
          >
            다시하기
          </ModalButton>
        </ModalButtonContainer>

        {isModalOpen.correctModal && (
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
              delay: 0.8,
            }}
          >
            <span>100점!</span>
          </PointBox>
        )}
      </Modal>

      <Modal visible={isModalOpen.wrongModal} style={modalStyle}>
        <img src={wrong_answer} alt="오답인 경우!" />
        <ModalButtonContainer>
          <ModalButton
            onClick={() => {
              setIsModalOpen((cur) => {
                return {
                  ...cur,
                  wrongModal: false,
                };
              });
              setSocketAnswer(undefined);
            }}
          >
            닫기
          </ModalButton>
          <ModalButton
            onClick={() => {
              setIsModalOpen((cur) => {
                return {
                  ...cur,
                  wrongModal: false,
                };
              });
              setSocketAnswer(undefined);
              handleClickButton();
            }}
          >
            다시하기
          </ModalButton>
        </ModalButtonContainer>
      </Modal>

      <Modal visible={isModalOpen.waitingAnswerModal} style={modalStyle}>
        {!socketAnswer && <img src={grading} alt="채점중인 로봇" />}
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
            {isAlphabetLearningPage && (
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
                  )}
                </BackImage>
              </>
            )}
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
