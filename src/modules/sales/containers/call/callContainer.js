import React, { memo } from "react";
import DataGrid from "../../../../containers/DataGrid";
import CallsScheme from "../../../../schema/CallsScheme";

const CallContainer = () => {
  return (
    <>
      <DataGrid
        url={{
          ids: "call-center/v1/call-view/generic-view",
          data: "call-center/v1/call-view/data",
          viewOne: "call-center/v1/call-view/view-by-id",
          viewList: "call-center/v1/call-view/view-types",
          viewUpdate: "call-center/v1/view/update-view",
          viewAdd: "call-center/v1/view/add-view",
          viewDelete: "call-center/v1/view/delete-view",
          viewDuplicate: "call-center/v1/view/duplicate-view",
          addCustomField: "call-center/v1/custom-field/add-custom-field",
          editCustomField: "call-center/v1/custom-field/edit-custom-field",
          addStatus: "call-center/v1/view/add-lead-status",
          addOrEditCell: "call-center/v1/call-view/edit-row-data",
        }}
        entityName={"calls"}
        scheme={CallsScheme}
        redirectUrl={{
          view: "/sales/sales/calls/",
          itemOpen: "/sales/sales/calls/",
        }}
      />
    </>
  );
};

export default memo(CallContainer);
