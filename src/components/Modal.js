import React, { Component } from 'react';
import '../styles/Modal.scss';

function Modal(props) {
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

export { Modal };

class ModalWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = { visible: false }

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

  componentDidMount() {
    setTimeout(() => {
      this.setState({ visible: true });
    }, 10) // need timeout to async animation
  }


  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEscPress);
  }

  render() {
    return (
      <div className={`modalWrapper ${this.state.visible ? 'modalVisible' : ''}`} onClick={this.handleClick}>
        <div className={`modal ${this.state.visible ? 'modalContentVisible' : ''}`}>
          {this.props.children}
        </div>
      </div>
    );
  }
}