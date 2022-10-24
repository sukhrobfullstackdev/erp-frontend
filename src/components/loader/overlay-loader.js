import React from "react";
import styled from "styled-components";
import { PuffLoader } from "react-spinners";

const StyledOverlayLoader = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
`;

const OverlayLoader = ({ ...rest }) => {
  return (
    <StyledOverlayLoader {...rest}>
      <PuffLoader size={100} color={"#45B36B"} />
    </StyledOverlayLoader>
  );
};

export default OverlayLoader;
