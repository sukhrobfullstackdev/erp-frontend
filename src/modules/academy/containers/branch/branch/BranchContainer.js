import React, { memo } from "react";
import { get } from "lodash";
import { withTranslation } from "react-i18next";
import { Col, Row } from "react-grid-system";
import FormDemo from "../../../../../containers/Form/form-demo";
import Field from "../../../../../containers/Form/field";
import Flex from "../../../../../components/elements/flex";
import Button from "../../../../../components/elements/button";
import GridView from "../../../../../containers/GridView/GridView";
import Icon from "../../../../../components/elements/icon";
import BranchScheme from "../../../../../schema/BranchScheme";

const ModalBody = memo(({ addOrEdit, cancel, item, btnText = "Add", t }) => {
  return (
    <FormDemo
      formRequest={(data) => {
        addOrEdit(get(item, "id", null), data);
      }}
    >
      <Row>
        <Col xs={12} className={"mb-15"}>
          <Field
            type={"input"}
            defaultValue={get(item, "name", "")}
            name={"name"}
            label={t("name") ?? "NAME"}
            params={{ required: true }}
          />
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
                  {t("active") ?? "Active"} <Icon icon="icon-question" className="questionIcon" />
                </>
              }
            />
            <Field
              defaultValue={get(item, "main")}
              type={"checkbox"}
              inBtn
              name={"main"}
              label={
                <>
                  {t("main") ?? "Main"} <Icon icon="icon-question" className="questionIcon" />
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
});

const BranchContainer = ({ t }) => (
  <>
    <GridView
      url={{
        list: "branch/v1/branch/get-all",
        one: "branch/v1/branch/get/",
        add: "branch/v1/branch/add",
        update: "branch/v1/branch/edit",
        delete: "branch/v1/branch/delete",
      }}
      storeName="branch"
      entityName="branch"
      scheme={BranchScheme}
      params={{}}
      hasModal={{ create: true, update: true, delete: true }}
      ModalBody={ModalBody}
      dataForModal={{
        t,
      }}
      disabledOnClose
      select
      searchFields={[
        {
          name: "name",
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
              Header: `${t("active") ?? "Active"}`,
              accessor: "active",
              status: true,
              width: 40,
            },
            {
              Header: `${t("main") ?? "Main"}`,
              accessor: "main",
              status: true,
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
      modalTitle={t("region") ?? "REGION"}
    />
  </>
);

export default withTranslation("pdp")(memo(BranchContainer));
