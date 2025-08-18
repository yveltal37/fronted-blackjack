import React, { useState } from 'react';
import './App.css';
import { startGame, hit, stand, double } from "./api";
import { getCardImage } from './cardImages';

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



function App() {
  const [game, setGame] = useState<GameState | null>(null);
  const [isRun, setIsRun] = useState(false);
  const [gameResolt, setGameResolt] = useState<string | null>(null);
  const [isDoubleable, setIsDoubleable] = useState(false);

  async function handleStart() {
    const gameData = await startGame();
    setGame(gameData);
    setIsRun(true);
    setIsDoubleable(true);
    setGameResolt(null);
  }

  async function handleHit() {
    const gameData = await hit();
    if(gameData.player.score>21){
      setIsRun(false);
      setGameResolt('BUST');
    }
    else if(gameData.player.score===21){
      handleStand();
    }
    setIsDoubleable(false);
    setGame(gameData);
  }

  async function handleStand() {
    const gameData = await stand();
    if(gameData.dealer.score>=17){
      setIsRun(false);
      if(gameData.dealer.score===gameData.player.score)
        setGameResolt('PUSH');
      else if(gameData.dealer.score>21)
        setGameResolt('Player Won');
      else if(gameData.dealer.score>gameData.player.score)
        setGameResolt('Dealer Won');
      else
        setGameResolt('Player Won');
    }
    setIsDoubleable(false);
    setGame(gameData);
  }

  async function handleDouble() {
    const gameData = await double();
    setIsRun(false);
      if(gameData.player.score>21)
        setGameResolt('Dealer Won');
      else if(gameData.dealer.score>21)
        setGameResolt('Player Won');
      else if(gameData.dealer.score>gameData.player.score)
        setGameResolt('Dealer Won');
      else if(gameData.dealer.score===gameData.player.score)
        setGameResolt('PUSH');
      else
        setGameResolt('Player Won');

      setIsDoubleable(false);
      setGame(gameData);
  }

  return (
    <div className="App">
      <h1>Blackjack</h1>

      <div>
        <button onClick={handleStart}>START</button>
        <button onClick={handleHit} disabled={!isRun}>HIT</button>
        <button onClick={handleStand} disabled={!isRun}>STAND</button>
        <button id='dou-btn' onClick={handleDouble} disabled={!isDoubleable}>DOUBLE</button>
      </div>

      {game && (
        <div>
          <h2>Dealer</h2>
          <p>Score: {game.dealer.score}</p>
          <div>
            {game.dealer.hand.map((card, i) => (
                  <img key={i} src={getCardImage(card)} alt={`${card.value} of ${card.suit}`}/>
            ))}
          </div>

          <h2>Player</h2>
          <p>Score: {game.player.score}</p>
          <div>
            {game.player.hand.map((card, i) => (
                  <img key={i} src={getCardImage(card)} alt={`${card.value} of ${card.suit}`}/>
            ))}
          </div>
          <h2>{gameResolt}</h2>
        </div>
      )}
    </div>
  );
}

export default App;