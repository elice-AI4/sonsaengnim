import React, { useState } from "react";
import Modal from "../../Modal";
import { Score } from "./index";
import {
  RecordBoard,
  RecordName,
  RecordButton,
  RecordScore,
  RecordBox,
} from "./index.style";
import { useAtom } from "jotai";
import { loginAtom, userAtom, saveTimeAtom } from "../../../../state";

interface RecordProps {
  rank: boolean;
  score: Score;
  handleInitial(): void;
  //   closeRecord(): void;
}
const ModalStyle = {
  width: "1000px",
  height: "900px",
  display: "flex",
  //   flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

function RecordModal({ rank, score, handleInitial }: RecordProps) {
  const [login] = useAtom(loginAtom);
  const [user] = useAtom(userAtom);
  const [saveTime] = useAtom(saveTimeAtom);

  const [rankName, setRankName] = useState<string>(login ? user.username : "");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRankName(e.target.value);
  };
  return (
    <Modal visible={rank} style={ModalStyle}>
      <RecordBoard
        recordImg={`${process.env.PUBLIC_URL}/quizgamepic/record.png`}
      >
        <RecordBox>
          <h2>이름</h2>
          <RecordName
            disabled={login}
            value={rankName}
            onChange={handleOnChange}
          ></RecordName>
        </RecordBox>
        <RecordBox>
          <h2>점수</h2>
          <RecordScore>{`${score.ans * 10}점/100점`}</RecordScore>
        </RecordBox>
        <RecordBox>
          <h2>시간</h2>
          <RecordScore>{`${Math.floor(saveTime / 60)}분 ${
            saveTime % 60
          }초`}</RecordScore>
        </RecordBox>
        <RecordButton onClick={handleInitial}>점수 기록</RecordButton>
      </RecordBoard>
    </Modal>
  );
}

export default RecordModal;
