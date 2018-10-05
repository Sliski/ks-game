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
