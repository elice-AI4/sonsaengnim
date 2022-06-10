import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE } from "../route/route";
import { H1, List, Navbar, StyledLink, Title } from "./Header.style";

const Header = () => {
  const navigate = useNavigate();
  const handleClickTitle = () => {
    navigate("/");
  };
  return (
    <Navbar>
      <Title onClick={handleClickTitle}>
        <H1>손선생</H1>
      </Title>
      <List>
        <StyledLink to={ROUTE.LEARNING.link}>학습</StyledLink>
        <StyledLink to={ROUTE.QUIZ.link}>퀴즈</StyledLink>
      </List>
    </Navbar>
  );
};

export default Header;
