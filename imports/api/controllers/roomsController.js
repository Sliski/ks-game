import { Game } from '../models/game.js';
import Games from '../collections/games.js';

const RoomsController = {
  newGame(user) {
    const game = new Game();
    game.userJoin(user);
    Games.saveGame(game);
  },

  userJoinGame(gameId, user) {
    const game = Games.findOne(gameId);
    game.userJoin(user);
    Games.saveGame(game);
  },

  userLeaveGame(gameId, user) {
    const game = Games.findOne(gameId);
    game.userLeave(user);
    Games.saveGame(game);
  },

  userConcedeGame(gameId, user) {
    const game = Games.findOne(gameId);
    game.userConcede(user);
    Games.saveGame(game);
  },

  userMarkGame(gameId, user, row, col) {
    const game = Games.findOne(gameId);
    game.userMark(user, row, col);
    Games.saveGame(game);
  },
};

export { RoomsController as default };
