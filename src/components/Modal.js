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
        {props.children}
      </ModalWrapper>
      : null
  );
}

class ModalWrapper extends React.PureComponent {
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
      <div className={`modal ${this.state.visible ? 'modalVisible' : ''}`} onClick={this.handleClick}>
        <div className={`modalContent ${this.state.visible ? 'modalContentVisible' : ''}`}>
          {this.props.children}
        </div>
      </div>
    );
  }
}