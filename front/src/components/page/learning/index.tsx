import React from "react";
import { useLocation, useNavigate } from "react-router";
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
  ButtonTitle,
} from "./index.style";

const Learning = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleClickAlphabet = () => {
    navigate(`${pathname}/alphabet`);
  };

  const handleClickWord = () => {
    navigate(`${pathname}/word`);
  };

  return (
    <LearningContainer>
      <ContentsContainer />
      <ContentsContainer>
        <AlphabetButton onClick={handleClickAlphabet}>
          <AlphabetContainer>
            <ImageA
              src={process.env.PUBLIC_URL + "/alphabet/alpha_1.png"}
              alt="alphabet A"
            />
            <ImageB
              src={process.env.PUBLIC_URL + "/alphabet/alpha_2.png"}
              alt="alphabet B"
            />
            <ImageC
              src={process.env.PUBLIC_URL + "/alphabet/alpha_3.png"}
              alt="alphabet C"
            />
          </AlphabetContainer>
          <ButtonTitle>알파벳</ButtonTitle>
        </AlphabetButton>
        <WordButton onClick={handleClickWord}>
          <WordContainer>
            <ImageWord
              src={process.env.PUBLIC_URL + "/alphabet/word.png"}
              alt="alphabet C"
              width="350px"
              height="100px"
            />
          </WordContainer>
          <ButtonTitle>단어</ButtonTitle>
        </WordButton>
      </ContentsContainer>
    </LearningContainer>
  );
};

export default Learning;
