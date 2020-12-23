import {
  fetchCards,
  filterDeckWithCurrentState,
  findCardInDeck,
  removeCardFromDeck,
  addCardToDeck,
} from "../helper/cards.js";

const initialState = {
  deckSource: [],
  myDeck: [],
  loading: false,
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CARDS_PENDING": {
      return { ...state, loading: true };
    }

    case "FETCH_CARDS_FULFILLED": {
      return transformFetchCard(state, action);
    }

    case "SELECT_CARD": {
      return transformSelectCard(state, action);
    }

    case "REMOVE_CARD": {
      return transformRemoveCard(state, action);
    }

    default: {
      return { ...state };
    }
  }
};

const transformFetchCard = (state, action) => {
  const cardData = action.payload;

  const filterCardData = filterDeckWithCurrentState(cardData, state?.myDeck);

  const updatedMyDeck = state?.myDeck;
  const updatedDeckSource = filterCardData;

  return {
    ...state,
    deckSource: updatedDeckSource,
    myDeck: updatedMyDeck,
    loading: false,
  };
};

const transformSelectCard = (state, action) => {
  const id = action.payload;
  const card = findCardInDeck(id, state?.deckSource);

  const updatedMyDeck = addCardToDeck(card, state?.myDeck);
  const updatedDeckSource = removeCardFromDeck(id, state?.deckSource);

  return { ...state, deckSource: updatedDeckSource, myDeck: updatedMyDeck };
};

const transformRemoveCard = (state, action) => {
  const id = action.payload;
  const card = findCardInDeck(id, state?.myDeck);

  const updatedMyDeck = removeCardFromDeck(id, state?.myDeck);
  const updatedDeckSource = addCardToDeck(card, state?.deckSource);

  return { ...state, myDeck: updatedMyDeck, deckSource: updatedDeckSource };
};

const fetchCard = (queryString) => {
  const response = fetchCards(queryString);
  return { type: "FETCH_CARDS", payload: response };
};

const selectCard = (id) => ({ type: "SELECT_CARD", payload: id });

const removeCard = (id) => ({ type: "REMOVE_CARD", payload: id });

const cardActions = {
  fetchCard,
  selectCard,
  removeCard,
};

export { cardReducer, cardActions };
