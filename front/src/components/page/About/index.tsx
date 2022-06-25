import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AboutContainer,
  AboutMainPage,
  FirstImg,
  FirstSectionLeft,
  FirstSectionRight,
  LeftSection,
  RightSection,
  SecondImg,
  SecondSectionLeft,
  Section,
  ThirdImg,
  ThirdSectionLeft,
  ThirdSectionRight,
} from "./index.style";
import imgAboutMainPage from "../../../src_assets/about/imgAboutMainPage.jpg";
import ScrollList from "../../scrollList/ScrollList";

const scrollNames = ["수화", "지화", "손생님"];

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
              <h1>Hello! (수화 이미지로 보여줄까..?)</h1>
              <h1></h1>
            </FirstSectionRight>
          </Section>
          <Section
            ref={section_1}
            className={curIndex === 1 ? "target" : "non-target"}
          >
            <SecondSectionLeft>
              <SecondImg src={imgAboutMainPage} alt="baby studying" />
            </SecondSectionLeft>
            <RightSection></RightSection>
          </Section>
          <Section
            ref={section_2}
            className={curIndex === 2 ? "target" : "non-target"}
          >
            <ThirdSectionLeft>
              <ThirdImg src={imgAboutMainPage} alt="baby studying" />
            </ThirdSectionLeft>
            <ThirdSectionRight></ThirdSectionRight>
          </Section>
        </AboutMainPage>
      </AboutContainer>
    </>
  );
};

export default About;
