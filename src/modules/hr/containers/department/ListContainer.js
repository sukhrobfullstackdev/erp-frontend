import React from "react";
import { get, isEmpty } from "lodash";
import GridView from "../../../../containers/GridView/GridView";
import FormDemo from "../../../../containers/Form/form-demo";
import { Col, Row } from "react-grid-system";
import Field from "../../../../containers/Form/field";
import Flex from "../../../../components/elements/flex";
import Button from "../../../../components/elements/button";
import DepartmentScheme from "../../../../schema/DepartmentScheme";
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
            <Field defaultValue={get(item, "active")} type={"checkbox"} inBtn name={"active"} label={t("active") ?? "Active"} />
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
          list: "staff/v1/department/get-all",
          one: "staff/v1/department/get/",
          add: "staff/v1/department/add",
          update: "staff/v1/department/edit",
          delete: "staff/v1/department/delete",
        }}
        storeName="department-list"
        entityName="department"
        scheme={DepartmentScheme}
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
                width: 60,
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
        modalTitle={t("department") ?? "DEPARTMENT"}
      />
    </>
  );
};

export default withTranslation("pdp")(ListContainer);
