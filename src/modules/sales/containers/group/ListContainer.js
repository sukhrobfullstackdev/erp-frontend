import React, { memo } from "react";
import { withTranslation } from "react-i18next";
import GroupAddAndEditModal from "./GroupAddAndEditModal";
import DataGrid from "../../../../containers/DataGrid";
import GroupScheme from "../../../../schema/GroupScheme";

const GroupList = ({ t }) => {
  return (
    <>
      <DataGrid
        url={{
          ids: "education/v1/group-view/generic-view",
          data: "education/v1/group-view/data",
          viewOne: "education/v1/group-view/view-by-id",
          viewList: "education/v1/group-view/view-types",
          viewUpdate: "education/v1/view/update-view",
          viewAdd: "staff/v1/view/add-view",
          viewDelete: "staff/v1/view/delete-view",
          viewDuplicate: "staff/v1/view/duplicate-view",
          addCustomField: "staff/v1/custom-field/add-custom-field",
          addCustomFieldValue: "staff/v1/custom-field-value/add-custom-field-value",
          addOrEditCell: "education/v1/lead-view/edit-row-data",
        }}
        entityName={"group"}
        scheme={GroupScheme}
        redirectUrl={{
          view: "/sales/sales/group/",
          itemOpen: "/sales/sales/group-one/",
        }}
        createButtonConfig={{
          Component: GroupAddAndEditModal,
        }}
      />
    </>
  );
};

export default withTranslation("pdp")(memo(GroupList));
