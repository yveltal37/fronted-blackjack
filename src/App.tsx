import React, { useEffect, useContext } from 'react';
import './App.css';
import { GameContext } from "./hooks/GameProvider";
import Buttons from "./components/Buttons";
import Dealer from "./components/Dealer";
import Player from "./components/Player";
import GameResult from "./components/GameResult";
import Statistics from "./components/Statistics";


function App() {
  const {
        game,
        setGame,
        isRun,
        setIsRun,
        gameResult,
        setGameResult,
        isDoubleable,
        setIsDoubleable,
        statistics,
        setStatistics,
    } = useContext(GameContext);
    

  useEffect(() => {
    const savedGame = localStorage.getItem("gameState");
    const savedRun = localStorage.getItem("isRun");
    const savedResult = localStorage.getItem("gameResult");
    const savedDoubleable = localStorage.getItem("isDoubleable");
    const savedstatistics = localStorage.getItem("statistics");


    if (savedGame !== null) setGame(JSON.parse(savedGame));
    if (savedRun !== null) setIsRun(JSON.parse(savedRun));
    if (savedResult !== null) setGameResult(JSON.parse(savedResult));
    if (savedDoubleable !== null) setIsDoubleable(JSON.parse(savedDoubleable));
    if (savedstatistics !== null) setStatistics(JSON.parse(savedstatistics));
  }, []);

  useEffect(() => {
    if ( game !== null ){
      localStorage.setItem("gameState", JSON.stringify(game));
      localStorage.setItem("isRun", JSON.stringify(isRun));
      localStorage.setItem("gameResult", JSON.stringify(gameResult));
      localStorage.setItem("isDoubleable", JSON.stringify(isDoubleable));
      localStorage.setItem("statistics", JSON.stringify(statistics));      
    }
  }, [game, isRun, gameResult, isDoubleable, statistics]);

  return (
    <div className="App">
        <Buttons />
        <Statistics />
        <Dealer />
        <Player />
        <GameResult />
    </div>
  );
}
export default App;
