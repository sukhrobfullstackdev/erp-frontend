import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  /* width: 1440px; */
  margin: 0 auto;
  /* overflow-x: auto; */
  position: relative;
  min-height: 100vh;
  overflow: hidden;

  /* @media (min-width: 768px) {
    width: 750px;
  }
  @media (min-width: 992px) {
    width: 970px;
  }
  @media (min-width: 1200px) {
    width: 1200px;
  }
  @media (min-width: 1440px) {
    width: 1920px;
  } */
`;
const Wrapper = ({ children }) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

export default Wrapper;
