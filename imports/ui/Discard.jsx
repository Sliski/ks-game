import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes, GameSteps } from '../api/models/game.js';
import GameController from '../api/controllers/gameController.js';
import Order from './Order.jsx';

const discardTarget = {
  drop(props, monitor) {
    GameController.userDiscardCard(props.game._id, monitor.getItem().type);
  },

  canDrop(props) {
    return (
      props.game.step === GameSteps.SETUP
      && props.game.userIndex() === props.playerIndex
      && props.game.discards[props.game.userIndex()].length < 3
    );
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

class Discard extends Component {
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
    const { connectDropTarget } = this.props;
    return connectDropTarget(<div className="discard">{this.renderOrders()}</div>);
  }
}

export default DropTarget(ItemTypes.CARD, discardTarget, collect)(Discard);
