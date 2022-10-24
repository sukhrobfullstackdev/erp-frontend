import React, { useState } from "react";
import styled from "styled-components";
import Label from "../elements/label";
import Select2 from "../elements/select/select2";
import Input from "./../elements/input";
import Icon from "./../elements/icon";
import plus from "./../../assets/icons/plus.svg";
import Button from "./../elements/button/index";
import bottomArrow from "./../../assets/icons/bottomArrow.svg";

const DiscountForSpecialistsStyle = styled.div`
  width: 620px;
  background: #ffffff;
  border: 1px solid #e6e8ec;
  box-sizing: border-box;
  box-shadow: 0px 40px 32px -24px rgba(15, 15, 15, 0.12);
  border-radius: 8px;
  padding: 20px;
  .title {
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    color: #777e91;
    margin-left: -1px;
    padding-bottom: 1px;
  }
  .label {
    padding-left: 0;
    width: 100%;
    margin-top: 20px;
    &__text {
      font-weight: 500;
      font-size: 10px;
      line-height: 12px;
      text-transform: uppercase;
      color: #a7adbf;
      padding-left: 4px;
    }
    .selectContainer {
      width: 100%;
      margin-top: 6px;
      .select__control {
        height: 38px;
        background: #fafafb;
        border: 0.5px solid #e6e8ec;
        border-radius: 6px;
      }
      .select__indicator-separator {
        display: none !important;
      }
      .select__dropdown-indicator {
        background-image: url(${bottomArrow});
        background-repeat: no-repeat;
        background-position: 2px 4px;
        padding: 14px;
        svg {
          display: none !important;
        }
      }
    }
  }
  .numbers {
    display: flex;
    justify-content: space-between;
    .timetable,
    .discountAmount {
      margin-top: 5px;
    }
    .inputContainer {
      width: 280px;
      background: #fafafb;
      border: 0.5px solid #e6e8ec;
      border-radius: 6px;
    }
    .discountAmount {
      display: flex;
      justify-content: flex-end;
    }
    .discountAmountLabel {
      width: 280px;
      position: relative;
      .label__text {
        padding-left: 6px;
      }
      .otherTool {
        width: 70px;
        height: 38px;
        position: absolute;
        bottom: 0px;
        right: 0px;
        padding: 10px;
        padding-left: 0px;
        padding-right: 5px;
        .body {
          display: flex;
          align-items: center;
          height: 100%;
          .bottomArrow {
            border-left: 0.5px solid #e6e8ec;
            border-right: 0.5px solid #e6e8ec;
            /* height: 12px; */
            padding-right: 8px;
            .icon {
              -webkit-mask-size: 15px 15px;
              -webkit-mask-position: 8px center;
              mask-position: 8px center;
              mask-size: 15px 15px;
            }
          }
          .iconPlus {
            width: 24px;
            margin-left: 6px;
            cursor: pointer;
          }
        }
      }
      .dropDown {
        position: absolute;
        top: 63px;
        left: 0;
        background: #fcfcfd;
        border: 0.5px solid #e6e8ec;
        box-sizing: border-box;
        box-shadow: 0px 8px 16px -8px rgba(15, 15, 15, 0.2);
        border-radius: 6px;
        padding: 0 4px;
        transition: 0.3s;
        width: 242px;
        z-index: 5;
        .row {
          padding: 12px 12px 12px 14px;
          font-weight: 500;
          font-size: 14px;
          line-height: 21px;
          color: #353945;
          cursor: pointer;
          border-bottom: 1px solid #f4f5f6;
          &:last-child {
            border-bottom: none;
          }
        }
        &.active {
          height: 0px;
          border: none;
          overflow: hidden;
        }
      }
    }
  }
  .buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    .cancle,
    .save {
      button {
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        border-radius: 6px;
      }
    }
    .cancle {
      button {
        padding: 6px 10px;
        background: rgba(239, 70, 111, 0.05);
        &:hover {
          background: rgba(239, 70, 111, 0.1);
        }
      }
    }
    .save {
      button {
        padding: 6px 17px 6px 16px;
        margin-left: 10px;
      }
    }
  }
  .inputContainer {
    padding: 0 7px;
  }
  ${({ theme }) =>
    theme.mode === "dark" &&
    `
    background: #0D0D0D;
    border: 1px solid #171717;
    color: #fff;
  `}
`;

export default function DiscountForSpecialists({ specialty = [], group = [] }) {
  const [dropdown, setDropdown] = useState({ isOpen: true, value: "" });
  const toggelDropdown = () => setDropdown((state) => ({ ...state, isOpen: !state.isOpen }));
  const setValue = (e) =>
    setDropdown((state) => ({
      ...state,
      isOpen: !state.isOpen,
      value: e.target.innerText,
    }));
  return (
    <DiscountForSpecialistsStyle {...{ dropdown }}>
      <div className="title">DISCOUNTS FOR SPECIALISTS</div>
      <Label className="label">
        <div className="label__text">CHOOSE A SPECIALTY</div>
        <Select2
          {...{
            colourOptions: specialty,
            defaultValue: "",
            placeholder: "",
          }}
        />
      </Label>
      <Label className="label">
        <div className="label__text">SELECT A GROUP</div>
        <Select2
          {...{
            colourOptions: group,
            defaultValue: "",
            placeholder: "",
          }}
        />
      </Label>
      <div className="numbers">
        <Label className="label">
          <div className="label__text">ENTER TIMETABLE NUMBER</div>
          <Input className="timetable" />
        </Label>
        <Label className="label discountAmountLabel">
          <div className="label__text">ENTER THE DISCOUNT AMOUNT</div>
          <Input className="discountAmount" />
          <div className="otherTool">
            <div className="body">
              <Icon onClick={toggelDropdown} icon="icon-bottom-arrow" mainClassName="bottomArrow" />
              <img className="iconPlus" src={plus} alt="plus" />
            </div>
          </div>
          <div className={`dropDown ${dropdown.isOpen && "active"}`}>
            <div className="row" onClick={setValue}>
              Percentage
            </div>
            <div className="row" onClick={setValue}>
              Quantum
            </div>
          </div>
        </Label>
      </div>
      <div className="buttons">
        <Button outlineDanger="1" className="cancle">
          Cancel
        </Button>
        <Button success="1" className="save">
          Save
        </Button>
      </div>
    </DiscountForSpecialistsStyle>
  );
}
