import React from "react";
import {
  DonationBox,
  InfoBox,
  ProgressImg,
  ProgressBar,
  ExplanationBox,
  DonationInfo,
  DonationButton,
  InfoText,
} from "./index.style";

function Donation() {
  return (
    <>
      <DonationBox>
        <InfoBox>
          <h2>ㅁㅁ님이 학습 완료한 수화</h2>
          <h2>학습 리스트...</h2>
          <h2>보유 포인트 : 400 점</h2>
        </InfoBox>
        <ExplanationBox>
          <InfoText>학습, 퀴즈로 얻은 포인트로 기부할 수 있습니다.</InfoText>
          <InfoText>
            공부한 만큼 포인트를 기부하여 청각장애인 인식 개선 캠페인에
            참여하세요!
          </InfoText>
          <InfoText>2000 포인트 이상부터 기부할 수 있습니다.</InfoText>
        </ExplanationBox>
        <DonationInfo>
          <ProgressImg>
            <ProgressBar></ProgressBar>
          </ProgressImg>
          <h1>목표 금액 : 2,000,000</h1>
          <DonationButton>기부하기</DonationButton>
        </DonationInfo>
      </DonationBox>
    </>
  );
}

export default Donation;
