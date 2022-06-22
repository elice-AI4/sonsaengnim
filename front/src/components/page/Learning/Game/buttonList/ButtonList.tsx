import React, { useState } from "react";
import { Button, Container } from "./ButtonList.style";

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
}

const ButtonList = ({
  handleSetVideo,
  isAlphabetLearningPage,
}: ButtonListProps) => {
  const [curIndex, setIcurIndex] = useState(0);
  return (
    <Container>
      {isAlphabetLearningPage ? (
        Alphabet.map((alpha: string, index: number) => {
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
      ) : (
        <></>
      )}
    </Container>
  );
};

export default ButtonList;
