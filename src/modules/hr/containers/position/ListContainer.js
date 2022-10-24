import React, { useEffect } from "react";
import { get, head, isEmpty } from "lodash";
import { withTranslation } from "react-i18next";
import { Col, Row } from "react-grid-system";
import { connect } from "react-redux";
import GridView from "../../../../containers/GridView/GridView";
import FormDemo from "../../../../containers/Form/form-demo";
import Field from "../../../../containers/Form/field";
import Flex from "../../../../components/elements/flex";
import Button from "../../../../components/elements/button";
import PositionScheme from "../../../../schema/PositionScheme";
import ApiActions from "../../../../services/api/actions";
import { getSelectOptionsListFromData } from "../../../../utils";

const ModalBody = ({ addOrEdit, cancel, item, btnText = "Add", departments, openModal, t }) => {
  let temp = {};
  if (isEmpty(item) && openModal) temp = { resetData: { name: "", active: false, departmentId: null } };
  let defaultValue =
    isEmpty(item) && openModal ? head(get(item, "department.values", 0)) : head(get(item, "department.values", "  "));
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
        <Col xs={12} className={"mb-26"}>
          <Field
            type={"custom-select"}
            defaultValue={defaultValue ?? " "}
            name={"departmentId"}
            label={t("select_department") ?? "Select department"}
            options={departments}
            params={{ required: true }}
            defaultHideAnimation={false}
          />
        </Col>
        <Col xs={12}>
          <Flex justify={"flex-end"} align={"center"}>
            <Field
              className="checkboxBtn"
              defaultValue={get(item, "active")}
              type={"checkbox"}
              inBtn
              name={"active"}
              label={t("active") ?? "Active"}
            />
            <Button className="cancelBtn" outlineDanger onCLick={cancel}>
              {t("cancel") ?? "Cancel"}
            </Button>
            <Button className="addBtn" success type={"submit"}>
              {btnText}
            </Button>
          </Flex>
        </Col>
      </Row>
    </FormDemo>
  );
};

const ListContainer = ({ t, getFormData, departments, entities, ...rest }) => {
  useEffect(() => {
    getFormData();
  }, []);

  departments = getSelectOptionsListFromData(get(departments, "result.data.department.options", []), "id", "name");

  return (
    <>
      <GridView
        url={{
          list: "staff/v1/position/get-all",
          one: "staff/v1/position/get",
          add: "staff/v1/position/add",
          update: "staff/v1/position/edit",
          delete: "staff/v1/position/delete",
        }}
        storeName="position-list"
        entityName="position"
        scheme={PositionScheme}
        params={{}}
        disabledOnClose
        hasModal={{ create: true, update: true, delete: true }}
        ModalBody={ModalBody}
        dataForModal={{
          departments,
          t,
        }}
        searchKeys={[
          { name: "Title", key: "name", checked: true },
          {
            name: "Department Name",
            key: "departmentName",
            checked: true,
          },
        ]}
        searchFields={[
          {
            name: "Title",
            id: "1",
            type: "name",
            customField: "name",
            searchable: true,
          },
          {
            name: "Department Name",
            id: "2",
            type: "departmentName",
            customField: "departmentName",
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
                Header: `${t("department_name") ?? "Department Name"}`,
                accessor: "departmentName",
              },

              {
                Header:`${t("status") ?? "Status"}`,
                accessor: "active",
                status: "true",
                width: 40,
              },
              {
                Header: `${t("action") ?? "Action"}`,
                accessor: "action",
                width: 30,
              },
            ],
          },
        ]}
        row={["id", "number", "name", "departmentName"]}
        modalTitle={t("position") ?? "POSITION"}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    entities: get(state, "normalizer.entities", {}),
    departments: get(state, "api.hr-position-form-data.data", {}),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFormData: () => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: "staff/v1/position/get",
          method: "get",
          storeName: "hr-position-form-data",
        },
      });
    },
  };
};
export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(ListContainer));
