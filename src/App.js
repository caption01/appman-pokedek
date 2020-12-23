import React, { useState, useEffect } from "react";
import { map, filter } from "lodash";
import { connect } from "react-redux";

import { cardActions } from "./redux/card";

import Layout from "./components/Layout";
import Card from "./components/Card";
import Modal from "./components/Modal";
import Notification from "./components/Notification";

import "./App.css";

const App = (props) => {
  const {
    cardRedux: { deckSource, myDeck, loading },
    getCards,
  } = props;

  // const [deckSource, setDeckSource] = useState([]);
  // const [myDeck, setMyDeck] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [query, setQuery] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // const availiableCards = availiableCardSource(deckSource, myDeck);

  // const onSearchChange = (value) => setQuery(value);

  const showModal = () => setIsModalVisible(true);

  // const addCardToDeck = (id) => {
  //   const selectedCards = filter(deckSource, (card) => card.id === id);
  //   setMyDeck([...myDeck, ...selectedCards]);
  // };

  // const removeCardFromDeck = (id) => {
  //   const selectedCards = filter(myDeck, (card) => card.id !== id);
  //   setMyDeck([...selectedCards]);
  // };

  // const getCard = async (queryString) => {
  //   setLoading(true);
  //   const cards = await fetchCards(queryString, {
  //     onError: () => Notification("error"),
  //   });
  //   setDeckSource(cards);
  //   setLoading(false);
  // };

  // const onSearch = () => {
  //   getCard(query);
  // };

  useEffect(() => {
    getCards();
  }, []);

  // const addExtra = {
  //   title: "add",
  //   onClick: (id) => addCardToDeck(id),
  // };

  // const deleteExtra = {
  //   title: "X",
  //   onClick: (id) => removeCardFromDeck(id),
  // };

  // extra={deleteExtra}

  return (
    <div className="App">
      <Layout onClick={() => props.getCards()}>
        {map(deckSource, (card) => (
          <Card key={card.id} width="400px" {...card} />
        ))}
        {/* <Modal
          loading={loading}
          visible={isModalVisible}
          query={query}
          onChange={onSearchChange}
          onCancel={setIsModalVisible}
          onClick={() => {
            // onSearch();
          }}
        >
          {map(availiableCards, (card) => (
            <Card key={card.id} width="100%" extra={addExtra} {...card} />
          ))}
        </Modal> */}
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cardRedux: state.card,
  };
};

const { getCards } = cardActions;

export default connect(mapStateToProps, { getCards })(App);
