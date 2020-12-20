import React, { useState, useEffect } from "react";
import { debounce, map } from "lodash";
import styled from "styled-components";

import { axois } from "./helper/axios";
import Layout from "./components/Layout";
import Card from "./components/Card";
import Modal from "./components/Modal";

import "./App.css";

const WrapperCard = styled.div`
  position: relative;
  margin: 16px;
`;

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

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
    onClick: () => console.log("add poke"),
  };

  const deleteExtra = {
    title: "X",
    onClick: () => console.log("rm poke"),
  };

  return (
    <div className="App">
      <Layout onClick={showModal}>
        {map(deckSource, (card) => (
          <WrapperCard key={card.id}>
            <Card width="350px" extra={addExtra} {...card} />
          </WrapperCard>
        ))}
        <Modal
          visible={isModalVisible}
          showModal={showModal}
          handleOk={handleOk}
          handleCancel={handleCancel}
        >
          {map(deckSource, (card) => (
            <WrapperCard key={card.id}>
              <Card width="100%" extra={deleteExtra} {...card} />
            </WrapperCard>
          ))}
        </Modal>
      </Layout>
    </div>
  );
};

export default App;
