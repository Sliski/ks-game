import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { GameSteps, ItemTypes } from '../api/models/game.js';
import GameController from '../api/controllers/gameController.js';
import Token from './Token.jsx';

const tileTarget = {
  drop(props) {
    console.log('TileSquare.drop');
    console.log(props);
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
      return (
        <div className="tile" onClick={this.handleCellClick.bind(this)}>
          {this.tileContent()}
        </div>
      );
    }

    const { connectDropTarget } = this.props;
    return connectDropTarget(<div className="tile">{this.tileContent()}</div>);
  }
}

export default DropTarget(ItemTypes.TOKEN, tileTarget, collect)(Tile);
