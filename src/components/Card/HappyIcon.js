import React from "react";
import styled from "styled-components";
import { map } from "lodash";

import cute from "../../assets/cute.png";

const Icon = styled.img`
  margin-right: 6px;
`;

const HappyIcon = ({ size = 0 }) => {
  const setIcon = Array(size).fill(true);

  return (
    <div>
      {map(setIcon, (ic, idx) => (
        <Icon key={idx} src={cute} alt="cute" height="30px" width="30px" />
      ))}
    </div>
  );
};

export default HappyIcon;
