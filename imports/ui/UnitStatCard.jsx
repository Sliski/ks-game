import React, { Component } from 'react';

export default class UnitStatCard extends Component {
  _empty() {
    return '';
  }

  render() {
    return (
      <div className="unit-stat-card">
        <div className="unit-img">
          <svg />
        </div>
        <div className="hp-bar">
          <button type="button" className="hp-button minus-button">
            -
          </button>
          <div className="hp-value">4</div>
          <button type="button" className="hp-button plus-button">
            +
          </button>
        </div>
      </div>
    );
  }
}
