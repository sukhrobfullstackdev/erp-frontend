import React, { memo } from "react";
import styled, { css } from "styled-components";

import firstCardImg from "../../../../assets/icons/firstCard.svg";
import secondCardImg from "../../../../assets/icons/secoundCard.svg";
import thirdCardImg from "../../../../assets/icons/thirdCard.svg";
import Icon from "../../../../components/elements/icon";
import { withTranslation } from "react-i18next";
import CurrencyInput from "react-currency-input-field";
import { isNumber, isString } from "lodash";

const Style = styled.div`
  width: 100%;
  height: 220px;
  position: relative;
  box-shadow: 0 0 10px 2px rgba(12, 12, 12, 0.03);
  border-radius: 18px;

  color: #fcfcfd;
  font-weight: 500;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:after {
    content: "";
    position: absolute;
    bottom: -89px;
    right: 20px;
  }

  .head {
    display: flex;
    justify-content: space-between;
    padding: 20px;

    .title {
      font-size: 16px;
      line-height: 24px;
      padding: 10px;
    }

    .refreshIcon {
      width: 32px;
      height: 32px;
      background: rgba(252, 252, 253, 0.1);
      box-sizing: border-box;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 1s;
    }
  }

  .footer {
    padding: 0 0 20px 30px;
    z-index: 2;

    .title {
      font-weight: 400;
      font-size: 14px;
      line-height: 21px;
      color: #ba9dff;
      margin: 0 0 5px 0;
      text-transform: capitalize;
    }

    .cash {
      font-size: 24px;
      line-height: 36px;
      color: #fcfcfd;
      font-weight: 500;
    }
  }

  ${({ type }) =>
    type === "first" &&
    css`
      background: linear-gradient(-277.83deg, #4c1bc2 25.09%, #6b3cdf 90.43%);

      &:after {
        content: url("${firstCardImg}");
      }
    `}

  ${({ type }) =>
    type === "second" &&
    css`
      background: linear-gradient(-254.97deg, #ef466f 59.55%, rgba(239, 70, 111, 0) 113.56%);

      &:after {
        content: url("${secondCardImg}");
      }

      .footer {
        .title {
          color: #ffe9ee;
        }
      }
    `}

  ${({ type }) =>
    type === "third" &&
    css`
      background: linear-gradient(-90deg, #434343 0%, #000000 100%);

      &:after {
        content: url("${thirdCardImg}");
      }

      .footer {
        .title {
          color: #b1b5c4;
        }
      }
    `}
  ${({ isFetched }) =>
    isFetched &&
    css`
      .head {
        .refreshIcon {
          animation: rotate 1s infinite;
        }
      }
    `}
`;

const CardComponent = ({
  type = "first",
  title = "",
  currencyType = "",
  balance = "0",
  t,
  refresh = () => {},
  isFetched = false,
  ...rest
}) => {
  if (!isString(balance)) balance = String(balance);

  balance = new Intl.NumberFormat("fr-FR", { currency: "UZS" }).format(balance);

  return (
    <Style {...{ type, isFetched, ...rest }}>
      <div className="head">
        <div className="title">{title}</div>
        <Icon icon={"icon-refresh"} color={"#FCFCFD"} mainClassName={"refreshIcon"} onClick={refresh} />
      </div>
      <div className="footer">
        <div className="title">{t("balance") ?? "Balance"}</div>
        <div className="cash">
          {balance} {currencyType}
        </div>
      </div>
    </Style>
  );
};

export default withTranslation("pdp")(memo(CardComponent));
