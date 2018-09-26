import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../api/models/game.js';

const cardTypes = {
  a: 'Attack A',
  b: 'Attack B',
  r: 'Rotate',
  m: 'Move',
};

const cardSource = {
  beginDrag(props) {
    return {
      type: props.type,
    };
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

class Card extends Component {
  _empty() {
    return '';
  }

  render() {
    const { connectDragSource, isDragging, type } = this.props;
    return connectDragSource(
      <div
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move',
        }}
        className={`card card-${type}`}
      >
        {cardTypes[type]}
      </div>,
    );
  }
}

export default DragSource(ItemTypes.CARD, cardSource, collect)(Card);
