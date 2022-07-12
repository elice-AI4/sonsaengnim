import styled from "styled-components";

export const DonationBox = styled.div`
  background-color: #ffe7ec;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const InfoBox = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ExplanationBox = styled.div`
  width: 400px;
  height: 600px;
  /* border: 1px solid purple; */
`;

export const DonationInfo = styled.div`
  width: 400px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const DonationButton = styled.button`
  width: 250px;
  height: 70px;
  background-color: skyblue;
  font-weight: bold;
  font-size: 30px;
`;

export const InfoText = styled.p`
  font-size: 30px;
  font-weight: bold;
`;

export const Balloon = styled.div<{
  BalloonImg: string;
  width: string;
  height: string;
  padding: string;
}>`
  background-image: ${(props) => `url(${props.BalloonImg})`};
  background-repeat: no-repeat;
  background-size: cover;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
`;

export const MyLearningBox = styled.div`
  width: 350px;
  border: 2px solid black;
  background-color: lightblue;
  border-radius: 10px;
`;

export const MyLearning = styled.div`
  border: 2px solid black;
  background-color: skyblue;
  border-radius: 10px;
  font-size: 30px;
  display: inline-block;
  margin-left: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 5px;
`;

export const PointText = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
`;
