import React, { memo, useEffect, useState } from "react";
import { get, isEmpty } from "lodash";
import { withTranslation } from "react-i18next";
import { Col, Row } from "react-grid-system";
import FormDemo from "../../../../../containers/Form/form-demo";
import Field from "../../../../../containers/Form/field";
import Flex from "../../../../../components/elements/flex";
import Button from "../../../../../components/elements/button";
import FloorScheme from "../../../../../schema/FloorScheme";
import GridView from "../../../../../containers/GridView/GridView";
import { getSelectOptionsListFromData } from "../../../../../utils";
import { useSelector } from "react-redux";

const ModalBody = memo(({ addOrEdit, cancel, item, btnText = "Add", getAllOptions, t }) => {
  // const [options, setOptions] = useState([]);

  const counter = useSelector((state) => get(state, `api.building.data.result.data`, []));

  useEffect(() => {
    if (isEmpty(counter))
      getAllOptions({
        url: "branch/v1/building/get-all",
        storeName: "building",
        cb: {
          success: (res) => {
            // let temp = get(res, "data", []);
            // if (!isEmpty(temp)) setOptions(getSelectOptionsListFromData(temp, 'id', 'name'));
          },
        },
      });
  }, []);

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
            defaultValue={get(item, "name")}
            name={"name"}
            label={t("foor_name") ?? "FOOR NAME"}
            params={{ required: true }}
          />
          <Field
            type={"custom-select"}
            defaultValue={get(item, "buildingName", null)}
            name={"buildingId"}
            label={t("building_name") ?? "BUILDING NAME"}
            params={{ required: true }}
            options={getSelectOptionsListFromData(counter, "id", "name")}
          />
        </Col>
        <Col xs={12}>
          <Flex justify={"flex-end"} align={"center"}>
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

const FloorContainer = ({ t }) => (
  <>
    <GridView
      url={{
        list: "branch/v1/floor/get-all",
        one: "branch/v1/floor/get/",
        add: "branch/v1/floor/add",
        update: "branch/v1/floor/edit",
        delete: "branch/v1/floor/delete",
      }}
      storeName="floor"
      entityName="floor"
      scheme={FloorScheme}
      params={{}}
      hasModal={{ create: true, update: true, delete: true }}
      ModalBody={ModalBody}
      dataForModal={{
        t,
      }}
      select
      disabledOnClose
      searchFields={[
        {
          name: "name",
          id: "1",
          type: "name",
          customField: "name",
          searchable: true,
        },
        {
          name: "Building Name",
          id: "2",
          type: "buildingName",
          customField: "buildingName",
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
              Header: `${t("building_name") ?? "Building Name"}`,
              accessor: "buildingName",
            },
            {
              Header: `${t("action") ?? "Action"}`,
              accessor: "action",
            },
          ],
        },
      ]}
      row={["id", "number", "name"]}
      modalTitle={t("floor") ?? "FLOOR"}
    />
  </>
);

export default withTranslation("pdp")(memo(FloorContainer));
