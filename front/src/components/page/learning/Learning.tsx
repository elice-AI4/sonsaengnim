import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
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
  Circle,
} from "./Learning.style";

const imgSize = {
  width: "100px",
  height: "100px",
};

interface mousePoint {
  clientX: string;
  clientY: string;
}

const Learning = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [mousePoint, setMousePoint] = useState<mousePoint>({
    clientX: "0",
    clientY: "0",
  });
  const [isClick, setIsClick] = useState(false);

  const handleClickAlphabet = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsClick(true);

    setMousePoint({
      clientX: e.clientX.toString(),
      clientY: e.clientY.toString(),
    });
  };

  const navigateAlphabet = () => {
    return setTimeout(() => {
      navigate(`${pathname}/alphabet`);
    }, 1000);
  };

  const handleClickWord = () => {
    navigate(`${pathname}/word`);
  };

  useEffect(() => {
    const timer = navigateAlphabet();
    return () => clearTimeout(timer);
  });

  return (
    <>
      <Circle {...mousePoint} isClick={isClick} />
      <LearningContainer>
        <ContentsContainer>
          <AlphabetButton onClick={handleClickAlphabet}>
            <AlphabetContainer>
              <ImageA
                src={process.env.PUBLIC_URL + "/alphabet/alpha_1.png"}
                alt="alphabet A"
                width={imgSize.width}
                height={imgSize.height}
              />
              <ImageB
                src={process.env.PUBLIC_URL + "/alphabet/alpha_2.png"}
                alt="alphabet B"
                width={imgSize.width}
                height={imgSize.height}
              />
              <ImageC
                src={process.env.PUBLIC_URL + "/alphabet/alpha_3.png"}
                alt="alphabet C"
                width={imgSize.width}
                height={imgSize.height}
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
    </>
  );
};

export default Learning;
