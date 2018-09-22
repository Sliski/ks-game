import React, { Component } from 'react';
import RoomsController from '../api/controllers/roomsController.js';
import { GameStatuses } from '../api/models/game.js';
import Tile from './Tile.jsx';

export default class Room extends Component {
  handleBackToRoomsList() {
    this.props.backToRoomsListHandler();
  }

  handleConcede() {
    RoomsController.userConcedeGame(this.props.game, this.props.user);
  }

  _isGameFinished() {
    return (
      this.props.game.status === GameStatuses.FINISHED
      || this.props.game.userIndex(this.props.user) === null
    );
  }

  renderCell(row, col) {
    const value = this.props.game.board[row][col];
    if (value === 0) return <td>O</td>;
    if (value === 1) return <td>X</td>;
    return <td onClick={this.handleCellClick.bind(this, row, col)} />;
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
      // done
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
      </div>
    );
    // // board size:
    // const xSize = 6;
    // const ySize = 6;
    //
    // let boardHtml = '';
    //
    // for (let x = 0; x < xSize; x += 1) {
    //   for (let y = 0; y < ySize; y += 1) {
    //     boardHtml += 'row';
    //     console.log('xyz');
    //   }
    // }
    // return (
    //   <div>
    //     <button
    //       type="button"
    //       onClick={
    //         this._isGameFinished()
    //           ? this.handleBackToRoomsList.bind(this)
    //           : this.handleConcede.bind(this)
    //       }
    //     >
    //       {this._isGameFinished() ? 'Leave room.' : 'Concede.'}
    //     </button>
    //     {this.renderStatus()}
    //     <table className="game-board">
    //       <tbody>
    //         <tr>
    //           {this.renderCell(0, 0)}
    //           {this.renderCell(0, 1)}
    //           {this.renderCell(0, 2)}
    //         </tr>
    //         <tr>
    //           {this.renderCell(1, 0)}
    //           {this.renderCell(1, 1)}
    //           {this.renderCell(1, 2)}
    //         </tr>
    //         <tr>
    //           {this.renderCell(2, 0)}
    //           {this.renderCell(2, 1)}
    //           {this.renderCell(2, 2)}
    //         </tr>
    //       </tbody>
    //     </table>
    //   </div>
    // );
  }
}

function Board(props) {
  console.log(props);
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
