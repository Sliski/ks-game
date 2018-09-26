import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import GameController from '../api/controllers/gameController.js';
import { GameStatuses } from '../api/models/game.js';
import Tray from './Tray.jsx';
import Tile from './Tile.jsx';
import UnitStatCard from './UnitStatCard.jsx';
import Hand from './Hand.jsx';
import Discard from './Discard.jsx';

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

  _isConcedeDisabled() {
    return (
      this.props.game.status === GameStatuses.FINISHED
      || this.props.game.userIndex(this.props.user) === null
    );
  }

  renderTeamBox(player) {
    const { game } = this.props;
    const playerIndex = game.playerIndex(player);
    const units = game.units[playerIndex];
    return (
      <div className={`team-box player-${playerIndex}`}>
        <UnitStatCard unit={units[0]} unitIndex={0} playerIndex={playerIndex} gameId={game._id} />
        <UnitStatCard unit={units[1]} unitIndex={1} playerIndex={playerIndex} gameId={game._id} />
        <UnitStatCard unit={units[2]} unitIndex={2} playerIndex={playerIndex} gameId={game._id} />
      </div>
    );
  }

  renderStatus() {
    const { game } = this.props;
    let status = '';
    if (game.status === GameStatuses.STARTED) {
      status = 'In Progress.';
    } else if (game.status === GameStatuses.FINISHED) {
      status = 'Finished.';
    }

    return <div>{status}</div>;
  }

  render() {
    return (
      <div>
        <button
          type="button"
          onClick={
            this._isConcedeDisabled()
              ? this.handleBackToRoomsList.bind(this)
              : this.handleConcede.bind(this)
          }
        >
          {this._isConcedeDisabled() ? 'Leave room' : 'Concede'}
        </button>
        {this.renderStatus()}
        <div className="play-area">
          <div className="top-bottom-box">
            {this.renderTeamBox('opponent')}
            <Discard />
          </div>
          <div className="center-box">
            <Tray game={this.props.game} />
            <Board game={this.props.game} />
            <Hand game={this.props.game} />
          </div>
          <div className="top-bottom-box">
            {this.renderTeamBox('user')}
            <Discard />
          </div>
        </div>
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
  const rows = props.game.board.map((row, i) => <Row x={i} key={i} game={props.game} />);
  return <div className="game-board">{rows}</div>;
}

function Row(props) {
  const tiles = props.game.board[props.x].map((tile, i) => (
    <Tile x={props.x} y={i} key={i} game={props.game} />
  ));
  return <div className="row">{tiles}</div>;
}

export default DragDropContext(HTML5Backend)(Room);
