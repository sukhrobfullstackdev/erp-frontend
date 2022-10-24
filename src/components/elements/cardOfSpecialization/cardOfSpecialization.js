import React, { useState } from "react";
import styled, { css } from "styled-components";
import Icon from "../icon";

const CardStyled = styled.div`
  //min-width: 264px;
  height: 87px;
  background: #23262f;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  transition: 0.2s;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  color: #ffffff;
  display: flex;
  align-items: center;

  p {
    padding: 0 0 0 24px;
  }

  .addButton {
    width: 70px;
    height: 70px;
    background: #45b36b;
    transition: 0.2s;
    border-radius: 50%;
    display: flex;
    align-items: center;
    padding: 0 0 0 10px;
    position: absolute;
    /* top: 65%; */
    right: ${0 - 70 / 2}px;
    cursor: pointer;

    .ui__icon__wrapper {
      transform: rotate(135deg);

      .icon-x-close {
        background-color: #fff;
      }
    }
  }

  ${({ active }) =>
    active &&
    css`
      background: #f4f5f6;
      color: #b1b5c4;

      .addButton {
        background: #ef466f;

        .ui__icon__wrapper {
          transform: rotate(0deg);
        }
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
  .text-active {
    font-weight: 500;
    font-size: 10px;
    line-height: 15px;
    color: #ef466f;
    position: absolute;
    left: 8px;
    bottom: 8px;
    text-transform: uppercase;

    &.active {
      color: #5cca81;
    }
  }
`;

const CardOfSpecialization = ({ id, name, onChange = () => {}, textActive, selected = false, ...props }) => {
  // const [, setActive] = useState(false);
  return (
    <CardStyled {...{ active: selected, ...props }}>
      <p>{name}</p>
      <Icon
        icon="icon-x-close"
        mainClassName="addButton"
        mainOnClick={() => {
          onChange(id);
        }}
      />
      <span className={`text-active ${textActive && "active"}`}>{textActive ? "Active" : "inactive"}</span>
    </CardStyled>
  );
};
export default CardOfSpecialization;
