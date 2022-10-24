import React from "react";
import styled from "styled-components";

const Styled = styled.div`
  min-height: 50vh;
  background-color: #e6e8ec;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;
const EmptyContent = ({ text = "Info no founded Select Cours and module", ...rest }) => {
  return <Styled {...rest}>{text}</Styled>;
};

export default EmptyContent;
