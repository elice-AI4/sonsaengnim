import React, { useState, useEffect } from "react";
import {
  DonationBox,
  InfoBox,
  ExplanationBox,
  DonationInfo,
  DonationButton,
  InfoText,
  Balloon,
  MyLearning,
  MyLearningBox,
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
          <InfoText>{`${user.username}님이 학습 완료한 수화입니다`}</InfoText>
          <MyLearningBox>
            {studyList.map((study, index) => (
              <MyLearning key={index}>{study}</MyLearning>
            ))}
          </MyLearningBox>
          <InfoText>{`보유 포인트 : ${user.point} 점`}</InfoText>
        </InfoBox>
        <ExplanationBox>
          <Balloon
            BalloonImg={`${process.env.PUBLIC_URL}/donation/ballon1.png`}
            width={"500px"}
            height={"200px"}
            padding={"30px 0px 0px 65px"}
          >
            <InfoText>
              학습, 퀴즈로 얻은 포인트로 <br></br>기부할 수 있습니다.
            </InfoText>
          </Balloon>

          <Balloon
            BalloonImg={`${process.env.PUBLIC_URL}/donation/ballon2.png`}
            width={"500px"}
            height={"250px"}
            padding={"30px 0px 0px 65px"}
          >
            <InfoText>
              공부한 만큼 포인트를 <br></br>기부하여 농인 인식 개선<br></br>
              캠페인에 참여하세요!
            </InfoText>
          </Balloon>
          <Balloon
            BalloonImg={`${process.env.PUBLIC_URL}/donation/ballon3.png`}
            width={"500px"}
            height={"200px"}
            padding={"30px 0px 0px 90px"}
          >
            <InfoText>
              2000 포인트 이상부터 <br></br>기부할 수 있습니다.
            </InfoText>
          </Balloon>
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
