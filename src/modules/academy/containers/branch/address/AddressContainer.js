import React, { memo, useEffect, useState } from "react";
import { get, isEmpty } from "lodash";
import { withTranslation } from "react-i18next";
import { Col, Row } from "react-grid-system";
import { connect } from "react-redux";
import FormDemo from "../../../../../containers/Form/form-demo";
import Field from "../../../../../containers/Form/field";
import Flex from "../../../../../components/elements/flex";
import Button from "../../../../../components/elements/button";
import AddressScheme from "../../../../../schema/AddressScheme";
import GridView from "../../../../../containers/GridView/GridView";
import ActionsApi from "../../../../../services/api/actions";

const ModalBody = memo(({ addOrEdit, cancel, item, btnText = "Add", region, status, openModal, t }) => {
  const [state, setState] = useState({ options: [] });

  useEffect(() => {
    if (isEmpty(state.options) && !isEmpty(item)) {
      setState({ options: region.find((i) => i.id === get(item, "id", " "))?.districts });
    }
  }, [item]);

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
            defaultValue={get(item, "streetName")}
            name={"streetName"}
            label={t("street_name") ?? "STREET NAME"}
            params={{ required: true }}
          />
          <Field
            type={"custom-select"}
            defaultValue={get(item, "districtId", " ")}
            name={"districtId"}
            label={t("district_name") ?? "DISTRICT NAME"}
            params={{ required: true }}
            options={region}
            onChange={(e, item) => setState((s) => ({ ...s, options: get(item, "districts", []) }))}
            valueKey={"id"}
            labelKey={"name"}
          />
          <Field
            type={"custom-select"}
            defaultValue={get(item, "floorId", " ")}
            name={"floorId"}
            label={t("floor_name") ?? "FLOOR NAME"}
            params={{ required: true }}
            options={state.options}
            onChange={(e) => ""}
            valueKey={"id"}
            labelKey={"name"}
          />
          <Field
            type={"textarea"}
            defaultValue={get(item, "description")}
            name={"description"}
            label={t("description") ?? "description"}
            params={{ required: true }}
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

const AddressContainer = ({ getData, region, t }) => {
  useEffect(() => {
    if (isEmpty(region)) {
      getData({
        url: "branch/v1/region/get-all-tree-regions",
        storeName: "get-all-tree-regions",
        cb: {
          success: (res) => {},
        },
      });
    }
  }, []);

  return (
    <>
      <GridView
        url={{
          list: "branch/v1/address/get-all",
          one: "branch/v1/address/get",
          add: "branch/v1/address/add",
          update: "branch/v1/address/edit",
          delete: "branch/v1/address/delete",
        }}
        storeName="address"
        entityName="address"
        scheme={AddressScheme}
        params={{}}
        hasModal={{ create: true, update: true, delete: true }}
        ModalBody={ModalBody}
        disabledOnClose
        dataForModal={{
          region,
          t,
        }}
        select
        searchFields={[
          {
            name: "Region Name",
            id: "1",
            type: "regionName",
            customField: "regionName",
            searchable: true,
          },
          {
            name: "District Name",
            id: "2",
            type: "districtName",
            customField: "districtName",
            searchable: true,
          },
          {
            name: "Street Name",
            id: "3",
            type: "streetName",
            customField: "streetName",
            searchable: true,
          },
          {
            name: "Discription",
            id: "4",
            type: "discription",
            customField: "discription",
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
                Header: `${t("region_name") ?? "Region Name"}`,
                accessor: "regionName",
              },
              {
                Header: `${t("district_name") ?? "District Name"}`,
                accessor: "districtName",
              },
              {
                Header: `${t("street_name") ?? "Street Name"}`,
                accessor: "streetName",
              },
              {
                Header: `${t("discription") ?? "Discription"}`,
                accessor: "discription",
              },
              {
                Header: `${t("action") ?? "Action"}`,
                accessor: "action",
              },
            ],
          },
        ]}
        row={["id", "number", "name"]}
        modalTitle={t("address") ?? "ADDRESS"}
      />
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    region: get(state, `api.get-all-tree-regions.data.result.data`, []),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: ({ storeName, url, cb }) => {
      dispatch({
        type: ActionsApi.GET_DATA.REQUEST,
        payload: { storeName, url, cb, method: "get" },
      });
    },
  };
};

export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(memo(AddressContainer)));
