import React, { Component } from 'react';
import Row from './Row.jsx';

export default class Board extends Component {
  _empty() {
    return '';
  }

  render() {
    const rows = this.props.board.map((row, i) => (
      <Row rowContent={row} row={i} key={i} game={this.props.game} />
    ));
    return (
      <table className="game-board">
        <tbody>{rows}</tbody>
      </table>
    );
  }
}
