import React, { useState, useEffect } from "react";
import { debounce, map } from "lodash";

import { axois } from "./helper/axios";
import Layout from "./components/Layout";
import Card from "./components/Card";
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
  const [query, setQuery] = useState(null);

  useEffect(() => {
    const getCard = async () => {
      const response = await axois.get("/api/cards");
      const cards = response.data?.cards;
      setDeckSource(cards);
      return;
    };

    getCard();
  }, []);

  return (
    <div className="App">
      <Layout>
        {map(deckSource, (card) => (
          <Card key={card.id} {...card} />
        ))}
        <Card />
      </Layout>
    </div>
  );
};

export default App;
