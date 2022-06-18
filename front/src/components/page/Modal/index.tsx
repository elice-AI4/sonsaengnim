import React, { ReactElement } from "react";
import { ModalWrapper, ModalOverlay, ModalInner } from "./index.style";
import PropTypes from "prop-types";

interface modalState {
  className?: string;
  visible: boolean;
  children: ReactElement | ReactElement[];
  closeModal(): void;
  style?: React.CSSProperties;
  /* 질문용 주석
  // children: JSX.Element | JSX.Element[];
  // children : string | HTMLImageElement;
  */
}

function Modal({
  className,
  visible,
  children,
  closeModal,
  style,
}: modalState) {
  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper className={className} tabIndex={-1} visible={visible}>
        <ModalInner
          tabIndex={0}
          className="modal-inner"
          style={style}
          visible={visible}
        >
          {children}
        </ModalInner>
      </ModalWrapper>
    </>
  );
}

Modal.propTypes = {
  visible: PropTypes.bool,
};

export default Modal;
