import React from "react";
import { Button, Row, Col } from "antd";
import styled from "styled-components";

const StyledCol = styled(Col)`
  text-align: center;
`;

const IconAdd = () => <Button>Add</Button>;

const Footer = () => {
  return (
    <Row>
      <StyledCol xs={24} sm={24}>
        <IconAdd />
      </StyledCol>
    </Row>
  );
};

export default Footer;
