import React, { memo } from "react";
import { withTranslation } from "react-i18next";
import { get, head } from "lodash";
import ApiActions from "../../../../services/api/actions";

import GridView from "../../../../containers/GridView/GridView";
import TimeSheetScheme from "../../../../schema/TimeSheetScheme";
import { connect } from "react-redux";

const TimeSheetListContainer = ({ t, getId, history, ...rest }) => {
  const getIdAndRedirect = (id) => {
    getId({
      id,
      cb: {
        success: (res) => {
          history.push(`/hrm/company/timesheet/view/${get(head(get(res, "data.viewTypes")), "defaultView.id")}`);
        },
      },
    });
  };
  return (
    <>
      <GridView
        url={{
          list: "staff/v1/time-sheet/all",
        }}
        storeName="timeSheet"
        entityName="timeSheet"
        scheme={TimeSheetScheme}
        params={{}}
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
                Header: `${t("mount") ?? "MOUNT"}`,
                accessor: "month",
              },
              {
                Header: `${t("work_days") ?? "WORK DAYS"}`,
                accessor: "workDays",
              },
              {
                Header: `${t("worked_days") ?? "WORKED DAYS"}`,
                accessor: "workedDays",
              },
              {
                Header: `${t("employee_count") ?? "EMPLOYEE COUNT"}`,
                accessor: "employeeCount",
              },
              {
                Header: `${t("worked_hours") ?? "WORKED HOURS"}`,
                accessor: "workedHours",
              },
              {
                Header: `${t("work_hours") ?? "WORK HOURS"}`,
                accessor: "workHours",
              },
            ],
            clickRow: (row) => {
              getIdAndRedirect(get(row, "id", ""));
            },
          },
        ]}
      />
    </>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    getId: ({ page, id, config, cb }) => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          method: "get",

          url: `staff/v1/time-sheet/get-view-types/${id}`,
          config,
          cb,
          // notSave:true
        },
      });
    },
  };
};
export default withTranslation("pdp")(memo(connect(null, mapDispatchToProps)(TimeSheetListContainer)));
