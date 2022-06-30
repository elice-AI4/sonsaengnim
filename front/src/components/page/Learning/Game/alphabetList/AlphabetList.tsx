import React, { useState } from "react";
import { AlphabetButton, Container } from "./AlphabetList.style";

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

interface AlphabetListProps {
  handleSetAlphabet: (index: number) => void;
}

const AlphabetList = ({ handleSetAlphabet }: AlphabetListProps) => {
  const [curIndex, setIcurIndex] = useState(0);
  return (
    <Container>
      {Alphabet.map((alpha: string, index: number) => {
        return (
          <AlphabetButton
            key={`${alpha} ${index}`}
            onClick={() => {
              handleSetAlphabet(index);
              setIcurIndex(index);
            }}
            className={curIndex === index ? "target" : "non-target"}
          >
            {alpha}
          </AlphabetButton>
        );
      })}
    </Container>
  );
};

export default AlphabetList;
