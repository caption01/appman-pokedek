import React, { useState, useEffect } from "react";
import { debounce, map, filter, find } from "lodash";

import { axois } from "./helper/axios";
import Layout from "./components/Layout";
import Card from "./components/Card";
import Modal from "./components/Modal";

import "./App.css";

const availiableCardSource = (source, current) => {
  const filterCard = filter(source, (card) => {
    const isExisting = find(current, (curr) => curr.id === card.id);
    return isExisting ? false : true;
  });

  return filterCard;
};

const fetchCards = async (queryString) => {
  const response = await axois.get("/api/cards", {
    params: {
      name: queryString,
      type: queryString,
    },
  });
  const cards = response.data?.cards;
  return cards;
};

const App = () => {
  const [deckSource, setDeckSource] = useState([]);
  const [myDeck, setMyDeck] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const availiableCards = availiableCardSource(deckSource, myDeck);

  const onSearchChange = debounce((value) => setQuery(value), 1500);

  const showModal = () => setIsModalVisible(true);

  const addCardToDeck = (id) => {
    const selectedCards = filter(deckSource, (card) => card.id === id);
    setMyDeck([...myDeck, ...selectedCards]);
  };

  const removeCardFromDeck = (id) => {
    const selectedCards = filter(myDeck, (card) => card.id !== id);
    setMyDeck([...selectedCards]);
  };

  const getCard = async (queryString) => {
    setLoading(true);
    const cards = await fetchCards(queryString);
    setDeckSource(cards);
    setLoading(false);
  };

  useEffect(() => {
    getCard(query);
  }, [query]);

  const addExtra = {
    title: "add",
    onClick: (id) => addCardToDeck(id),
  };

  const deleteExtra = {
    title: "X",
    onClick: (id) => removeCardFromDeck(id),
  };

  return (
    <div className="App">
      <Layout onClick={showModal}>
        {map(myDeck, (card) => (
          <Card key={card.id} width="400px" extra={deleteExtra} {...card} />
        ))}
        <Modal
          loading={loading}
          visible={isModalVisible}
          onChange={onSearchChange}
          onCancel={setIsModalVisible}
          onClick={() => setQuery(null)}
        >
          {map(availiableCards, (card) => (
            <Card key={card.id} width="100%" extra={addExtra} {...card} />
          ))}
        </Modal>
      </Layout>
    </div>
  );
};

export default App;
