import React from "react";
import { AlphabetButton, Container } from "./AlphabetList.style";

const Alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]

const AlphabetList = () => {
  return <Container>
    {Alphabet.map((alpha, index) => {
      return <AlphabetButton key={`${alpha} index`}>{alpha}</AlphabetButton>
    })}
  </Container>
};

export default AlphabetList;
