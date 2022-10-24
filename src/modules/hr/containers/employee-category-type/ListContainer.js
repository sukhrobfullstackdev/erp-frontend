import React from "react";
import { get, isEmpty } from "lodash";
import GridView from "../../../../containers/GridView/GridView";
import FormDemo from "../../../../containers/Form/form-demo";
import { Col, Row } from "react-grid-system";
import Field from "../../../../containers/Form/field";
import Flex from "../../../../components/elements/flex";
import Button from "../../../../components/elements/button";
import EmployeeCategoryTypeScheme from "../../../../schema/EmployeeCategoryTypeScheme";
import { withTranslation } from "react-i18next";

const ModalBody = ({ addOrEdit, cancel, item, btnText = "Add", openModal, t }) => {
  let temp = {};
  if (isEmpty(item) && openModal) temp = { resetData: { name: "", active: false } };

  return (
    <FormDemo
      {...temp}
      formRequest={(data) => {
        addOrEdit(get(item, "id", null), data);
      }}
    >
      <Row>
        <Col xs={12} className={"mb-20"}>
          <Field type={"input"} defaultValue={get(item, "name")} name={"name"} label={t("type_name") ?? "TYPE NAME"} params={{ required: true }} />
        </Col>
        <Col xs={12}>
          <Flex justify={"flex-end"} align={"center"}>
            <Field defaultValue={get(item, "active")} inBtn type={"checkbox"} name={"active"} label={t("active") ?? "Active"} />
            <Button className="cancelBtn" outlineDanger onCLick={cancel}>
              {t("cancel") ?? "Cancel"}
            </Button>
            <Button success type={"submit"}>
              {btnText}
            </Button>
          </Flex>
        </Col>
      </Row>
    </FormDemo>
  );
};

const ListContainer = ({ t, ...rest }) => {
  return (
    <>
      <GridView
        url={{
          list: "staff/v1/employee-category-type/get-all",
          one: "staff/v1/employee-category-type/get/",
          add: "staff/v1/employee-category-type/add",
          update: "staff/v1/employee-category-type/edit",
          delete: "staff/v1/employee-category-type/delete",
        }}
        storeName="employee-category-type-list"
        entityName="employee-category-type"
        scheme={EmployeeCategoryTypeScheme}
        params={{}}
        disabledOnClose
        hasModal={{ create: true, update: true, delete: true }}
        ModalBody={ModalBody}
        dataForModal={{
          t,
        }}
        searchFields={[
          {
            name: "Title",
            id: "1",
            type: "name",
            customField: "name",
            searchable: true,
          },
        ]}
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
                Header: `${t("title") ?? "Title"}`,
                accessor: "name",
              },

              {
                Header: `${t("status") ?? "Status"}`,
                accessor: "active",
                status: "true",
                width: 30,
              },
              {
                Header: `${t("action") ?? "Action"}`,
                accessor: "action",
                width: 30,
              },
            ],
          },
        ]}
        row={["id", "number", "name"]}
        modalTitle={t("employee_category_type") ?? "EMPLOYEE CATEGORY TYPE"}
      />
    </>
  );
};

export default withTranslation("pdp")(ListContainer);
