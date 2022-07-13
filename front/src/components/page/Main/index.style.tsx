import styled from "styled-components";

export const MainBackGround = styled.div`
  width: 100vw;
  min-width: 120rem;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

export const ServiceBox = styled.div`
  flex: 0.333333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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

export const FooterBox = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
`;
