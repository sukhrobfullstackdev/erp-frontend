import React from "react";
import styled from "styled-components";
import { PuffLoader } from "react-spinners";

const StyledInitialLoader = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  align-items: center;
  justify-content: center;
`;

const InitialLoader = ({ ...rest }) => {
  return (
    <StyledInitialLoader {...rest}>
      <PuffLoader size={100} color={"#45B36B"} />
    </StyledInitialLoader>
  );
};

export default InitialLoader;
