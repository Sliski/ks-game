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

// Draggable item types
export const ItemTypes = {
  TOKEN: 'token',
  CARD: 'card',
};

// width and height of board
const BOARD_SIZE = 6;

export class Game {
  constructor(gameDoc) {
    if (gameDoc) {
      _.extend(this, gameDoc);
    } else {
      this.status = GameStatuses.WAITING;
      this.step = GameSteps.SETUP;
      this.board = Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill([]));
      this.tray = [];
      this.players = [];
      this.units = [[], []];
      this.hands = Array(2).fill({
        a: 2,
        b: 2,
        m: 2,
        r: 2,
      });
      this.discards = [[], []];
      this.confirms = Array(2).fill(false);
      this.firstPlayer = Math.floor(Math.random() * 2);

      // add initial tokens
      this.tray.push({
        player: 0,
        type: 'pl',
        rotate: 0,
      });
      this.tray.push({
        player: 0,
        type: 'cb',
        rotate: 0,
      });
      this.tray.push({
        player: 0,
        type: 'rd',
        rotate: 0,
      });
      this.tray.push({
        player: 1,
        type: 'lv',
        rotate: 0,
      });
      this.tray.push({
        player: 1,
        type: 'st',
        rotate: 0,
      });
      this.tray.push({
        player: 1,
        type: 'bh',
        rotate: 0,
      });
      this.tray.push({
        player: -1,
        type: 'mountain',
        rotate: -1,
      });
      this.tray.push({
        player: -1,
        type: 'lake',
        rotate: -1,
      });
      this.tray.push({
        player: -1,
        type: 'building',
        rotate: -1,
      });

      // add units
      this.units[0].push({
        type: 'pl',
        hp: 4,
        order: {
          type: null,
          flipped: true,
        },
      });
      this.units[0].push({
        type: 'cb',
        hp: 4,
        order: {
          type: null,
          flipped: true,
        },
      });
      this.units[0].push({
        type: 'rd',
        hp: 4,
        order: {
          type: null,
          flipped: true,
        },
      });
      this.units[1].push({
        type: 'lv',
        hp: 4,
        order: {
          type: null,
          flipped: true,
        },
      });
      this.units[1].push({
        type: 'st',
        hp: 4,
        order: {
          type: null,
          flipped: true,
        },
      });
      this.units[1].push({
        type: 'bh',
        hp: 4,
        order: {
          type: null,
          flipped: true,
        },
      });
    }
  }

  persistentFields() {
    return [
      'status',
      'step',
      'board',
      'tray',
      'players',
      'units',
      'hands',
      'discards',
      'confirms',
      'firstPlayer',
    ];
  }

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

  userConcede() {
    if (this.status !== GameStatuses.STARTED) {
      throw new Error('cannot concede at current state');
    }
    if (this.userIndex() === null) {
      throw new Error('user not in game');
    }
    this.status = GameStatuses.FINISHED;
  }

  userConfirm(markedCards) {
    const userIndex = this.userIndex();
    if (userIndex === null) {
      throw new Error('user not in game');
    }
    if (this.confirms[userIndex]) {
      throw new Error('Already confirmed.');
    }
    if (this.step === GameSteps.SETUP) {
      if (markedCards.length === 3) {
        markedCards.map(type => this.userDiscardCard(type));
      } else {
        // TODO show error on screen
        throw new Error('3 cards have to be choosen.');
      }
    }

    this.confirms[userIndex] = true;

    // move 1 step forward if both players confirmed setup.
    if (this.step === GameSteps.SETUP && this.confirms[0] && this.confirms[1]) {
      this.step = GameSteps.PLANNING;
      this.confirms[0] = false;
      this.confirms[1] = false;
    }

    // move 1 step forward if both players confirmed planning.
    if (this.step === GameSteps.PLANNING && this.confirms[0] && this.confirms[1]) {
      this.step = GameSteps.EXECUTION;
      this.confirms[0] = false;
      this.confirms[1] = false;
    }

    // start next round if both players
    if (this.step === GameSteps.EXECUTION && this.confirms[0] && this.confirms[1]) {
      for (let i = 0; i < 2; i += 1) {
        while (this.discards[i].length > 0) {
          this.hands[i][this.discards[i].pop()] += 1;
        }
        for (let j = 0; j < 3; j += 1) {
          this.discards[i].push(this.units[i][j].order.type);
          this.units[i][j].order.type = null;
          this.units[i][j].order.flipped = true;
        }
      }
      this.firstPlayer = (this.firstPlayer + 1) % 2;
      this.step = GameSteps.PLANNING;
      this.confirms[0] = false;
      this.confirms[1] = false;
    }
  }

  getUserConfirmStatus() {
    return this.confirms[this.userIndex()];
  }

  moveToken(from, to) {
    this.board[to.x][to.y].push(this.board[from.x][from.y].pop());
  }

  rotateToken(x, y) {
    this.board[x][y][this.board[x][y].length - 1].rotate += 1;
    this.board[x][y][this.board[x][y].length - 1].rotate %= 4;
  }

  addToken(token, x, y) {
    if (x < 0 || x >= this.board.length || y < 0 || y >= this.board[x].length) {
      throw new Error('invalid x|y input');
    }
    this.board[x][y].push(token);
  }

  removeToken(x, y) {
    return this.board[x][y].pop();
  }

  updateHp(playerIndex, unitIndex, amount) {
    this.units[playerIndex][unitIndex].hp += amount;
    if (this.units[playerIndex][unitIndex].hp < 0) this.units[playerIndex][unitIndex].hp = 0;
  }

  userUpdateOrder(unitIndex, orderType) {
    const { order } = this.units[this.userIndex()][unitIndex];
    const hand = this.hands[this.userIndex()];
    if (order.type) {
      hand[order.type] += 1;
      hand[orderType] -= 1;
      order.type = orderType;
    } else {
      hand[orderType] -= 1;
      order.type = orderType;
    }
  }

  userFlipOrder(unitIndex) {
    this.units[this.userIndex()][unitIndex].order.flipped = false;
  }

  userIndex() {
    for (let i = 0; i < this.players.length; i += 1) {
      if (this.players[i].userId === Meteor.userId()) {
        return i;
      }
    }
    return null;
  }

  userDiscardCard(type) {
    this.discards[this.userIndex()].push(type);
    this.hands[this.userIndex()][type] -= 1;
  }

  opponentIndex() {
    if (this.userIndex() === null) {
      return null;
    }
    return Math.abs(this.userIndex() - 1);
  }

  playerIndex(player) {
    if (this.userIndex() === null) {
      return player === 'user' ? 0 : 1;
    }
    return player === 'user' ? this.userIndex() : this.opponentIndex();
  }
}
