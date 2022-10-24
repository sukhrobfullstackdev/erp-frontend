import React from "react";
import { get, isEmpty } from "lodash";
import GridView from "../../../../containers/GridView/GridView";
import PrivilegeTypeScheme from "../../../../schema/PrivilegeTypeScheme";
import FormDemo from "../../../../containers/Form/form-demo";
import { Col, Row } from "react-grid-system";
import Field from "../../../../containers/Form/field";
import Flex from "../../../../components/elements/flex";
import Button from "../../../../components/elements/button";
import Icon from "../../../../components/elements/icon";
import { withTranslation } from "react-i18next";

const ModalBody = ({ addOrEdit, cancel, item, btnText = "Add", openModal, t }) => {
  let temp = {};
  if (isEmpty(item) && openModal) temp = { resetData: { name: "", active: false } };

  return (
    <FormDemo
      formRequest={(data) => {
        addOrEdit(get(item, "id", null), data);
      }}
      {...temp}
    >
      <Row>
        <Col xs={12} className={"mb-15"}>
          <Field type={"input"} defaultValue={get(item, "name")} name={"name"} label={t("type_name") ?? "TYPE NAME"} params={{ required: true }} />
        </Col>
        <Col xs={12}>
          <Flex justify={"flex-end"} align={"center"}>
            <Field
              defaultValue={get(item, "active")}
              type={"checkbox"}
              inBtn
              name={"active"}
              label={
                <>
                  {" "}
                  {t("active") ?? "Active"} <Icon icon="icon-question" className="questionIcon" />
                </>
              }
            />
            <Button outlineDanger className="cancelBtn" onCLick={cancel}>
              {t("cancel") ?? "Cancel"}
            </Button>
            <Button success className="addBtn" type={"submit"}>
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
          list: "staff/v1/privilege-type/get-all",
          one: "staff/v1/privilege-type/get/",
          add: "staff/v1/privilege-type/add",
          update: "staff/v1/privilege-type/edit",
          delete: "staff/v1/privilege-type/delete",
        }}
        storeName="privilege-type-list"
        entityName="privilege-type"
        scheme={PrivilegeTypeScheme}
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
        modalTitle={t("privilege") ?? "PRIVILEGE"}
      />
    </>
  );
};

export default withTranslation("pdp")(ListContainer);
