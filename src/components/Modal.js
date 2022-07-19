import React, { useState } from "react";
import "../styles/Modal.scss";

export default function Modal({ show, onClose, children }) {

  return show ? (
    <ModalWrapper show={show} onClose={onClose}>
      {children}
    </ModalWrapper>
  ) : null;
}

const ModalWrapper = ({ show, children }) => {
  const [visible] = useState(show);
  return (
    <div className={`modalWrapper ${visible ? "modalVisible" : ""}`}>
      <div className={`modal ${visible ? "modalContentVisible" : ""}`}>{children}</div>
    </div>
  );
};
