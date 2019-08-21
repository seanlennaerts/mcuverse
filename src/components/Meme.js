import React from 'react';

import '../styles/Meme.scss';

function Meme(props) {

  let text = [];
  props.text.forEach(line => {
    text.push(<p>{line}</p>);
  });
  
  // const divStyle = {
  //   backgroundImage: `url(${props.src})`
  // }
  // const textStyle = {
  //   color: props.theme
  // }

  return (
    // <div className="Meme"
    //   id={props.key}
    //   onClick={handleClick}
    //   style={divStyle}
    // >
    //   <div className="centered">{text}</div>
    // </div>
    <div className="NewMeme">
      <a title="Download image" href={props.src} rel="noopener noreferrer" download target="_blank">
        <img src={props.src} alt={props.text.join(' ')}/>
      </a>
    </div>
  );

}

export { Meme };