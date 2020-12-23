const cardState = {
  length: 0,
};

const cardReducer = (state = cardState, action) => {
  switch (action.type) {
    case "FETCH_CARDS": {
      return { ...state, length: state.length + 1 };
    }

    default: {
      return { ...state };
    }
  }
};

const fetchCards = () => {
  return { type: "FETCH_CARDS" };
};

const cardActions = {
  fetchCards,
};

export { cardReducer, cardActions };
