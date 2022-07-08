import React, { useEffect, useState } from "react";
import {
  CameraContainer,
  Moniter,
  Sidebar,
  Button,
  ButtonContainer,
} from "../index.style";
import { NoCamContainer } from "./index.style";
import * as Api from "../../../../../api";
import ReactTooltip from "react-tooltip";
import { useLocation } from "react-router";
import { ALPHABET_LENGTH, CurSelectedButtonProps, VideoDataProps } from "..";

const NoCam = () => {
  const { pathname } = useLocation();
  const [isHandVideo, setIsHandVideo] = useState(true);
  const [isAlphabetLearningPage, setIsAlphabetLearningPage] = useState(true);
  const [wordList, setWordList] = useState<string[]>();
  const [curSelectedButton, setCurSelectedButton] =
    useState<CurSelectedButtonProps>({
      word: "",
      index: 0,
    });
  const [videos, setVideos] = useState<VideoDataProps[]>([]);
  const [curVideo, setCurVideo] = useState({
    handVideo: "",
    mouthVideo: "",
  });

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
  return (
    <NoCamContainer>
      <Sidebar></Sidebar>
      <CameraContainer>
        <Moniter>
          <ButtonContainer>
            <Button
              className={isHandVideo ? "target" : "non-target"}
              onClick={() => {
                setIsHandVideo(!isHandVideo);
              }}
              data-tip="game-hand"
              data-for="game-hand"
            >
              손모양
              <ReactTooltip id="game-hand">
                <video autoPlay width="200" muted loop>
                  <source
                    src="http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20200824/735192/MOV000258245_700X466.mp4"
                    type="video/mp4"
                  />
                </video>
                <p style={{ textAlign: "right" }}>출처: 국립국어원</p>
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
                입모양
                <ReactTooltip id="game-mouth">
                  <video autoPlay width="200" muted loop>
                    <source
                      src="http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191028/631921/MOV000251816_700X466.mp4"
                      type="video/mp4"
                    />
                  </video>
                  <p style={{ textAlign: "right" }}>출처: 국립국어원</p>
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
                그림
                <ReactTooltip id="game-meaning">
                  <video autoPlay width="200" muted loop>
                    <source
                      src="http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191029/632415/MOV000250158_700X466.mp4"
                      type="video/mp4"
                    />
                  </video>
                  <p style={{ textAlign: "right" }}>출처: 국립국어원</p>
                </ReactTooltip>
              </Button>
            )}
          </ButtonContainer>
        </Moniter>
      </CameraContainer>
    </NoCamContainer>
  );
};

export default NoCam;
