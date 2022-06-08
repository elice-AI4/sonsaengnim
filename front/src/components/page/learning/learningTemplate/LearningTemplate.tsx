import React from "react";
import {
  CardContainer,
  DescriptionContainer,
  TemplateContainer,
} from "./LearningTemplate.style";
import CardTemplate from "./CardTemplate";
import { ReactComponent as Underline } from "../../../../src_assets/Underline.svg";
import { InputContainer } from "../word/Word.style";

interface LearningTemplateProps {
  imgs: {
    src: string;
    alt: string;
  }[];
  title: string;
  children?: React.ReactElement;
}

const LearningTemplate = ({ imgs, title, children }: LearningTemplateProps) => {
  return (
    <TemplateContainer>
      {children && <InputContainer>{children}</InputContainer>}
      <DescriptionContainer>
        <h1>{title}</h1>
        <Underline />
      </DescriptionContainer>
      <CardContainer>
        {imgs.map((img, index) => {
          return (
            <CardTemplate src={img.src} alt={img.alt} key={`img ${index}`} />
          );
        })}
      </CardContainer>
    </TemplateContainer>
  );
};

export default LearningTemplate;
