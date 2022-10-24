import React, { useState } from "react";
import styled from "styled-components";
import { useTable } from "react-table";
import { get } from "lodash";
import classNames from "classnames";
import { useHistory } from "react-router-dom";

import Icon from "../elements/icon";
const TableStyle = styled.div`
  table {
    border-spacing: 0 4px;
    border-collapse: separate;
    tr {
      cursor: pointer;
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      height: 50px;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #353945;
      &:first-child {
        border-radius: 6px 0 0 6px;
        padding-left: 20px;
      }
      &:last-child {
        border-radius: 0 6px 6px 0;
        padding-right: 20px;
      }
    }
    th {
      background: #353945;
      font-size: 18px;
      text-align: left;
      text-transform: uppercase;
      color: #fcfcfd;
    }
    td {
      background: #fcfcfd;
    }
  }
  .status {
    width: fit-content;
    background: #45b36b;
    padding: 6px 12px;
    border-radius: 5px;
    color: #fff;
    min-width: 100px;
    &.deleted {
      background: rgba(239, 70, 111, 1);
    }
  }
  .message {
    width: fit-content;
    background: #e6e8ec;
    border-radius: 6px;
    height: 28px;
    width: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    &.hasmessage {
      position: relative;
      background: yellow;

      .message-indicator {
        position: absolute;
        right: -4px;
        top: -3px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: green;
      }
    }
  }
  .customStatus {
    border-radius: 5px;
    min-width: 70px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 21px;
    text-align: center;
    color: #fcfcfd;
    padding: 4px 5px;
  }
  .order-checkbox {
    display: none;
  }
  tr {
    &:hover {
      td {
        .orderNumber {
          display: ${({ checkable }) => (checkable ? "none" : "block")};
        }
        .order-checkbox {
          display: ${({ checkable }) => (checkable ? "block" : "none")};
        }
      }
    }
  }
  .orderNumber {
    &.checked {
      display: none;
    }
  }
  .order-checkbox {
    input:checked {
      display: block !important;
      color: red;
    }
  }
`;

export default function Table({ columns, data, number = false, redirect = false, checkable = false }) {
  const history = useHistory();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });
  function getDate(format, date = new Date()) {
    const map = {
      mm: date.getMonth() + 1,
      dd: date.getDate(),
      yy: date.getFullYear().toString().slice(-2),
      yyyy: date.getFullYear(),
    };
    return format.replace(/mm|dd|yyyy|yy/gi, (matched) => map[matched]);
    return date.toLocaleDateString("en-US");
  }
  const getColumnContext = (cell, index, cells) => {
    if (get(cell, "date")) {
      return getDate(get(cell, "format"), new Date(get(cells, "value")));
    } else if (get(cell, "id") == "number" && number == true) {
      return index;
    } else if (get(cell, "actionStatus")) {
      return (
        <div
          className={classNames("status", {
            deleted: get(cells, "value") == true,
          })}
        >
          {get(cells, "value") ? "removed" : "added"}
        </div>
      );
    } else if (get(cell, "customStatus")) {
      return (
        <div className="customStatus" style={{ background: get(cells, "value.colorCode") }}>
          {get(cells, "value.name")}
        </div>
      );
    } else if (get(cell, "message")) {
      get(cells, "value") ? (
        <div className="message hasmessage">
          <Icon icon="icon-comment" />
          <span className="message-indicator"></span>
        </div>
      ) : (
        <div className="message ">
          <Icon icon="icon-comment" />
        </div>
      );
    } else {
      return cells.render("Cell");
    }
  };
  return (
    <TableStyle checkable={checkable} className="table-styled">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(
            (headerGroup) =>
              headerGroup.getHeaderGroupProps().key !== "headerGroup_0" && (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                  ))}
                </tr>
              )
          )}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr onClick={() => redirect && history.push(`/cost/${get(row, "orginal.id")}`)} {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  return (
                    <td
                      style={{
                        color:
                          get(cell, "column.opacity") && get(data[i], `${cell.column.pathOpacity}`)
                            ? "#000"
                            : get(cell, "column.color")
                            ? get(data[i], `${cell.column.pathColor}`)
                            : "#000",
                        textDecoration:
                          get(cell, "column.opacity") && get(data[i], `${cell.column.pathOpacity}`) && "line-through",
                      }}
                      {...cell.getCellProps()}
                    >
                      {getColumnContext(get(cell, "column"), i, cell)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableStyle>
  );
}
