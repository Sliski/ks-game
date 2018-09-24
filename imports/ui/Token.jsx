import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../api/models/game.js';
import GameController from '../api/controllers/gameController.js';
import {
  lv, bh, st, pl, cb, rd,
} from '../icons/tokens.jsx';

const tokenSource = {
  beginDrag(props) {
    return {
      x: props.x,
      y: props.y,
    };
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

class Token extends Component {
  getIcon(data) {
    const { type } = data;
    switch (type) {
      case 'lv':
        return lv;
      case 'bh':
        return bh;
      case 'st':
        return st;
      case 'pl':
        return pl;
      case 'cb':
        return cb;
      case 'rd':
        return rd;
      default:
        return '';
    }
  }

  handleRightClick(e) {
    const { rotate } = this.props.data;
    const { x, y } = this.props;
    if (rotate !== -1 && x !== -1 && y !== -1) {
      e.preventDefault();
      GameController.rotateToken(this.props.gameId, this.props.x, this.props.y);
    }
  }

  render() {
    const { connectDragSource, isDragging, data } = this.props;
    return connectDragSource(
      <div
        style={{
          opacity: isDragging ? 0.5 : 1,
          fontSize: 25,
          fontWeight: 'bold',
          cursor: 'move',
        }}
        className={`token token-${data.type}${data.rotate === -1 ? '' : ` rotate-${data.rotate}`}`}
        onContextMenu={this.handleRightClick.bind(this)}
      >
        {this.getIcon(data)}
      </div>,
    );
  }
}

export default DragSource(ItemTypes.TOKEN, tokenSource, collect)(Token);
