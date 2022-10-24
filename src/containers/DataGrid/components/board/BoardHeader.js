import React, { useState } from "react";
import styled from "styled-components";
import { get, isString } from "lodash";
import { withTranslation } from "react-i18next";
import Dropdown from "../../../../components/elements/dropDown/dropdown";
import Button from "../../../../components/elements/button";
import Icon from "../../../../components/elements/icon";

const Style = styled.div`
  background: #ffffff;
  width: 274px;
  height: 60px;
  border: 1px solid #e6e8ec;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 8px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  .colorCode {
    width: 4px;
    height: 44px;
    background: ${({ colorCode }) => (colorCode ? colorCode : "#9757D7")};
    border-radius: 2px;
    margin-left: 6px;
  }
  .title {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: #353945;
    margin-left: 12px;
  }
  .count {
    min-width: 30px;
    height: 25px;
    background: #fcfcfd;
    border: 1px solid #e6e8ec;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    color: #353945;
    padding: 0 10px;
  }
  .add__btn {
  }
  .dropDown {
    &__button {
      margin: 0 10px;
    }
  }

  .minimizeContainer {
    //width: 17px;
    overflow: hidden;
    .minimize {
      width: 34px;
      height: 34px;
      background: #eefbf3;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transform: translateX(14px);
      .ui__icon__wrapper {
        transform: rotate(90deg) translateY(5px);
      }
    }
  }
  .status__box {
    display: flex;
    align-items: center;
    height: 100%;
  }
`;

const BoardHeader = ({ data: { colorCode = "", name = "", type = "" }, t, count = 0, ...rest }) => {
  return (
    <Style {...{ colorCode }} className="status__container">
      <div className="status__box">
        <div className="colorCode"></div>
        <div className="title">{name}</div>
      </div>
      <div className="status__box">
        <div className="count">{count}</div>
        <Dropdown
          button={<Icon icon="icon-more-dots" mainClassName="dropDown__button__icon" />}
          options={[
            <Button className={"actionBtn edit"} onClick={() => ""}>
              <Icon icon="icon-edit" color="#777E91" />
              Edit
            </Button>,
            <Button onCLick={() => ""} className={"actionBtn delete"}>
              <Icon icon="icon-recycle" color="#777E91" />
              {t("Delete") ?? "Delete"}
            </Button>,
          ]}
        />
        <Icon icon="icon-exit" mainClassName={"add__btn"} color="#323232" />
        <div className="minimizeContainer">
          <div className="minimize">
            <Icon icon={"icon-bottom-arrow"} color={"#45B36B"} />
          </div>
        </div>
      </div>
    </Style>
  );
};

export default withTranslation("pdp")(BoardHeader);
