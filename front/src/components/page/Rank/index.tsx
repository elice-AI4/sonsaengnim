import React, { useEffect, useState } from "react";
import { RankBox, TropyImg, RankBoard } from "./index.style";
import Footer from "../../Footer";
import { rankBackgroundCopyRights } from "../../copyRights/copyRights";
import * as Api from "../../../api";
import "./rank.css";

interface RankState {
  username: string;
  score: number;
  time: number;
}

function Rank() {
  const [rankList, setRankList] = useState<Array<RankState>>([]);
  useEffect(() => {
    Api.get("scores/topten").then((res) => {
      setRankList((): Array<RankState> => {
        const newList = res.data;
        for (let i = 0; i < res.data.length; i++) {
          newList[i].username = newList[i].username.split("-")[0];
        }
        return newList;
      });
      console.log(rankList);
    });
  }, []);

  return (
    <RankBox rankBack={`${process.env.PUBLIC_URL}/rank/quizback2.jpg`}>
      <TropyImg src={`${process.env.PUBLIC_URL}/rank/tropy.png`}></TropyImg>
      <RankBoard rankBoardImg={`${process.env.PUBLIC_URL}/rank/blackboard.png`}>
        <div>
          {rankList.length > 0 &&
            rankList.map((data, index) => (
              <h2 className="rankfont" key={index}>{`${
                index + 1
              }등\u00A0\u00A0 ${data.username} \u00A0\u00A0 ${
                data.score
              }점 \u00A0\u00A0 ${Math.floor(data.time / 60)}분 ${
                data.time % 60
              }초`}</h2>
            ))}
        </div>
      </RankBoard>
      <Footer
        aLinks={rankBackgroundCopyRights.aLinks}
        contents={rankBackgroundCopyRights.contents}
      />
    </RankBox>
  );
}

export default Rank;
