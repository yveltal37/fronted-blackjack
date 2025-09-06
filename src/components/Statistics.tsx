import { useContext } from "react";
import { GameContext } from "../hooks/GameProvider";

function Statistics(){
    const {statistics, showStats} = useContext(GameContext);

    if (!showStats) return null;

    return (
      <div className="statistic-div">
        <h2>Statistics</h2>
        <p>Games: {statistics.gamesCount}</p>
        <p>Wins: {statistics.winCount}</p>
        <p>Pushes: {statistics.pushCount}</p>
        <p>Loses: {statistics.loseCount}</p>
      </div>
    );
}
export default Statistics;