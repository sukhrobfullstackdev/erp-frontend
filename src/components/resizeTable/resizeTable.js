import React from "react";
import styled, { css } from "styled-components";
import { Table } from "rsuite";
import { isArray } from "lodash";

const TableStyle = styled.div`
  .rs-table {
    /* height: ${({ height, column }) => (height ? height : column.length * (40 + 6))}px; */
    max-height: 91vh;
    &-row {
      margin-bottom: 6px;
    }
  }
`;

export default function ResizeTable({ data = [], column = [], number = false, height = 0 }) {
  // let data = data.filter((v, i) => i < 8);
  return (
    <TableStyle {...{ height, column }}>
      <Table height={height ? height : data.length * (40 + 6)} data={data}>
        {isArray(column) &&
          column.map((val, ind) => (
            <>
              {number ? (
                <Table.Column height={300} key={ind + new Date().getTime() * 2} width={50} align="center" resizable>
                  <Table.HeaderCell>#</Table.HeaderCell>
                  <Table.Cell dataKey="id" />
                </Table.Column>
              ) : (
                <Table.Column rowSpan={() => 10} minWidth={100} sortable key={ind + new Date().getTime()} width={200} resizable>
                  <Table.HeaderCell>{val.header}</Table.HeaderCell>
                  <Table.Cell dataKey={val.dataKey} />
                </Table.Column>
              )}
            </>
          ))}
      </Table>
    </TableStyle>
  );
}
