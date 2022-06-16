import React, { useEffect, useState } from "react";
import AlphabetList from "./alphabetList/AlphabetList";
import {
  AlphabetContainer,
  Image,
  GameContainer,
  Sidebar,
  ImageUnderLine,
  ImageContainer,
} from "./index.style";
import { alphabetImgs } from "../learningData";
import { wordImgs } from "../learningData";
import { useLocation } from "react-router";
import WordList from "./WordList";

const Game = () => {
  const {pathname} =  useLocation()
  
  const [src, setSrc] = useState('');
  const [isAlphabetLearningPage, setIsAlphabetLearningPage] = useState(true)
  
  useEffect(() => {
    if(pathname.includes('alphabet') === true) {
      setSrc(alphabetImgs[0].src)
      setIsAlphabetLearningPage(true)
    } else {
      setSrc(wordImgs[1].src)
      setIsAlphabetLearningPage(false)
    }

  }, [])
  
  return (
    <GameContainer>
      <Sidebar>
        <ImageContainer>
        <Image>
          <img src={src} alt="learningImage" />
        </Image>
        <ImageUnderLine/>
        </ImageContainer>
        { isAlphabetLearningPage === true ? <AlphabetList /> : <WordList />}
      </Sidebar>
    </GameContainer>
  );
};

export default Game;
