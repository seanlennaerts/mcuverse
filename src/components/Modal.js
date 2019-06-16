import React from 'react';
import '../styles/Modal.scss';

export default function Modal(props) {
  const {
    show,
    onClose,
  } = props;

  return (
    props.show ? 
    <ModalWrapper show={show} onClose={onClose}>
      { props.children }
    </ModalWrapper>
    : null
  );
}

class ModalWrapper extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleEscPress = this.handleEscPress.bind(this);
  }

  handleClick(event) {
    this.props.onClose();
    event.stopPropagation();
  }

  handleEscPress(event) {
    if (event.key === "Escape") {
      this.props.onClose();
    }
  }

  componentWillMount() {
    document.addEventListener("keydown", this.handleEscPress);
  }


  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEscPress);
  }

  render() {
    return ( 
      <div className="modal" onClick={this.handleClick}>
        <div className="modalContent">
        { this.props.children }
        </div>
      </div>
    );
  }
}