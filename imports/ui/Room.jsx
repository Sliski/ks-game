import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import GameController from '../api/controllers/gameController.js';
import { GameStatuses } from '../api/models/gameConst.js';
import Tray from './Tray.jsx';
import Tile from './Tile.jsx';
import UnitStatCard from './UnitStatCard.jsx';
import Hand from './Hand.jsx';
import Discard from './Discard.jsx';
import Chat from './Chat.jsx';
import UnitSkillCard from './UnitSkillCard.jsx';

const markedCards = [];

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = { preview: 'template', confirmationError: '' };
    this.handlePreviewUpdate = this.handlePreviewUpdate.bind(this);
  }

  handlePreviewUpdate(unitType, e) {
    e.preventDefault();
    this.setState({
      preview: unitType,
    });
  }

  handleBackToRoomsList() {
    markedCards.splice(markedCards.length);
    this.props.backToRoomsListHandler();
  }

  handleConcede() {
    GameController.userConcedeGame(this.props.game._id);
  }

  handleConfirm() {
    try {
      GameController.userConfirm(this.props.game._id, markedCards);
      this.setState({ confirmationError: '' });
    } catch (e) {
      this.setState({ confirmationError: e.message });
    }
  }

  _isConcedeDisabled() {
    return (
      this.props.game.status === GameStatuses.FINISHED
      || this.props.game.userIndex(this.props.user) === null
    );
  }

  renderPlayerNameBox(player) {
    const { game } = this.props;
    const playerIndex = game.playerIndex(player);
    return (
      <div className="player-name-box">
        {game.players[playerIndex].username}
        {game.firstPlayer === playerIndex ? <br /> : ''}
        {game.firstPlayer === playerIndex ? '[1] ' : ''}
      </div>
    );
  }

  renderTeamBox(player) {
    const { game } = this.props;
    const playerIndex = game.playerIndex(player);
    return (
      <div className={`team-box player-${playerIndex}`}>
        <UnitStatCard
          handlePreviewUpdate={this.handlePreviewUpdate}
          unitIndex={0}
          playerIndex={playerIndex}
          game={game}
        />
        <UnitStatCard
          handlePreviewUpdate={this.handlePreviewUpdate}
          unitIndex={1}
          playerIndex={playerIndex}
          game={game}
        />
        <UnitStatCard
          handlePreviewUpdate={this.handlePreviewUpdate}
          unitIndex={2}
          playerIndex={playerIndex}
          game={game}
        />
      </div>
    );
  }

  renderStatus() {
    const { game } = this.props;
    let status = '';
    if (game.status === GameStatuses.STARTED) {
      status = `In Progress. First player: ${game.players[game.firstPlayer].username}`;
    } else if (game.status === GameStatuses.FINISHED) {
      status = 'Finished.';
    }

    return <div className="game-status">{status}</div>;
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
            {this.renderPlayerNameBox('opponent')}
            {this.renderTeamBox('opponent')}
            <Discard playerIndex={this.props.game.playerIndex('opponent')} game={this.props.game} />
          </div>
          <div className="center-box">
            <Tray game={this.props.game} />
            <Board game={this.props.game} handlePreviewUpdate={this.handlePreviewUpdate} />
            <div className="center-right">
              <Chat game={this.props.game} />
              <UnitSkillCard unitType={this.state.preview} />
            </div>
          </div>
          <div className="top-bottom-box">
            {this.renderPlayerNameBox('user')}
            {this.renderTeamBox('user')}
            <Discard playerIndex={this.props.game.playerIndex('user')} game={this.props.game} />
          </div>
          <Hand game={this.props.game} markedCards={markedCards} />
        </div>
        <button
          type="button"
          className="confirm-button"
          disabled={this.props.game.getUserConfirmStatus()}
          onClick={this.handleConfirm.bind(this)}
        >
          Confirm
          {` ${this.props.game.step}`}
        </button>
        <span className="confirm-error">{this.state.confirmationError}</span>
      </div>
    );
  }
}

function Board(props) {
  const rows = props.game.board.map((row, i) => (
    <Row x={i} key={i} game={props.game} handlePreviewUpdate={props.handlePreviewUpdate} />
  ));
  return <div className="game-board">{rows}</div>;
}

function Row(props) {
  const tiles = props.game.board[props.x].map((tile, i) => (
    <Tile
      x={props.x}
      y={i}
      key={i}
      game={props.game}
      handlePreviewUpdate={props.handlePreviewUpdate}
    />
  ));
  return <div className="row">{tiles}</div>;
}

export default DragDropContext(HTML5Backend)(Room);
