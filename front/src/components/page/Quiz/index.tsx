import React from "react";
import { useNavigate } from "react-router-dom";
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
} from "./index.style";
import imgQuiz from "../../../src_assets/quiz.png";
import imgA from "../../../src_assets/alphabet/A.png";
import imgE from "../../../src_assets/alphabet/E.png";
import imgH from "../../../src_assets/alphabet/H.png";
import imgJ from "../../../src_assets/alphabet/J.png";
import imgS from "../../../src_assets/alphabet/S.png";
import imgX from "../../../src_assets/alphabet/X.png";
import imgY from "../../../src_assets/alphabet/Y.png";
import { ROUTE } from "../../route/route";
import Footer from "../../Footer";
import { quizCopyRights } from "../../copyRights/copyRights";
import { useAtom } from "jotai";
import { webcamExistAtom } from "../../../state";
import ReactTooltip from "react-tooltip";
const imgSize = {
  width: "130px",
  height: "130px",
};

const Quiz = () => {
  const [webcamExist] = useAtom(webcamExistAtom);
  const navigate = useNavigate();
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
          <Button
            onClick={() => {
              if (webcamExist === true) {
                navigate(`${ROUTE.GAME.link}`);
              }
            }}
            data-tip="quiz-webcamExist"
            data-for="quiz-webcamExist"
          >
            퀴즈 맞추러 가기
            {webcamExist === false && (
              <>
                <ReactTooltip id="quiz-webcamExist">
                  <h2>웹캠이 없습니다.</h2>
                </ReactTooltip>
              </>
            )}
          </Button>
        </ButtonCotainer>
      </ImageContainer>
      <Footer
        aLinks={quizCopyRights.aLinks}
        contents={quizCopyRights.contents}
      />
    </QuizContainer>
  );
};

export default Quiz;
