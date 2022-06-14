import React from "react";
import { ROUTE } from "../route/route";
import {
  TitleContainer,
  List,
  Navbar,
  StyledLink,
  Title,
  HomeLink,
} from "./Header.style";
import title from "../../src_assets/navbar/title.png";

const Header = () => {
  return (
    <Navbar>
      <TitleContainer>
        <HomeLink to="/">
          <img src={title} alt="title 손생님" width="150px" height="100%" />
        </HomeLink>
      </TitleContainer>
      <List>
        <StyledLink to={ROUTE.ABOUT.link}>ABOUT</StyledLink>
        <StyledLink to={ROUTE.LEARNING.link}>학습</StyledLink>
        <StyledLink to={ROUTE.QUIZ.link}>퀴즈</StyledLink>
      </List>
    </Navbar>
  );
};

export default Header;
