import React, { useState } from "react";
import { ROUTE } from "../route/route";
import hamburger from "../../src_assets/hamburger/hamburger.png";

import {
  TitleContainer,
  List,
  Navbar,
  StyledLink,
  HomeLink,
  ThickLine,
  ThinLine,
  Offset,
  WelcomeBox,
  Hamburder,
} from "./Header.style";
import title from "../../src_assets/navbar/title.png";
import { useLocation } from "react-router";
import { useAtom } from "jotai";
import { loginAtom, userAtom } from "../../state";
import ReactTooltip from "react-tooltip";

const Header = () => {
  const [login, setLogin] = useAtom(loginAtom);
  const [user, setUser] = useAtom(userAtom);
  const { pathname } = useLocation();
  console.log(user);
  const HandleLogout = () => {
    setLogin(false);
    setUser({
      email: "",
      username: "",
      password: "",
      token: "",
      point: 0,
      myDonation: 0,
    });
  };
  const [fold, setFold] = useState(true);
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
        <Hamburder
          src={hamburger}
          alt="navber 접이 버튼"
          onClick={() => {
            setFold(!fold);
          }}
        />
        <TitleContainer>
          <HomeLink to="/">
            <img src={title} alt="title 손생님" width="180px" height="100%" />
          </HomeLink>
          {login && (
            <WelcomeBox>{`${user.username}님 환영합니다! ${String(
              user.point
            ).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} 점`}</WelcomeBox>
          )}
        </TitleContainer>
        <List fold={fold}>
          {!login ? (
            <>
              <StyledLink
                to={ROUTE.LOGIN.link}
                data-tip="header-login"
                data-for="header-login"
              >
                로그인
                <ReactTooltip
                  key="header-login"
                  id="header-login"
                  place="bottom"
                >
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
                <ReactTooltip
                  key="header-register"
                  id="header-register"
                  place="bottom"
                >
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
          ) : (
            <>
              <StyledLink
                onClick={HandleLogout}
                to={"/"}
                data-tip="header-logout"
                data-for="header-logout"
              >
                로그아웃
                <ReactTooltip id="header-logout" place="bottom">
                  <video autoPlay width="300" muted loop>
                    <source
                      src="http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20160325/268746/MOV000272234_700X466.mp4"
                      type="video/mp4"
                    />
                  </video>
                  <p style={{ textAlign: "right" }}>출처: 국립국어원</p>
                </ReactTooltip>
              </StyledLink>
              <StyledLink
                to={ROUTE.DONATION.link}
                data-tip="header-educationContent"
                data-for="header-educationContent"
              >
                학습이력
                <ReactTooltip id="header-educationContent" place="bottom">
                  <video autoPlay width="300" muted loop>
                    <source
                      src="http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191028/631910/MOV000241683_700X466.mp4"
                      type="video/mp4"
                    />
                  </video>
                  <p style={{ textAlign: "right" }}>출처: 국립국어원</p>
                </ReactTooltip>
              </StyledLink>
            </>
          )}

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
          <StyledLink
            to={ROUTE.RANK.link}
            data-tip="header-rank"
            data-for="header-rank"
          >
            순위
            <ReactTooltip id="header-rank" place="bottom">
              <video autoPlay width="300" muted loop>
                <source
                  src="http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191025/630930/MOV000253300_700X466.mp4"
                  type="video/mp4"
                />
              </video>
              <p style={{ textAlign: "right" }}>출처: 국립국어원</p>
            </ReactTooltip>
          </StyledLink>
          <StyledLink
            to={ROUTE.ABOUT.link}
            data-tip="header-about"
            data-for="header-about"
          >
            소개
            <ReactTooltip id="header-about" place="bottom">
              <video autoPlay width="300" muted loop>
                <source
                  src="http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191022/630035/MOV000234719_700X466.mp4"
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
