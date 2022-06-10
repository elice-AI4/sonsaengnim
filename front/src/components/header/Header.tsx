import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../route/route";
import {
  TitleContainer,
  List,
  Navbar,
  StyledLink,
  Title,
} from "./Header.style";

const Header = () => {
  const navigate = useNavigate();
  const handleClickTitle = () => {
    navigate("/");
  };
  return (
    <Navbar>
      <TitleContainer onClick={handleClickTitle}>
        <Title>손선생</Title>
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
