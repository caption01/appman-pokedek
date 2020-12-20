import React from "react";
import { Button, Row, Col } from "antd";
import styled from "styled-components";

const StyledCol = styled(Col)`
  text-align: center;
`;

const IconAdd = ({ onClick }) => <Button onClick={onClick}>Add</Button>;

const Footer = ({ onClick }) => {
  return (
    <Row>
      <StyledCol xs={24} sm={24}>
        <IconAdd onClick={() => onClick()} />
      </StyledCol>
    </Row>
  );
};

export default Footer;
