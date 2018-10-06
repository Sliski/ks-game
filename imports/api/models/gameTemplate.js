import { GameStatuses, GameSteps } from './gameConst.js';

// width and height of board
const BOARD_SIZE = 6;

const defaultOrder = {
  type: null,
  flipped: true,
};

export const gameTemplate = {
  status: GameStatuses.WAITING,
  step: GameSteps.SETUP,
  board: Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill([])),
  tray: ['mountain', 'lake', 'building', 'buildinga', 'buildingb', 'zone'].map(type => ({
    player: -1,
    type,
    rotate: -1,
  })),
  players: [],
  units: [
    ['pl', 'cb', 'rd'].map(type => ({
      type,
      hp: 4,
      order: defaultOrder,
    })),
    ['lv', 'st', 'bh'].map(type => ({
      type,
      hp: 4,
      order: defaultOrder,
    })),
  ],
  hands: Array(2).fill({
    a: 2,
    b: 2,
    m: 2,
    r: 2,
  }),
  discards: [[], []],
  confirms: Array(2).fill(false),
  firstPlayer: 0,
  textarea: '',
};
