type Card = {
  suit: string;
  value: string;
};

const values = ['ace','2','3','4','5','6','7','8','9','10','jack','queen','king'];
const suits = ['hearts','diamonds','clubs','spades'];

export const cardImages: { [key: string]: string } = {};

const key = 'back_of_back';
cardImages[key] = require(`./assets/cards/back.png`);

values.forEach(value => {
  suits.forEach(suit => {
    const key = `${value}_of_${suit}`;
    cardImages[key] = require(`./assets/cards/${key}.png`);
  });
});

export function getCardImage(card: Card): string {
  return cardImages[`${card.value}_of_${card.suit}`];
}
