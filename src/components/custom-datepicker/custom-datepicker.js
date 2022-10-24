import React, { memo, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import styled, { css } from "styled-components";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import { head, isEqual, isNil, isNull, get } from "lodash";
import Icon from "../elements/icon";
import OutsideClickHandler from "react-outside-click-handler";
import dateIcon from "../../assets/icons/date2.svg";

const Style = styled.div`
  position: relative;

  .datepicker__input {
    font-size: 14px !important;
    line-height: 18px;
    font-weight: 500 !important;

    ::placeholder {
      color: #b1b5c3;
      font-weight: 400;
    }
  }

  .date__icon {
    position: absolute;
    top: 25%;
    right: 10px;
  }

  .time {
  }

  .datepicker {
    &__input {
      padding: 10px;
      font-size: 16px;
      width: 100%;
      min-width: 150px;
      height: 50px;
      border-radius: 10px;
      border: 1px solid #e6e8ec;
      background: #fcfcfd;
      color: #353945;
      font-weight: 400;
      outline: none;

      &:focus {
        border-color: #45b36b;
      }
    }

    &__sidebar {
    }

    &__container {
      background-color: #fff;
      box-shadow: 0px 40px 32px -24px rgba(15, 15, 15, 0.12);
      border-radius: 12px;
      min-height: 400px;
      width: 500px;
      border: 1px solid #e6e8ec;
      position: absolute;
      z-index: 9999;
      top: 60px;

      .react-datepicker__time-container {
        float: unset;
        position: absolute;
        top: 60px;
        left: 125px;
        border-left: unset;

        .react-datepicker__time-list-item {
          font-size: 13px;
        }
      }
    }

    &__header {
      padding: 15px;
      display: flex;
      justify-content: space-between;
    }

    &__body {
      display: flex;
      border-top: 1px solid #e6e8ec;

      &_left {
        width: 175px;
        padding: 20px 10px 15px 15px;
        border-right: 1px solid #e6e8ec;
        min-height: 300px;
        background-color: #fcfcfd;

        ul {
          list-style: none;
          padding-left: 0;

          li {
            margin-bottom: 15px;
            cursor: pointer;
            font-weight: 500;
            color: #353945;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .text {
              font-size: 14px;
              font-weight: 500;
            }

            .description {
              font-weight: 400;
              font-size: 12px;
              display: none;
            }

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }

      &_right {
        width: 325px;
        padding: 10px 0px 15px 0px;

        .react-datepicker__month-container {
          width: 100%;
        }

        .react-datepicker__header {
          background-color: #fff;
        }
      }
    }

    &__date {
      &__box {
        border: 1px solid #e6e8ec;
        border-radius: 4px;
        padding: 3px;
        width: 225px;
        margin-right: 15px;
        position: relative;

        &:last-child {
          margin-right: 0;
        }
      }

      &__input {
        background-color: #e2f5e9;
        padding: 5px 10px;
        width: 100%;
        outline: none;
        border: none;
        text-align: center;
        font-weight: 600;
        border-radius: 2px;
        position: relative;

        &::placeholder {
          color: #45b36b;
        }

        &.time {
          background-color: rgba(55, 114, 255, 0.1);

          &::placeholder {
            color: #3772ff;
          }
        }
      }
    }

    &__time {
    }

    &__close {
      padding: 8px 16px;
      background: #fff1f5;
      border-radius: 8px;
      color: #ef466f;
      display: inline-block;
      font-size: 14px;
      cursor: pointer;
      margin-top: 10px;
      font-weight: 500;
      margin-right: 25px;
    }
  }

  .react-datepicker__day {
    transition: 0.4s ease;
    font-size: 14px;

    :hover {
      background: rgba(69, 179, 107, 0.1);
      color: #45b36b;
    }
  }

  .react-datepicker__day.react-datepicker__day--selected {
    background: rgba(69, 179, 107, 0.1);
    color: #45b36b;
    font-weight: 500;
  }

  .react-datepicker__day--keyboard-selected {
    background: rgba(69, 179, 107, 0.1);
    color: #45b36b;
    font-weight: 500;
  }

  .react-datepicker__day-name,
  .react-datepicker__day {
    margin-right: 10px !important;
    margin-bottom: 15px !important;

    &:last-child {
      margin-right: 0 !important;
    }
  }

  .react-datepicker__header {
    border-bottom: unset !important;
  }

  .react-datepicker__day-name {
    font-size: 16px;
    color: #353945;
    font-weight: 600;
    margin-bottom: 0 !important;
  }

  .react-datepicker__day {
    color: #777e90;
    border-radius: 10px;
    width: 30px;
    height: 30px;
  }

  .react-datepicker__day--outside-month {
    color: #353945;
    font-weight: 600;
  }

  input[type="date"]::-webkit-inner-spin-button,
  input[type="date"]::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }

  input[type="time"]::-webkit-calendar-picker-indicator {
    top: 0;
    left: 0;
    background: #0000;
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
  }

  .clear__value {
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
  }

  .custom__header {
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    margin-bottom: 10px;

    .left {
      color: #353945;
      font-size: 16px;
      font-weight: 500;
    }

    .right {
      display: flex;
      align-items: center;

      span {
        font-size: 14px;
        font-weight: 500;
        margin-right: 10px;
        cursor: pointer;
      }

      button {
        background-color: transparent;
        margin-right: 5px;
        font-size: 18px;
        font-weight: 500;
        color: #777e90;

        &.previous {
          transform: rotate(-90deg);
        }

        &.next {
          transform: rotate(-90deg);
        }
      }
    }
  }
  .react-datepicker__day--in-range {
    background: rgba(69, 179, 107, 0.1);
    color: #777e91;
  }
  .react-datepicker__day--range-end,
  .react-datepicker__day--range-start {
    color: #45b36b;
    font-weight: 600;
  }
  .react-datepicker__day--in-selecting-range {
    background: rgba(69, 179, 107, 0.1) !important;
  }

  ${({ xPostion, yPostion }) =>
    xPostion &&
    yPostion &&
    css`
      .datepicker {
        &__container {
        }
      }
    `}

  ${({ position }) =>
    position &&
    css`
      .datepicker {
        &__outside {
          position: absolute;
          top: ${window.innerHeight - position.bottom < 500 ? -500 : position.bottom}px;
        }
      }
    `}
`;

const CustomDatepicker = ({
  isRange = false,
  showStartTime = true,
  showEndTime = true,
  isDisabled = false,
  type = "date",
  placeholder = "",
  onChange = () => {},
  isDoubleClick = false,
  defaultValue,
  disabled = false,
  value,
  ...rest
}) => {
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [dateType, setDateType] = useState("text");
  const [timeType, setTimeType] = useState("text");
  const [show, setShow] = useState(null);

  const [endDate, setEndDate] = useState(null);

  const [state, setState] = useState({
    xPostion: null,
    yPostion: null,
    endDate: null,
    startDate: null,
    position: null,
  });

  console.log(state);
  useEffect(() => {
    if (show === false && !(isNull(startDate) && isNull(defaultValue))) {
      onChange(new Date(startDate).getTime(), new Date(state.endDate).getTime());
    }
  }, [show]);

  useEffect(() => {
    if (defaultValue === "") {
      // setStartDate(null);
      // setEndDate(null);
      setState((s) => ({ ...s, startDate: null, endDate: null }));
    }
    if (!isNil(defaultValue) && defaultValue != 0) {
      if (isRange && !isNull(get(defaultValue, "[0]", null)) && !isNull(get(defaultValue, "[1]", null))) {
        // setStartDate(new Date(parseInt(get(defaultValue, "[0]", null))));
        // setEndDate(new Date(parseInt(get(defaultValue, "[1]", null))));
        setState((s) => ({
          ...s,
          endDate: new Date(parseInt(get(defaultValue, "[1]", null))),
          startDate: new Date(parseInt(get(defaultValue, "[0]", null))),
        }));
      } else if (!isRange && !isNull(defaultValue)) setState((s) => ({ ...s, startDate: new Date(parseInt(defaultValue)) }));
    }
  }, [defaultValue]);

  useEffect(() => {
    if (!isNil(value)) {
      if (isRange && !isNull(get(value, "[0]", null)) && !isNull(get(value, "[1]", null))) {
        setStartDate(new Date(parseInt(get(value, "[0]", null))));
        setEndDate(new Date(parseInt(get(value, "[1]", null))));
      } else if (!isRange && !isNull(value)) setStartDate(new Date(parseInt(value)));
    }
  }, [value]);

  const changeDateInputType = () => {
    setDateType("date");
  };
  const changeTimeInputType = () => {
    setTimeType("time");
  };

  const onChangeHandling = (date) => {
    if (isRange) {
      const [start, end] = date;
      setStartDate(start);
      setEndDate(end);
      if (!isNull(start) && !isNull(end)) setShow(false);
    } else {
      setStartDate(date);
      setShow(false);
    }
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13 && e.target.value.length) {
      setStartDate(moment(e.target.value).toDate());
      setShow(false);
    }
  };

  const Container = ({ className, children }) => (
    <div className={"datepicker__outside"}>
      <div className={"datepicker__container"}>
        <div className="datepicker__header">
          <div className="datepicker__date__box">
            <input
              // value={!isNil(startDate) ? moment(startDate).format(isEqual(dateType, "text") ? "DD/MM/YYYY" : "YYYY-MM-DD") : ""}
              defaultValue={
                !isNil(startDate) ? moment(startDate).format(isEqual(dateType, "text") ? "DD/MM/YYYY" : "YYYY-MM-DD") : ""
              }
              // onChange={(e) => {
              //   setStartDate(moment(e.target.value).toDate());
              //   console.log(e.target.value);
              // }}
              onKeyDown={handleEnter}
              type={dateType}
              onFocus={changeDateInputType}
              className={"datepicker__date__input date"}
              placeholder={"Add date"}
              max="2050-12-31"
            />
            {!isNil(startDate) && (
              <Icon className={"clear__value"} color={"#EF466F"} icon={"icon-x"} onClick={() => setStartDate(null)} />
            )}
          </div>
          {showStartTime && (
            <div className="datepicker__date__box">
              <input
                value={startTime}
                className={"datepicker__date__input time"}
                type={timeType}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder={"Add time"}
                onFocus={changeTimeInputType}
              />
              {!isNil(startTime) && (
                <Icon className={"clear__value"} color={"#EF466F"} icon={"icon-x"} onClick={() => setStartTime(null)} />
              )}
            </div>
          )}
        </div>
        <div className="datepicker__body">
          <div className="datepicker__body_left">
            <ul>
              <li onClick={() => setStartDate(moment())}>
                <span className={"text"}>Today</span> <span className={"description"}>{moment().format("dd")}</span>
              </li>
              <li onClick={() => setStartDate(moment().subtract(1, "days").toDate())}>
                <span className={"text"}>Yesterday</span>{" "}
                <span className={"description"}>{moment().subtract(1, "days").format("dd")}</span>
              </li>
              <li onClick={() => setStartDate(moment().add(1, "days").toDate())}>
                <span className={"text"}>Tomorrow</span>
                <span className={"description"}>{moment().add(1, "days").format("dd")}</span>
              </li>
              <li onClick={() => setStartDate(moment().day(7).toDate())}>
                <span className={"text"}>This weekend</span>
                <span className={"description"}>{moment().day(7).format("dd")}</span>
              </li>
              <li onClick={() => setStartDate(moment().day(8).toDate())}>
                <span className="text">Next week</span>
                <span className="description">{moment().day(8).format("dd")}</span>
              </li>
              <li onClick={() => setStartDate(moment().day(14).toDate())}>
                <span className={"text"}>Next weekend</span>
                <span className={"description"}>{moment().day(14).format("MMM DD")}</span>
              </li>
              <li onClick={() => setStartDate(moment().add(2, "weeks").toDate())}>
                <span className="text">2 weeks</span>{" "}
                <span className="description">{moment().add(2, "weeks").format("MMM DD")}</span>
              </li>
              <li onClick={() => setStartDate(moment().add(4, "weeks").toDate())}>
                <span className="text">4 weeks</span>
                <span className="description">{moment().add(4, "weeks").format("MMM DD")}</span>
              </li>
            </ul>
          </div>
          <div className="datepicker__body_right">
            {children}
            <div className="text-right">
              <div className="datepicker__close" onClick={() => setShow(false)}>
                Close
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Style {...rest} startDate={startDate} isRange={isRange} position={state.position}>
      <OutsideClickHandler onOutsideClick={() => setShow(null)}>
        <input
          className={`datepicker__input ${isRange ? "range" : ""}`}
          type="text"
          // readOnly={isDisabled}
          readOnly={true}
          onFocus={(e) => {
            (!isDoubleClick || !disabled) && setShow(true);
            setState((s) => ({ ...s, position: e.target.getBoundingClientRect() }));
          }}
          onDoubleClick={() => (isDoubleClick || !disabled) && setShow(true)}
          // onClick={() => !isDoubleClick && setShow(true)}
          defaultValue={!isNil(startDate) ? moment(startDate).format("DD/MM/YYYY") : ""}
          placeholder={`${placeholder ? placeholder : type === "time" ? "12:00" : "Select date..."}`}
        />
        {isRange && (
          <input
            className={"datepicker__input range second__input"}
            type="text"
            // readOnly={isDisabled}
            readOnly={true}
            onFocus={() => (!isDoubleClick || !disabled) && setShow(true)}
            onDoubleClick={() => (isDoubleClick || !disabled) && setShow(true)}
            // onClick={() => !isDoubleClick && setShow(true)}
            defaultValue={!isNil(state.endDate) ? moment(state.endDate).format("DD/MM/YYYY") : ""}
          />
        )}
        {type == "time" ? (
          <Icon icon="icon-clock" className={"date__icon time"} />
        ) : (
          <img
            src={dateIcon}
            alt=""
            className={"date__icon"}
            onClick={(e) => {
              !disabled && setShow(true);
              setState((s) => ({ ...s, position: e.target.getBoundingClientRect() }));
            }}
          />
        )}
        {show && (
          <DatePicker
            renderCustomHeader={({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
              <div className={"custom__header"}>
                <div className="left">{moment(date).format("MMM YYYY")}</div>
                <div className="right">
                  <span onClick={() => setStartDate(new Date())}>Today</span>
                  <button className={"previous"} onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                    {"<"}
                  </button>
                  <button className={"next"} onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                    {">"}
                  </button>
                </div>
              </div>
            )}
            startDate={startDate}
            endDate={state.endDate}
            selected={!isNil(startDate) ? moment(startDate).toDate() : null}
            onChange={onChangeHandling}
            showPopperArrow={false}
            calendarContainer={Container}
            selectsRange={isRange}
            inline
          ></DatePicker>
        )}
      </OutsideClickHandler>
    </Style>
  );
};

export default memo(CustomDatepicker);
