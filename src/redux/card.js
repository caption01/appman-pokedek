import { fetchCards, availiableCardSource } from "../helper/cards.js";

const cardState = {
  deckSource: [],
  myDeck: [],
  loading: false,
};

const cardReducer = (state = cardState, action) => {
  switch (action.type) {
    case "FETCH_CARDS_PENDING": {
      return { ...state, loading: true };
    }

    case "FETCH_CARDS_FULFILLED": {
      return { ...state, deckSource: action.payload, loading: false };
    }

    default: {
      return { ...state };
    }
  }
};

const getCards = (queryString) => {
  const response = fetchCards(queryString);
  return { type: "FETCH_CARDS", payload: response };
};

const cardActions = {
  getCards,
};

export { cardReducer, cardActions };
