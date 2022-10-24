import React, { memo, useEffect, useState } from "react";
import { get, isEmpty } from "lodash";
import { withTranslation } from "react-i18next";
import { Col, Row } from "react-grid-system";
import FormDemo from "../../../../../containers/Form/form-demo";
import Field from "../../../../../containers/Form/field";
import Flex from "../../../../../components/elements/flex";
import Button from "../../../../../components/elements/button";
import DistrictScheme from "../../../../../schema/DistrictScheme";
import GridView from "../../../../../containers/GridView/GridView";
import { getSelectOptionsListFromData } from "../../../../../utils";
import ApiActions from "../../../../../services/api/actions";

const ModalBody = memo(({ addOrEdit, cancel, item, btnText = "Add", getAllOptions, selectOptions, t }) => {
  selectOptions = get(selectOptions("regions"), "result.data", []);
  useEffect(() => {
    if (isEmpty(selectOptions)) {
      getAllOptions({
        cb: {},
        storeName: "regions",
        url: "branch/v1/region/get-all",
      });
    }
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
            label={t("district_name") ?? "DISTRICT NAME"}
            params={{ required: true }}
          />
          <Field
            type={"custom-select"}
            defaultValue={get(item, "regionId", null)}
            name={"regionId"}
            label={t("region_name") ?? "REGION NAME"}
            params={{ required: true }}
            options={getSelectOptionsListFromData(selectOptions, "id", "name")}
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

const DistrictContainer = ({ t }) => (
  <>
    <GridView
      url={{
        list: "branch/v1/district/get-all",
        one: "branch/v1/district/get/",
        add: "branch/v1/district/add",
        update: "branch/v1/district/edit",
        delete: "branch/v1/district/delete",
        selectOptions: "branch/v1/region/get-all",
      }}
      storeName="district"
      entityName="district"
      optionsStoreName="regions"
      scheme={DistrictScheme}
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
          name: "Region Name",
          id: "2",
          type: "regionName",
          customField: "regionName",
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
              Header: `${t("region_name") ?? "Region Name"}`,
              accessor: "regionName",
            },
            {
              Header: `${t("action") ?? "Action"}`,
              accessor: "action",
            },
          ],
        },
      ]}
      row={["id", "number", "name"]}
      modalTitle={t("district") ?? "DISTRICT"}
    />
  </>
);

export default withTranslation("pdp")(memo(DistrictContainer));
