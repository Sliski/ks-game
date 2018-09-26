import React, { Component } from 'react';
import { icons } from '../icons/tokens.jsx';
import GameController from '../api/controllers/gameController.js';

export default class UnitStatCard extends Component {
  addHp() {
    this.updateHp(1);
  }

  removeHp() {
    this.updateHp(-1);
  }

  updateHp(amount) {
    GameController.updateHp(
      this.props.gameId,
      this.props.playerIndex,
      this.props.unitIndex,
      amount,
    );
  }

  render() {
    return (
      <div className={`unit-stat-card unit-${this.props.unit.type}`}>
        <div className="unit-img">{icons[this.props.unit.type]}</div>
        <div className="hp-bar">
          <button
            type="button"
            className="hp-button minus-button"
            onClick={this.removeHp.bind(this)}
          >
            -
          </button>
          <div className="hp-value">{this.props.unit.hp}</div>
          <button type="button" className="hp-button plus-button" onClick={this.addHp.bind(this)}>
            +
          </button>
        </div>
      </div>
    );
  }
}
