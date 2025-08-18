const API_URL = "http://localhost:3001";

type Card = {
  suit: string;
  value: string;
};

type Player = {
  hand: Card[];
  score: number;
};

type GameState = {
  player: Player;
  dealer: Player;
  deck: Card[];
};

export async function startGame(): Promise<GameState> {
  const res = await fetch(`${API_URL}/start`, {method: "POST"});
  return res.json();
}

export async function hit(): Promise<GameState> {
  const res = await fetch(`${API_URL}/hit`, {method: "POST"});
  return res.json();
}

export async function stand(): Promise<GameState> {
  const res = await fetch(`${API_URL}/stand`, {method: "POST"});
  return res.json();
}

export async function double(): Promise<GameState> {
  const res = await fetch(`${API_URL}/double`, {method: "POST"});
  return res.json();
}
