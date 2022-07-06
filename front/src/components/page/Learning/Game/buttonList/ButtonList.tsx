import React, { useState } from "react";
import { curSelectedButtonProps } from "..";
import { BlankButton, Button, Container, WordButton } from "./ButtonList.style";

const Alphabet = Array.from(Array(26))
  .map((e, i) => i + 65)
  .map((x) => String.fromCharCode(x));

interface ButtonListProps {
  handleSetVideo: (index: number) => void;
  isAlphabetLearningPage: boolean;
  wordList?: string[];
  handleSetCurSelectedButton: (data: curSelectedButtonProps) => void;
}

const ButtonList = ({
  handleSetVideo,
  isAlphabetLearningPage,
  wordList,
  handleSetCurSelectedButton,
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
                  handleSetCurSelectedButton({
                    word: alpha,
                    index,
                  });
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
                  handleSetCurSelectedButton({
                    word,
                    index,
                  });
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
