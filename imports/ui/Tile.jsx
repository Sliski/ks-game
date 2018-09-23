import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { GameSteps, ItemTypes } from '../api/models/game.js';
import GameController from '../api/controllers/gameController.js';
import Token from './Token.jsx';

const tileTarget = {
  drop(props, monitor) {
    GameController.moveToken(props.game._id, monitor.getItem(), { x: props.x, y: props.y });
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
    const tile = this.props.game.board[this.props.x][this.props.y];
    if (tile.length === 0) {
      return '';
    }
    return <Token type={tile[tile.length - 1]} x={this.props.x} y={this.props.y} />;
  }

  handleCellClick() {
    if (this.props.game.step === GameSteps.SETUP) {
      GameController.userAddToken(this.props.game._id, this.props.x, this.props.y);
    }
  }

  render() {
    const { connectDropTarget } = this.props;

    return connectDropTarget(
      <div className="tile" onClick={this.handleCellClick.bind(this)}>
        {this.tileContent()}
      </div>,
    );
  }
}

export default DropTarget(ItemTypes.TOKEN, tileTarget, collect)(Tile);
