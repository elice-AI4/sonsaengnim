import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AboutContainer,
  AboutMainPage,
  Description,
  FirstImg,
  FirstSectionLeft,
  FirstSectionRight,
  ImpactWord,
  SecondImg,
  SecondSectionLeft,
  SecondSectionRight,
  Section,
  StartLink,
  ThirdImg,
  ThirdSectionLeft,
  ThirdSectionRight,
} from "./index.style";
import imgAboutMainPage from "../../../src_assets/about/imgAboutMainPage.jpg";
import imgMotivation from "../../../src_assets/about/motivation.jpg";
import imgStart from "../../../src_assets/about/start.jpg";
import ScrollList from "../../scrollList/ScrollList";
import { ReactComponent as Arrow } from "../../../src_assets/highlights/Arrow 8.svg";
import { ReactComponent as Loop } from "../../../src_assets/highlights/Loop 5.svg";
import { ROUTE } from "../../route/route";

const scrollNames = ["소개", "동기", "시작"];

const About = () => {
  const [section, setSection] = useState<(HTMLElement | null)[]>([]);
  const section_0 = useRef<HTMLElement>(null);
  const section_1 = useRef<HTMLElement>(null);
  const section_2 = useRef<HTMLElement>(null);
  const [curIndex, setCurIndex] = useState(0);

  const handleOnClick = (num: number) => {
    let top = 0;
    if (num !== 0) {
      top = (section[num]?.offsetTop || 0) + 70;
    } else {
      top = section[num]?.offsetTop || 0;
    }

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  const handleScrollEvent = useCallback(() => {
    const y = window.scrollY;
    const height = window.innerHeight / 1.5;
    for (let i = 0; section.length; i++) {
      if (
        y > Number(section[i]?.offsetTop) - height &&
        y <=
          Number(section[i]?.offsetTop) -
            height +
            Number(section[i]?.offsetHeight)
      ) {
        setCurIndex(i);
        break;
      }
    }
  }, [section]);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, [handleScrollEvent]);

  useEffect(() => {
    const arr = [section_0.current, section_1.current, section_2.current];

    setSection([...arr]);
  }, []);
  return (
    <>
      <ScrollList
        handleOnClick={handleOnClick}
        scrollNames={scrollNames}
        curIndex={curIndex}
      />
      <AboutContainer>
        <AboutMainPage>
          <Section
            ref={section_0}
            className={curIndex === 0 ? "target" : "non-target"}
          >
            <FirstSectionLeft>
              <FirstImg src={imgAboutMainPage} alt="baby studying" />
            </FirstSectionLeft>
            <FirstSectionRight>
              <Description>
                영어를 배우고 싶어하는 <ImpactWord>유치부</ImpactWord>,
                <ImpactWord> 초등부</ImpactWord> 청각장애인이
              </Description>

              <Description>
                웹에서 <ImpactWord>지화</ImpactWord>를 학습하고 맞는지 확인까지
                할 수 있는
              </Description>
              <Description>
                실시간 인터렉티브 <ImpactWord>학습</ImpactWord> 사이트입니다.
              </Description>
            </FirstSectionRight>
          </Section>
          <Section
            ref={section_1}
            className={curIndex === 1 ? "target" : "non-target"}
          >
            <SecondSectionRight>
              <Description>손생님은...</Description>
              <Description>
                <ImpactWord>시각적 자료</ImpactWord>를 사용한 영어 학습을 위해
              </Description>
              <Description>
                <ImpactWord>장소</ImpactWord>와 <ImpactWord>시간</ImpactWord>에
                구애받지 않고 학습할 수 있기 위해
              </Description>
              <Description>
                <ImpactWord>즐겁게</ImpactWord> 학습 할 수 있기 위해
                탄생했습니다.
              </Description>
            </SecondSectionRight>
            <SecondSectionLeft>
              <SecondImg src={imgMotivation} alt="baby studying" />
            </SecondSectionLeft>
          </Section>
          <Section
            ref={section_2}
            className={curIndex === 2 ? "target" : "non-target"}
          >
            <ThirdSectionLeft>
              <ThirdImg src={imgStart} alt="baby studying" />
            </ThirdSectionLeft>
            <ThirdSectionRight>
              <Description>손생님과 함께</Description>
              <Description>
                재미있는 영어, 함께{" "}
                <StartLink to={`/${ROUTE.LEARNING.link}`}>
                  <ImpactWord>
                    시작
                    <Loop
                      style={{
                        position: "absolute",
                        left: "-15px",
                        top: "-25px",
                      }}
                    />
                  </ImpactWord>
                </StartLink>
                해요!
              </Description>
            </ThirdSectionRight>
          </Section>
        </AboutMainPage>
      </AboutContainer>
    </>
  );
};

export default About;
