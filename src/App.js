import React, { useState, useEffect } from "react";
import { map, isEmpty } from "lodash";
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
    fetchCard,
    selectCard,
    removeCard,
  } = props;

  const [query, setQuery] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onSearchChange = (value) => setQuery(value);

  const showModal = () => setIsModalVisible(true);

  const onSearch = async () => {
    const { payload } = await fetchCard(query);

    if (!isEmpty(payload)) return;

    Notification("error", "pokemon not found");
  };

  useEffect(() => {
    fetchCard();
  }, []);

  const addExtra = {
    title: "add",
    onClick: (id) => {
      selectCard(id);
    },
  };

  const deleteExtra = {
    title: "X",
    onClick: (id) => removeCard(id),
  };

  return (
    <div className="App">
      <Layout onClick={() => showModal()}>
        {map(myDeck, (card) => (
          <Card key={card.id} width="400px" {...card} extra={deleteExtra} />
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
          {map(deckSource, (card) => (
            <Card key={card.id} width="100%" extra={addExtra} {...card} />
          ))}
        </Modal>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cardRedux: state.card,
  };
};

const { fetchCard, selectCard, removeCard } = cardActions;

export default connect(mapStateToProps, { fetchCard, selectCard, removeCard })(
  App
);
