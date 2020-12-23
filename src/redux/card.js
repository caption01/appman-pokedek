import { fetchCards, availiableCardSource } from "../helper/cards.js";

const cardState = {
  deckSource: [],
  myDeck: [],
  loading: false,
};

const cardReducer = (state = cardState, action) => {
  switch (action.type) {
    case "FETCH_CARDS": {
      return { ...state, deckSource: action.payload, loading: false };
    }

    case "FETCH_CARDS_LOADING": {
      return { ...state, loading: action.payload };
    }

    default: {
      return { ...state };
    }
  }
};

const setCardsLoadingStatus = (status) => ({
  type: "FETCH_CARDS_LOADING",
  payload: status,
});

const getCards = (queryString) => async (dispatch) => {
  dispatch(setCardsLoadingStatus(true));

  const response = await fetchCards(queryString);
  dispatch({ type: "FETCH_CARDS", payload: response });
};

const cardActions = {
  getCards,
};

export { cardReducer, cardActions };
