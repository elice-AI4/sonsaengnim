import React from "react";
import {
  CardContainer,
  DescriptionContainer,
  H1,
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
    <>
      <TemplateContainer>
        <DescriptionContainer>
          <H1>{title}</H1>
          <Underline />
          {children && <InputContainer>{children}</InputContainer>}
        </DescriptionContainer>
        <CardContainer>
          {imgs.map((img, index) => {
            return (
              <CardTemplate src={img.src} alt={img.alt} key={`img ${index}`} />
            );
          })}
          <CardTemplate src="" alt="" />
          <CardTemplate src="" alt="" />
          <CardTemplate src="" alt="" />
          <CardTemplate src="" alt="" />
        </CardContainer>
      </TemplateContainer>
    </>
  );
};

export default LearningTemplate;
