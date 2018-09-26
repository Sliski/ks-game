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

  rotateToken(gameId, x, y) {
    const game = Games.findOne(gameId);
    game.rotateToken(x, y);
    Games.saveGame(game);
  },

  addToken(gameId, token, x, y) {
    const game = Games.findOne(gameId);
    game.addToken(token, x, y);
    Games.saveGame(game);
  },

  removeToken(gameId, x, y) {
    const game = Games.findOne(gameId);
    game.removeToken(x, y);
    Games.saveGame(game);
  },

  updateHp(gameId, playerIndex, unitIndex, amount) {
    const game = Games.findOne(gameId);
    game.updateHp(playerIndex, unitIndex, amount);
    Games.saveGame(game);
  },

  userUpdateOrder(gameId, unitIndex, orderType) {
    const game = Games.findOne(gameId);
    game.userUpdateOrder(unitIndex, orderType);
    Games.saveGame(game);
  },

  userFlipOrder(gameId, unitIndex) {
    const game = Games.findOne(gameId);
    game.userFlipOrder(unitIndex);
    Games.saveGame(game);
  },
};

export { GameController as default };
