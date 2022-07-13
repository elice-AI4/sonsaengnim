import styled from "styled-components";

export const ModalWrapper = styled.div<{ visible: boolean }>`
  box-sizing: border-box;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

export const ModalOverlay = styled.div<{ visible: boolean }>`
  box-sizing: border-box;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

interface ModalInnerProps {
  visible: boolean;
  backGroundTransparent?: boolean;
}

export const ModalInner = styled.div<ModalInnerProps>`
  box-sizing: border-box;
  position: relative;
  box-shadow: ${(props) =>
    props.backGroundTransparent
      ? "rgba(6, 10, 10, 0.6) 0px 0px 10px 7px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.7) 1200px 100px 100px inset;"
      : "0 0 6px 0 rgba(0, 0, 0, 0.5)"};
  background-color: ${(props) =>
    props.backGroundTransparent ? "rgba(0, 0, 0, 0)" : "#fff"};
  border-radius: 10px;
  width: 360px;
  top: 50%;
  margin: 0 auto;
  padding: 40px 20px;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transform: ${(props) =>
    props.visible ? "translateY(-50%)" : "translateY(-70%)"};
  transition: all 0.5s ease;
`;
