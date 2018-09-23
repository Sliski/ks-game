import React, { Component } from 'react';
import GameController from '../api/controllers/gameController.js';
import { GameSteps } from '../api/models/game.js';
import Token from './Token.jsx';

export default class Tile extends Component {
  tileContent() {
    const tile = this.props.game.board[this.props.row][this.props.col];
    if (tile.length === 0) {
      return '';
    }
    return <Token type={tile[tile.length - 1]} x={this.props.col} y={this.props.row} />;
  }

  handleCellClick() {
    GameController.userAddToken(this.props.game._id, this.props.row, this.props.col);
  }

  render() {
    if (this.props.game.step === GameSteps.SETUP) {
      return (
        <div className="tile" onClick={this.handleCellClick.bind(this)}>
          {this.tileContent()}
        </div>
      );
    }
    return <div className="tile">{this.tileContent()}</div>;
  }
}
