import React, { useState } from "react";
import styled from "styled-components";
import Icon from "../icon";

const RadioInputStyled = styled.label`
  background: #fcfcfd;
  border: 1px solid #e6e8ec;
  box-sizing: border-box;
  border-radius: 8px;
  height: 38px;
  padding: 7px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100%;
  transition: 0.2s;
  &:hover {
    opacity: 0.8;
  }
  input[type="radio"] {
    height: 0;
    &:after {
      content: "";
      width: 12px;
      height: 12px;
      border-radius: 15px;
      top: -23px;
      left: -3px;
      position: relative;
      background-color: transparent;
      display: inline-block;
      visibility: visible;
      border: 1px solid #353945;
    }
    &:before {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 15px;
      top: -8px;
      left: -1px;
      position: relative;
      background-color: none;
      display: inline-block;
      visibility: visible;
      border: 2px solid white;
      z-index: 2;
    }
    &:checked {
      &:after {
        background-color: rgba(69, 178, 107, 1);
        border: 1px solid rgba(69, 178, 107, 1);
      }
      &:before {
        background-color: rgba(69, 178, 107, 1);
        z-index: 2;
      }
    }
  }

  .labelContainer {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 90%;
    span {
      font-weight: 500;
      font-size: 12px;
      line-height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000000;
      padding: 10px 5px 10px 6px;
      margin-left: 5px;
      border-left: 0.5px solid #e6e8ec;
      &:first-child {
      }
      &:last-child {
        width: 109px;
      }
    }
  }
  .del {
    padding: 5px;
    background: rgba(239, 70, 111, 0.1);
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s;
    .ui__icon__wrapper {
      width: 20px;
      height: 20px;
      .icon {
        width: 16px;
        height: 16px;
      }
    }
    &:hover {
      background: rgba(239, 70, 111, 0.2);
    }
  }
  margin-top: ${({ mt }) => mt || 0}px;
  margin-bottom: ${({ mb }) => mb || 0}px;
  margin-left: ${({ ml }) => ml || 0}px;
  margin-right: ${({ mr }) => mr || 0}px;
`;

export default function RadioInput({ value, defaultValue, onChange = () => {}, del, ...props }) {
  const changeHeandler = (e) => onChange(value.value !== defaultValue.value ? value : defaultValue.value);
  return (
    <RadioInputStyled {...props}>
      <input
        type="radio"
        {...{
          name: value.value,
          value,
        }}
        checked={defaultValue.value === value.value}
        onChange={changeHeandler}
      />
      <div className="labelContainer">
        <span>{value.label}</span>
        <span>{value.value}</span>
      </div>
      {del && <Icon icon="icon-recycle" color="danger" mainClassName="del" onClick={() => del(value)} />}
    </RadioInputStyled>
  );
}
