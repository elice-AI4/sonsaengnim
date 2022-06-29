import React from "react";
import { RankBox, TropyImg, RankBoard } from "./index.style";
import "./rank.css";

function Rank() {
  const rank = [
    { name: "치킨", score: "100점", time: "3분 30초" },
    { name: "치킨", score: "100점", time: "3분 30초" },
    { name: "치킨", score: "100점", time: "3분 30초" },
    { name: "치킨", score: "100점", time: "3분 30초" },
    { name: "치킨", score: "100점", time: "3분 30초" },
    { name: "치킨", score: "100점", time: "3분 30초" },
    { name: "치킨", score: "100점", time: "3분 30초" },
    { name: "치킨", score: "100점", time: "3분 30초" },
    { name: "치킨", score: "100점", time: "3분 30초" },
    { name: "치킨", score: "100점", time: "3분 30초" },
  ];
  return (
    <RankBox>
      <TropyImg src={`${process.env.PUBLIC_URL}/rank/tropy.jpg`}></TropyImg>
      <RankBoard rankBoardImg={`${process.env.PUBLIC_URL}/rank/blackboard.png`}>
        <div>
          {rank.map((data, index) => (
            <h2 className="rankfont" key={index}>{`${index + 1}  ${data.name} ${
              data.score
            } ${data.time}`}</h2>
          ))}
        </div>
      </RankBoard>
    </RankBox>
  );
}

export default Rank;
