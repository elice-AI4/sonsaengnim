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
  QuizImg,
  ButtonCotainer,
} from "./Quiz.style";
import imgQuiz from "../../../src_assets/quiz.png";
import imgA from "../../../src_assets/alphabet/A.png";
import imgE from "../../../src_assets/alphabet/E.png";
import imgH from "../../../src_assets/alphabet/H.png";
import imgJ from "../../../src_assets/alphabet/J.png";
import imgS from "../../../src_assets/alphabet/S.png";
import imgX from "../../../src_assets/alphabet/X.png";
import imgY from "../../../src_assets/alphabet/Y.png";

const imgSize = {
  width: "130px",
  height: "130px",
};

const Quiz = () => {
  return (
    <QuizContainer>
      <ImageContainer>
        <AImg
          src={imgA}
          width={imgSize.width}
          height={imgSize.height}
          alt="A"
        />
        <EImg
          src={imgE}
          width={imgSize.width}
          height={imgSize.height}
          alt="E"
        />
        <HImg
          src={imgH}
          width={imgSize.width}
          height={imgSize.height}
          alt="H"
        />
        <JImg
          src={imgJ}
          width={imgSize.width}
          height={imgSize.height}
          alt="J"
        />
        <SImg
          src={imgS}
          width={imgSize.width}
          height={imgSize.height}
          alt="S"
        />
        <XImg
          src={imgX}
          width={imgSize.width}
          height={imgSize.height}
          alt="X"
        />
        <YImg
          src={imgY}
          width={imgSize.width}
          height={imgSize.height}
          alt="Y"
        />
        <ButtonCotainer>
          <QuizImg src={imgQuiz} width="400px" height="120px" alt="quiz" />
          <Button>퀴즈 맞추러 가기</Button>
        </ButtonCotainer>
      </ImageContainer>
    </QuizContainer>
  );
};

export default Quiz;
