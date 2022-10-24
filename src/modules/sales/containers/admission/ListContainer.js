import React from "react";
import { connect } from "react-redux";
import { get } from "lodash";
import { withTranslation } from "react-i18next";
import ApiActions from "../../../../services/api/actions";
import InsideModal from "./AdmissionAddAndEditModal";
import AdmissionScheme from "../../../../schema/AdmissionScheme";
import DataGrid from "../../../../containers/DataGrid";

const ListContainer = () => {
  return (
    <>
      <DataGrid
        url={{
          ids: "education/v1/admission-view/generic-view",
          data: "education/v1/admission-view/data",
          viewOne: "education/v1/admission-view/view-by-id",
          viewList: "education/v1/admission-view/view-types",
          viewUpdate: "education/v1/view/update-view",
          viewAdd: "education/v1/view/add-view",
          viewDelete: "education/v1/view/delete-view",
          viewDuplicate: "education/v1/view/update-view/duplicate-view",
          addCustomField: "staff/v1/custom-field/add-custom-field",
          addCustomFieldValue: "staff/v1/custom-field-value/add-custom-field-value",
          addOrEditCell: "education/v1/admission-view/edit-row-data",
        }}
        entityName={"admission"}
        scheme={AdmissionScheme}
        redirectUrl={{
          view: "/sales/sales/admission/",
          itemOpen: "/sales/sales/admission-one/",
        }}
        createButtonConfig={{
          Component: InsideModal,
        }}
      />
    </>
  );
};

export default withTranslation("pdp")(ListContainer);
