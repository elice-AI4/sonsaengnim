import React from "react";
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
import { useLocation } from "react-router";
import { ROUTE } from "../../../route/route";
import Footer from "../../../Footer";
import { learningTemplatecopyRights } from "../../../copyRights/copyRights";
import ReactTooltip from "react-tooltip";
import { useAtom } from "jotai";
import { webcamExistAtom } from "../../../../state";

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
  const [webcamExist] = useAtom(webcamExistAtom);
  return (
    <TemplateContainer>
      <ContentContainer>
        <DescriptionContainer>
          <H1>{title}</H1>
          <Underline />
          {children && <InputContainer>{children}</InputContainer>}
        </DescriptionContainer>
        {webcamExist ? (
          <ButtonLink
            to={`${pathname}/${ROUTE.GAME.link}/${ROUTE.PLAY.link}`}
            data-tip="learningTemplate-follow"
            data-for="learningTemplate-follow"
          >
            따라해 보기
            <ReactTooltip id="learningTemplate-follow">
              <video autoPlay width="400" muted loop>
                <source
                  src="http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20200811/727699/MOV000240877_700X466.mp4"
                  type="video/mp4"
                />
              </video>
              <p style={{ textAlign: "right" }}>출처: 국립국어원</p>
            </ReactTooltip>
          </ButtonLink>
        ) : (
          <ButtonLink to={`${pathname}/${ROUTE.GAME.link}/${ROUTE.NOCAM.link}`}>
            학습하러 가기
          </ButtonLink>
        )}
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

        <Footer
          aLinks={learningTemplatecopyRights.aLinks}
          contents={learningTemplatecopyRights.contents}
        />
      </ContentContainer>
    </TemplateContainer>
  );
};

export default LearningTemplate;
