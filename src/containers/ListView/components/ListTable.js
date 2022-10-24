import React from "react";
import styled from "styled-components";
import { isArray } from "lodash";

const StyledListTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    tr {
      margin-bottom: 20px;
      display: flex;
      width: 100%;
    }
  }

  tbody {
    tr {
      display: flex;
      width: 100%;
      margin-bottom: 4px;
      border-radius: 8px;
    }
  }

  th,
  .th {
    background-color: #353945;
    font-size: 20px;
    font-weight: 400;
    display: flex;
    color: #fff;

    &:first-child {
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }

    &:last-child {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }

  td {
    background-color: #fcfcfd;
    font-size: 20px;
    font-weight: 400;
    color: #353945 !important;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    height: 60px;

    &:first-child {
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }

    &:last-child {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }

  td,
  th,
  .th {
    padding: 10px 24px;
    display: flex;
    width: ${({ columns }) => 100 / columns?.length + "%"};

    &:first-child {
      justify-content: flex-start;
    }

    &:last-child {
      justify-content: flex-end;
    }
  }
`;
const ListTable = ({ columns = [], children, widthoutTh, ...rest }) => {
  return (
    <StyledListTable columns={columns} {...rest}>
      {!widthoutTh && (
        <thead>
          <tr>{columns && isArray(columns) && columns.map((column, index) => <th key={index}>{column}</th>)}</tr>
        </thead>
      )}

      <tbody>
        {widthoutTh && (
          <tr>
            {columns &&
              isArray(columns) &&
              columns.map((column, index) => (
                <td className="th" key={index}>
                  {column}
                </td>
              ))}
          </tr>
        )}
        {children}
      </tbody>
    </StyledListTable>
  );
};

export default ListTable;
