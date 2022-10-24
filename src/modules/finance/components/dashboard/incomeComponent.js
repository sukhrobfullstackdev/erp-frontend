import React, { memo, useState } from "react";
import styled, { css } from "styled-components";
import { withTranslation } from "react-i18next";
import { isString, get, isArray, isEqual, isEmpty } from "lodash";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { Col, Row } from "react-grid-system";
import classNames from "classnames";
import Icon from "../../../../components/elements/icon";
import Dropdown from "../../../../components/elements/dropDown/dropdown";
import Button from "../../../../components/elements/button";

// const data = [
//     {name: 'Group A', amount: 400},
//     {name: 'Group B', amount: 100},
//     {name: 'Group C', amount: 700},
//     {name: 'Group D', amount: 200},
// ];
// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Style = styled.div`
  padding: 0 8px;

  .income {
    width: 100%;
    min-height: 550px;
    background: #ffffff;
    box-shadow: 0 0 10px 2px rgba(12, 12, 12, 0.03);
    border-radius: 18px;
    margin-top: 24px;

    &__head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30px 30px 30px 26px;

      &__left {
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: #777e91;
        text-transform: capitalize;
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
      .picChart {
        display: flex;
        justify-content: center;
        height: 350px !important;

        .recharts-wrapper {
          ${({ balance, showBalance }) =>
            balance &&
            showBalance &&
            css`
              &:after {
                content: "${balance}";
                position: absolute;
                top: 50%;
                left: 50%;
                /* transform: translate(-50%, -50%); */
                transform: translate(-53%, -65%);
                font-weight: 600;
                font-size: 18px;
                line-height: 27px;
                color: #353945;
              }
            `}
          .middleText {
            font-weight: 600;
            font-size: 18px;
            line-height: 27px;
            color: #353945;
          }
        }
      }
    }

    &__footer {
      border-top: 1px solid #f4f5f6;
      padding: 30px 20px 20px;

      .currency {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #fcfcfd;
        border-radius: 8px;
        height: 44px;
        margin-bottom: 6px;
        padding: 0 15px;

        &__color {
          width: 7px;
          height: 7px;
          margin-right: 15px;
          border-radius: 50%;
        }

        &__name {
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;
          color: #353945;
          display: flex;
          align-items: center;
        }

        &__amount {
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;
          color: #353945;
        }
      }
    }

    ${({ showCurrencyType }) =>
      showCurrencyType === "card" &&
      css`
        &__footer {
          padding: 30px 30px 12px;

          .currency {
            margin-bottom: 18px;
            height: 160px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.07);
            border-radius: 12px;
            flex-direction: column;
            padding: 10px 0 0;

            &__col {
              padding-left: 9px !important;
              padding-right: 9px !important;
            }

            &__row {
              margin-left: -9px !important;
              margin-right: -9px !important;
            }

            &__img {
              width: 100px;
              height: 100px;
              border-radius: 4px;
            }

            &__amount {
              border-top: 1px solid #f4f5f6;
              padding: 18px 0;
              width: 100%;
              margin-top: 18px;
              text-align: center;
              font-weight: 600;
              font-size: 16px;
              line-height: 24px;
            }
          }
        }
      `}
  }
  .drop_btn {
    button {
      width: 149px;
      height: 40px;
      display: flex;
      align-items: center;
      background-color: #fff;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      line-height: 21px;
      padding: 10px;
      :hover {
        background-color: #f4f5f6;
        color: #353945;
        .icon {
          background-color: #353945;
        }
      }
      .ui__icon__wrapper {
        margin-right: 12px;
        .icon {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
  .lan {
    button {
      position: relative;
      background-color: ${({ curdrop }) => (curdrop ? "rgba(69, 179, 107, 0.1)" : "#FFF")};
      .icon {
        background-color: ${({ curdrop }) => (curdrop ? "#353945" : "")};
      }
      .check {
        transform: rotate(${({ curdrop }) => (curdrop ? "180deg" : "0")});
        margin: 0;
        position: absolute;
        right: 7px;
        bottom: 11px;
        top: 9px;
      }

      :hover {
        background-color: ${({ curdrop }) => (curdrop ? "rgba(69, 179, 107, 0.1)" : "#FFF")};
      }
    }
  }
  .lan_body {
    overflow: hidden;
    height: ${({ curdrop }) => (curdrop ? "143px" : "0px")};
    transition: 0.5s ease;
    .lan_btn {
      button {
        display: flex;
        align-items: center;
        width: 149px;
        height: 41px;
        margin: 5px 0;
        font-size: 14px;
        font-weight: 400;
        background-color: #fcfcfd;
        border: 1px solid #f4f5f6;
        :hover {
          background: #f4f5f6;
          color: #353945;
        }
      }
      .ui__icon__wrapper {
        margin-right: 24px;
        .icon {
          background-color: #e6e8ec;
          width: 16px;
          height: 12px;
        }
      }
    }
    .active {
      button {
        display: flex;
        align-items: center;
        width: 149px;
        height: 41px;
        margin: 5px 0;
        font-size: 14px;
        font-weight: 500;
        background-color: #f4f5f6;
        .ui__icon__wrapper {
          .icon {
            background-color: #45b26b;
          }
        }
      }
    }
  }
  @media (max-width: 1600px) {
    .income__body {
      .picChart {
        .recharts-wrapper {
          &:after {
            font-size: 16px;
            transform: translate(-60%, -165%);
          }
        }
      }
    }
  }
  @media (max-width: 1440px) {
    .income__body {
      .picChart {
        .recharts-wrapper {
          .middleText {
            font-size: 14px;
          }
          &:after {
            font-size: 14px;
            transform: translate(-58%, -165%);
          }
        }
      }
    }
  }
`;

const BoxStye = styled.div`
  ${({ bg }) =>
    bg &&
    css`
      background: ${bg};
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    `}
`;

const renderActiveShape = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
  value,
}) => {
  if (!isString(value)) value = String(value);

  value = new Intl.NumberFormat("fr-FR", { currency: "UZS" }).format(value);
  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={"#353945"} className={"middleText"}>
        {/*{ isNull(balance) ? get(payload, "value", "") : balance }*/}
        {value} {get(payload, "currencyType", "")}
      </text>
      <Sector
        cornerRadius={8}
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

let resolutionSize = {
  1920: 1920,
  1800: 1800,
  1600: 1600,
  1440: 1440,
  1200: 1200,
};

const getWidthAndHeight = () => {
  let width = window.innerWidth;
  if (width <= resolutionSize[1800] && width > resolutionSize[1600]) return (resolutionSize[1800] * 21) / 100;
  else if (width <= resolutionSize[1600] && width > resolutionSize[1440]) return (resolutionSize[1600] * 20) / 100;
  else if (width <= resolutionSize[1440] && width > resolutionSize[1200]) return (resolutionSize[1440] * 20) / 100;
  return 400;
};

const getXandY = (type) => {
  let width = window.innerWidth;
  if (width <= resolutionSize[1800] && width > resolutionSize[1600])
    return type === "x" ? (resolutionSize[1800] * 10) / 100 : (resolutionSize[1800] * 9) / 100;
  else if (width <= resolutionSize[1600] && width > resolutionSize[1440]) return (resolutionSize[1600] * 9) / 100;
  else if (width <= resolutionSize[1440] && width > resolutionSize[1200]) return (resolutionSize[1440] * 9.4) / 100;
  return 190;
};

const getOuterAndInnerRadius = (type) => {
  let width = window.innerWidth;
  if (type === "inner") {
    if (width <= resolutionSize[1800] && width > resolutionSize[1600]) return (resolutionSize[1800] * 6.5) / 100;
    else if (width <= resolutionSize[1600] && width > resolutionSize[1440]) return (resolutionSize[1800] * 6) / 100;
    else if (width <= resolutionSize[1440] && width > resolutionSize[1200]) return (resolutionSize[1440] * 6.5) / 100;
    return (resolutionSize[1800] * 7) / 100;
  } else if (type === "outer") {
    if (width <= resolutionSize[1800] && width > resolutionSize[1600]) return (resolutionSize[1800] * 8) / 100;
    else if (width <= resolutionSize[1600] && width > resolutionSize[1440]) return (resolutionSize[1800] * 7.2) / 100;
    else if (width <= resolutionSize[1440] && width > resolutionSize[1200]) return (resolutionSize[1440] * 8) / 100;
    return (resolutionSize[1800] * 9) / 100;
  }
};

const IncomeComponent = ({
  t,
  refreshIncome = () => "",
  data,
  isFetched,
  title = "income",
  innerRadius = 140,
  currencyType,
  currency,
  setCurreny,
}) => {
  const [curdrop, setLandrop] = useState(false);

  currencyType = isEmpty(currencyType) ? [] : currencyType;

  let balance = get(data, "amount", " ");
  const [state, setState] = useState({
    activeIndex: null,
    showBalance: !!balance,
    showCurrencyType: "list",
  });

  if (!isString(balance)) balance = String(balance);
  balance = new Intl.NumberFormat("fr-FR", { currency: "UZS" }).format(balance);

  const onPieEnter = (e, index) => {
    // console.log("enter", e, index);
    setState((s) => ({ ...s, activeIndex: index, showBalance: false }));
  };

  const mouseLeaveHandling = (e, index) => setState((s) => ({ ...s, activeIndex: null, showBalance: true }));

  const changeCurrencies = (code) => {
    setCurreny(code);
    // refreshIncome(code);
  };
  return (
    <Style
      {...{
        balance: `${balance ? balance : ""} ${get(data, "currencyType", "")}`,
        showBalance: state.showBalance,
        isFetched,
        showCurrencyType: state.showCurrencyType,
      }}
      curdrop={curdrop}
      className={classNames("income", { [title]: title })}
    >
      <div className="income__head">
        <div className="income__head__left">{t(title) ?? title}</div>
        <div className="income__head__right">
          <Icon icon={"icon-refresh"} color={"#777E91"} mainClassName={"refreshIcon"} onClick={refreshIncome} />
          <div className="filter">
            Filter
            <Icon icon={"icon-filter"} color={"#777E91"} mainClassName={"filterIcon"} />
          </div>
          <Dropdown button={<Icon icon={"icon-more-dots"} color={"#777E91"} mainClassName={"dotsIcon"} />}>
            <div className="dropdown__menu">
              <Button className="drop_btn lan" onCLick={() => setLandrop((state) => !state)}>
                <Icon icon="icon-language" color="#777E90" />
                <span>{currencyType.find((item) => isEqual(item, currency))}</span>
                <Icon className="check" icon="icon-bottom-arrow" color="#353945" />
              </Button>
              <div className="lan_body">
                {isArray(currencyType) &&
                  currencyType.map((item) => (
                    <Button
                      key={item}
                      className={`lan_btn ${item === currency ? "active" : ""}`}
                      onCLick={() => {
                        changeCurrencies(item);
                        setLandrop(false);
                      }}
                    >
                      <Icon icon="icon-check2" />
                      {item}
                    </Button>
                  ))}
              </div>
            </div>
            {title === "Expenses" ? (
              <>
                <Button>title 2</Button>
                <Button>title 3</Button>
              </>
            ) : (
              <>
                <Button
                  onCLick={() =>
                    setState((s) => ({
                      ...s,
                      showCurrencyType: "card",
                    }))
                  }
                >
                  Card
                </Button>
                <Button
                  onCLick={() =>
                    setState((s) => ({
                      ...s,
                      showCurrencyType: "list",
                    }))
                  }
                >
                  List
                </Button>
              </>
            )}
          </Dropdown>
        </div>
      </div>
      <div className="income__body">
        <ResponsiveContainer className="picChart">
          <PieChart width={getWidthAndHeight()} height={getWidthAndHeight()}>
            <Pie
              cornerRadius={8}
              activeIndex={state.activeIndex}
              activeShape={(props) => renderActiveShape({ ...props, balance })}
              data={get(data, "data", [])}
              cx={getXandY("x")}
              cy={getXandY("y")}
              innerRadius={getOuterAndInnerRadius("inner")}
              outerRadius={getOuterAndInnerRadius("outer")}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="amount"
              onMouseEnter={onPieEnter}
              onMouseLeave={mouseLeaveHandling}
            >
              {get(data, "data", []).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={get(entry, `color`)} />
              ))}
              {/* <Cell key={`cell-${100}`} fill={"red"} /> */}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="income__footer">
        <Row className={"currency__row"}>
          {get(data, "data", []) &&
            get(data, "data", []).map((item) => (
              <Col xs={state.showCurrencyType === "list" ? 12 : 6} className={"currency__col"} key={get(item, "name", "")}>
                <div className={"currency"}>
                  {state.showCurrencyType === "card" ? (
                    <BoxStye className="currency__img" bg={`url(${get(item, "photoUrl", " ")})`} />
                  ) : (
                    <div className="currency__name">
                      <BoxStye className="currency__color" bg={get(item, "color", " ")} />
                      {get(item, "name", "")}
                    </div>
                  )}
                  <div className="currency__amount">
                    {new Intl.NumberFormat("fr-FR", {
                      currency: "UZS",
                    }).format(get(item, "amount", "")) + ` ${get(item, "currencyType", "")}`}
                  </div>
                </div>
              </Col>
            ))}
        </Row>
      </div>
    </Style>
  );
};
export default withTranslation("pdp")(memo(IncomeComponent));
