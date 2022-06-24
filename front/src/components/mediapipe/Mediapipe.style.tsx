import Webcam from "react-webcam";
import styled from "styled-components";

export const UserCanvas = styled.canvas`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  z-index: 9;
  width: 640px;
  height: 480px;
`;

export const StyledWebcam = styled(Webcam)`
  width: 64rem;
  height: 48rem;
`;
