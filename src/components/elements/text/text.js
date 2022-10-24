import React from "react";
import styled, { css } from "styled-components";

const StyledText = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: ${({ cl }) => cl || "#23262F"};

  ${({ light }) =>
    light &&
    css`
      color: #fff;
    `}

  ${({ thin }) =>
    thin &&
    css`
      font-weight: 100;
    `}
  ${({ medium }) =>
    medium &&
    css`
      font-weight: 500;
    `}

  ${({ xlg }) =>
    xlg &&
    css`
      font-size: 24px;
    `}
  ${({ lg }) =>
    lg &&
    css`
      font-size: 20px;
    `}
  ${({ md }) =>
    md &&
    css`
      font-size: 18px;
    `}
  ${({ sm }) =>
    sm &&
    css`
      font-size: 14px;
    `}
  ${({ xs }) =>
    xs &&
    css`
      font-size: 12px;
    `}
`;
const Text = ({ ...props }) => {
  return <StyledText {...props} />;
};

export default Text;
