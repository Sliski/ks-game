// status of the game
export const GameStatuses = {
  WAITING: 'WAITING', // waiting player to join
  STARTED: 'STARTED', // all spots are filled; can start playing
  FINISHED: 'FINISHED', // game is finished
  ABANDONED: 'ABANDONED', // all players left; game is abandoned
};

// game steps
export const GameSteps = {
  SETUP: 'setup',
  PLANNING: 'planning',
  EXECUTION: 'execution',
};

// width and height of board
const BOARD_SIZE = 6;

/**
 * Game model, encapsulating game-related logics
 * It is data store independent
 */
export class Game {
  /**
   * Constructor accepting a single param gameDoc.
   * gameDoc should contain the permanent fields of the game instance.
   * Normally, the fields are saved into data store, and later get retrieved
   *
   * If gameDoc is not given, then we will instantiate a new object with default fields
   *
   * @param {Object} [gameDoc] Optional doc retrieved from Games collection
   */
  constructor(gameDoc) {
    if (gameDoc) {
      _.extend(this, gameDoc);
    } else {
      this.status = GameStatuses.WAITING;
      this.step = GameSteps.SETUP;
      this.board = Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill([]));
      this.players = [];
      this.confirms = Array(2).fill(false);
    }
  }

  /**
   * Return a list of fields that are required for permanent storage
   *
   * @return {[]String] List of fields required persistent storage
   */
  persistentFields() {
    return ['status', 'step', 'board', 'players', 'confirms'];
  }

  /**
   * Handle join game action
   *
   * @param {User} user Meteor.user object
   */
  userJoin(user) {
    if (this.status !== GameStatuses.WAITING) {
      throw new Error('cannot join at current state');
    }
    if (this.userIndex() !== null) {
      throw new Error('user already in game');
    }

    this.players.push({
      userId: user._id,
      username: user.username,
    });

    // game automatically start with 2 players
    if (this.players.length === 2) {
      this.status = GameStatuses.STARTED;
    }
  }

  /**
   * Handle leave game action
   *
   * @param {User} user Meteor.user object
   */
  userLeave(user) {
    if (this.status !== GameStatuses.WAITING) {
      throw new Error('cannot leave at current state');
    }
    if (this.userIndex() === null) {
      throw new Error('user not in game');
    }
    this.players = _.reject(this.players, player => player.userId === user._id);

    // game is considered abandoned when all players left
    if (this.players.length === 0) {
      this.status = GameStatuses.ABANDONED;
    }
  }

  /**
   * Handle concede.
   *
   * @param {User} user Meteor.user object
   */
  userConcede() {
    if (this.status !== GameStatuses.STARTED) {
      throw new Error('cannot concede at current state');
    }
    if (this.userIndex() === null) {
      throw new Error('user not in game');
    }
    this.status = GameStatuses.FINISHED;
  }

  userConfirm() {
    const userIndex = this.userIndex();
    if (userIndex === null) {
      throw new Error('user not in game');
    }
    if (this.confirms[userIndex]) {
      throw new Error('Already confirmed.');
    }
    this.confirms[userIndex] = true;

    // move 1 step forward if both players confirmed setup.
    if (this.step === GameSteps.SETUP && this.confirms[0] && this.confirms[1]) {
      this.confirms[0] = false;
      this.confirms[1] = false;
      this.step = GameSteps.PLANNING;
    }

    // move 1 step forward if both players confirmed planning.
    if (this.step === GameSteps.PLANNING && this.confirms[0] && this.confirms[1]) {
      // this.confirms[0] = true;
      // this.confirms[1] = false;
      // this.step = GameSteps.EXECUTION;
      // for testing purposes:
      this.confirms[0] = false;
      this.confirms[1] = false;
      this.step = GameSteps.SETUP;
    }
  }

  getUserConfirmStatus() {
    return this.confirms[this.userIndex()];
  }

  /**
   * Handle user action. i.e. putting marker on the game board
   *
   * @param {Number} row Row index of the board
   * @param {Number} col Col index of the board
   */
  userAddToken(row, col) {
    if (row < 0 || row >= this.board.length || col < 0 || col >= this.board[row].length) {
      throw new Error('invalid row|col input');
    }
    this.board[row][col].push(this.userIndex() === 0 ? 'a' : 'b');
  }

  /**
   * @return {Number} currentPlayerIndex 0 or 1
   */
  currentPlayerIndex() {
    if (this.status !== GameStatuses.STARTED) {
      return null;
    }

    // determine the current player by counting the filled cells
    // if even, then it's first player, otherwise it's second player
    const filledCount = this._filledCount();
    return filledCount % 2 === 0 ? 0 : 1;
  }

  /**
   * Determine the winner of the game
   *
   * @return {Number} playerIndex of the winner (0 or 1). null if not finished
   */
  winner() {
    const { board } = this;
    for (let playerIndex = 0; playerIndex < 2; playerIndex += 1) {
      // check rows
      for (let r = 0; r < 3; r += 1) {
        let allMarked = true;
        for (let c = 0; c < 3; c += 1) {
          if (board[r][c] !== playerIndex) allMarked = false;
        }
        if (allMarked) return playerIndex;
      }

      // check cols
      for (let c = 0; c < 3; c += 1) {
        let allMarked = true;
        for (let r = 0; r < 3; r += 1) {
          if (board[r][c] !== playerIndex) allMarked = false;
        }
        if (allMarked) return playerIndex;
      }

      // check diagonals
      if (
        board[0][0] === playerIndex
        && board[1][1] === playerIndex
        && board[2][2] === playerIndex
      ) {
        return playerIndex;
      }
      if (
        board[0][2] === playerIndex
        && board[1][1] === playerIndex
        && board[2][0] === playerIndex
      ) {
        return playerIndex;
      }
    }
    return null;
  }

  /**
   * Helper method to retrieve the player index of a user
   *
   * @return {Number} index 0-based index, or null if not found
   */
  userIndex() {
    for (let i = 0; i < this.players.length; i += 1) {
      if (this.players[i].userId === Meteor.userId()) {
        return i;
      }
    }
    return null;
  }

  opponentIndex() {
    if (this.userIndex() === null) {
      return null;
    }
    return Math.abs(this.userIndex() - 1);
  }

  _filledCount() {
    let filledCount = 0;
    for (let r = 0; r < 3; r += 1) {
      for (let c = 0; c < 3; c += 1) {
        if (this.board[r][c] !== null) filledCount += 1;
      }
    }
    return filledCount;
  }
}
