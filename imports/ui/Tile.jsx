import React, { Component } from 'react';
import GameController from '../api/controllers/gameController.js';
import { GameSteps } from '../api/models/game.js';

export default class BoardTile extends Component {
  tileContent() {
    const tile = this.props.game.board[this.props.row][this.props.col];
    if (tile.length === 0) {
      return '';
    }
    return <div className={tile[tile.length - 1]}>&gt;</div>;
  }

  handleCellClick() {
    GameController.userAddToken(this.props.game._id, this.props.row, this.props.col);
  }

  render() {
    if (this.props.game.step === GameSteps.SETUP) {
      return <td onClick={this.handleCellClick.bind(this)}>{this.tileContent()}</td>;
    }
    return <td>{this.tileContent()}</td>;
  }
}
