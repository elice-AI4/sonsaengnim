import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AboutContainer,
  AboutMainPage,
  FirstSectionLeft,
  FirstSectionRight,
  LeftSection,
  Section,
} from "./index.style";
import imgAboutMainPage from "../../../src_assets/about/imgAboutMainPage.jpg";
import ScrollList from "../../scrollList/ScrollList";

const scrollNames = ["수화", "지화", "손선생"];

const About = () => {
  const [section, setSection] = useState<HTMLElement[]>([]);
  const section_0 = useRef<HTMLElement>(null);
  const section_1 = useRef<HTMLElement>(null);
  const section_2 = useRef<HTMLElement>(null);
  const [curIndex, setCurIndex] = useState(0);

  const handleOnClick = (num: number) => {
    console.log(num);
    const top = section[num]?.offsetTop - 80;
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
        y > section[i]?.offsetTop - height &&
        y <= section[i]?.offsetTop - height + section[i]?.offsetHeight
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
    const arr = [
      section_0.current,
      section_1.current,
      section_2.current,
    ] as HTMLElement[];

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
              <img
                src={imgAboutMainPage}
                alt="baby studying"
                width="800px"
                height="500px"
              />
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
            <img
              src={imgAboutMainPage}
              alt="baby studying"
              width="1200px"
              height="800px"
            />
          </Section>
          <Section
            ref={section_2}
            className={curIndex === 2 ? "target" : "non-target"}
          >
            <img
              src={imgAboutMainPage}
              alt="baby studying"
              width="1200px"
              height="800px"
            />
          </Section>
        </AboutMainPage>
      </AboutContainer>
    </>
  );
};

export default About;
