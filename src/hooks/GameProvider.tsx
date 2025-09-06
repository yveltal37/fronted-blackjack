import React, { createContext, useState } from "react";
import { startGame } from "../api";
import { GameState } from "../types";

export const GameContext = createContext<any>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [game, setGame] = useState<GameState | null>(null);
  const [isRun, setIsRun] = useState(false);
  const [gameResult, setGameResult] = useState<string | null>(null);
  const [isDoubleable, setIsDoubleable] = useState(false);
  const [statistics, setStatistics] = useState( {"pushCount":0, "loseCount":0, "winCount":0, "gamesCount":0} );
  const [showStats, setShowStats] = useState(false);

  function handlePush(){
    setGameResult('PUSH');
    setStatistics(prev => ({
      ...prev, pushCount: prev.pushCount + 1
    }));
  }
  function handleWin(){
    setGameResult('Player Won');
    setStatistics(prev => ({
      ...prev, winCount: prev.winCount + 1
    }));
  }
  function handleBust(){
      setGameResult('BUST');
    setStatistics(prev => ({
      ...prev, loseCount: prev.loseCount + 1
    }));
  }
  function handleLose(){
    setGameResult('Dealer Won');
    setStatistics(prev => ({
      ...prev, loseCount: prev.loseCount + 1
    }));
  }

  async function handleStart() {
    const gameData = await startGame();

    setStatistics(prev => ({
      ...prev,
      gamesCount: prev.gamesCount + 1
    }));

    setGame(gameData);
    setIsRun(true);
    setIsDoubleable(true);
    setGameResult(null);
    if(gameData.player.score===21){
      if(gameData.player.score===gameData.dealer.score)
        handlePush();
      else
        handleWin();
      setIsRun(false);
      setIsDoubleable(false);
      setGame(gameData);
    }
    else if(gameData.dealer.score===21){
      handleLose();
      setIsRun(false);
      setIsDoubleable(false);
      setGame(gameData);
    }
  }
  
  return (
    <GameContext.Provider
      value={{
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
        showStats,
        setShowStats,
        handleBust,
        handleLose,
        handlePush,
        handleWin,
        handleStart,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}