import React, { useState } from 'react';
import '../styles/Modal.scss';

export default function Modal(props) {
  const {
    show,
    onClose,
  } = props;

  return (
    props.show ?
      <ModalWrapper show={show} onClose={onClose}>
        {props.children}
      </ModalWrapper>
      : null
  );
}

const ModalWrapper = (props) => {
  const [visible] = useState(props.show);
  return (
      <div className={`modalWrapper ${visible ? 'modalVisible' : ''}`}>
        <div className={`modal ${visible ? 'modalContentVisible' : ''}`}>
          {props.children}
        </div>
      </div>
    );
};