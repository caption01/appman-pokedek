import { filter, find, isEmpty } from "lodash";

import { axois } from "./axios";

export const fetchCards = async (
  queryString,
  { onSuccess = null, onError = null } = {}
) => {
  let cards = [];

  try {
    const response = await axois.get("/api/cards", {
      params: {
        name: queryString,
        type: queryString,
      },
    });
    cards = response.data?.cards;
    onSuccess && onSuccess();
  } catch (err) {
    onError && onError();
  }

  return cards;
};

export const filterDeckWithCurrentState = (cardData, currentDeck) => {
  if (isEmpty(currentDeck)) return cardData;

  const filterCard = filter(cardData, (card) => {
    const isExisting = find(currentDeck, (curr) => curr.id === card.id);
    return isExisting ? false : true;
  });

  return filterCard;
};

export const findCardInDeck = (id, deck) => {
  return find(deck, (card) => card?.id === id);
};

export const addCardToDeck = (card, deck) => {
  return [...deck, card];
};

export const removeCardFromDeck = (id, deck) => {
  return filter(deck, (card) => card?.id !== id);
};
