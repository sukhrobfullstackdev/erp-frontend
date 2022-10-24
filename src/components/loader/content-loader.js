import React from "react";
import styled from "styled-components";
import { PuffLoader } from "react-spinners";

const StyledContentLoader = styled.div`
  width: 100%;
  height: 100%;
  min-height: 150px;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  align-items: center;
  justify-content: center;
`;

const ContentLoader = ({ ...rest }) => {
  return (
    <StyledContentLoader {...rest}>
      <PuffLoader size={100} color={"#45B36B"} />
    </StyledContentLoader>
  );
};

export default ContentLoader;
