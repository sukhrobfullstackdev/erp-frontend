import React from "react";
import styled, { css } from "styled-components";

const StyledLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #777e90;
  margin-bottom: 5px;
  padding-left: 5px;
  display: inline-block;
  ${({ isUpperCase }) =>
    isUpperCase &&
    css`
      text-transform: uppercase;
    `}
  margin-top: ${({ mt }) => mt || 0}px;
  margin-bottom: ${({ mb }) => mb || 0}px;
  margin-left: ${({ ml }) => ml || 0}px;
  margin-right: ${({ mr }) => mr || 0}px;
`;
const Label = ({ isUpperCase = true, ...rest }) => {
  return <StyledLabel {...{ isUpperCase, ...rest }} />;
};

export default Label;
