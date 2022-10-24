import React from "react";
import LeadsScheme from "../../../../schema/LeadsScheme";
import DataGrid from "../../../../containers/DataGrid";
import LeadCard from "../../../../components/lead/lead-card";

const LeadsContainer = () => {
  return (
    <>
      <DataGrid
        url={{
          ids: "sales/v1/lead-view/generic-view",
          data: "sales/v1/lead-view/data",
          viewOne: "sales/v1/lead-view/view-by-id",
          viewList: "sales/v1/lead-view/view-types",
          viewUpdate: "sales/v1/view/update-view",
          viewAdd: "sales/v1/view/add-view",
          viewDelete: "sales/v1/view/delete-view",
          viewDuplicate: "sales/v1/view/duplicate-view",
          addCustomField: "sales/v1/custom-field/add-custom-field",
          editCustomField: "sales/v1/custom-field/edit-custom-field",
          addStatus: "sales/v1/lead-status/add-lead-status",
          addOrEditCell: "sales/v1/lead-view/edit-row-data",
        }}
        entityName={"lead"}
        scheme={LeadsScheme}
        BoardItemComponent={LeadCard}
        redirectUrl={{
          view: "/sales/sales/leads/",
          itemOpen: "/sales/sales/lead/view/",
          itemAdd: "/sales/sales/lead/add",
          itemEdit: "/sales/sales/lead/edit/",
        }}
      />
    </>
  );
};

export default LeadsContainer;
