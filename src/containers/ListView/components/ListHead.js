import React from "react";
import styled from "styled-components";

const Styled = styled.div`
  padding: 10px 24px;
  background: #353945;
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 400;
  color: #fff;
`;
const ListHead = ({ data = ["Role name", "Description", "Action"], ...rest }) => {
  return <Styled {...rest}></Styled>;
};

export default ListHead;
