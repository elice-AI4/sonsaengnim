import React from "react";
import {
  MainBackGround,
  ServiceBox,
  MoveButton,
  ServiceImg,
} from "./index.style";
import StudyLogo from "./study.png";
import GameLogo from "./game.png";
import SearchLogo from "./search.png";
import { useAtom } from "jotai";
import { reg, userAtom } from "../../../state";

function Main() {
  const [user, setUser] = useAtom(userAtom);
  console.log(user);
  return (
    <>
      <MainBackGround>
        <ServiceBox color={"#FF7F50"}>
          <ServiceImg
            src={StudyLogo}
            style={{ paddingLeft: "65px" }}
          ></ServiceImg>
          {/* <a href='https://kr.freepik.com/vectors/book'>Book 벡터는 pch.vector - kr.freepik.com가 제작함</a> */}
          <h2>알파벳 수어를 배우러 가볼까요?</h2>
          <MoveButton>공부하러 가기</MoveButton>
        </ServiceBox>
        <ServiceBox color={"#FFD700"}>
          <ServiceImg src={GameLogo}></ServiceImg>
          {/* <a href='https://kr.freepik.com/vectors/wood'>Wood 벡터는 pch.vector - kr.freepik.com가 제작함</a> */}
          <h2>공부한 내용을 확인해볼까요?</h2>
          <MoveButton>게임하러 가기</MoveButton>
        </ServiceBox>
        <ServiceBox color={"#6495ED"}>
          <ServiceImg src={SearchLogo}></ServiceImg>
          {/* <a href='https://kr.freepik.com/vectors/school'>School 벡터는 pch.vector - kr.freepik.com가 제작함</a> */}
          <h2>찾고싶은 내용이 있나요?</h2>
          <MoveButton>검색하러 가기</MoveButton>
        </ServiceBox>
      </MainBackGround>
    </>
  );
}

export default Main;
