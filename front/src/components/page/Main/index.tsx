import React, { useEffect } from "react";
import {
  MainBackGround,
  ServiceBox,
  MoveButton,
  ServiceImg,
} from "./index.style";
import StudyLogo from "./study.png";
import GameLogo from "./game.png";
import SearchLogo from "./search.png";
import { useNavigate } from "react-router";
import ReactTooltip from "react-tooltip";
import Footer from "../../Footer";
import {
  beaverCopyRights,
  foxCopyRights,
  earthwormCopyRights,
} from "../../copyRights/copyRights";
import { useAtom } from "jotai";
import { webcamExistAtom } from "../../../state";

function Main() {
  const navigate = useNavigate();
  const [, setWebcamExist] = useAtom(webcamExistAtom);
  const handleClickButton = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    async function getMedia() {
      let stream = null;

      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        console.log(stream);
        if (stream !== null) {
          setWebcamExist(true);
        }
        /* 스트림 사용 */
      } catch (err) {
        /* 오류 처리 */
        setWebcamExist(false);
      }
    }
    getMedia();
  }, []);
  return (
    <MainBackGround>
      <ServiceBox color={"#FF7F50"}>
        <ServiceImg
          src={StudyLogo}
          style={{ paddingLeft: "65px" }}
        ></ServiceImg>
        <h2>알파벳 수어를 배우러 가볼까요?</h2>
        <MoveButton
          onClick={() => handleClickButton("learning")}
          data-tip="main-learning"
          data-for="main-learning"
        >
          공부하러 가기
          <ReactTooltip id="main-learning" place="bottom">
            <video autoPlay width="400" muted loop>
              <source
                src="http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20200812/728438/MOV000248732_700X466.mp4"
                type="video/mp4"
              />
            </video>
            <p style={{ textAlign: "right" }}>출처: 국립국어원</p>
          </ReactTooltip>
        </MoveButton>
        <Footer
          aLinks={foxCopyRights.aLinks}
          contents={foxCopyRights.contents}
        />
      </ServiceBox>
      <ServiceBox color={"#FFD700"}>
        <ServiceImg src={GameLogo}></ServiceImg>
        <h2>공부한 내용을 확인해 볼까요?</h2>
        <MoveButton
          onClick={() => handleClickButton("quiz")}
          data-tip="main-quiz"
          data-for="main-quiz"
        >
          게임하러 가기
          <ReactTooltip id="main-quiz" place="bottom">
            <video autoPlay width="400" muted loop>
              <source
                src="http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20160325/271687/MOV000273302_700X466.mp4"
                type="video/mp4"
              />
            </video>
            <p style={{ textAlign: "right" }}>출처: 국립국어원</p>
          </ReactTooltip>
        </MoveButton>
        <Footer
          aLinks={beaverCopyRights.aLinks}
          contents={beaverCopyRights.contents}
        />
      </ServiceBox>
      <ServiceBox color={"#6495ED"}>
        <ServiceImg src={SearchLogo}></ServiceImg>
        <h2>찾고 싶은 내용이 있나요?</h2>
        <MoveButton
          onClick={() => handleClickButton("search")}
          data-tip="main-search"
          data-for="main-search"
        >
          검색하러 가기
        </MoveButton>
        <ReactTooltip id="main-search" place="bottom">
          <video autoPlay width="400" muted loop>
            <source
              src="http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20160325/251010/MOV000262948_700X466.mp4"
              type="video/mp4"
            />
          </video>
          <p style={{ textAlign: "right" }}>출처: 국립국어원</p>
        </ReactTooltip>
        <Footer
          aLinks={earthwormCopyRights.aLinks}
          contents={earthwormCopyRights.contents}
        />
      </ServiceBox>
    </MainBackGround>
  );
}

export default Main;
