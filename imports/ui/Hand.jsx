import React, { Component } from 'react';
import Card from './Card.jsx';

export default class Hand extends Component {
  renderCards() {
    const { game } = this.props;
    const hand = game.hands[game.userIndex()];
    const cards = [];
    _.each(hand, (amount, type) => {
      _.times(amount, (index) => {
        cards.push(
          <Card type={type} flip={false} owner={game.userIndex()} key={type + index} game={game} />,
        );
      });
    });
    return cards;
  }

  render() {
    if (this.props.game.userIndex() === null) return '';
    return <div className="hand">{this.renderCards()}</div>;
  }
}
