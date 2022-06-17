import React, { useEffect, useState } from "react";
import AlphabetList from "./alphabetList/AlphabetList";
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
import { alphabetImgs } from "../learningData";
import { wordImgs } from "../learningData";
import { handAlphabetVideo } from "../handData";
import { useLocation } from "react-router";
import WordList from "./WordList";

const LeaningGame = () => {
  const { pathname } = useLocation();
  console.log(pathname);

  const [src, setSrc] = useState("");
  const [isAlphabetLearningPage, setIsAlphabetLearningPage] = useState(true);
  const [isPlayWebcam, setIsPlayWebcam] = useState(false);

  const handleSetSrc = (index: number) => {
    setSrc(
      isAlphabetLearningPage === true
        ? alphabetImgs[index].src
        : wordImgs[index].src
    );
  };

  const handleClickButton = () => {
    setIsPlayWebcam(true);
  };

  useEffect(() => {
    if (pathname.includes("alphabet") === true) {
      setSrc(alphabetImgs[0].src);
      setIsAlphabetLearningPage(true);
    } else {
      setSrc(wordImgs[1].src);
      setIsAlphabetLearningPage(false);
    }
  }, []);

  useEffect(() => {
    if (isPlayWebcam === true) {
      const timer = setTimeout(() => {
        setIsPlayWebcam(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isPlayWebcam]);

  return (
    <GameContainer>
      <Sidebar>
        <ButtonContainer>
          <Button>손모양</Button>
          <Button>입모양</Button>
        </ButtonContainer>
        <ImageContainer>
          <Image>
            {/* <img src={src} alt="learningImage" /> */}
            <video autoPlay loop controls width="300">
              <source
                src={handAlphabetVideo[0].src}
                type={handAlphabetVideo[0].type}
              />
            </video>
          </Image>
          <ImageUnderLine />
        </ImageContainer>
        {isAlphabetLearningPage === true ? (
          <AlphabetList handleSetSrc={handleSetSrc} />
        ) : (
          <WordList />
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
            <StartButton
              onClick={handleClickButton}
              isPlayWebcam={isPlayWebcam}
            >
              <StartTriangle isPlayWebcam={isPlayWebcam} />
            </StartButton>
          </BottomContainer>
        </Moniter>
      </CameraContainer>
    </GameContainer>
  );
};

export default LeaningGame;
