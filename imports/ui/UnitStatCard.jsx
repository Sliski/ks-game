import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes, GameSteps } from '../api/models/game.js';
import GameController from '../api/controllers/gameController.js';
import Order from './Order.jsx';
import UnitIcon from './UnitIcon.jsx';

const unitStatCardTarget = {
  drop(props, monitor) {
    const card = monitor.getItem();
    GameController.userUpdateOrder(props.game._id, props.unitIndex, card.type);
  },

  canDrop(props) {
    return props.game.userIndex() === props.playerIndex && props.game.step === GameSteps.PLANNING;
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

class UnitStatCard extends Component {
  getOrderCard() {
    const { order } = this.props.game.units[this.props.playerIndex][this.props.unitIndex];
    if (order.type) {
      return (
        <Order
          type={order.type}
          flipped={order.flipped}
          playerIndex={this.props.playerIndex}
          unitIndex={this.props.unitIndex}
          game={this.props.game}
        />
      );
    }
    return '';
  }

  addHp() {
    this.updateHp(1);
  }

  removeHp() {
    this.updateHp(-1);
  }

  updateHp(amount) {
    GameController.updateHp(
      this.props.game._id,
      this.props.playerIndex,
      this.props.unitIndex,
      amount,
    );
  }

  render() {
    const {
      connectDropTarget, game, playerIndex, unitIndex,
    } = this.props;
    const unit = game.units[playerIndex][unitIndex];
    return connectDropTarget(
      <div className={`unit-stat-card unit-${unit.type}`}>
        <div className="left-part">
          <UnitIcon owner={playerIndex} type={unit.type} game={game} />
          <div className="hp-bar">
            <button
              type="button"
              className="hp-button minus-button"
              onClick={this.removeHp.bind(this)}
            >
              -
            </button>
            <div className="hp-value">{unit.hp}</div>
            <button type="button" className="hp-button plus-button" onClick={this.addHp.bind(this)}>
              +
            </button>
          </div>
        </div>
        {this.getOrderCard()}
      </div>,
    );
  }
}

export default DropTarget(ItemTypes.CARD, unitStatCardTarget, collect)(UnitStatCard);
