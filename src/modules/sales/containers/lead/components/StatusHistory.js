import React from "react";
import styled from "styled-components";
import Collapse from "../../../../../components/elements/collapse";
import Table from "../../../../../components/table/table";

const Style = styled.div`
  .statusHistoryCollapse {
    &.active {
    }
  }
`;

export default function StatusHistory({ data }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "a",
        columns: [
          {
            Header: "NAME",
            accessor: "afterStatus",
            color: true,
            pathColor: "afterStatusColorCode",
            opacity: true,
            pathOpacity: "afterStatusDeleted",
          },
          {
            Header: "CREATED DATE",
            accessor: "modifiedDate",
            date: true,
            format: "dd/mm/yyyy",
          },
          {
            Header: "MODIFIED BY",
            accessor: "modifiedByFirstName",
          },
        ],
      },
    ],
    []
  );
  return (
    <Style>
      <Collapse className="statusHistoryCollapse collapse" title="Status history">
        <div className="tableWrapper">
          <Table data={data} columns={columns} />
        </div>
      </Collapse>
    </Style>
  );
}
