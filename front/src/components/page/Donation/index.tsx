import React, { useState, useEffect } from "react";
import {
  DonationBox,
  InfoBox,
  ProgressImg,
  ProgressBar,
  ExplanationBox,
  DonationInfo,
  DonationButton,
  InfoText,
  WordBox1,
  WordBox2,
  WordBox3,
} from "./index.style";
import { Heart } from "@brightlayer-ui/react-progress-icons";
import * as Api from "../../../api";
import { userAtom } from "../../../state";
import { useAtom } from "jotai";

function Donation() {
  const [donationPer, setDonationPer] = useState<number>(0);
  const [goal, setGoal] = useState<number>(2000000);
  const [curDonation, setCurDonation] = useState<number>(0);
  const [studyList, setStudyList] = useState([]);
  const [user] = useAtom(userAtom);
  useEffect(() => {
    Api.get("user/studylist").then((res) =>
      setStudyList(res.data.studyList.study)
    );
  }, []);

  const HandleDonation = () => {
    setDonationPer((cur): number => {
      return cur + (30000 / goal) * 100;
    });
    setCurDonation((cur) => {
      return cur + 30000;
    });
  };
  return (
    <>
      <DonationBox>
        <InfoBox>
          <h2>ㅁㅁ님이 학습 완료한 수화</h2>
          {studyList.map((study, index) => (
            <h2 key={index}>{study}</h2>
          ))}
          <h2>{`보유 포인트 : ${user.point} 점`}</h2>
        </InfoBox>
        <ExplanationBox>
          <WordBox1>
            <InfoText>
              학습, 퀴즈로 얻은 포인트로 <br></br>기부할 수 있습니다.
            </InfoText>
          </WordBox1>

          <WordBox2>
            <InfoText>
              공부한 만큼 포인트를 기부하여 청각장애인 인식 개선 캠페인에
              참여하세요!
            </InfoText>
          </WordBox2>
          <WordBox3>
            <InfoText>2000 포인트 이상부터 기부할 수 있습니다.</InfoText>
          </WordBox3>
        </ExplanationBox>
        <DonationInfo>
          {/* <ProgressImg>
            <ProgressBar></ProgressBar>
          </ProgressImg> */}
          <Heart
            percent={donationPer}
            size={300}
            color={"pink"}
            outlined={false}
            labelColor="black"
            showPercentLabel={true}
            labelSize={70}
            labelPosition="bottom"
          />
          <h1>{`목표 금액 : ${String(goal).replace(
            /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
            ","
          )}`}</h1>
          <h1>{`현재 금액 : ${String(curDonation).replace(
            /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
            ","
          )}`}</h1>
          <DonationButton onClick={HandleDonation}>기부하기</DonationButton>
        </DonationInfo>
      </DonationBox>
    </>
  );
}

export default Donation;
