import React, { useState } from "react";
import DatePicker from "react-datepicker";
import styled, { css } from "styled-components";
import dateImg from "../../../assets/icons/date.svg";
import "react-datepicker/dist/react-datepicker.css";
import Icon from "../icon";
const StyledDatePicker = styled.div`
  position: relative;
  display: ${({ d }) => d || "inline-block"};
  width: ${({ width }) => width || 260}px;
  .dateIcon {
    bottom: 0;
    position: absolute;
    right: 11px;
    top: 10px;
    width: 29px !important;
    height: 29px !important;
    .icon {
      width: 28px !important;
      height: 27px !important;
    }
  }
`;
const DateInputStyled = styled.label`
  display: ${({ d }) => d || "inline-block"};
  width: ${({ width }) => width || 260}px;
  height: 38px;
  &.dateInputContainer {
    position: relative;
    /* &:after {
            content: '';
            width: 28px;
            height: 29px;
            mask-image: url(${dateImg});
            mask-repeat: no-repeat;
            mask-position: center;
            mask-size: 100%;
            -webkit-mask-image: url(${dateImg});
            -webkit-mask-repeat: no-repeat;
            -webkit-mask-position: center;
            -webkit-mask-size: 100%;
            background-color: #777E91;
            cursor: pointer;
            position: absolute;
            right: 10px;
            top: 10px;
        } */
  }
  .react-datepicker__input-container {
    display: ${({ d }) => d || "inline-block"};
    height: 50px;
    input {
      width: 100%;
      height: 100%;
      background: #fcfcfd;
      border: 1px solid #e6e8ec;
      box-sizing: border-box;
      border-radius: 8px;
      padding: 7px 11px 7px 13px;
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      color: #23262f;
      outline: none;
      &::-webkit-calendar-picker-indicator,
      ::-webkit-inner-spin-button {
        /* display: none; */
        /* -webkit-appearance: none; */
      }

      &[type="number"] {
        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
          -webkit-appearance: none;
        }
      }
    }
  }
  input {
    width: 100%;
    height: 100%;
    background: #fcfcfd;
    border: 1px solid #e6e8ec;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 7px 11px 7px 13px;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: #23262f;
    outline: none;
    &::-webkit-calendar-picker-indicator {
      width: 28px;
      height: 29px;
      mask-image: url(${dateImg});
      mask-repeat: no-repeat;
      mask-position: center;
      -webkit-mask-image: url(${dateImg});
      -webkit-mask-repeat: no-repeat;
      -webkit-mask-position: center;
      background-color: #777e91 !important;
      background-color: #353945 !important;
      cursor: pointer;
      transform: scale(1.3);
      /* display: none; */
      /* -webkit-appearance: none; */
      /* opacity: 0; */
    }
    &[type="number"] {
      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
      }
    }
  }
  ${({ theme: { mode } }) =>
    mode === "dark" &&
    css`
      input {
        color: #b1b5c4;
        background: #141416;
        border: 1px solid #353945;
        &::-webkit-calendar-picker-indicator {
          background-color: #fff;
          filter: invert(0.5);
        }
      }
    `}
  ${({ calendar }) =>
    calendar === "none" &&
    css`
      input {
        &::-webkit-calendar-picker-indicator {
          display: none;
        }
      }
    `}
`;

export default function DateInput({ label = "", defaultValue, onChange = () => {}, className = "", year, ...props }) {
  const [startDate, setStartDate] = useState(setYear(defaultValue));
  function setYear(year) {
    if (year) {
      let Year = new Date().setFullYear(year);
      return new Date(Year);
    } else {
      return;
    }
  }
  return (
    <DateInputStyled className={`dateInputContainer ${className}`} {...props}>
      {label}
      {year ? (
        <StyledDatePicker>
          <DatePicker
            selected={startDate}
            {...props}
            dateFormat={"yyyy"}
            showYearPicker
            onChange={(year) => {
              setStartDate(year);
              onChange(year);
            }}
          />
          <Icon className="dateIcon" icon="icon-date" />
        </StyledDatePicker>
      ) : (
        <input {...{ type: "date", defaultValue, ...props }} onChange={(e) => onChange(e.target.value)} />
      )}
    </DateInputStyled>
  );
}
{
  /* <input type="number" min="1900" max="2099" step="1" {...{ value, ...props }} onChange={(e) => onChange(e.target.value)} /> */
}
