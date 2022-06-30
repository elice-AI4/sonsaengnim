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
import ReactTooltip from "react-tooltip";

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
              <StyledLink
                to={ROUTE.LOGIN.link}
                data-tip="header-login"
                data-for="header-login"
              >
                로그인
                <ReactTooltip id="header-login" place="bottom">
                  <video autoPlay width="300" muted loop>
                    <source
                      src="http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20160325/268749/MOV000272243_700X466.mp4"
                      type="video/mp4"
                    />
                  </video>
                  <p style={{ textAlign: "right" }}>출처: 국립국어원</p>
                </ReactTooltip>
              </StyledLink>
              <StyledLink
                to={ROUTE.REGISTER.link}
                data-tip="header-register"
                data-for="header-register"
              >
                회원가입
                <ReactTooltip id="header-register" place="bottom">
                  <video autoPlay width="300" muted loop>
                    <source
                      src="http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191015/627638/MOV000249914_700X466.mp4"
                      type="video/mp4"
                    />
                  </video>
                  <p style={{ textAlign: "right" }}>출처: 국립국어원</p>
                </ReactTooltip>
              </StyledLink>
            </>
          )}

          <StyledLink to={ROUTE.ABOUT.link}>ABOUT</StyledLink>
          <StyledLink
            to={ROUTE.LEARNING.link}
            data-tip="header-learning"
            data-for="header-learning"
          >
            학습
            <ReactTooltip id="header-learning" place="bottom">
              <video autoPlay width="300" muted loop>
                <source
                  src="http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20200812/728438/MOV000248732_700X466.mp4"
                  type="video/mp4"
                />
              </video>
              <p style={{ textAlign: "right" }}>출처: 국립국어원</p>
            </ReactTooltip>
          </StyledLink>
          <StyledLink
            to={ROUTE.QUIZ.link}
            data-tip="header-quiz"
            data-for="header-quiz"
          >
            퀴즈
            <ReactTooltip id="header-quiz" place="bottom">
              <video autoPlay width="300" muted loop>
                <source
                  src="http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20160325/271687/MOV000273302_700X466.mp4"
                  type="video/mp4"
                />
              </video>
              <p style={{ textAlign: "right" }}>출처: 국립국어원</p>
            </ReactTooltip>
          </StyledLink>
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
