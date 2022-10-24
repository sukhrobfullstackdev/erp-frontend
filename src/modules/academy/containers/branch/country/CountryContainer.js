import React, { memo } from "react";
import { get, isEmpty } from "lodash";
import { withTranslation } from "react-i18next";
import { Col, Row } from "react-grid-system";
import FormDemo from "../../../../../containers/Form/form-demo";
import Field from "../../../../../containers/Form/field";
import Flex from "../../../../../components/elements/flex";
import Button from "../../../../../components/elements/button";
import Country from "../../../../../schema/CountryScheme";
import GridView from "../../../../../containers/GridView/GridView";
import Icon from "components/elements/icon";

const ModalBody = ({ addOrEdit, cancel, item, t, btnText = "Add", openModal }) => {
  let temp = {};
  if (isEmpty(item) && openModal)
    temp = {
      resetData: {
        name: "",
        main: "",
      },
    };
  return (
    <FormDemo
      {...temp}
      formRequest={(data) => {
        addOrEdit(get(item, "id", null), data);
      }}
    >
      <Row>
        <Col xs={12} className={"mb-15"}>
          <Field
            type={"input"}
            defaultValue={get(item, "name")}
            name={"name"}
            label={t("country_name") ?? "COUNTRY NAME"}
            params={{ required: true }}
          />
        </Col>
        <Col xs={12}>
          <Flex justify={"flex-end"} align={"center"}>
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
};

const CountryContainer = ({ t }) => (
  <>
    <GridView
      url={{
        list: "branch/v1/country/get-all",
        one: "branch/v1/country/get/",
        add: "branch/v1/country/add",
        update: "branch/v1/country/edit",
        delete: "branch/v1/country/delete",
      }}
      storeName="country"
      entityName="country"
      scheme={Country}
      params={{}}
      hasModal={{ create: true, update: true, delete: true }}
      ModalBody={ModalBody}
      dataForModal={{
        t,
      }}
      disabledOnClose
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
              sortable: true,
            },

            {
              Header: `${t("mine") ?? "Mine"}`,
              accessor: "mine",
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
      modalTitle={t("country") ?? "COUNTRY"}
    />
  </>
);

export default withTranslation("pdp")(memo(CountryContainer));
