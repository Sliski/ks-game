import React, { Component } from 'react';
import { cardTypes } from './Card.jsx';
import GameController from '../api/controllers/gameController.js';

export default class Order extends Component {
  getCardText() {
    if (this.props.flipped && this.props.playerIndex !== this.props.game.userIndex()) {
      return '';
    }
    return cardTypes[this.props.type];
  }

  isClickable() {
    return this.props.flipped && this.props.playerIndex === this.props.game.userIndex();
  }

  handleClick(e) {
    e.preventDefault();
    if (this.isClickable()) {
      GameController.userFlipOrder(this.props.game._id, this.props.unitIndex);
    }
  }

  render() {
    const { flipped } = this.props;
    return (
      <div
        className={`card card-${flipped ? 'flipped' : 'revealed'}`}
        onClick={this.handleClick.bind(this)}
        style={this.isClickable() ? { cursor: 'pointer' } : { cursor: 'default' }}
      >
        {this.getCardText()}
      </div>
    );
  }
}
