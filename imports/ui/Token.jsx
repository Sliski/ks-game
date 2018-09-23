import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../api/Constants.js';

const tokenSource = {
  beginDrag(props) {
    console.log('Token.beingDrag props');
    console.log(props);
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
  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div
        style={{
          opacity: isDragging ? 0.5 : 1,
          fontSize: 25,
          fontWeight: 'bold',
          cursor: 'move',
        }}
        className={this.props.type}
      >
        &gt;
      </div>,
    );
  }
}

export default DragSource(ItemTypes.TOKEN, tokenSource, collect)(Token);
