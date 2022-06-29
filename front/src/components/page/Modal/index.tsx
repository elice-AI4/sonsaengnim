import React from "react";
import { ModalWrapper, ModalOverlay, ModalInner } from "./index.style";
import PropTypes from "prop-types";

interface ModalState {
  className?: string;
  visible: boolean;
  closeModal?: () => void;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

function Modal({
  className,
  visible,
  children,
  closeModal,
  style,
}: ModalState) {
  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper
        className={className}
        tabIndex={-1}
        visible={visible}
        onClick={closeModal && closeModal}
      >
        <ModalInner
          tabIndex={0}
          className="modal-inner"
          visible={visible}
          style={style}
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
