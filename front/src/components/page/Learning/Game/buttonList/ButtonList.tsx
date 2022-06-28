import React, { useState } from "react";
import { BlankButton, Button, Container, WordButton } from "./ButtonList.style";

const Alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

interface ButtonListProps {
  handleSetVideo: (index: number) => void;
  isAlphabetLearningPage: boolean;
  wordList?: string[];
}

const ButtonList = ({
  handleSetVideo,
  isAlphabetLearningPage,
  wordList,
}: ButtonListProps) => {
  const [curIndex, setIcurIndex] = useState(0);
  return (
    <Container>
      {isAlphabetLearningPage
        ? Alphabet.map((alpha: string, index: number) => {
            return (
              <Button
                key={`${alpha} ${index}`}
                onClick={() => {
                  handleSetVideo(index);
                  setIcurIndex(index);
                }}
                className={curIndex === index ? "target" : "non-target"}
              >
                {alpha}
              </Button>
            );
          })
        : wordList?.map((word: string, index: number) => {
            return (
              <WordButton
                key={`${word} ${index}`}
                onClick={() => {
                  handleSetVideo(index);
                  setIcurIndex(index);
                }}
                className={curIndex === index ? "target" : "non-target"}
              >
                {word}
              </WordButton>
            );
          })}
      <BlankButton />
      <BlankButton />
    </Container>
  );
};

export default ButtonList;
