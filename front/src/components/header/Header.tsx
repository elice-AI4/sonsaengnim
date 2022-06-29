import React from "react";
import { ROUTE } from "../route/route";
import {
  TitleContainer,
  List,
  Navbar,
  StyledLink,
  HomeLink,
  ThickLine,
  ThinLine,
  Offset,
} from "./Header.style";
import title from "../../src_assets/navbar/title.png";
import { useLocation } from "react-router";
import { useAtom } from "jotai";
import { loginAtom } from "../../state";

const Header = () => {
  const [login] = useAtom(loginAtom);
  const { pathname } = useLocation();
  const checkPathname = (pathname: string) => {
    if (
      pathname === `/${ROUTE.LEARNING.link}/${ROUTE.ALPHABET.link}` ||
      pathname === `/${ROUTE.LEARNING.link}/${ROUTE.WORD.link}`
    ) {
      return true;
    }
  };

  const checkDrawOffset = (pathname: string) => {
    if (pathname.includes("learning") || pathname.includes("about")) {
      return true;
    }
  };
  return (
    <>
      <Navbar>
        <TitleContainer>
          <HomeLink to="/">
            <img src={title} alt="title 손생님" width="180px" height="100%" />
          </HomeLink>
        </TitleContainer>
        <List>
          {!login && (
            <>
              <StyledLink to={ROUTE.LOGIN.link}>로그인</StyledLink>
              <StyledLink to={ROUTE.REGISTER.link}>회원가입</StyledLink>
            </>
          )}

          <StyledLink to={ROUTE.ABOUT.link}>ABOUT</StyledLink>
          <StyledLink to={ROUTE.LEARNING.link}>학습</StyledLink>
          <StyledLink to={ROUTE.QUIZ.link}>퀴즈</StyledLink>
        </List>
      </Navbar>
      {checkPathname(pathname) === true ? (
        <>
          <ThickLine />
          <ThinLine />
        </>
      ) : (
        <></>
      )}
      {checkDrawOffset(pathname) === true ? (
        <>
          <Offset />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Header;
