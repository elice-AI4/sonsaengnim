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
} from "./index.style";
import { alphabetImgs } from "../learningData";
import { wordImgs } from "../learningData";
import { useLocation } from "react-router";
import WordList from "./WordList";

const Game = () => {
  const { pathname } = useLocation();

  const [src, setSrc] = useState("");
  const [isAlphabetLearningPage, setIsAlphabetLearningPage] = useState(true);

  const handleSetSrc = (index: number) => {
    setSrc(
      isAlphabetLearningPage === true
        ? alphabetImgs[index].src
        : wordImgs[index].src
    );
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

  return (
    <GameContainer>
      <Sidebar>
        <ButtonContainer>
          <Button>손모양</Button>
          <Button>입모양</Button>
        </ButtonContainer>
        <ImageContainer>
          <Image>
            <img src={src} alt="learningImage" />
          </Image>
          <ImageUnderLine />
        </ImageContainer>
        {isAlphabetLearningPage === true ? (
          <AlphabetList handleSetSrc={handleSetSrc} />
        ) : (
          <WordList />
        )}
      </Sidebar>
      <CameraContainer></CameraContainer>
    </GameContainer>
  );
};

export default Game;
