import React, { memo, useMemo } from "react";
import styled from "styled-components";
import { get, isArray } from "lodash";
import { withTranslation } from "react-i18next";
import CustomTable from "../../../../components/customTable";
import Tabs from "../../../../components/tabs";
import Icon from "../../../../components/elements/icon";
import Button from "../../../../components/elements/button";
import Dropdown from "../../../../components/elements/dropDown/dropdown";

const Style = styled.div`
  background: #ffffff;
  box-shadow: 0 0 10px 2px rgba(12, 12, 12, 0.03);
  border-radius: 18px;
  padding: 30px 20px 20px;
  margin-top: 24px;
  position: relative;

  .dropDown {
    position: absolute;
    top: 38px;
    right: 30px;

    &__button {
      width: 32px;
      height: 32px;
      background: #fcfcfd;
      border: 1px solid #f4f5f6;
      box-sizing: border-box;
      border-radius: 6px;
    }
  }

  .title {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #777e91;
  }

  .tabs {
    &__list {
      background: none;
      margin-bottom: 30px;

      &__right {
        background: #fcfcfd;
        border: 1px solid #f4f5f6;
        border-radius: 6px;
        margin-right: 52px;
        height: 32px;
        padding: 3px 0;
      }

      &__tab {
        height: 100%;
        border-radius: 5px;
        font-weight: 500;
        font-size: 12px;
        line-height: 14px;
        margin: 0 3px;
        padding: 3px 15px;

        &.active {
          color: #fcfcfd;
          background: #45b36b;
        }
      }
    }
  }
`;

const ExpensesPropositionComponent = ({ data, t }) => {
  let columns = useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "#",
            accessor: "number",
            width: 100,
          },
          {
            Header: "Expense",
            accessor: "expenseType",
          },

          {
            Header: "Section",
            accessor: "department",
          },
          {
            Header: "Price",
            accessor: "price",
            customColumn: ({ cell: { value } }) => {
              value = new Intl.NumberFormat("fr-FR", {
                currency: "UZS",
              }).format(value);
              return value;
            },
          },

          {
            Header: "Date",
            accessor: "date",
            date: true,
            format: "dd / mm / yyyy",
          },
          {
            Header: "Deadline",
            accessor: "deadline",
            date: true,
            format: "dd / mm / yyyy",
          },
        ],
      },
    ],
    []
  );

  let rightList = isArray(data) ? data.map((item) => get(item, "status", "")) : [];
  let rightContent = isArray(data)
    ? data.map((item) => <CustomTable columns={columns} data={get(item, "expensePropositions", [])} />)
    : [];
  return (
    <Style>
      <Tabs
        leftContent={[]}
        rightContent={rightContent}
        leftList={[]}
        rightList={rightList}
        dataList={"right"}
        disabledLeft
        leftListChild={<div className={"title"}>{t("expenses_proposition") ?? "Expenses Proposition"}</div>}
      />
      <Dropdown button={<Icon icon={"icon-more-dots"} color={"#777E91"} mainClassName={"dotsIcon"} />}>
        <Button>title 1</Button>
        <Button>title 2</Button>
        <Button>title 3</Button>
      </Dropdown>
    </Style>
  );
};

export default withTranslation("pdp")(memo(ExpensesPropositionComponent));
