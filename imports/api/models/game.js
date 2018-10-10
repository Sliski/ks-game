import { gameTemplate } from './gameTemplate.js';
import { GameStatuses, GameSteps } from './gameConst.js';

export class Game {
  constructor(gameDoc) {
    if (gameDoc) {
      _.extend(this, gameDoc);
    } else {
      // prepare default values in game object
      this.persistentFields().forEach((field) => {
        this[field] = gameTemplate[field];
      });
      // choose 1st player randomly
      this.firstPlayer = Math.floor(Math.random() * 2);
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
      'textarea',
    ];
  }

  userJoin(user) {
    if (this.status !== GameStatuses.WAITING) {
      throw new Error('cannot join at current state');
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
        markedCards.forEach(type => this.userDiscardCard(type));
      } else {
        throw new Error('Choose exactly 3 cards to discard.');
      }
    }
    if (
      this.step === GameSteps.PLANNING
      && this.units[userIndex].map(unit => unit.order.type).includes(null)
    ) {
      throw new Error('Choose order for each character.');
    }
    if (
      this.step === GameSteps.EXECUTION
      && this.units[userIndex].map(unit => unit.order.flipped).includes(true)
    ) {
      throw new Error('Execute all orders before ending round.');
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
    const token = this.board[from.x][from.y].pop();
    if (token) this.board[to.x][to.y].push(token);
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

  userTypeInTextArea(text) {
    this.textarea = text;
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
