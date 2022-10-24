import React, { memo } from "react";
import { get } from "lodash";
import DataGrid from "../../../../containers/DataGrid";
import TimeSheetScheme from "../../../../schema/TimeSheetScheme";

const TimeSheetViewContainer = ({ match, ...rest }) => {
  return (
    <>
      <DataGrid
        url={{
          data: "staff/v1/time-sheet/get-data",
          ids: "staff/v1/time-sheet/generic-view",
          viewOne: "staff/v1/time-sheet/get-view-by-id",
          viewList: `staff/v1/time-sheet/get-view-types/${get(match, "params.id", "")}`,

          // viewUpdate:'staff/v1/view/update-view',
          // viewAdd:'staff/v1/view/add-view',
          // viewDelete:'staff/v1/view/delete-view',
          // viewDuplicate:'staff/v1/view/duplicate-view',
          // addCustomField:'staff/v1/custom-field/add-custom-field',
          // editCustomField:'staff/v1/custom-field-value/add-custom-field-value'
        }}
        entityName={"timeSheet"}
        scheme={TimeSheetScheme}
        redirectUrl={{
          view: "/hrm/company/timesheet/view/",
          itemOpen: "/hrm/company/timesheet/view/",
        }}
      />
    </>
  );
};

export default memo(TimeSheetViewContainer);
