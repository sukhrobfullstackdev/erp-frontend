import React from "react";
import styled from "styled-components";
import ComponentTable from "../../../containers/GridView/components/ComponentTable";

const TableStyle = styled.div``;

export default function Table({ data, columns }) {
  return (
    <TableStyle>
      <ComponentTable data={data} columns={columns} />
    </TableStyle>
  );
}
