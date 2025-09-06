import { useContext } from "react";
import { GameContext } from "../hooks/GameProvider";

function GameResult(){
    const {gameResult, setGame, game} = useContext(GameContext);

    if (!game) return null;

    return(
      <h1 onClick={() =>setGame(null)}  title="Clear screen">{gameResult}</h1>
    );
}
export default GameResult;