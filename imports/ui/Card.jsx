import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { ItemTypes, GameSteps } from '../api/models/game.js';

export const cardTypes = {
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
  getCardText() {
    return cardTypes[this.props.type];
  }

  render() {
    const {
      connectDragSource, isDragging, type, flipped, game,
    } = this.props;
    const card = (
      <div
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move',
        }}
        className={`card card-${type} card-${flipped ? 'flipped' : 'revealed'}`}
      >
        {this.getCardText()}
      </div>
    );
    if (game.step !== GameSteps.PLANNING) {
      return card;
    }
    return connectDragSource(card);
  }
}

export default DragSource(ItemTypes.CARD, cardSource, collect)(Card);
