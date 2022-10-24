import React from "react";
import styled, { css } from "styled-components";
import Icon from "../icon";
import info from "../../../assets/icons/info.svg";
import success from "../../../assets/icons/Check.svg";
import warning from "../../../assets/icons/warning.svg";
import error from "../../../assets/icons/error.svg";
import classNames from "classnames";

const MessageStyled = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  background: #fcfcfd;
  border: 1px solid #e6e8ec;
  box-sizing: border-box;
  box-shadow: 0px 40px 32px -24px rgba(15, 15, 15, 0.12);
  border-radius: 12px;
  width: 400px;
  height: 70px;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #23262f;
  position: relative;
  .iconContainer {
    width: 46px;
    height: 46px;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s;
    margin-right: 20px;
    img {
      width: 28px;
      /* height: 28px; */
    }
    &.info {
      background: rgba(55, 114, 255, 0.1);
    }
    &.success {
      background: rgba(69, 179, 107, 0.1);
      img {
        width: 28px;
        /* height: 28px; */
      }
    }
    &.warning {
      background: rgba(255, 209, 102, 0.2);
    }
    &.error {
      background: rgba(241, 93, 130, 0.1);
    }
  }
  ${({ close }) =>
    close &&
    css`
      /* justify-content: space-between; */
      .close {
        position: absolute;
        right: 20px;
        .icon-x-close {
          background-color: rgba(119, 126, 144, 1);
        }
        &:hover {
          .icon-x-close {
            background-color: #353945;
          }
        }
      }
    `}
  ${({ close, yes, no }) =>
    !close &&
    yes &&
    no &&
    css`
      padding-right: 0;
      padding-top: 0;
      padding-bottom: 0;
      .yesAndNoContainer {
        position: absolute;
        right: 0px;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 21px;
        color: #777e91;
        height: 100%;
        width: 70px;
        border-left: 0.5px solid #b1b5c4;
        text-align: center;
        .yes,
        .no {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.3s;
          cursor: pointer;
        }
        .yes {
          width: 100%;
          height: 50%;
          border-bottom: 0.5px solid #b1b5c4;
          &:hover {
            color: #353945;
          }
        }
        .no {
          width: 100%;
          height: 50%;
          border-top: none;
          &:hover {
            color: #353945;
          }
        }
      }
    `}

    ${({ confirm }) =>
    confirm &&
    css`
      padding: 20px;
      padding-bottom: 54px;
      height: auto;
      justify-content: flex-start;
      .yesAndNoContainer {
        position: absolute;
        bottom: 0;
        left: 0;
        height: auto;
        display: flex;
        flex-direction: row-reverse;
        width: 100%;
        border: none;
        .yes,
        .no {
          height: 34px;
          width: 50%;
          border: none;
          border-top: 0.5px solid #b1b5c4;
        }
        .yes {
          border-left: 0.5px solid #b1b5c4;
        }
        .no {
          border-right: none;
        }
      }
    `}

    ${({ theme }) =>
    theme.mode === "dark" &&
    css`
      background: #0f0f0f;
      color: #fff;
      border: 1px solid #1e2227;
    `}
`;

export default function Message({ message, status, close = false, yes = false, no = false, confirm = false, ...rest }) {
  return (
    <MessageStyled {...{ close, yes, no, confirm, ...rest }}>
      <span
        className={classNames(`iconContainer`, {
          info: status === "info",
          success: status === "success",
          warning: status === "warning",
          error: status === "error",
        })}
      >
        {status === "info" ? (
          <img src={info} alt="info" />
        ) : status === "success" ? (
          <img src={success} alt="success" />
        ) : status === "warning" ? (
          <img src={warning} alt="warning" />
        ) : status === "error" ? (
          <img src={error} alt="error" />
        ) : null}
      </span>
      <span className="message">{message}</span>
      {close && <Icon icon="icon-x-close" mainClassName="close" onClick={() => close()} />}
      {yes && no && (
        <div className="yesAndNoContainer">
          <div className="yes" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}} onClick={() => yes()}>
            Yes
          </div>
          <div className="no" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}} onClick={() => no()}>
            No
          </div>
        </div>
      )}
    </MessageStyled>
  );
}
