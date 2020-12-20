import React, { useState } from "react";
import { Card as CardAntd, Row, Col } from "antd";
import styled from "styled-components";
import { reduce } from "lodash";

import StatusBar from "./StatusBar";
import HappyIcon from "./HappyIcon";

const WrapperCard = styled.div`
  position: relative;
  margin: 8px;
`;

const StyledCard = styled(CardAntd)`
  width: ${(props) => props.width || "350px"};
  background-color: #f3f4f7;
  box-shadow: ${(props) =>
    props.hover ? `2px 2px #aeaeae` : `1px 1px #d5d6dc`};

  .ant-card-body {
    padding: 12px;
  }
`;

const StyledCol = styled(Col)`
  display: grid;
`;

const Name = styled.div`
  margin-bottom: 4px;
  font-size: 22px;
  font-family: "Gaegu", cursive;
`;

const StyledText = styled.span`
  position: absolute;
  font-size: 22px;
  font-weight: bold;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #dc7777;
`;

const checkIsMax = (value, max = 100) =>
  Number(value) >= max ? max : Number(value);

const getDamage = (attacks) => {
  const damage = reduce(
    attacks,
    (acc, { damage }) => {
      const number = damage ? Number(damage.match(/\d+/g).map(Number)) : 0;
      acc = acc + number;
      return acc;
    },
    0
  );

  return damage;
};

const getHappiness = (hp, dmg, weak) => {
  const hpCal = hp / 10;
  const dmgCal = dmg / 10;
  const weakCal = weak / 10;

  const total = hpCal + dmgCal + 10 - weakCal;

  return total ? Math.floor(total / 5) : 0;
};

const transformCardInfo = (card) => {
  const cardHp = card?.hp ? checkIsMax(card?.hp) : 0;
  const cardStr = card?.attacks?.length
    ? checkIsMax(card?.attacks?.length * 50)
    : 0;
  const cardWeak = card?.weaknesses?.length
    ? checkIsMax(card?.weaknesses?.length * 100)
    : 0;

  const cardDamage = card?.attacks?.length ? getDamage(card?.attacks) : 0;
  const cardHappyNess = getHappiness(cardHp, cardDamage, cardWeak);

  return {
    id: card?.id,
    name: card?.name,
    imgSrc: card?.imageUrl,
    hp: cardHp,
    str: cardStr,
    weak: cardWeak,
    happiness: cardHappyNess,
  };
};

const Card = (props) => {
  const { extra, ...cardProps } = props;
  const [hover, setHover] = useState(false);

  const cardInfo = transformCardInfo(props);
  const cardId = cardInfo?.id;

  return (
    <WrapperCard
      onMouseMove={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <StyledCard hoverable {...cardProps} hover={hover}>
        <Row gutter={[24, 0]}>
          <Col xs={10} sm={10}>
            <img src={cardInfo?.imgSrc} alt="pic" width="100%" />
          </Col>
          <StyledCol ms={14} sm={14}>
            <Name>{cardInfo?.name}</Name>
            <StatusBar label="HP" percent={cardInfo?.hp} />
            <StatusBar label="STR" percent={cardInfo?.str} />
            <StatusBar label="WEAK" percent={cardInfo?.weak} />
            <HappyIcon size={cardInfo?.happiness} />
          </StyledCol>
        </Row>
      </StyledCard>
      {hover && extra && (
        <div
          onClick={() => {
            extra.onClick(cardId);
          }}
        >
          <StyledText {...extra}>{extra.title}</StyledText>
        </div>
      )}
    </WrapperCard>
  );
};

export default Card;
