import { useContext } from "react";
import { GameContext } from "../hooks/GameProvider";
import { hit, stand, double } from "../api";
import { GameState } from "../types";

function Buttons() {
  const {
    game,
    setGame,
    isRun,
    setIsRun,
    setGameResult,
    isDoubleable,
    setIsDoubleable,
    setStatistics,
    showStats,
    setShowStats,
    handleBust,
    handleLose,
    handlePush,
    handleWin,
    handleStart,
  } = useContext(GameContext);

  const typedGame = game as GameState | null;
  
  
    async function handleHit() {
      const gameData = await hit();
      if(gameData.player.score>21){
        setIsRun(false);
        handleBust();
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
          handlePush();
        else if(gameData.dealer.score>21)
          handleWin();
        else if(gameData.dealer.score>gameData.player.score)
          handleLose();
        else
          handleWin();
      setIsDoubleable(false);
      setGame(gameData);
    }
  
    async function handleDouble() {
      const gameData = await double();
      setIsRun(false);
        if(gameData.player.score>21)
          handleBust();
        else if(gameData.dealer.score>21)
          handleWin();
        else if(gameData.dealer.score>gameData.player.score)
          handleLose()
        else if(gameData.dealer.score===gameData.player.score)
          handlePush();
        else
          handleWin();
  
        setIsDoubleable(false);
        setGame(gameData);
    }
  
    async function handleReset() {
      const confirmReset = window.confirm("Are you sure you want to reset the game?");
      if (confirmReset) {
        localStorage.clear();
        setGame(null);
        setIsRun(false);
        setGameResult(null);
        setIsDoubleable(false);
        setStatistics( {"pushCount":0, "loseCount":0, "winCount":0, "gamesCount":0} );
      }
    }

  return (
    <div>
      <button onClick={handleStart} disabled={isRun}>START</button>
      <button onClick={handleHit} disabled={!isRun}>HIT</button>
      <button onClick={handleStand} disabled={!isRun}>STAND</button>
      <button onClick={handleDouble} disabled={!isDoubleable}>DOUBLE</button>
      <button onClick={handleReset}>RESET</button>
      <button onClick={() => setShowStats(!showStats)}>
        {showStats ? "Hide Stats" : "Show Stats"}
      </button>
    
      {game ? (
        <p>there are <span>{typedGame!.deck.length}</span> cards left in the deck</p>
      ): null}
    </div>
  );
  
}

export default Buttons;
