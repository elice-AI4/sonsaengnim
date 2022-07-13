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
  PointText,
  ScrollbarBox,
} from "./index.style";
import { Heart } from "@brightlayer-ui/react-progress-icons";
import * as Api from "../../../api";
import { userAtom, User } from "../../../state";
import { useAtom } from "jotai";
import ReactTooltip from "react-tooltip";

interface DonationInfo {
  name: string;
  currentPoint: number;
  goalPoint: number;
}

function Donation() {
  const [donationPer, setDonationPer] = useState<number>(0);
  const [studyList, setStudyList] = useState([]);
  const [user, setUser] = useAtom(userAtom);
  const [possible, setPossible] = useState<boolean>(
    user.point >= 2000 ? true : false
  );
  const [donationInfo, setDonationInfo] = useState<DonationInfo>({
    name: "",
    currentPoint: 0,
    goalPoint: 0,
  });

  useEffect(() => {
    Api.get("user/studylist").then((res) =>
      setStudyList(res.data.studyList.study)
    );

    Api.get("donation/deafDonation").then((res) => {
      setDonationInfo({
        name: res.data.name,
        currentPoint: res.data.currentPoint,
        goalPoint: res.data.goalPoint,
      });
      setDonationPer(
        Math.floor((res.data.currentPoint / res.data.goalPoint) * 100)
      );
    });
  }, []);

  const HandleDonation = () => {
    if (possible) {
      Api.post(
        `user/donation?point=${user.point}&&name=${donationInfo.name}`,
        {}
      ).then((res) => {
        setDonationInfo((cur): DonationInfo => {
          const newInfo = {
            ...cur,
            currentPoint: res.data.donation.currentPoint,
          };
          return newInfo;
        });
        setUser((cur): User => {
          const newUserInfo = {
            ...cur,
            myDonation: res.data.user.myDonation,
            point: res.data.user.point,
          };
          return newUserInfo;
        });
        setDonationPer(
          Math.floor(
            (res.data.donation.currentPoint / donationInfo.goalPoint) * 100
          )
        );
        setPossible(res.data.user.point >= 2000 ? true : false);
      });
      alert("기부 참여 감사합니다.");
    }
  };

  return (
    <>
      <DonationBox>
        <InfoBox>
          <InfoText>{`${user.username}님이 학습한 단어`}</InfoText>
          <MyLearningBox>
            <ScrollbarBox>
              {studyList.map((study, index) => (
                <MyLearning key={index}>{study}</MyLearning>
              ))}
              <MyLearning empty={true} />
              <MyLearning empty={true} />
            </ScrollbarBox>
          </MyLearningBox>
          <InfoText>{`보유 포인트 : ${String(user.point).replace(
            /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
            ","
          )} 점`}</InfoText>
          <InfoText>{`기부한 포인트 : ${String(user.myDonation).replace(
            /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
            ","
          )} 점`}</InfoText>
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
          <PointText>{`목표 금액 : ${String(donationInfo.goalPoint).replace(
            /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
            ","
          )}`}</PointText>
          <PointText>{`현재 금액 : ${String(donationInfo.currentPoint).replace(
            /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
            ","
          )}`}</PointText>
          <DonationButton
            onClick={HandleDonation}
            data-tip="donation-possible"
            data-for="donation-possible"
          >
            기부하기
            {!possible ? (
              <ReactTooltip id="donation-possible">
                <h2>포인트가 2000점 미만입니다.</h2>
              </ReactTooltip>
            ) : (
              <ReactTooltip id="donation-possible">
                <h2>보유하고 있는 모든 포인트가 기부됩니다.</h2>
              </ReactTooltip>
            )}
          </DonationButton>
        </DonationInfo>
      </DonationBox>
    </>
  );
}

export default Donation;
