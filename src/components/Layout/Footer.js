import React from "react";
import { Row, Col } from "antd";
import styled from "styled-components";

const StyledCol = styled(Col)`
  position: relative;
  text-align: center;
  background-color: #ec5656;
  height: 50px;
`;

const StyledCircle = styled.div`
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  height: 100px;
  width: 100px;
  background-color: #ec5656;
  font-size: 120px;
  color: #ffffff;
  z-index: 2;
  box-shadow: 0px 0.5px #d5d6dc;

  :hover {
    cursor: pointer;
  }
`;

const Footer = ({ onClick }) => {
  return (
    <Row>
      <StyledCol xs={24} sm={24}>
        <StyledCircle onClick={onClick}>+</StyledCircle>
      </StyledCol>
    </Row>
  );
};

export default Footer;
