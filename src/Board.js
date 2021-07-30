import React from 'react';
import Cell from './Cell';

import './Board.css';

export class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highlightedColIndex: -1,
    };
  }
  setActiveCol(colIndex) {
    this.setState({ highlightedColIndex: this.props.ctx.gameover? -1: colIndex });
  }
  handleClick(colIndex) {
    this.props.moves.dropTokenOnColumn(colIndex);
  }
  checkIsLine(rowIndex, colIndex) {
    if (!this.props.ctx.gameover) {
      return false;
    }
    let index = 0;  
    while (index < this.props.ctx.gameover.length) {
      if (rowIndex === this.props.ctx.gameover[index].row
        && colIndex === this.props.ctx.gameover[index].col) {
        return true;
      }
      index++;
    }
    return false;
  }    
  render() {
    const rows = this.props.G.board.map(
      (row, rowIndex) => 
        <div key={rowIndex}>
          {
            row.map(
              (cellContent, colIndex) =>
                <Cell
                  key={colIndex}
                  isBoardCell
                  highlighted={this.state.highlightedColIndex === colIndex}
                  onMouseEnter={() => this.setActiveCol(colIndex)}
                  onMouseLeave={() => this.setActiveCol(-1)}
                  onClick={() => this.handleClick(colIndex)}
                  token={this.props.G.board[rowIndex][colIndex]}
                  isLine={this.checkIsLine(rowIndex, colIndex)}
                />
            )
          }
        </div>
    ).reverse();

    let boardHeader;
    
    if (this.props.ctx.gameover) {
      const winnerToken = this.props.G.board[this.props.ctx.gameover[0].row][this.props.ctx.gameover[0].col];  
      boardHeader = <div>
        Han ganado las <Cell token={winnerToken} />
        <button onClick={this.props.reset}>Nueva partida</button>
      </div>
    } else {
      boardHeader = <div>Es el turno de: <Cell token={this.props.ctx.currentPlayer} /></div>
    }

    return (
      <div>
        {boardHeader}
        {rows}
      </div>
    );
  }
}