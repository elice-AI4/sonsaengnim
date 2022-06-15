import React from "react";
import { AboutContainer, AboutMainPage } from "./index.style";
import imgAboutMainPage from "../../../src_assets/about/imgAboutMainPage.jpg";

const About = () => {
  return (
    <AboutContainer>
      <AboutMainPage>
        <img
          src={imgAboutMainPage}
          alt="baby studying"
          width="1200px"
          height="800px"
        />
      </AboutMainPage>
    </AboutContainer>
  );
};

export default About;
