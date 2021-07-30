import './Cell.css';

import React from 'react';

export default class Cell extends React.Component {
  render() {
    let cellClass = 'Cell';
    if (this.props.highlighted) {
        cellClass += ' Highlight';
    } else if (this.props.isBoardCell) {
        cellClass += ' BoardCell';
    }
    let circleClass = 'Circle ';
    if (this.props.token === null) {
        circleClass += 'Empty';
    } else {
        circleClass += `Token${this.props.token}`;
    }
    if (this.props.isLine) {
        circleClass += ' IsLine';
    }
    return (
      <div
        className={cellClass}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}>
          <span
            className={circleClass}
            onClick={this.props.onClick}
          >
          </span>
      </div>
    );
  }
}