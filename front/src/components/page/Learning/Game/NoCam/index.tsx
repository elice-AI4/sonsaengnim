import React, { useEffect, useState, useRef } from "react";
import {
  BlueCircle,
  CameraContainer,
  Explain,
  GreenCircle,
  Moniter,
  NoneDisplay,
  RedCircle,
} from "../index.style";
import {
  NoCamContainer,
  ButtonContainer,
  VideoContainer,
  Button,
  CircleContainer,
  ImageContainer,
  FrontImage,
  BackImage,
  Sidebar,
  SidebarScroll,
  ScrollItems,
  ScrollBox,
} from "./index.style";
import * as Api from "../../../../../api";
import ReactTooltip from "react-tooltip";
import { useLocation } from "react-router";
import { ALPHABET_LENGTH, CardsProps, VideoDataProps } from "..";

const videoSize = {
  width: "550px",
};

const Alphabet = Array.from(Array(26))
  .map((e, i) => i + 65)
  .map((x) => String.fromCharCode(x));

const NoCam = () => {
  const { pathname } = useLocation();
  const [isHandVideo, setIsHandVideo] = useState(true);
  const [isAlphabetLearningPage, setIsAlphabetLearningPage] = useState(true);
  const [wordList, setWordList] = useState<string[]>();
  const [curSelectedButton, setCurSelectedButton] = useState(0);
  const [videos, setVideos] = useState<VideoDataProps[]>([]);
  const [curVideo, setCurVideo] = useState({
    handVideo: "",
    mouthVideo: "",
  });
  const [curIndex, setCurIndex] = useState(0);
  const [cards, setCards] = useState<CardsProps[]>([]);

  //국립국어원 영상 src
  const [koreanVideoSrc, setKoreanVideoSrc] = useState<string[]>([
    "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20200824/735192/MOV000258245_700X466.mp4",
    "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191028/631921/MOV000251816_700X466.mp4",
    "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20160325/251439/MOV000263171_700X466.mp4",
    "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191028/631960/MOV000243346_700X466.mp4",
  ]);

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

  const getImages = async () => {
    const cards = await Api.get("cards");
    setCards(cards.data);
  };

  useEffect(() => {
    try {
      const localIsAlphabet = pathname.includes("alphabet") === true;
      getVideos(localIsAlphabet);
      if (localIsAlphabet) {
        setIsAlphabetLearningPage(true);
        setCurSelectedButton(0);
      } else {
        getImages();
        setIsAlphabetLearningPage(false);
        setCurSelectedButton(0);
      }
    } catch (e: any) {
      throw new Error(e);
    }
  }, []);

  return (
    <NoCamContainer>
      <Sidebar>
        <SidebarScroll>
          <ScrollBox>
            {isAlphabetLearningPage
              ? Alphabet.map((a, index) => {
                  return (
                    <ScrollItems
                      key={`${index} items`}
                      clicked={curIndex === index}
                      onClick={() => {
                        setCurIndex(index);
                        handleSetVideo(index);
                      }}
                    >
                      {a}
                    </ScrollItems>
                  );
                })
              : cards?.map((card, index) => {
                  return (
                    <ScrollItems
                      key={`${index} items`}
                      clicked={curIndex === index}
                      onClick={() => {
                        setCurIndex(index);
                        handleSetVideo(index);
                        setCurSelectedButton(index);
                      }}
                    >
                      {card.word}({card.english})
                    </ScrollItems>
                  );
                })}
          </ScrollBox>
        </SidebarScroll>
      </Sidebar>
      <CameraContainer>
        <Moniter>
          <CircleContainer>
            <RedCircle />
            <GreenCircle />
            <BlueCircle />
          </CircleContainer>

          <ButtonContainer>
            {isAlphabetLearningPage && (
              <>
                <Button
                  isHandVideo={isHandVideo}
                  onClick={() => {
                    setIsHandVideo(!isHandVideo);
                  }}
                  data-tip=""
                  data-for="gameNoCam-hand"
                >
                  손모양
                  <ReactTooltip id="gameNoCam-hand">
                    <video autoPlay width="200" muted loop>
                      <source src={koreanVideoSrc[0]} type="video/mp4" />
                    </video>
                    <p style={{ textAlign: "right" }}>출처: 국립국어원</p>
                  </ReactTooltip>
                </Button>
                <Button
                  isHandVideo={!isHandVideo}
                  onClick={() => {
                    setIsHandVideo(!isHandVideo);
                  }}
                  data-tip=""
                  data-for="gameNoCam-mouth"
                >
                  입모양
                  <ReactTooltip id="gameNoCam-mouth">
                    <video autoPlay width="200" muted loop>
                      <source src={koreanVideoSrc[1]} type="video/mp4" />
                    </video>
                    <p style={{ textAlign: "right" }}>출처: 국립국어원</p>
                  </ReactTooltip>
                </Button>
              </>
            )}
            {!isAlphabetLearningPage && (
              <>
                <Button
                  isHandVideo={isHandVideo}
                  onClick={() => {
                    setIsHandVideo(!isHandVideo);
                  }}
                  data-tip=""
                  data-for="gameNoCam-video"
                >
                  손모양
                  <ReactTooltip id="gameNoCam-video">
                    <video preload="auto" autoPlay width="200" muted loop>
                      <source src={koreanVideoSrc[2]} type="video/mp4" />
                    </video>
                    <p style={{ textAlign: "right" }}>출처: 국립국어원</p>
                  </ReactTooltip>
                </Button>
                <Button
                  isHandVideo={!isHandVideo}
                  onClick={() => {
                    setIsHandVideo(!isHandVideo);
                  }}
                  data-tip=""
                  data-for="gameNoCam-meaning"
                >
                  그림
                  <ReactTooltip id="gameNoCam-meaning">
                    <video preload="auto" autoPlay width="200" muted loop>
                      <source src={koreanVideoSrc[3]} type="video/mp4" />
                    </video>
                    <p style={{ textAlign: "right" }}>출처: 국립국어원</p>
                  </ReactTooltip>
                </Button>
              </>
            )}
          </ButtonContainer>
          <div style={{ position: "relative" }}>
            <Explain>영상을 보고 학습해봐요.</Explain>
          </div>
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
                      width={videoSize.width}
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
                      width={videoSize.width}
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
                      width={videoSize.width}
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
                      src={cards[curSelectedButton]?.cardImageURL}
                      alt={cards[curSelectedButton]?.word}
                      width={videoSize.width}
                      height="auto"
                      style={{ borderRadius: "5px" }}
                    />
                  )}
                </BackImage>
              </>
            )}
          </ImageContainer>
          <VideoContainer></VideoContainer>
        </Moniter>
      </CameraContainer>
    </NoCamContainer>
  );
};

export default NoCam;
