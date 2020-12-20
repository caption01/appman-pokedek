import React from "react";
import styled from "styled-components";

import Footer from "./Footer";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const Title = styled.div`
  font-size: 30px;
  margin: 16px;
  text-align: center;
`;

const Display = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 600px;
  overflow: scroll;
`;

const Layout = ({ onClick, children }) => {
  return (
    <Wrapper>
      <Title>My Pokedeck</Title>
      <Display>{children}</Display>
      <Footer onClick={onClick} />
    </Wrapper>
  );
};

export default Layout;
