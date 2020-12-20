import React, { useState, useEffect } from "react";
import { debounce, map, filter, xor } from "lodash";

import { axois } from "./helper/axios";
import Layout from "./components/Layout";
import Card from "./components/Card";
import Modal from "./components/Modal";

import "./App.css";

const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b",
};

const availiableCardSource = (source, current) => {
  return xor(source, current);
};

const App = () => {
  const [deckSource, setDeckSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [myDeck, setMyDeck] = useState([]);
  const [query, setQuery] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const availiableCards = availiableCardSource(deckSource, myDeck);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onSearchChange = debounce((value) => setQuery(value), 1500);

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
    const response = await axois.get("/api/cards", {
      params: {
        name: queryString,
      },
    });
    const cards = response.data?.cards;
    setDeckSource(cards);
    setLoading(false);
    return;
  };

  useEffect(() => {
    getCard();
  }, []);

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
        {map(availiableCards, (card) => (
          <Card key={card.id} width="400px" extra={deleteExtra} {...card} />
        ))}
        <Modal
          loading={loading}
          visible={isModalVisible}
          onChange={onSearchChange}
          onCancel={setIsModalVisible}
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
