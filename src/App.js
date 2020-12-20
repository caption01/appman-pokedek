import React, { useState, useEffect } from "react";
import { debounce, map, filter } from "lodash";

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

const App = () => {
  const [deckSource, setDeckSource] = useState([]);
  const [myDeck, setMyDeck] = useState([]);
  const [query, setQuery] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onSearchChange = (value) => console.log("val", value);
  const onSearchClick = () => console.log("search with query");

  const addCardToDeck = (value) => {
    const selectedCards = filter(deckSource, (card) => card.id === value);
    setMyDeck([...myDeck, ...selectedCards]);
  };

  useEffect(() => {
    const getCard = async () => {
      const response = await axois.get("/api/cards");
      const cards = response.data?.cards;
      setDeckSource(cards);
      return;
    };

    getCard();
  }, []);

  const addExtra = {
    title: "add",
    onClick: (id) => addCardToDeck(id),
  };

  const deleteExtra = {
    title: "X",
    onClick: () => console.log("rm poke"),
  };

  console.log(myDeck);

  return (
    <div className="App">
      <Layout onClick={showModal}>
        {map(myDeck, (card) => (
          <Card key={card.id} width="350px" extra={deleteExtra} {...card} />
        ))}
        <Modal
          visible={isModalVisible}
          onChange={onSearchChange}
          onClick={onSearchClick}
          onCancel={setIsModalVisible}
        >
          {map(deckSource, (card) => (
            <Card key={card.id} width="100%" extra={addExtra} {...card} />
          ))}
        </Modal>
      </Layout>
    </div>
  );
};

export default App;
