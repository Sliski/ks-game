import React, { Component } from 'react';
import UserHeader from './UserHeader.jsx';
import GameController from '../api/controllers/gameController.js';
import { GameStatuses } from '../api/models/game.js';

export default class RoomsList extends Component {
  handleNewGame() {
    GameController.newGame(this.props.user);
  }

  handleLeaveGame(gameId) {
    GameController.userLeaveGame(gameId, this.props.user);
  }

  handleJoinGame(gameId) {
    GameController.userJoinGame(gameId, this.props.user);
  }

  handleEnterGame(gameId) {
    this.props.enterGameHandler(gameId);
  }

  activeGames() {
    return _.filter(
      this.props.games,
      game => game.status === GameStatuses.WAITING || game.status === GameStatuses.STARTED,
    );
  }

  myCurrentGameId() {
    const game = _.find(
      this.activeGames(),
      activeGame => activeGame.userIndex(this.props.user) !== null,
    );
    return game === undefined ? null : game._id;
  }

  renderPlayers(game) {
    const player1 = game.players.length > 0 ? game.players[0].username : '';
    const player2 = game.players.length > 1 ? game.players[1].username : '';
    return (
      <span>
        [
        {player1}
        ] vs [
        {player2}
        ]
      </span>
    );
  }

  render() {
    return (
      <div>
        <div>
          <UserHeader user={this.props.user} />

          <h1>List of games</h1>
          {this.activeGames().map((game, index) => (
            <div key={game._id}>
              <span>
                Game
                {index + 1}
              </span>
              {this.renderPlayers(game)}

              {/* can leave only if user is in the game, and the game is not started */}
              {this.myCurrentGameId() === game._id && game.status === GameStatuses.WAITING ? (
                <button type="button" onClick={this.handleLeaveGame.bind(this, game._id)}>
                  Leave
                </button>
              ) : null}

              {/* can join only if user is not in any game, and the game is not started */}
              {this.myCurrentGameId() === null && game.status === GameStatuses.WAITING ? (
                <button type="button" onClick={this.handleJoinGame.bind(this, game._id)}>
                  Join
                </button>
              ) : null}

              {/* can enter only if the game is started */}
              {game.status === GameStatuses.STARTED ? (
                <button type="button" onClick={this.handleEnterGame.bind(this, game._id)}>
                  Enter
                </button>
              ) : null}
            </div>
          ))}
        </div>

        {/* Only show new game button if player is not in any room */}
        {this.myCurrentGameId() === null ? (
          <div>
            <button type="button" onClick={this.handleNewGame.bind(this)}>
              New Game
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}
