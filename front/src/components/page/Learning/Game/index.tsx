import React from "react";
import { useParams } from "react-router";
import AlphabetList from "./AlphabetList";
import {
  AlphabetContainer,
  AlphabetImage,
  GameContainer,
  Sidebar,
} from "./index.style";
import { alphabetImgs } from "../learningData";

const Game = () => {
  const { alphabet } = useParams();

  return (
    <GameContainer>
      <Sidebar>
        <AlphabetImage>
          <img src={alphabetImgs[0].src} alt="" />
        </AlphabetImage>
      </Sidebar>
    </GameContainer>
  );
};

export default Game;
