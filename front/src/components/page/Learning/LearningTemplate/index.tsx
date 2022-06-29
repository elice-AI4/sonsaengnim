import React, { useRef } from "react";
import {
  ButtonLink,
  CardContainer,
  ContentContainer,
  DescriptionContainer,
  H1,
  TemplateContainer,
} from "./index.style";
import CardTemplate from "./CardTemplate";
import { ReactComponent as Underline } from "../../../../src_assets/Underline.svg";
import { InputContainer } from "../Word/index.style";
import { motion } from "framer-motion";
import { useLocation } from "react-router";
import { ROUTE } from "../../../route/route";
import Footer from "../../../Footer";
import { learningTemplatecopyRights } from "../../../copyRights/copyRights";

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
        <ButtonLink to={`${pathname}/${ROUTE.GAME.link}/${ROUTE.PLAY.link}`}>
          따라해보기
        </ButtonLink>
      </ContentContainer>
      <Footer
        aLinks={learningTemplatecopyRights.aLinks}
        contents={learningTemplatecopyRights.contents}
      />
    </TemplateContainer>
  );
};

export default LearningTemplate;
