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

export const ModalInner = styled.div<{ visible: boolean }>`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 360px;
  /* max-width: 480px; */
  top: 50%;
  margin: 0 auto;
  padding: 40px 20px;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transform: ${(props) =>
    props.visible ? "translateY(-50%)" : "translateY(-70%)"};
  transition: all 0.5s ease;
`;
