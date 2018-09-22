import React, { Component } from 'react';
import RoomsController from '../api/controllers/roomsController.js';

export default class BoardTile extends Component {
  tileContent() {
    const tile = this.props.game.board[this.props.row][this.props.col];
    if (tile.length === 0) {
      return '';
    }
    return tile[0];
  }

  handleCellClick() {
    console.log(this.props);
    RoomsController.userMarkGame(this.props.game._id, this.props.row, this.props.col);
  }

  render() {
    return <td onClick={this.handleCellClick.bind(this)}>{this.tileContent()}</td>;
  }
}
