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

export default function InterestedCoursesHistory({ data }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "a",
        columns: [
          {
            Header: "NAME",
            accessor: "course.name",
            color: true,
            pathColor: "course.colorCode",
            opacity: true,
            pathOpacity: "course.deleted",
          },
          {
            Header: "ACTION",
            accessor: "deleted",
            actionStatus: true,
          },
          {
            Header: "CREATED DATE",
            accessor: "modifiedDate",
            date: true,
            format: "dd/mm/yyyy",
          },
          {
            Header: "MODIFIED BY",
            accessor: "modifiedUserFirstName",
          },
        ],
      },
    ],
    []
  );
  return (
    <Style>
      <Collapse className="statusHistoryCollapse collapse" title="Interested Courses history">
        <div className="tableWrapper">
          <Table data={data} columns={columns} />
        </div>
      </Collapse>
    </Style>
  );
}
