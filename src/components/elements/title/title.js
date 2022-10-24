import React from "react";
import styled, { css } from "styled-components";

const StyledTitle = styled.h2`
  font-weight: 700;
  font-size: 24px;
  color: ${({ cl }) => cl || "#353945"};
  ${({ dot }) =>
    dot &&
    css`
      display: flex;
      align-items: center;
      .dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: black;
        display: inline-block;
        margin-right: 10px;
      }
    `}
  ${({ xs }) =>
    xs &&
    css`
      font-size: 12px;
    `}
  ${({ sm }) =>
    sm &&
    css`
      font-size: 14px;
    `}
  ${({ regular }) =>
    regular &&
    css`
      font-size: 16px;
    `}
  ${({ md }) =>
    md &&
    css`
      font-size: 18px;
    `}
  ${({ lg }) =>
    lg &&
    css`
      font-size: 24px;
    `}
  ${({ xl }) =>
    xl &&
    css`
      font-size: 36px;
    `}
  ${({ xxl }) =>
    xxl &&
    css`
      font-size: 48px;
    `}
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
  ${({ regular }) =>
    regular &&
    css`
      font-weight: 400;
    `}
  ${({ medium }) =>
    medium &&
    css`
      font-weight: 500;
    `}
  ${({ semiBold }) =>
    semiBold &&
    css`
      font-weight: 600;
    `}
  ${({ bold }) =>
    bold &&
    css`
      font-weight: 700;
    `}
  ${({ extraBold }) =>
    extraBold &&
    css`
      font-weight: 900;
    `}
  ${({ lHeight }) =>
    lHeight &&
    css`
      line-height: ${lHeight}px;
    `}
  ${({ fs }) =>
    fs &&
    css`
      font-size: ${fs}px;
    `}
`;
const Title = ({ children, ...props }) => {
  return (
    <StyledTitle {...props}>
      {props.dot && <span className="dot"></span>}
      {children}
    </StyledTitle>
  );
};

export default Title;
