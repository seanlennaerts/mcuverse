import React from 'react';
import '../styles/Quote.scss';
import * as clipboard from "clipboard-polyfill";

function Quote(props) {
  
  const { sub, search, title, time, handle, index } = props;
  let jSub = sub.join(' ');

  const handleClick = () => {
    clipboard.writeText(`${jSub} (*${title} ${time}*)`);
    handle(true);
    setTimeout(() => {
      handle(false);
    }, 1500);
  }
  return (
    <div className="sub"
      onClick={handleClick}
      title="click to copy to clipboard">
      <p>
        {jSub.substring(0, index)}
        <span className="highlight">{jSub.substring(index, index + search.length)}</span>
        {jSub.substring(index + search.length)}
        &nbsp;(<i>{title} {time}</i>)
      </p>
    </div>
  );
}

export { Quote };
