import styled, { css } from "styled-components";
import backgroundImg from "../../../../../src_assets/learning/play/playPage.png";

export const NoCamContainer = styled.div`
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  width: 100vw;
  min-width: 1200px;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Section = styled.section`
  width: 1200px;
  height: 1200px;
  border: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
`;
