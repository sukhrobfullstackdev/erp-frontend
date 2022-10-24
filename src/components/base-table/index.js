import React from "react";
import styled from "styled-components";
import Table, { AutoResizer, Column } from "react-base-table";
import "react-base-table/styles.css";

const Styled = styled.div`
  width: 100%;
  outline: 1px solid red;
  height: 150px;
`;
const BaseTable = ({ ...rest }) => {
  return (
    <Styled {...rest}>
      <AutoResizer>
        {({ width, height = 500 }) => (
          <Table
            data={[
              { text: 1, title: 2 },
              { text: 3, title: 4 },
              { text: 3, title: 4 },
            ]}
            width={width}
            height={height}
          >
            <Column resizable={true} sortable={true} key="col0" dataKey="text" width={200} />
            <Column key="col1" dataKey="title" width={100} />
          </Table>
        )}
      </AutoResizer>
    </Styled>
  );
};

export default BaseTable;
