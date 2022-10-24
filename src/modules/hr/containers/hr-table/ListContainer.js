import React, { memo } from "react";
import DataGrid from "../../../../containers/DataGrid";
import EmployeeScheme from "../../../../schema/EmployeeScheme";
import Button from "../../../../components/elements/button";
import { useHistory } from "react-router-dom";

const AddButton = () => {
  const history = useHistory();
  return (
    <Button className={"addBtn"} success onCLick={() => history.push("/hrm/company/employee/add")}>
      Add
    </Button>
  );
};

const ListContainer = ({ history, ...rest }) => {
  return (
    <>
      <DataGrid
        url={{
          ids: "staff/v1/employee/generic-view",
          data: "staff/v1/employee/get-data",
          viewOne: "staff/v1/employee/get-view-by-id",
          viewList: "staff/v1/employee/get-view-types",
          viewUpdate: "staff/v1/view/update-view",
          viewAdd: "staff/v1/view/add-view",
          viewDelete: "staff/v1/view/delete-view",
          viewDuplicate: "staff/v1/view/duplicate-view",
          addCustomField: "staff/v1/custom-field/add-custom-field",
          editCustomField: "staff/v1/custom-field-value/add-custom-field-value",
        }}
        createButtonConfig={{
          Component: AddButton,
        }}
        entityName={"employee"}
        scheme={EmployeeScheme}
        redirectUrl={{
          view: "/hrm/company/employees/",
          itemOpen: "/hrm/company/employee/",
          itemAdd: "/hrm/company/employee/add",
        }}
      />
    </>
  );
};

export default memo(ListContainer);
