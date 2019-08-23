import React from 'react';
import '../styles/Button.scss';

function Button(props) {
  return (
    <div
      className="button"
      onClick={props.onClick}
    >
      {props.text}
    </div>
  )

}

export { Button };