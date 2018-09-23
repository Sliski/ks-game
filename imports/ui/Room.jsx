import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import GameController from '../api/controllers/gameController.js';
import { GameStatuses } from '../api/models/game.js';
import TileSquare from './TileSquare.jsx';

class Room extends Component {
  handleBackToRoomsList() {
    this.props.backToRoomsListHandler();
  }

  handleConcede() {
    GameController.userConcedeGame(this.props.game);
  }

  handleConfirm() {
    GameController.userConfirm(this.props.game);
  }

  _isConcedeEnable() {
    return (
      this.props.game.status === GameStatuses.FINISHED
      || this.props.game.userIndex(this.props.user) === null
    );
  }

  renderStatus() {
    const { game } = this.props;
    let status = '';
    if (game.status === GameStatuses.STARTED) {
      const playerIndex = game.currentPlayerIndex();
      status = `In Progress: current player: ${game.players[playerIndex].username}`;
    } else if (game.status === GameStatuses.FINISHED) {
      const playerIndex = game.winner();
      if (playerIndex === null) {
        status = 'Finished: tie';
      } else {
        status = `Finished: winner: ${game.players[playerIndex].username}`;
      }
    }

    return <div>{status}</div>;
  }

  render() {
    return (
      <div>
        <button
          type="button"
          onClick={
            this._isConcedeEnable()
              ? this.handleBackToRoomsList.bind(this)
              : this.handleConcede.bind(this)
          }
        >
          {this._isConcedeEnable() ? 'Leave room' : 'Concede'}
        </button>
        {this.renderStatus()}
        <Board game={this.props.game} />
        <button
          type="button"
          disabled={this.props.game.getUserConfirmStatus()}
          onClick={this.handleConfirm.bind(this)}
        >
          Confirm
          {` ${this.props.game.step}`}
        </button>
      </div>
    );
  }
}

function Board(props) {
  const rows = props.game.board.map((row, i) => <Row row={i} key={i} game={props.game} />);
  return <div className="game-board">{rows}</div>;
}

function Row(props) {
  const tiles = props.game.board[props.row].map((tile, i) => (
    <TileSquare row={props.row} col={i} key={i} game={props.game} />
  ));
  return <div className="row">{tiles}</div>;
}

export default DragDropContext(HTML5Backend)(Room);
