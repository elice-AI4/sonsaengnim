import React from "react";
import LearningTemplate from "../LearningTemplate";
import { imgSrc } from "../learningData";

const Word = () => {
  return (
    <LearningTemplate imgs={imgSrc} title="여러 단어를 함께 알아가 볼까요?" />
  );
};

export default Word;
