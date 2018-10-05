import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { ItemTypes, GameSteps } from '../api/models/gameConst.js';
import { icons } from '../icons/tokens.jsx';

const unitSource = {
  beginDrag(props) {
    return {
      x: -1,
      y: -1,
      data: {
        player: props.owner,
        type: props.type,
        rotate: 0,
      },
    };
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

class UnitIcon extends Component {
  isDraggable() {
    const { game, owner } = this.props;
    return game.step === GameSteps.SETUP && owner === game.userIndex();
  }

  render() {
    const { connectDragSource, type } = this.props;
    const icon = (
      <div style={{ cursor: this.isDraggable() ? 'move' : 'default' }} className="unit-img">
        {icons[type]}
      </div>
    );
    if (this.isDraggable()) return connectDragSource(icon);
    return icon;
  }
}

export default DragSource(ItemTypes.TOKEN, unitSource, collect)(UnitIcon);
