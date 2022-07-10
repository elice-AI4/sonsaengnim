import styled from "styled-components";
import testImg from "./test.png";
export const DonationBox = styled.div`
  width: 100%;
  min-height: 100vh;
  border: 2px solid red;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const InfoBox = styled.div`
  width: 400px;
  height: 600px;
  border: 2px solid blue;
`;

export const ProgressImg = styled.div`
  background-image: url(${testImg});
  background-repeat: no-repeat;
  background-size: cover;
  width: 300px;
  height: 300px;
  border: 1px solid orange;
  /* background: rgba(255, 255, 255, 0.5); */
`;
export const ProgressBar = styled.div`
  width: 300px;
  height: 150px;
  border: 1px solid green;
  /* background: rgba(0, 0, 0, 0.5); */
  background-color: white;
  z-index: 10;
  opacity: 0.5;
`;

export const ExplanationBox = styled.div`
  width: 400px;
  height: 600px;
  border: 1px solid purple;
`;

export const DonationInfo = styled.div`
  width: 400px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
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
