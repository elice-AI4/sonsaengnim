import React from "react";
import { ModalWrapper, ModalOverlay, ModalInner } from "./index.style";
import PropTypes from "prop-types";

interface modalState {
  className?: string;
  visible: boolean;
  children: JSX.Element | JSX.Element[];
  // children : string | HTMLImageElement;
  closeModal(): void;
  style?: React.CSSProperties;
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
        <ModalInner tabIndex={0} className="modal-inner" style={style}>
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
