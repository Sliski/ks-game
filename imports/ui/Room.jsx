import React, { Component } from 'react';
import GameController from '../api/controllers/gameController.js';
import { GameStatuses } from '../api/models/game.js';
import Tile from './Tile.jsx';

export default class Room extends Component {
  handleBackToRoomsList() {
    this.props.backToRoomsListHandler();
  }

  handleConcede() {
    GameController.userConcedeGame(this.props.game, this.props.user);
  }

  handleConfirm() {
    GameController.userConfirm(this.props.game, this.props.user);
  }

  _isGameFinished() {
    return (
      this.props.game.status === GameStatuses.FINISHED
      || this.props.game.userIndex(this.props.user) === null
    );
  }

  renderStatus() {
    console.log(this.props);
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
            this._isGameFinished()
              ? this.handleBackToRoomsList.bind(this)
              : this.handleConcede.bind(this)
          }
        >
          {this._isGameFinished() ? 'Leave room' : 'Concede'}
        </button>
        {this.renderStatus()}
        <Board game={this.props.game} />
        <button
          type="button"
          disabled={this.props.game.confirmStatus(this.props.user)}
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
  return (
    <table className="game-board">
      <tbody>{rows}</tbody>
    </table>
  );
}

function Row(props) {
  const tiles = props.game.board[props.row].map((tile, i) => (
    <Tile row={props.row} col={i} key={i} game={props.game} />
  ));
  return <tr>{tiles}</tr>;
}
