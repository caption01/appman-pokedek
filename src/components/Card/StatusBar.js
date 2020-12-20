import React from "react";
import styled from "styled-components";
import { Progress, Row, Col } from "antd";

const StyledBar = styled(Progress)`
  margin-bottom: 4px;
  .ant-progress-bg {
    height: 16px !important;
  }
`;

const Label = styled(Col)`
  font-weight: bold;
`;

const StatusBar = ({ label, percent }) => {
  return (
    <Row>
      <Label xs={6} sm={6}>
        {label}
      </Label>
      <Col xs={18} sm={18}>
        <StyledBar
          percent={percent}
          showInfo={false}
          strokeColor={{
            "0%": "#f3701a",
            "100%": "#f3701a",
          }}
        />
      </Col>
    </Row>
  );
};

export default StatusBar;
