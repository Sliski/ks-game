import React, { Component } from 'react';
import Card from './Card.jsx';

export default class Hand extends Component {
  renderCards() {
    const hand = this.props.game.hands[this.props.game.userIndex()];
    const cards = [];
    _.each(hand, (amount, type) => {
      _.times(amount, (index) => {
        cards.push(<Card type={type} key={type + index} />);
      });
    });
    return cards;
  }

  render() {
    if (this.props.game.userIndex() === null) return '';
    return <div className="hand">{this.renderCards()}</div>;
  }
}
