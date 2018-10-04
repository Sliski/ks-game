import React, { Component } from 'react';
import { icons } from '../icons/tokens.jsx';
import AttackVisualisation from './AttackVisualisation.jsx';
import { units } from '../api/models/units.js';

export default class UnitSkillCard extends Component {
  renderDescription(orderType, unit) {
    return <div className="skill-description">{unit.skills[orderType].desc}</div>;
  }

  render() {
    const { unitType } = this.props;
    const unit = units[unitType];
    return (
      <div className="unit-skill-card">
        <div className="skill-card-header">
          {icons[unitType]}
          <span className="unit-name">{unit.name}</span>
        </div>
        <div className="skill attack-a">
          <div className="skill-name">Attack A</div>
          {this.renderDescription('a', unit)}
          <AttackVisualisation visualisation={unit.skills.a.visualisation} />
        </div>
        <div className="skill attack-b">
          <div className="skill-name">Attack B</div>
          {this.renderDescription('b', unit)}
          <AttackVisualisation visualisation={unit.skills.b.visualisation} />
        </div>
        <div className="skill move">
          <div className="skill-name">Move</div>
          {this.renderDescription('m', unit)}
        </div>
      </div>
    );
  }
}
