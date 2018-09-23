import { Game } from '../models/game.js';
import Games from '../collections/games.js';

const GameController = {
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

  userConcedeGame(gameId) {
    const game = Games.findOne(gameId);
    game.userConcede();
    Games.saveGame(game);
  },

  userAddToken(gameId, x, y) {
    const game = Games.findOne(gameId);
    game.userAddToken(x, y);
    Games.saveGame(game);
  },

  userConfirm(gameId) {
    const game = Games.findOne(gameId);
    game.userConfirm();
    Games.saveGame(game);
  },

  moveToken(gameId, from, to) {
    const game = Games.findOne(gameId);
    game.moveToken(from, to);
    Games.saveGame(game);
  },
};

export { GameController as default };
