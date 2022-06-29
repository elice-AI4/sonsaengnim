import styled from "styled-components";

export const RankBox = styled.div`
  width: 100%;
  height: 100vh;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 65px;
`;

export const TropyImg = styled.img`
  width: 200px;
  height: 200px;
`;

export const RankBoard = styled.div<{ rankBoardImg: string }>`
  background-image: ${(props) => `url(${props.rankBoardImg})`};
  background-repeat: no-repeat;
  background-size: cover;
  width: 1000px;
  height: 670px;
  border: 1px solid blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
