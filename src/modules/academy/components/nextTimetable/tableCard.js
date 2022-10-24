import React from "react";
import styled, { css } from "styled-components";
import NextTimeTable from ".";
import Icon from "../../../../components/elements/icon";
import { get, isEqual } from "lodash";

export const Container = styled.div`
  .userData {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .bodyBox {
    background: #f4f5f6;
    border-radius: 4px;
    width: 275px;
    height: 70px;
    margin: 5px 0 0 0;
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: space-between !important;
    &.leftStudent {
      background: #fff1f5;
      border: 1px solid #ef466f;
    }
    .leftSide {
      display: flex;
      /* align-items: center; */
      justify-content: space-between !important;
    }

    .order {
      display: flex;
    }

    .lineDown {
      height: 68px;
      width: 0.7px;
      background-color: #e6e8ec;
    }

    .orderNum {
      color: #45b36b;
      font-weight: 600;
      font-size: 14px;
      line-height: 21px;
      padding: 10px 8px 14px 0;
    }

    .userInfo {
      padding: 10px 0 0 12px;
    }

    .headBoxTitle {
      color: #353945;
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      padding: 0;
      margin: 0;
    }

    .userNumber {
      color: #777e91;
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      padding-top: 8px;
    }

    .headBoxBtn {
      width: 26px;
      height: 26px;
      background: #45b36b;
      border-radius: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .doubleArrow .icon-double-arrow {
      width: 9.3px;
      height: 8.6px;
    }

    .doubleArrow {
      width: 10.3px;
      height: 20px;
    }
  }

  .opacity {
    opacity: 0.6;
  }

  ${({ type }) =>
    type === "error" &&
    css`
      .bodyBox {
        background-color: #fff1f5;
        border: 1px solid #ef466f;
      }
    `}

  ${({ type }) =>
    type === "disabled" &&
    css`
      .bodyBox {
        background-color: #f4f5f6;

        .headBoxTitle {
          color: #b1b5c4;
        }

        .userNumber {
          color: #b1b5c4;
        }

        .orderNum {
          color: #b1b5c4;
        }

        .headBoxBtn {
          display: none;
        }
      }
    `}

  ${({ rotate }) =>
    rotate === "curved" &&
    css`
      .bodyBox {
        .doubleArrow {
          transform: rotate(180deg);
        }
      }
    `}
`;

function TableCard({ onBtnClick = () => {}, student, type = "info", rotate = "lined", index }) {
  return (
    <Container type={type} rotate={rotate}>
      <div className={`bodyBox ${isEqual(get(student, "timeTableStatus", ""), "LEFT") && "leftStudent"}`}>
        <div className="leftSide">
          <div className="order">
            <p className="orderNum">{index + 1}</p>
            <div className="lineDown" />
          </div>
          <div className="userInfo">
            <div className="headBoxTitle">{student.fullName}</div>
            <div className="userNumber">{get(student, "phoneNumber", "")}</div>
          </div>
        </div>
        <button className="headBoxBtn" onClick={() => onBtnClick(student.id)}>
          <Icon icon="icon-double-arrow" color="#fff" size="sm" className="doubleArrow" />
        </button>
      </div>
    </Container>
  );
}

export default TableCard;
