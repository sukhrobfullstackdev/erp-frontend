import React, { memo, useEffect, useState } from "react";
import { get, isEmpty } from "lodash";
import { withTranslation } from "react-i18next";
import { Col, Row } from "react-grid-system";
import { useSelector } from "react-redux";
import FormDemo from "../../../../../containers/Form/form-demo";
import Field from "../../../../../containers/Form/field";
import Flex from "../../../../../components/elements/flex";
import Button from "../../../../../components/elements/button";
import BuildingScheme from "../../../../../schema/BuildingScheme";
import GridView from "../../../../../containers/GridView/GridView";
import ComponentBodyWithSelect from "../../../components/ComponentBodyWithSelect";
import { getSelectOptionsListFromData } from "../../../../../utils";
import Icon from "../../../../../components/elements/icon";
import styled from "styled-components";

const ModalBody = memo(({ addOrEdit, cancel, item, btnText = "Add", getAllOptions, t }) => {
  // const [options, setOptions] = useState([]);
  // const [branchOptions, setBranchOptions] = useState([]);

  const counter = useSelector((state) => get(state, `api.address.data.result.data`, []));
  const branchData = useSelector((state) => get(state, `api.branch.data.result.data`, []));

  useEffect(() => {
    if (isEmpty(counter))
      getAllOptions({
        url: "branch/v1/address/get-all",
        storeName: "address",
        cb: {
          success: (res) => {
            // let temp = get(res, "data", []);
            // if (!isEmpty(temp)) setOptions(getSelectOptionsListFromData(temp, 'id', 'streetName'));
          },
        },
      });
    if (isEmpty(branchData))
      getAllOptions({
        url: "branch/v1/branch/get-all",
        storeName: "branch",
        cb: {
          success: (res) => {
            // let temp = get(res, "data", []);
            // if (!isEmpty(temp)) setBranchOptions(getSelectOptionsListFromData(temp, 'id', 'name'));
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
            label={t("region_name") ?? "REGION NAME"}
            params={{ required: true }}
          />
          <Field
            type={"custom-select"}
            defaultValue={get(item, "addressId", null)}
            name={"addressId"}
            label={t("address_name") ?? "ADDRESS NAME"}
            params={{ required: true }}
            options={getSelectOptionsListFromData(counter, "id", "streetName")}
          />
          <Field
            type={"custom-select"}
            defaultValue={get(item, "branchId", null)}
            name={"branchId"}
            label={t("branch_name") ?? "Branch NAME"}
            params={{ required: true }}
            options={getSelectOptionsListFromData(branchData, "id", "name")}
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
});

const ButtonStyle = styled(Button)`
  button {
    border-radius: 5px;
    height: 28px;
    width: 70px;
    font-weight: 500;
    font-size: 10px;
    line-height: 21px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const BuildingContainer = ({ t }) => (
  <>
    <GridView
      url={{
        list: "branch/v1/building/get-all",
        one: "branch/v1/building/get/",
        add: "branch/v1/building/add",
        update: "branch/v1/building/edit",
        delete: "branch/v1/building/delete",
      }}
      storeName="building"
      entityName="building"
      scheme={BuildingScheme}
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
          name: "Address Name",
          id: "2",
          type: "addressName",
          customField: "addressName",
          searchable: true,
        },
        {
          name: "Branch Name",
          id: "3",
          type: "branchName",
          customField: "branchName",
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
              Header: `${t("address_name") ?? "Address Name"}`,
              accessor: "addressName",
            },
            {
              Header: `${t("branch_name") ?? "Branch Name"}`,
              accessor: "branchName",
            },
            {
              Header: `${t("main") ?? "Main"}`,
              accessor: "main",
              status: true,
              width: 40,
              customColumn: ({ cell: { value } }) => {
                return (
                  <ButtonStyle success={value ? "1" : ""} danger={!value ? "1" : ""}>
                    {value ? "Main" : "No Main"}
                  </ButtonStyle>
                );
              },
            },
            {
              Header: `${t("action") ?? "Action"}`,
              accessor: "action",
              width: 40,
            },
          ],
        },
      ]}
      row={["id", "number", "name"]}
      modalTitle={t("building") ?? "BUILDING"}
    />
  </>
);

export default withTranslation("pdp")(memo(BuildingContainer));
