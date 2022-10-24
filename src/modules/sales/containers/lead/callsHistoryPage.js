import Icon from "components/elements/icon";
import { get } from "lodash";
import React from "react";
import CustomPlayer from "../../../../components/customPlayer/customPlayer";
import GridView from "../../../../containers/GridView/GridView";
import CallsScheme from "../../../../schema/CallsScheme";

const CallsHistoryPage = ({ match }) => {
  const id = match.params.id;

  return (
    <div>
      <GridView
        url={{
          list: `call-center/v1/call/calls-by-lead-id/${id}`,
        }}
        storeName="calls"
        entityName="calls"
        scheme={CallsScheme}
        hideHeader
        columns={[
          {
            Header: "Name",
            columns: [
              {
                Header: "#",
                accessor: "number",
                width: 100,
              },
              {
                Header: "CALL TYPE",
                accessor: "type",
                customColumn: ({ cell: { value } }) => (
                  <>
                    {value}{" "}
                    <Icon
                      mainClassName={"callType"}
                      icon={value === "INCOMING" ? "icon-incomeCall" : "icon-outcomeCall"}
                      color={value === "INCOMING" ? "#45B36B" : "#EF466F"}
                    />
                  </>
                ),
              },
              {
                Header: "PHONE",
                accessor: "phoneNumber",
              },
              {
                Header: "OPERATOR NUMBER",
                accessor: "operatorNumber",
              },
              {
                Header: "OPERATOR FIRST NAME",
                accessor: "operatorFirstName",
              },
              {
                Header: "OPERATOR LAST NAME",
                accessor: "operatorLastName",
              },
              {
                Header: "CALL STATUS",
                accessor: "status",
                customColumn: ({ cell: { value } }) => {
                  return (
                    <div
                      style={{
                        color: value === "Answered" ? "#45B36B" : value === "No answered" && "#EF466F",
                      }}
                    >
                      {value}
                    </div>
                  );
                },
              },
              {
                Header: "DURATION",
                accessor: "duration",
              },
              {
                Header: "CLIENT STATUS",
                accessor: "leadStatus",
                customColumn: ({ cell: { value } }) => {
                  return (
                    <div
                      style={{
                        color: get(value, "colorCode", ""),
                      }}
                    >
                      {get(value, "name", "-")}
                    </div>
                  );
                },
              },
              {
                Header: "RECORD",
                accessor: "record",
                customColumn: ({ cell: { value } }) => {
                  return <CustomPlayer url={`${get(value, "url", "")}?id=${get(value, "id", "")}`} />;
                },
              },
            ],
          },
        ]}
      />
      )
    </div>
  );
};

export default CallsHistoryPage;
