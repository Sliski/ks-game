import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../api/models/game.js';
import GameController from '../api/controllers/gameController.js';
import { icons } from '../icons/tokens.jsx';

const tokenSource = {
  beginDrag(props) {
    return {
      x: props.x,
      y: props.y,
      data: props.data,
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
    return icons[data.type];
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
