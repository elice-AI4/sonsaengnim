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
  NoneDisplay,
  BackImage,
  ModalButton,
  ModalButtonContainer,
  ToolTipContent,
  BoxP,
} from "./index.style";
import { useLocation } from "react-router";
import * as Api from "../../../../api";
import ButtonList from "./buttonList/ButtonList";
import MediaPipeWebCam from "../../../MediaPipeWebCam";
import Loading from "../../../Loading";
import Modal from "../../Modal";
import Footer from "../../../Footer";
import { learningGamecopyRights } from "../../../copyRights/copyRights";
import { imgSrc } from "../learningData";
import ReactTooltip from "react-tooltip";
import ai_loading from "../../../../src_assets/modal/ai_loading.jpg";
import grading from "../../../../src_assets/modal/grading.jpg";
import none_user_correct from "../../../../src_assets/modal/none_user_correct.jpg";
import user_correct from "../../../../src_assets/modal/user_correct.jpg";
import wrong_answer from "../../../../src_assets/modal/wrong_answer.jpg";
import playAlphabetGuide from "../../../../src_assets/learning/play/playAlphabetGuide.jpg";
import playWordGuide from "../../../../src_assets/learning/play/playWordGuide.jpg";
import { useAtom } from "jotai";
import { loginAtom, userAtom } from "../../../../state";

export const ALPHABET_LENGTH = 26;

export interface VideoDataProps {
  _id: string;
  english: string;
  handVideo: string;
  mouthVideo?: string;
}

export interface CardsProps {
  cardImageURL: string;
  english: string;
  word: string;
  _id: string;
}

export interface CurSelectedButtonProps {
  word: string;
  index: number;
}

interface GetPointProps {
  point: number;
  user: {
    createdAt: string;
    email: string;
    password: string;
    point: number;
    scores: number[];
    study: string[];
    updatedAt: string;
    username: string;
    _id: string;
  };
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
  const [socketAnswer, setSocketAnswer] = useState<string[]>();
  const [point, setPoint] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState({
    loadingModal: false,
    waitingAnswerModal: false,
    correctModal: false,
    wrongModal: false,
  });
  const [curSelectedButton, setCurSelectedButton] =
    useState<CurSelectedButtonProps>({
      word: "",
      index: 0,
    });
  const lazyStartTimerId: { current: any } = useRef(null);
  const [isLogin] = useAtom(loginAtom);
  const [, setUser] = useAtom(userAtom);
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

  // socket?????? ????????? ????????? ?????? ?????? ?????? ????????? ?????? ??????????????? ??????
  const checkAnswer = (answer: string[]) => {
    if (Array.isArray(answer)) {
      return answer.find((ans: string) => {
        return ans === curSelectedButton.word.toLowerCase();
      });
    }
  };

  // socket?????? ????????? ????????? ????????????. ["a", "b", "c"]
  const handleSetSocketAnswer = (answer: string[]) => {
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
    const mappedWords = words.map((word) => {
      return word.english;
    });
    setWordList(mappedWords);

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
  const handleSetCurSelectedButton = (data: CurSelectedButtonProps) => {
    setCurSelectedButton(data);
  };

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

  useEffect(() => {
    const getPoint = async () => {
      const res: { data: GetPointProps } = await Api.post(
        `user/study?word=${curSelectedButton.word}`,
        {}
      );

      setPoint(res.data.point);
      setUser((cur) => {
        const newUser = { ...cur, point: res.data.user.point };
        return newUser;
      });
      console.log(res);
    };
    try {
      if (isModalOpen.correctModal) {
        if (isLogin) {
          getPoint();
        }
      }
    } catch (e: any) {
      throw new Error(e);
    }
  }, [isModalOpen.correctModal]);

  return (
    <>
      <Modal visible={isModalOpen.loadingModal} style={modalStyle}>
        <img src={ai_loading} alt="ai??? ????????? ???????????????" />
      </Modal>

      <Modal visible={isModalOpen.correctModal} style={modalStyle}>
        {isLogin && <img src={user_correct} alt="????????? ????????? ????????? ??????!" />}
        {!isLogin && (
          <img src={none_user_correct} alt="???????????? ????????? ????????? ??????!" />
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
            ??????
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
            ????????????
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
            {isLogin ? <BoxP>{point}??? ??????!</BoxP> : <BoxP>????????????!</BoxP>}
          </PointBox>
        )}
      </Modal>

      <Modal visible={isModalOpen.wrongModal} style={modalStyle}>
        <img src={wrong_answer} alt="????????? ??????!" />
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
            ??????
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
            ????????????
          </ModalButton>
        </ModalButtonContainer>
      </Modal>

      <Modal visible={isModalOpen.waitingAnswerModal} style={modalStyle}>
        {!socketAnswer && <img src={grading} alt="???????????? ??????" />}
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
              data-tip="game-hand"
              data-for="game-hand"
            >
              ?????????
              <ReactTooltip id="game-hand">
                <video autoPlay width="200" muted loop>
                  <source
                    src="http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20200824/735192/MOV000258245_700X466.mp4"
                    type="video/mp4"
                  />
                </video>
                <p style={{ textAlign: "right" }}>??????: ???????????????</p>
              </ReactTooltip>
            </Button>
            {isAlphabetLearningPage ? (
              <Button
                className={!isHandVideo ? "target" : "non-target"}
                onClick={() => {
                  setIsHandVideo(!isHandVideo);
                }}
                data-tip="game-mouth"
                data-for="game-mouth"
              >
                ?????????
                <ReactTooltip id="game-mouth">
                  <video autoPlay width="200" muted loop>
                    <source
                      src="http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191028/631921/MOV000251816_700X466.mp4"
                      type="video/mp4"
                    />
                  </video>
                  <p style={{ textAlign: "right" }}>??????: ???????????????</p>
                </ReactTooltip>
              </Button>
            ) : (
              <Button
                className={!isHandVideo ? "target" : "non-target"}
                onClick={() => {
                  setIsHandVideo(!isHandVideo);
                }}
                data-tip="game-meaning"
                data-for="game-meaning"
              >
                ??????
                <ReactTooltip id="game-meaning">
                  <video autoPlay width="200" muted loop>
                    <source
                      src="http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191029/632415/MOV000250158_700X466.mp4"
                      type="video/mp4"
                    />
                  </video>
                  <p style={{ textAlign: "right" }}>??????: ???????????????</p>
                </ReactTooltip>
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
                      src={imgSrc[curSelectedButton.index].src}
                      alt={imgSrc[curSelectedButton.index].alt}
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
                {isAlphabetLearningPage ? (
                  <Explain>??????????????? ???????????????.</Explain>
                ) : (
                  <Explain>???????????? ???????????????.</Explain>
                )}
                <Explain>????????? ????????? ????????? ?????? ?????????.</Explain>
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
              {isAlphabetLearningPage ? (
                <StartButton
                  onClick={handleClickButton}
                  cameraOn={cameraOn}
                  data-tip="game-alphabetGuide"
                  data-for="game-alphabetGuide"
                >
                  <StartTriangle cameraOn={cameraOn} />

                  <ReactTooltip id="game-alphabetGuide">
                    <ToolTipContent>
                      <img
                        src={playAlphabetGuide}
                        alt="playGuide"
                        width="300"
                      ></img>
                      <p style={{ textAlign: "center", fontSize: "24px" }}>
                        ???????????? ????????? ????????? ?????? <br />
                        ?????? ???????????? ????????? ???????????????
                      </p>
                    </ToolTipContent>
                  </ReactTooltip>
                </StartButton>
              ) : (
                <StartButton
                  onClick={handleClickButton}
                  cameraOn={cameraOn}
                  data-tip="game-wordGuide"
                  data-for="game-wordGuide"
                >
                  <StartTriangle cameraOn={cameraOn} />

                  <ReactTooltip id="game-wordGuide">
                    <ToolTipContent>
                      <img
                        src={playWordGuide}
                        alt="playGuide"
                        width="300"
                      ></img>
                      <p style={{ textAlign: "center", fontSize: "24px" }}>
                        ???????????? ????????? ????????? ????????? <br />
                        ?????? ???????????? ????????? ???????????????
                      </p>
                    </ToolTipContent>
                  </ReactTooltip>
                </StartButton>
              )}
              {/* <StartButton
                onClick={handleClickButton}
                cameraOn={cameraOn}
                data-tip="game-guide"
                data-for="game-guide"
              >
                <StartTriangle cameraOn={cameraOn} />

                <ReactTooltip id="game-guide">
                  <ToolTipContent>
                    <img src={playGuide} alt="playGuide" width="300"></img>
                    <p style={{ textAlign: "center", fontSize: "24px" }}>
                      ???????????? ????????? ????????? ?????? <br />
                      ?????? ???????????? ????????? ???????????????
                    </p>
                  </ToolTipContent>
                </ReactTooltip>
              </StartButton> */}
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
