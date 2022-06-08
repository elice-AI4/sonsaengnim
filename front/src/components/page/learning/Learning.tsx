import React from "react";
import {
  AlphabetContainer,
  ImageA,
  ImageB,
  ImageC,
  LearningContainer,
  ContentsContainer,
  ImageWord,
  AlphabetButton,
  WordButton,
  WordContainer,
} from "./Learning.style";

const Learning = () => {
  return (
    <LearningContainer>
      <ContentsContainer>
        <AlphabetButton>
          <AlphabetContainer>
            <ImageA
              src={process.env.PUBLIC_URL + "/alphabet/A.png"}
              alt="alphabet A"
              width="100px"
              height="100px"
            />
            <ImageB
              src={process.env.PUBLIC_URL + "/alphabet/B.png"}
              alt="alphabet B"
              width="100px"
              height="100px"
            />
            <ImageC
              src={process.env.PUBLIC_URL + "/alphabet/C.png"}
              alt="alphabet C"
              width="100px"
              height="100px"
            />
          </AlphabetContainer>
          <h1>알파벳</h1>
        </AlphabetButton>
        <WordButton>
          <WordContainer>
            <ImageWord
              src={process.env.PUBLIC_URL + "/alphabet/word.png"}
              alt="alphabet C"
              width="350px"
              height="100px"
            />
          </WordContainer>
          <h1>단어</h1>
        </WordButton>
      </ContentsContainer>
    </LearningContainer>
  );
};

export default Learning;
