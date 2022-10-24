import React from "react";
import DynamicScheme from "schema/DynamicScheme";
import DataGrid from "../../../../containers/DataGrid";

const DebtorStudentsContainer = () => {
  return (
    <>
      <DataGrid
        url={{
          ids: "finance/v1/debtor-students-view/generic-view",
          data: "finance/v1/debtor-students-view/data",
          viewOne: "finance/v1/debtor-students-view/view-by-id",
          viewList: "finance/v1/debtor-students-view/view-types",
          viewUpdate: "finance/v1/view/update-view",
          // viewAdd: "sales/v1/view/add-view",
          // viewDelete: "sales/v1/view/delete-view",
          // viewDuplicate: "sales/v1/view/duplicate-view",
          // addCustomField: "sales/v1/custom-field/add-custom-field",
          // editCustomField: "sales/v1/custom-field/edit-custom-field",
          // addStatus: "sales/v1/lead-status/add-lead-status",
          addOrEditCell: "sales/v1/lead-invoice-view/edit-row-data",
        }}
        entityName={"debtor-students"}
        scheme={DynamicScheme("debtor-students")}
        redirectUrl={{
          view: "/finance/finance/debtor-students/",
          itemOpen: "/finance/finance/debtor-students-one/",
          // itemAdd: "/finance/finance/debtor-students",
          // itemEdit: "/finance/finance/debtor-students",
        }}
      />
    </>
  );
};

export default DebtorStudentsContainer;
