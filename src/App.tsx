import React from 'react';
import logo from './logo.svg';
import './App.css';
import { startGame, hit, stand, double } from "./api";

type Card = {
  suit: string;
  value: string;
};

type Player = {
  hand: Card[];
  score: number;
};

function App() {
  return (
    <div className="App">
      <h1>nhnhgn</h1>
      <button onClick={startGame}>START</button>
    </div>
  );
}

export default App;
