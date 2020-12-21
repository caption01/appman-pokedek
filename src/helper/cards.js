import { filter, find } from "lodash";

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

export const availiableCardSource = (source, current) => {
  const filterCard = filter(source, (card) => {
    const isExisting = find(current, (curr) => curr.id === card.id);
    return isExisting ? false : true;
  });

  return filterCard;
};
