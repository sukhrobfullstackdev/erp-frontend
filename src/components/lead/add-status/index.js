import React, { useState, memo } from "react";
import styled, { css } from "styled-components";
import classNames from "classnames";
import Icon from "../../elements/icon";
import ColorPicker from "../../elements/colorPicker/colorPicker";

const Style = styled.div`
  width: 274px;
  height: 60px;
  background: #f4f5f6;
  border: 1px solid #e6e8ec;
  border-radius: 8px;

  .default {
    width: 100%;
    height: 100%;
    font-weight: 500;
    font-size: 14px;
    line-height: 14px;
    color: #b1b5c4;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 8px;
    .ui__icon__wrapper {
      transform: rotate(45deg);
      margin-right: 5px;
      width: 25px !important;
      height: 25px !important;
      .icon {
        width: 100% !important;
        height: 100% !important;
      }
    }
    &:hover {
      background: #ffffff;
    }
  }
  .add__status {
    width: 100%;
    height: 100%;
    background: #ffffff;
    border: 1px solid #45b36b;
    &__body {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 8px 6px;
      &__color {
        width: 4px;
        height: 44px;
        background: ${({ color }) => (color ? color : "#E6E8EC")};
        border-radius: 2px;
      }
      .input {
        width: 100%;
        margin-left: 12px;
        font-weight: 500;
        font-size: 14px;
        line-height: 14px;
        border: none;
        outline: none;
        background: none;
        color: #353945;
        &::placeholder {
          color: #b1b5c4;
        }
      }
      .colorPicker-container {
        position: absolute;
        top: 68px;
        width: 274px;
        .circle-picker {
          width: 100% !important;
          span {
            display: flex;
            align-items: center;
            justify-content: center;
            div {
              margin: 0px 6px 12px !important;
              span {
                height: 12px;
                div {
                  margin: 0 !important;
                  border-radius: 4px !important;
                }
              }
            }
          }
        }
      }
      .ui__icon__wrapper {
        &.checkBtn,
        &.exitBtn {
          width: 26px;
          height: 26px;
          .icon {
            -webkit-mask-size: 14px 14px;
            mask-size: 14px 14px;
          }
        }
        &.checkBtn {
          background: #e2f5e9;
        }
        &.exitBtn {
          background: #fff1f5;
          margin: 0 11px 0 6px;
          .icon {
            -webkit-mask-size: 18px 18px;
            mask-size: 18px 18px;
          }
        }
      }
    }
  }
`;

const AddStatus = ({ className = "", dataHandling = () => "" }) => {
  const [active, setActive] = useState(false);
  const [color, setColor] = useState("");

  const toggle = () => setActive((s) => !s);

  const submitHandling = () => {
    let value = document.querySelector("#add__status_input").value;
    dataHandling({ name: value, colorCode: color });
    value = "";
    setColor("");
    toggle();
  };

  return (
    <Style
      {...{
        className: classNames("add__status", {
          [className]: className,
        }),
        color,
      }}
    >
      {!active && (
        <div className="default" onClick={toggle}>
          <Icon icon={"icon-exit"} color="#B1B5C4" />
          ADD STATUS
        </div>
      )}
      {active && (
        <div className="add__status__body">
          <div className="add__status__body__color"></div>
          <input id="add__status_input" type="text" className="input" placeholder="STATUS NAME" />
          <Icon icon="icon-user-check" color="#45B36B" className="checkBtn" onClick={submitHandling} />
          <Icon icon="icon-exit" color="#EF466F" className="exitBtn" onClick={() => setActive(false)} />

          {active && (
            <ColorPicker
              {...{
                setColorPicker: () => "",
                handleChange: setColor,
                type: "status",
              }}
            />
          )}
        </div>
      )}
    </Style>
  );
};

export default memo(AddStatus);
