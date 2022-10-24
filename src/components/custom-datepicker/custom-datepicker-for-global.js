import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import moment from "moment";
import ApiActions from "../../services/globalContextMenu/actions";

import "react-datepicker/dist/react-datepicker.css";
import { isNil, isNull, get } from "lodash";
import Icon from "../elements/icon";
import dateIcon from "../../assets/icons/date2.svg";
import { connect } from "react-redux";

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
`;

const CustomDatePickerGlobal = ({
  setTemp = () => {},
  isRange = false,
  showStartTime = true,
  showEndTime = true,
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
  const [endDate, setEndDate] = useState(null);
  const [show, setShow] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (defaultValue === "" || isNull(defaultValue)) {
      setStartDate(null);
      setEndDate(null);
    } else if (!isNil(defaultValue) && defaultValue != 0) {
      if (isRange && !isNull(get(defaultValue, "[0]", null)) && !isNull(get(defaultValue, "[1]", null))) {
        setStartDate(new Date(parseInt(get(defaultValue, "[0]", null))));
        setEndDate(new Date(parseInt(get(defaultValue, "[1]", null))));
      } else if (!isRange && !isNull(defaultValue)) setStartDate(new Date(parseInt(defaultValue)));
    }
  }, [defaultValue]);

  useEffect(() => {
    if (!isNil(value) && value !== "") {
      if (isRange && !isNull(get(value, "[0]", null)) && !isNull(get(value, "[1]", null))) {
        setStartDate(new Date(parseInt(get(value, "[0]", null))));
        setEndDate(new Date(parseInt(get(value, "[1]", null))));
      } else if (!isRange && !isNull(value)) setStartDate(new Date(parseInt(value)));
    }
  }, [value]);

  const onChangeHandling = (date) => {
    if (isRange) {
      const [start, end] = date;
      setStartDate(start);
      setEndDate(end);
      if (!isNull(start) && !isNull(end)) {
        setShow(false);
        handleSubmit(start, end);
      }
    } else {
      setStartDate(date);
      setShow(false);
      handleSubmit(date);
    }
  };

  const handleSubmit = (startDate, endDate = null) => {
    if (!(isNull(startDate) && isNull(defaultValue))) {
      setTemp({ show: false });
      onChange(new Date(startDate).getTime(), new Date(endDate).getTime());
    }
  };

  const closePicker = () => {
    setShow(false);
    setTemp({ show: false });
  };

  useEffect(() => {
    show && submitGlobal();
  }, [startDate, endDate, show]);

  const submitGlobal = useCallback(() => {
    const data = {
      isRange,
      onChange: onChangeHandling,
      setEndDate,
      setShow,
      setStartDate,
      handleEnter,
      closePicker,
      showStartTime,
      showEndTime,
      type,
      startDate,
      endDate,
      show,
      defaultValue,
      value,
      position: inputRef.current ? inputRef.current.getBoundingClientRect() : null,
    };
    show && setTemp(data);
  }, [onChangeHandling, startDate, endDate, show, isRange, defaultValue, value]);

  const handleEnter = (e) => {
    if (e.keyCode === 13 && e.target.value.length) {
      setStartDate(moment(e.target.value).toDate());
      handleSubmit(moment(e.target.value).toDate());
      setShow(false);
    }
  };

  return (
    <Style {...rest} startDate={startDate} isRange={isRange}>
      <input
        ref={inputRef}
        className={`datepicker__input ${isRange ? "range" : ""}`}
        type="text"
        readOnly={true}
        onFocus={(e) => {
          if (!isDoubleClick && !disabled) {
            setShow(true);
          }
        }}
        onDoubleClick={() => isDoubleClick && !disabled && setShow(true)}
        defaultValue={!isNil(startDate) ? moment(startDate).format("DD/MM/YYYY") : ""}
        placeholder={`${placeholder ? placeholder : type === "time" ? "12:00" : "Select date..."}`}
      />
      {isRange && (
        <input
          className={"datepicker__input range second__input"}
          type="text"
          readOnly={disabled}
          onFocus={() => !isDoubleClick && !disabled && setShow(true)}
          onDoubleClick={() => isDoubleClick && !disabled && setShow(true)}
          defaultValue={!isNil(endDate) ? moment(endDate).format("DD/MM/YYYY") : ""}
        />
      )}
      {type == "time" ? (
        <Icon icon="icon-clock" className={"date__icon time"} />
      ) : (
        <img src={dateIcon} alt="" className={"date__icon"} onClick={() => !disabled && setShow(true)} />
      )}
    </Style>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setTemp: (data, storeName = "datePickerGlobalData") => {
      dispatch({
        type: ApiActions.SET_DATA_IN_GLOBAL_CONTEXT.REQUEST,
        payload: {
          data: data,
          storeName,
        },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(CustomDatePickerGlobal));
