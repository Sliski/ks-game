import React, { Component } from 'react';

const tileClass = {
  d: 'damage', // damage
  e: 'effect', // effect
  r: 'unit-right', // unit face right
  u: 'unit-up', // unit face up
  n: 'none', // empty space
};

// arrow points
const arrowR = [
  { x: 0, y: 7 },
  { x: 10, y: 7 },
  { x: 6, y: 2 },
  { x: 14, y: 10 },
  { x: 6, y: 18 },
  { x: 10, y: 13 },
  { x: 0, y: 13 },
];
const arrowL = arrowR.map(point => ({ x: 20 - point.x, y: 20 - point.y }));
const arrowD = arrowR.map(point => ({ x: point.y, y: point.x }));
const arrowU = arrowL.map(point => ({ x: point.y, y: point.x }));

const arrows = {
  R: arrowR,
  L: arrowL,
  U: arrowU,
  D: arrowD,
};

export default class AttackVisualisation extends Component {
  renderDottedLine(start, end) {
    return (
      <line
        className="dotted-line"
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        key={start + end}
      />
    );
  }

  renderArrow(sense, offset) {
    return (
      <polyline
        className="push-arrow"
        points={arrows[sense].map(point => `${point.x + offset.x},${point.y + offset.y}`).join(' ')}
        key={sense + offset}
      />
    );
  }

  renderOverlay(effects) {
    return effects.map((effect) => {
      if (effect.type === 'arrow') return this.renderArrow(effect.data.type, effect.data.offset);
      if (effect.type === 'dotted-line') return this.renderDottedLine(effect.data.start, effect.data.end);
      return '';
    });
  }

  renderTiles(tiles) {
    return tiles.map((row, y) => row
      .split('')
      .map((tile, x) => (
        <rect
          className={`small-tile tile-${tileClass[tile]}`}
          key={`${x} ${y}`}
          x={x * 20}
          y={y * 20}
          width="20"
          height="20"
        />
      )));
  }

  render() {
    const { tiles, overlay } = this.props.visualisation;
    if (tiles[0].length === 0) return '';
    return (
      <div className="attack-visualisation">
        <svg className="skill-svg" viewBox={`0 0 ${tiles[0].length * 20} ${tiles.length * 20}`}>
          <defs>
            <pattern id="unit-up" width="20" height="20">
              <rect className="unit-bg" width="20" height="20" />
              <polygon className="unit-triangle" points="4,16 10,4 16,16" />
            </pattern>
            <pattern id="unit-right" width="20" height="20">
              <rect className="unit-bg" width="20" height="20" />
              <polygon className="unit-triangle" points="4,4 16,10 4,16" />
            </pattern>
          </defs>
          {this.renderTiles(tiles)}
          {this.renderOverlay(overlay)}
        </svg>
      </div>
    );
  }
}
