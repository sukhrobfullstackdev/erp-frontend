import React, { memo, useEffect } from "react";
import { get, head, isArray, isEmpty } from "lodash";
import { withTranslation } from "react-i18next";
import { Col, Row } from "react-grid-system";
import { connect } from "react-redux";
import FormDemo from "../../../../../containers/Form/form-demo";
import Field from "../../../../../containers/Form/field";
import Flex from "../../../../../components/elements/flex";
import Button from "../../../../../components/elements/button";
import RegionScheme from "../../../../../schema/RegionScheme";
import GridView from "../../../../../containers/GridView/GridView";
import ApiActions from "../../../../../services/api/actions";

const ModalBody = memo(({ addOrEdit, cancel, item, btnText = "Add", country = [], openModal, t }) => {
  let defaultValue = (name) => (isEmpty(item) && openModal ? get(item, name, " ") : get(item, name, "  "));
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
            defaultValue={defaultValue("name")}
            name={"name"}
            label={t("region_name") ?? "REGION NAME"}
            params={{ required: true }}
          />
          <Field
            type={"custom-select"}
            defaultValue={defaultValue("countryId")}
            name={"countryId"}
            label={t("region_name") ?? "REGION NAME"}
            params={{ required: true }}
            options={isArray(country) ? country : []}
            valueKey={"id"}
            labelKey={"name"}
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

const RegionContainer = ({ country, getData, t }) => {
  useEffect(() => {
    isEmpty(country) && getData();
  }, []);
  return (
    <>
      <GridView
        url={{
          list: "branch/v1/region/get-all",
          one: "branch/v1/region/get/",
          add: "branch/v1/region/add",
          update: "branch/v1/region/edit",
          delete: "branch/v1/region/delete",
        }}
        storeName="region"
        entityName="region"
        scheme={RegionScheme}
        params={{}}
        hasModal={{ create: true, update: true, delete: true }}
        ModalBody={ModalBody}
        dataForModal={{
          country,
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
            name: "Country Name",
            id: "2",
            type: "countryName",
            customField: "countryName",
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
                Header: `${t("country_name") ?? "Country Name"}`,
                accessor: "countryName",
              },
              {
                Header: `${t("action") ?? "Action"}`,
                accessor: "action",
              },
            ],
          },
        ]}
        row={["id", "number", "name"]}
        modalTitle={t("region") ?? "REGION"}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    country: get(state, "api.country.data.result.data", {}),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: () => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: "branch/v1/country/get-all",
          method: "get",
          storeName: "country",
        },
      });
    },
  };
};

export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(memo(RegionContainer)));
