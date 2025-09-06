import { useContext } from "react";
import { GameContext } from "../hooks/GameProvider";
import { getCardImage } from "../cardImages";
import { GameState } from "../types";

function Player() {
  const { game } = useContext(GameContext);

  const typedGame = game as GameState | null;

  if (!typedGame) return null;

  return (
    <div>
      <h2>Player</h2>

      <p>Score: {typedGame.player.score}</p>
      
      <div>
        
        {typedGame.player.hand.map(card => (
        <img src={getCardImage(card)} alt={`${card.value} of ${card.suit}`}/>
        ))}
      </div>
    </div>
  );
}

export default Player;
