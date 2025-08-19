import React, { useState, useEffect } from 'react';
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
  const [gameResult, setGameResult] = useState<string | null>(null);
  const [isDoubleable, setIsDoubleable] = useState(false);

  useEffect(() => {
    const savedGame = localStorage.getItem("gameState");
    const savedRun = localStorage.getItem("isRun");
    const savedResult = localStorage.getItem("gameResult");
    const savedDoubleable = localStorage.getItem("isDoubleable");

    if (savedGame !== null) setGame(JSON.parse(savedGame));
    if (savedRun !== null) setIsRun(JSON.parse(savedRun));
    if (savedResult !== null) setGameResult(JSON.parse(savedResult));
    if (savedDoubleable !== null) setIsDoubleable(JSON.parse(savedDoubleable));
  }, []);

  useEffect(() => {
    if ( game !== null ){
      localStorage.setItem("gameState", JSON.stringify(game));
      localStorage.setItem("isRun", JSON.stringify(isRun));
      localStorage.setItem("gameResult", JSON.stringify(gameResult));
      localStorage.setItem("isDoubleable", JSON.stringify(isDoubleable));
    }
  }, [game, isRun, gameResult, isDoubleable]);

  async function handleStart() {
    const gameData = await startGame();

    setGame(gameData);
    setIsRun(true);
    setIsDoubleable(true);
    setGameResult(null);
    if(gameData.player.score===21){
      if(gameData.player.score===gameData.dealer.score)
        setGameResult('PUSH');
      else
        setGameResult('Player Won');
      setIsRun(false);
      setIsDoubleable(false);
      setGame(gameData);
    }
    else if(gameData.dealer.score===21){
      setGameResult('Dealer Won');
      setIsRun(false);
      setIsDoubleable(false);
      setGame(gameData);
    }
  }

  async function handleHit() {
    const gameData = await hit();
    if(gameData.player.score>21){
      setIsRun(false);
      setGameResult('BUST');
    }
    else if(gameData.player.score===21){
      handleStand();
    }
    setIsDoubleable(false);
    setGame(gameData);
  }

  async function handleStand() {
    const gameData = await stand();
      setIsRun(false);
      if(gameData.dealer.score===gameData.player.score)
        setGameResult('PUSH');
      else if(gameData.dealer.score>21)
        setGameResult('Player Won');
      else if(gameData.dealer.score>gameData.player.score)
        setGameResult('Dealer Won');
      else
        setGameResult('Player Won');
    setIsDoubleable(false);
    setGame(gameData);
  }

  async function handleDouble() {
    const gameData = await double();
    setIsRun(false);
      if(gameData.player.score>21)
        setGameResult('Dealer Won');
      else if(gameData.dealer.score>21)
        setGameResult('Player Won');
      else if(gameData.dealer.score>gameData.player.score)
        setGameResult('Dealer Won');
      else if(gameData.dealer.score===gameData.player.score)
        setGameResult('PUSH');
      else
        setGameResult('Player Won');

      setIsDoubleable(false);
      setGame(gameData);
  }

  function handleReset() {
    localStorage.clear();
    setGame(null);
    setIsRun(false);
    setGameResult(null);
    setIsDoubleable(false);
  }

  return (
    <div className="App">
      <div>
        <button onClick={handleStart} disabled={isRun}>START</button>
        <button onClick={handleHit} disabled={!isRun}>HIT</button>
        <button onClick={handleStand} disabled={!isRun}>STAND</button>
        <button id='dou-btn' onClick={handleDouble} disabled={!isDoubleable}>DOUBLE</button>
        <button onClick={handleReset}>RESET</button>
      </div>

      {game ? (
        <div>
          <h2>Dealer</h2>

          <p>Score: {
            isRun?
              game.dealer.hand[0].value === "ace"?
                11 
                : ["king", "queen", "jack"].includes(game.dealer.hand[0].value)?
                  10 
                : parseInt(game.dealer.hand[0].value) 
              : game.dealer.score}
          </p>

          <div>
            {game.dealer.hand.map((card,i) => (
              i === 1 && isRun?
              <img key={i} src={getCardImage({ suit: 'back', value: 'back' })} alt="card back" />
              : <img key={i} src={getCardImage(card)} alt={`${card.value} of ${card.suit}`} />
            ))}
          </div>

          <h2>Player</h2>
          
          <p>Score: {game.player.score}</p>

          <div>
            {game.player.hand.map(card => (
              <img src={getCardImage(card)} alt={`${card.value} of ${card.suit}`}/>
            ))}
          </div>

          <h1>{gameResult}</h1>
          
        </div>
      ) :null}
    </div>
  );
}

export default App;