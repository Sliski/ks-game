import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../api/models/game.js';
import GameController from '../api/controllers/gameController.js';

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
  handleRightClick(e) {
    e.preventDefault();
    const { rotate } = this.props.data;
    if (rotate !== -1) {
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
        &gt;
      </div>,
    );
  }
}

export default DragSource(ItemTypes.TOKEN, tokenSource, collect)(Token);
