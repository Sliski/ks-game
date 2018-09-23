import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../api/Constants.js';
import Tile from './Tile.jsx';

const squareTarget = {
  canDrop(props) {
    console.log('SquareTarget.canDrop');
    console.log(props);
    return true;
  },

  hover() {
    console.log('hover');
  },

  drop(props) {
    console.log('TileSquare.drop');
    console.log(props);
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

class TileSquare extends Component {
  _empty() {
    return '';
  }

  render() {
    return <Tile row={this.props.row} col={this.props.col} game={this.props.game} />;
  }
}

export default DropTarget(ItemTypes.TOKEN, squareTarget, collect)(TileSquare);
