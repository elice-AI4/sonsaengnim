import React from "react";
import { ModalWrapper, ModalOverlay, ModalInner } from "./index.style";
import PropTypes from "prop-types";

interface modalState {
  className?: string;
  visible: boolean;
  children: string;
  closeModal(): void;
}

function Modal({ className, visible, children, closeModal }: modalState) {
  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper className={className} tabIndex={-1} visible={visible}>
        <ModalInner tabIndex={0} className="modal-inner">
          {children}
          <button onClick={closeModal}>닫기</button>
        </ModalInner>
      </ModalWrapper>
    </>
  );
}

Modal.propTypes = {
  visible: PropTypes.bool,
};

export default Modal;
