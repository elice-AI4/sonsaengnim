import styled from "styled-components";

export const RankBox = styled.div<{ rankBack: string }>`
  background-image: ${(props) => `url(${props.rankBack})`};
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
`;

export const TropyImg = styled.img`
  width: 200px;
  height: 200px;
  position: relative;
  top: 90px;
`;

export const RankBoard = styled.div<{ rankBoardImg: string }>`
  background-image: ${(props) => `url(${props.rankBoardImg})`};
  background-repeat: no-repeat;
  background-size: cover;
  width: 1000px;
  height: 670px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;
