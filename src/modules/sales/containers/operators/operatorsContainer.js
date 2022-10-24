import React, { memo } from "react";
import DataGrid from "../../../../containers/DataGrid";
import OperatorsScheme from "../../../../schema/OperatorsScheme";

const OperatorsContainer = () => {
  return (
    <>
      <DataGrid
        url={{
          ids: "call-center/v1/operator-view/generic-view",
          data: "call-center/v1/operator-view/data",
          viewOne: "call-center/v1/operator-view/view-by-id",
          viewList: "call-center/v1/operator-view/view-types",
          viewUpdate: "call-center/v1/view/update-view",
          viewAdd: "call-center/v1/view/add-view",
          viewDelete: "call-center/v1/view/delete-view",
          viewDuplicate: "call-center/v1/view/duplicate-view",
          addCustomField: "call-center/v1/custom-field/add-custom-field",
          editCustomField: "call-center/v1/custom-field/edit-custom-field",
          addStatus: "call-center/v1/view/add-lead-status",
          addOrEditCell: "call-center/v1/operator-view/edit-row-data",
        }}
        entityName={"operators"}
        scheme={OperatorsScheme}
        redirectUrl={{
          view: "/sales/sales/operators/",
          itemOpen: "/sales/sales/operators/",
        }}
      />
    </>
  );
};

export default memo(OperatorsContainer);
