import React from "react";
import LearningTemplate from "../LearningTemplate";
import { wordImgs } from "../learningData";
import { Input } from "./index.style";

const Word = () => {
  return (
    <LearningTemplate imgs={wordImgs} title="여러 단어를 함께 알아가 볼까요?">
      <Input type="text" placeholder="단어를 입력해 볼까요?" />
    </LearningTemplate>
  );
};

export default Word;
