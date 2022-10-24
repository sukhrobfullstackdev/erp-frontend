import React from "react";
import LeadsInvoiceScheme from "../../../../schema/LeadInvoiceScheme";
import DataGrid from "../../../../containers/DataGrid";

const LeadInvoiceContainer = () => {
  return (
    <>
      <DataGrid
        url={{
          ids: "sales/v1/lead-invoice-view/generic-view",
          data: "sales/v1/lead-invoice-view/data",
          viewOne: "sales/v1/lead-invoice-view/view-by-id",
          viewList: "sales/v1/lead-invoice-view/view-types",
          // viewUpdate: "sales/v1/lead-invoice-view/update-view",
          // viewAdd: "sales/v1/view/add-view",
          // viewDelete: "sales/v1/view/delete-view",
          // viewDuplicate: "sales/v1/view/duplicate-view",
          // addCustomField: "sales/v1/custom-field/add-custom-field",
          // editCustomField: "sales/v1/custom-field/edit-custom-field",
          // addStatus: "sales/v1/lead-status/add-lead-status",
          addOrEditCell: "sales/v1/lead-invoice-view/edit-row-data",
        }}
        entityName={"lead-invoice"}
        scheme={LeadsInvoiceScheme}
        redirectUrl={{
          view: "/sales/sales/lead-invoice/",
          itemOpen: "/sales/sales/lead-invoice-one/",
          // itemAdd: "/sales/sales/lead/add",
          // itemEdit: "/sales/sales/lead/edit/",
        }}
      />
    </>
  );
};

export default LeadInvoiceContainer;
