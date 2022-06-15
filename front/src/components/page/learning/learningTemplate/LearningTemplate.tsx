import React, { useRef } from "react";
import {
  Button,
  ButtonLink,
  CardContainer,
  ContentContainer,
  DescriptionContainer,
  H1,
  MotionDiv,
  TemplateContainer,
} from "./LearningTemplate.style";
import CardTemplate from "./CardTemplate";
import { ReactComponent as Underline } from "../../../../src_assets/Underline.svg";
import { InputContainer } from "../word/Word.style";
import { motion } from "framer-motion";
import { useLocation } from "react-router";

interface LearningTemplateProps {
  imgs: {
    src: string;
    alt: string;
  }[];
  title: string;
  children?: React.ReactElement;
}

const LearningTemplate = ({ imgs, title, children }: LearningTemplateProps) => {
  const { pathname } = useLocation();

  console.log(pathname);

  return (
    <TemplateContainer>
      <ContentContainer>
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
        <Button>
          <ButtonLink to={pathname}>따라해보기</ButtonLink>
        </Button>
      </ContentContainer>
    </TemplateContainer>
  );
};

export default LearningTemplate;
