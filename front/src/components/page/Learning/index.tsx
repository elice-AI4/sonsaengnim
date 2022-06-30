import React from "react";
import { useLocation, useNavigate } from "react-router";
import { learningCopyRights } from "../../copyRights/copyRights";
import Footer from "../../Footer";
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
import ReactTooltip from "react-tooltip";

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
        <AlphabetButton
          onClick={handleClickAlphabet}
          data-tip="learning-alphabet"
          data-for="learning-alphabet"
        >
          <ReactTooltip id="learning-alphabet">
            <video autoPlay width="400" muted loop>
              <source
                src="http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20160325/286089/MOV000286853_700X466.mp4"
                type="video/mp4"
              />
            </video>
            <p style={{ textAlign: "right" }}>출처: 국립국어원</p>
          </ReactTooltip>
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
          <div></div>
        </AlphabetButton>
        <WordButton
          onClick={handleClickWord}
          data-tip="learning-word"
          data-for="learning-word"
        >
          <ReactTooltip id="learning-word">
            <video autoPlay width="400" muted loop>
              <source
                src="http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191028/631991/MOV000251028_700X466.mp4"
                type="video/mp4"
              />
            </video>
            <p style={{ textAlign: "right" }}>출처: 국립국어원</p>
          </ReactTooltip>
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
        <Footer
          aLinks={learningCopyRights.aLinks}
          contents={learningCopyRights.contents}
        />
      </ContentsContainer>
    </LearningContainer>
  );
};

export default Learning;
