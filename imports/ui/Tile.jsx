import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../api/Constants.js';
import GameController from '../api/controllers/gameController.js';
import { GameSteps } from '../api/models/game.js';
// import { canMoveToken, moveToken } from './Game';
import Token from './Token.jsx';

const tileTarget = {
  drop(props, monitor) {
    console.log(props);
    // moveToken(props.x, props.y);
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

class Tile extends Component {
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
      return <td onClick={this.handleCellClick.bind(this)}>{this.tileContent()}</td>;
    }
    return <td>{this.tileContent()}</td>;
  }
}

export default DropTarget(ItemTypes.TOKEN, tileTarget, collect)(Tile);
