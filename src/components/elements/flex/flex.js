import React from "react";
import styled from "styled-components";

const StyledFlex = styled.div`
  display: flex;
  justify-content: ${({ justify }) => justify || "flex-start"};
  align-items: ${({ align }) => align || "flex-start"};
`;
const Flex = ({ ...rest }) => {
  return <StyledFlex {...rest} />;
};

export default Flex;
