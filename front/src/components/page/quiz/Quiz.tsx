import React from "react";
import {
  Button,
  ImageContainer,
  QuizContainer,
  AImg,
  EImg,
  HImg,
  JImg,
  SImg,
  XImg,
  YImg,
  QuizeImg,
  ButtonCotainer,
} from "./Quiz.style";
import quiz from "../../../src_assets/quiz.png";
import A from "../../../src_assets/alphabet/A.png";
import E from "../../../src_assets/alphabet/E.png";
import H from "../../../src_assets/alphabet/H.png";
import J from "../../../src_assets/alphabet/J.png";
import S from "../../../src_assets/alphabet/S.png";
import X from "../../../src_assets/alphabet/X.png";
import Y from "../../../src_assets/alphabet/Y.png";

const imgSize = {
  width: "100px",
  height: "100px",
};

const Quiz = () => {
  return (
    <QuizContainer>
      <ImageContainer>
        <AImg src={A} width={imgSize.width} height={imgSize.height} alt="A" />
        <EImg src={E} width={imgSize.width} height={imgSize.height} alt="E" />
        <HImg src={H} width={imgSize.width} height={imgSize.height} alt="H" />
        <JImg src={J} width={imgSize.width} height={imgSize.height} alt="J" />
        <SImg src={S} width={imgSize.width} height={imgSize.height} alt="S" />
        <XImg src={X} width={imgSize.width} height={imgSize.height} alt="X" />
        <YImg src={Y} width={imgSize.width} height={imgSize.height} alt="Y" />
        <ButtonCotainer>
          <QuizeImg src={quiz} width="400px" height="120px" alt="quiz" />
          <Button>퀴즈 맞추러 가기</Button>
        </ButtonCotainer>
      </ImageContainer>
    </QuizContainer>
  );
};

export default Quiz;
