import React, { Component } from 'react';

import '../styles/Filter.scss';

class Filter extends Component {


  buildChildren() {
    let filtees = [];
    for (let filtee of this.props.children) {
      filtees.push(<div className="Filtee">{filtee}</div>)
    }
    return filtees;
  }

  render() {
    return (
      <div className="Filter">{this.buildChildren()}</div>
    );
  }
}

export { Filter };