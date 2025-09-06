export type Card = {
  suit: string;
  value: string;
};

export type Player = {
  hand: Card[];
  score: number;
};

export type GameState = {
  player: Player;
  dealer: Player;
  deck: Card[];
};
