import styled, { css } from "styled-components";
import img from "./main_background.jpg";

export const MainBackGround = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  /* background-image: url(${img});
  background-repeat: no-repeat;
  background-size: cover; */
`;

export const ServiceBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: calc(100% / 3);
  height: 100%;
  background-color: ${(props) => props.color};
`;

export const MoveButton = styled.button`
  width: 250px;
  height: 70px;
  border: 1px solid white;
  color: white;
  background-color: rgba(255, 255, 255, 0);
  font-size: 30px;
`;

export const ServiceImg = styled.img`
  width: 300px;
  height: 300px;
  /* padding-left:; */
`;
