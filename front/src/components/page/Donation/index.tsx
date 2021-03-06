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
  EmptyScript,
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
      alert("?????? ?????? ???????????????.");
    }
  };

  return (
    <>
      <DonationBox>
        <InfoBox>
          <InfoText>{`${user.username}?????? ????????? ??????`}</InfoText>
          <MyLearningBox>
            <ScrollbarBox>
              {studyList.length === 0 ? (
                <EmptyScript>?????? ????????? ?????????.</EmptyScript>
              ) : (
                <>
                  {studyList.map((study, index) => (
                    <MyLearning key={index}>{study}</MyLearning>
                  ))}
                  <MyLearning empty={true} />
                  <MyLearning empty={true} />
                </>
              )}
            </ScrollbarBox>
          </MyLearningBox>
          <InfoText>{`?????? ????????? : ${String(user.point).replace(
            /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
            ","
          )} ???`}</InfoText>
          <InfoText>{`????????? ????????? : ${String(user.myDonation).replace(
            /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
            ","
          )} ???`}</InfoText>
        </InfoBox>
        <ExplanationBox>
          <Balloon
            BalloonImg={`${process.env.PUBLIC_URL}/donation/ballon1.png`}
            width={"500px"}
            height={"200px"}
            padding={"30px 0px 0px 65px"}
          >
            <InfoText>
              ??????, ????????? ?????? ???????????? <br></br>????????? ??? ????????????.
            </InfoText>
          </Balloon>

          <Balloon
            BalloonImg={`${process.env.PUBLIC_URL}/donation/ballon2.png`}
            width={"500px"}
            height={"250px"}
            padding={"30px 0px 0px 65px"}
          >
            <InfoText>
              ????????? ?????? ???????????? <br></br>???????????? ?????? ?????? ??????<br></br>
              ???????????? ???????????????!
            </InfoText>
          </Balloon>
          <Balloon
            BalloonImg={`${process.env.PUBLIC_URL}/donation/ballon3.png`}
            width={"500px"}
            height={"200px"}
            padding={"30px 0px 0px 90px"}
          >
            <InfoText>
              2000 ????????? ???????????? <br></br>????????? ??? ????????????.
            </InfoText>
          </Balloon>
        </ExplanationBox>
        <DonationInfo>
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
          <PointText>{`?????? ?????? : ${String(donationInfo.goalPoint).replace(
            /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
            ","
          )}`}</PointText>
          <PointText>{`?????? ?????? : ${String(donationInfo.currentPoint).replace(
            /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
            ","
          )}`}</PointText>
          <DonationButton
            onClick={HandleDonation}
            data-tip="donation-possible"
            data-for="donation-possible"
          >
            ????????????
            {!possible ? (
              <ReactTooltip id="donation-possible">
                <h2>???????????? 2000??? ???????????????.</h2>
              </ReactTooltip>
            ) : (
              <ReactTooltip id="donation-possible">
                <h2>???????????? ?????? ?????? ???????????? ???????????????.</h2>
              </ReactTooltip>
            )}
          </DonationButton>
        </DonationInfo>
      </DonationBox>
    </>
  );
}

export default Donation;
