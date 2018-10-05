import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { ItemTypes, GameSteps } from '../api/models/gameConst.js';

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
  constructor(props) {
    super(props);
    this.state = { marked: false };
  }

  getCardText() {
    return cardTypes[this.props.type];
  }

  getCursorStyle() {
    if (this.isDraggable()) return 'move';
    if (this.isClickable()) return 'pointer';
    return 'default';
  }

  handleClick(e) {
    e.preventDefault();
    if (!this.isClickable()) return;

    const { type, markedCards } = this.props;
    if (this.state.marked) {
      markedCards.splice(markedCards.indexOf(type), 1);
      this.setState({ marked: false });
    } else {
      markedCards.push(type);
      this.setState({ marked: true });
    }
  }

  isHighlighted() {
    const { game } = this.props;
    return this.state.marked && game.step === GameSteps.SETUP && !game.getUserConfirmStatus();
  }

  isClickable() {
    return this.props.game.step === GameSteps.SETUP;
  }

  isDraggable() {
    return this.props.game.step === GameSteps.PLANNING;
  }

  render() {
    const { connectDragSource, type, flipped } = this.props;
    const card = (
      <div
        style={{
          cursor: this.getCursorStyle(),
          background: this.isHighlighted() ? 'yellow' : 'white',
        }}
        onClick={this.handleClick.bind(this)}
        className={`card card-${type} card-${flipped ? 'flipped' : 'revealed'}`}
      >
        {this.getCardText()}
      </div>
    );
    if (this.isDraggable()) {
      return connectDragSource(card);
    }
    return card;
  }
}

export default DragSource(ItemTypes.CARD, cardSource, collect)(Card);
