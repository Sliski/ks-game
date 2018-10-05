import React, { Component } from 'react';
import { GameSteps } from '../api/models/gameConst.js';
import Order from './Order.jsx';

export default class Discard extends Component {
  renderOrders() {
    const { game, playerIndex } = this.props;
    const discard = game.discards[playerIndex];
    const flipped = game.step === GameSteps.SETUP;
    return discard
      .sort()
      .map((type, i) => (
        <Order type={type} flipped={flipped} playerIndex={-1} key={type + i} game={game} />
      ));
  }

  render() {
    return <div className="discard">{this.renderOrders()}</div>;
  }
}
