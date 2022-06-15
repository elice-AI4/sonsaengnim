import React, { RefObject, useRef } from "react";
import {
  Button,
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

interface LearningTemplateProps {
  imgs: {
    src: string;
    alt: string;
  }[];
  title: string;
  children?: React.ReactElement;
}

const LearningTemplate = ({ imgs, title, children }: LearningTemplateProps) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <TemplateContainer>
      <ContentContainer>
        <DescriptionContainer>
          <H1>{title}</H1>
          <Underline />
          {children && <InputContainer>{children}</InputContainer>}
        </DescriptionContainer>
        <MotionDiv>
          <motion.div ref={ref}>
            <CardContainer>
              {imgs.map((img, index) => {
                return (
                  <CardTemplate
                    src={img.src}
                    alt={img.alt}
                    key={`img ${index}`}
                    dragConstraints={ref}
                  />
                );
              })}

              <CardTemplate src="" alt="" />
              <CardTemplate src="" alt="" />
              <CardTemplate src="" alt="" />
              <CardTemplate src="" alt="" />
            </CardContainer>
          </motion.div>
        </MotionDiv>
        <Button>따라해보기</Button>
      </ContentContainer>
    </TemplateContainer>
  );
};

export default LearningTemplate;
