import { useContext } from "react";
import { GameContext } from "../hooks/GameProvider";
import { getCardImage } from "../cardImages";
import { GameState } from "../types";


function Dealer() {
  const { game, isRun } = useContext(GameContext);

  const typedGame = game as GameState | null;

  if (!typedGame) return null;

  return (
    <div>
          <h2>Dealer</h2>

          <p>Score: {
            isRun?
              typedGame.dealer.hand[0].value === "ace"?
                '1/11' 
                : ["king", "queen", "jack"].includes(typedGame.dealer.hand[0].value)?
                  10 
                : parseInt(typedGame.dealer.hand[0].value) 
              : typedGame.dealer.score}
          </p>

          <div>
            {typedGame.dealer.hand.map((card,i) => (
              i === 1 && isRun?
              <img key={i} src={getCardImage({ suit: 'back', value: 'back' })} alt="card back" />
              : <img key={i} src={getCardImage(card)} alt={`${card.value} of ${card.suit}`} />
            ))}
          </div>
    </div>
  );
}

export default Dealer;
