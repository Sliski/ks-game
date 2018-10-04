import React, { Component } from 'react';
import AttackVisualisation from './AttackVisualisation.jsx';

export default class UnitSkillCard extends Component {
  renderDescription(orderType, unitType) {
    return `${orderType} ${unitType}`;
  }

  render() {
    const { unitType } = this.props;
    return (
      <div className="unit-skill-card">
        <div className="skill attack-a">
          <h3>Attack A</h3>
          {this.renderDescription('A', unitType)}
          <AttackVisualisation />
        </div>
        <div className="skill attack-b">
          <h3>Attack B</h3>
          {this.renderDescription('B', unitType)}
          <AttackVisualisation />
        </div>
        <div className="skill move">
          <h3>Move</h3>
          {this.renderDescription('M', unitType)}
        </div>
      </div>
    );
  }
}
