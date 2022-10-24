import React from "react";
import styled from "styled-components";
import { get } from "lodash";
import { useBlockLayout, useTable } from "react-table";
import { useSticky } from "react-table-sticky";
import Field from "../../containers/Form/field";

const StickyTableStyle = styled.div`
  width: 1710px;
  max-width: 100%;
  overflow: auto;

  .table {
    border: 1px solid #d8d9df;

    &::-webkit-scrollbar {
      width: 11px;
      height: 11px;
    }
    &::-webkit-scrollbar-track {
      background: #f4f5f6;
      border-radius: 3px;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(119, 126, 144, 1);
      border-radius: 2px;
      transition: 0.2s;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: rgba(119, 126, 144, 0.8);
    }

    &.sticky {
      overflow: scroll;
      overflow-y: hidden;
    }

    &-data {
      background-color: #f4f5f6;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      color: #353945;
      display: flex !important;
      align-items: center !important;
      border-bottom: 1px solid #d8d9df;
      border-right: 1px solid #d8d9df;
      .rc-checkbox {
        margin: 0 18.5px;
      }
      &:first-child {
        height: 60px;
        font-weight: 600;
        font-size: 18px;
        line-height: 27px;
        background: #fcfcfd !important;
        .rc-checkbox {
          margin: 0 20.5px 0 32.5px;
        }
      }
      &:nth-child(2) {
        height: 60px;
        background: #f4f5f6;
        font-weight: 500;
        font-size: 18px;
        line-height: 27px;
        text-align: center;
        color: #353945;
        .rc-checkbox {
          margin: 0 11.5px 0 16.5px;
        }
      }
      &.active {
        background: #fcfcfd;
      }
    }
  }
`;

const StickyTable = ({ data = [], columns = [], className = "", ...rest }) => {
  const { getTableProps, getTableBodyProps, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useBlockLayout,
    useSticky
  );
  return (
    <StickyTableStyle className={className}>
      <table {...getTableProps()} className="table sticky w-100 overflow-auto">
        <tbody {...getTableBodyProps()} className="body">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="table-row">
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="table-data">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </StickyTableStyle>
  );
};

export default StickyTable;
