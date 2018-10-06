import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../api/models/gameConst.js';
import GameController from '../api/controllers/gameController.js';
import Token from './Token.jsx';

const trayTarget = {
  drop(props, monitor) {
    const { x, y } = monitor.getItem();
    if (x >= 0 && y >= 0) GameController.removeToken(props.game._id, x, y);
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

class Tray extends Component {
  tokensInTray() {
    return this.props.game.tray.map((token, i) => (
      <Token data={token} x={-1} y={-1} key={i} gameId={this.props.game._id} />
    ));
  }

  render() {
    const { connectDropTarget } = this.props;

    return connectDropTarget(<div className="tray">{this.tokensInTray()}</div>);
  }
}

export default DropTarget(ItemTypes.TOKEN, trayTarget, collect)(Tray);
