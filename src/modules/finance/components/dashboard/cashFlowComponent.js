import React, { memo, useState } from "react";
import { withTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import { isString, get } from "lodash";
import SimpleBar from "simplebar-react";
import BarChart from "../../../../components/charts/BarChart";
import Icon from "../../../../components/elements/icon";
import Dropdown from "../../../../components/elements/dropDown/dropdown";
import Button from "../../../../components/elements/button";

const Style = styled.div`
  background: #ffffff;
  box-shadow: 0 0 10px 2px rgba(12, 12, 12, 0.03);
  border-radius: 18px;
  padding: 30px;

  .cashFlow {
    &__header {
      display: flex;
      justify-content: space-between;

      &__left {
        .title {
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
          color: #777e91;
        }

        &__report {
          display: flex;
          margin-top: 41px;
          margin-bottom: 30px;

          &__income,
          &__expense {
            min-width: 100px;
            height: 40px;
            border-radius: 8px;
            padding: 8px 20px 8px 10px;
            display: flex;
            align-items: center;
            .incomeIcon,
            .expenseIcon {
              margin-right: 8px;
            }
          }

          &__income {
            background: #effbf3;
            margin-right: 15px;
            .incomeIcon {
              transform: rotate(130deg);
            }
          }

          &__expense {
            background: #fff1f5;

            .expenseIcon {
              transform: rotate(-45deg);
            }
          }
        }
      }

      &__right {
        display: flex;
        align-items: center;
        ${({ isFetched }) =>
          isFetched &&
          css`
            .refreshIcon {
              animation: rotate 1s infinite;
            }
          `}
        .dropDown {
          &__body {
            min-width: 100px;
            right: -20px;
            top: 45px;
            button {
              border-radius: 0;
              background: #ffffff;
              width: 100%;
              margin: 5px 0;
              color: #353945;

              &:hover {
                background: #ffffff;
                color: rgba(53, 57, 69, 0.5);
              }
            }
          }
        }
      }
    }
    &__body {
      /* overflow: auto; */
    }
  }
`;

// const data = [
//     {
//         name: "Monday",
//         income: 4000,
//         expense: 2400,
//     },
//     {
//         name: "Tuesday",
//         income: 3000,
//         expense: 1398,
//     },
//     {
//         name: "Wednesda",
//         income: 2000,
//         expense: 9800,
//     },
//     {
//         name: "Thursday",
//         income: 2780,
//         expense: 3908,
//     },
//     {
//         name: "Friday",
//         income: 1890,
//         expense: 4800,
//     },
//     {
//         name: "Saturday",
//         income: 2390,
//         expense: 3800,
//     },
//     {
//         name: "Sunday",
//         income: 3490,
//         expense: 4300,
//     },
// ];

const CashFlowComponent = ({ t, refresh = () => "", isFetched, data }) => {
  const [state, setState] = useState({
    barChartType: "week",
  });

  let income = get(data, "income", 0);
  let expense = get(data, "expense", 0);
  if (!isString(income)) income = String(income);
  if (!isString(expense)) expense = String(expense);

  income = new Intl.NumberFormat("fr-FR", { currency: "UZS" }).format(income);
  expense = new Intl.NumberFormat("fr-FR", { currency: "UZS" }).format(expense);
  return (
    <Style
      {...{
        isFetched,
      }}
    >
      <div className="cashFlow__header">
        <div className="cashFlow__header__left">
          <div className="title">{t("cashflow") ?? "Cashflow"}</div>
          <div className="cashFlow__header__left__report">
            <div className="cashFlow__header__left__report__income">
              <Icon icon={"icon-arrow-right-stick"} color={"#45B36B"} className={"incomeIcon"} />
              {income}
            </div>
            <div className="cashFlow__header__left__report__expense">
              <Icon icon={"icon-arrow-right-stick"} color={"#EF466F"} className={"expenseIcon"} />
              {expense}
            </div>
          </div>
        </div>
        <div className="cashFlow__header__right">
          <Icon icon={"icon-refresh"} color={"#777E91"} mainClassName={"refreshIcon"} onClick={refresh} />
          <div className="filter">
            Filter
            <Icon icon={"icon-filter"} color={"#777E91"} mainClassName={"filterIcon"} />
          </div>
          <Dropdown button={<Icon icon={"icon-more-dots"} color={"#777E91"} mainClassName={"dotsIcon"} />}>
            <Button
              onCLick={() =>
                setState((s) => ({
                  ...s,
                  barChartType: "week",
                }))
              }
            >
              week
            </Button>
            <Button
              onCLick={() =>
                setState((s) => ({
                  ...s,
                  barChartType: "month",
                }))
              }
            >
              month
            </Button>
            <Button
              onCLick={() =>
                setState((s) => ({
                  ...s,
                  barChartType: "year",
                }))
              }
            >
              year
            </Button>
          </Dropdown>
        </div>
      </div>
      {/* <SimpleBar></SimpleBar> */}
      <SimpleBar className="cashFlow__body simplebar-horizontal-only ">
        <BarChart data={get(data, "data", [])} width={890} nameKey={"date"} yaxis={10} barCategoryGap={10} barGap={-50} />
      </SimpleBar>
    </Style>
  );
};

export default withTranslation("pdp")(memo(CashFlowComponent));
