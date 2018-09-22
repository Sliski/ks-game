import React, { Component } from 'react';
import Tile from './Tile.jsx';

export default class BoardTile extends Component {
  _empty() {
    return '';
  }

  render() {
    const tiles = this.props.rowContent.map((tile, i) => (
      <Tile tile={tile} row={this.props.row} col={i} key={i} game={this.props.game} />
    ));
    return <tr>{tiles}</tr>;
  }
}
