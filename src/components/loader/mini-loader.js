import React from "react";
import styled from "styled-components";
import { BeatLoader } from "react-spinners";

const StyledMiniLoader = styled.div`
  display: inline-block;
`;
const MiniLoader = () => {
  return (
    <StyledMiniLoader>
      <BeatLoader size={5} color="#fff" />
    </StyledMiniLoader>
  );
};

export default MiniLoader;
