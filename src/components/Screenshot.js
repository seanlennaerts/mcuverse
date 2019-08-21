import React, { Component } from 'react';

import '../styles/Meme.scss'
import html2canvas from 'html2canvas';

class Screenshot extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidUpdate() {
    // const copy = this.myRef.current.cloneNode(true);
    const copy = this.props.image.cloneNode(true);
    document.getElementById('iframe').contentWindow.document.body.appendChild(copy);
    document.getElementById('iframe').style.height = '544px';
    document.getElementById('iframe').style.width = '1280px';
    // document.getElementById('iframe').style.position = 'absolute';
    // document.getElementById('iframe').style.left = '-9999px';
    console.log('mounted');
    console.log(copy);
    html2canvas(copy, { width: '1280', height: '544' }).then(canvas => {
      // let a = document.createElement('a');
      // a.href = canvas.toDataURL();
      // a.download = 'test.png';
      // a.click();
      let image = new Image();
      image.src = canvas.toDataURL();
      let w = window.open('');
      w.document.write(image.outerHTML);
    });

  }

  // buildLines() {
  //   let lines = [];
  //   this.props.text.forEach(line => {
  //     lines.push(<p>{line}</p>);
  //   })
  //   return lines;
  // }

  render() {
    return (
      <div>
        {/* <div ref={this.myRef} className="screenshotWrapper">
          <img className="screenshotImage" src={this.props.image} alt="" />
          <div className="screenshotText">{this.buildLines()}</div>
        </div> */}
        <iframe id='iframe' title='canvasHandler' srcDoc='<link type="text/css" rel="Stylesheet" href="/Screenshot.css" />' />
      </div>

    );
  }

}

export { Screenshot };