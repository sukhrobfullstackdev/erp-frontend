import ColorPicker from "components/elements/colorPicker/colorPicker";
import Icon from "components/elements/icon";
import { isEmpty } from "lodash";
import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import InvoiceHeaderCard from "./invoice-head-card";

const Style = styled.div`
  position: relative;
  width: 300px;
  min-width: 300px;
  .add__fild {
    height: 100%;
    min-height: 60px;
    width: 100%;
    border: 1px solid #e6e8ec;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    text-transform: uppercase;
    font-weight: 600;
    color: #b1b5c4;
    background-color: #fff;
    cursor: pointer;
    margin-right: 20px;
  }

  .add__status_fild {
    background: #ffffff;
    width: 300px;
    border: 1px solid #e6e8ec;
    border-radius: 8px;
    padding: 8px 15px 8px 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;

    .title {
      display: block;
      font-weight: 500;
      color: #353945;
      font-size: 14px;
      flex: 1;
      border: none;
      outline: none;
      width: 100%;
      background: transparent;
      line-height: 34px;
    }

    .color {
      width: 4px;
      min-width: 4px;
      height: 44px;
      border-radius: 2px;
      background: ${(props) => props.color || "#E6E8EC"};
    }
  }

  .add__wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    transform: translateY(100%);
  }
  .action_buttons {
    display: flex;
    align-items: center;
    gap: 10px;

    .action__btn {
      width: 30px;
      height: 30px;
      border-radius: 50%;

      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      background: #e2f5e9;
      display: flex;
      align-items: center;
      justify-content: center;

      .ui__icon__wrapper.md .icon-check2 {
        width: 14px;
        height: 14px;
      }

      &.exit {
        background-color: #fff1f5;
      }
    }
  }

  .circle__picker__container {
    width: 300px;
    background-color: #fff;
    border: 1px solid #f4f5f6;
    border-radius: 8px;
    margin-top: 15px;
    padding: 10px;

    .circle-picker {
      width: 300px !important;
      margin-top: 10px;
      background-color: transparent;
    }
  }
`;

const AddStatus = ({ addStatus = () => {} }) => {
  const [adding, setAdding] = useState(false);
  const [color, setColor] = useState("#E6E8EC");
  const [name, setName] = useState("");

  const inputRef = useRef(null);

  const clickCancel = useCallback(() => {
    setAdding(false);
    setName("");
    setColor("#E6E8EC");
  }, []);

  const clickSave = () => {
    if (isEmpty(name)) {
      inputRef?.current.focus();
      return;
    }
    setAdding(false);
    setColor("#E6E8EC");
    setName("");
    addStatus({ name, colorCode: color });
  };

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (e.keyCode === 13) {
        clickSave();
      }
    },
    [clickSave]
  );

  return (
    <Style color={color}>
      {adding ? (
        <div className="add__wrapper">
          <div className="add__status_fild">
            <span className="color" />
            <div>
              <input
                ref={inputRef}
                required
                className="title"
                placeholder={"STATUS NAME"}
                onKeyUp={handleClick}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="action_buttons">
              <button className="action__btn" onClick={clickSave}>
                <Icon icon="icon-check2" color="#45B36B" />
              </button>

              <button className="action__btn" onClick={clickCancel}>
                <Icon icon="icon-exit" color="#EF466F" />
              </button>
            </div>
          </div>

          <ColorPicker
            type="status"
            className="color__picker"
            handleChange={(c) => {
              setColor(c);
            }}
          />
        </div>
      ) : (
        <div className="add__fild" onClick={() => setAdding((a) => !a)}>
          + Add Status
        </div>
      )}
    </Style>
  );
};

export default AddStatus;
