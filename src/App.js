import React, { useState, useEffect } from "react";
import { map, filter } from "lodash";

import { fetchCards, availiableCardSource } from "./helper/cards.js";
import Layout from "./components/Layout";
import Card from "./components/Card";
import Modal from "./components/Modal";
import Notification from "./components/Notification";

import "./App.css";

const App = () => {
  const [deckSource, setDeckSource] = useState([]);
  const [myDeck, setMyDeck] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const availiableCards = availiableCardSource(deckSource, myDeck);

  const onSearchChange = (value) => setQuery(value);

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
    const cards = await fetchCards(queryString, {
      onError: Notification("error"),
    });
    setDeckSource(cards);
    setLoading(false);
  };

  const onSearch = () => {
    getCard(query);
  };

  useEffect(() => {
    getCard();
  }, []);

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
          query={query}
          onChange={onSearchChange}
          onCancel={setIsModalVisible}
          onClick={() => {
            onSearch();
          }}
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
