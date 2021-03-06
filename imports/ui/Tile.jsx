import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../api/models/gameConst.js';
import GameController from '../api/controllers/gameController.js';
import Token from './Token.jsx';

const tileTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();
    if (item.x !== -1 && item.y !== -1) {
      GameController.moveToken(props.game._id, item, { x: props.x, y: props.y });
    } else {
      GameController.addToken(props.game._id, item.data, props.x, props.y);
    }
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
    return (
      <Token
        data={tile[tile.length - 1]}
        x={this.props.x}
        y={this.props.y}
        gameId={this.props.game._id}
        handlePreviewUpdate={this.props.handlePreviewUpdate}
      />
    );
  }

  renderRowMarker() {
    const { x, y } = this.props;
    if (x === 0) {
      return <div className="row-marker">{y + 1}</div>;
    }
    return '';
  }

  renderColMarker() {
    const { y, x } = this.props;
    if (y === 0) {
      return <div className="col-marker">{['A', 'B', 'C', 'D', 'E', 'F'][x]}</div>;
    }
    return '';
  }

  render() {
    const { connectDropTarget, isOver } = this.props;
    return connectDropTarget(
      <div
        className="tile"
        style={
          isOver
            ? {
              opacity: 0.5,
              backgroundColor: 'yellow',
            }
            : {}
        }
      >
        {this.renderRowMarker()}
        {this.renderColMarker()}
        {this.tileContent()}
      </div>,
    );
  }
}

export default DropTarget(ItemTypes.TOKEN, tileTarget, collect)(Tile);
