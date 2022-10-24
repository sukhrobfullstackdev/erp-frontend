import React, { useEffect, useState } from "react";
import { find, get, head, isEmpty, isEqual } from "lodash";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Col, Row } from "react-grid-system";
import GridView from "../../../../containers/GridView/GridView";
import FormDemo from "../../../../containers/Form/form-demo";
import Field from "../../../../containers/Form/field";
import Flex from "../../../../components/elements/flex";
import Button from "../../../../components/elements/button";
import EmployeeCategoryTypeScheme from "../../../../schema/EmployeeCategoryTypeScheme";
import ApiActions from "../../../../services/api/actions";
import { getSelectOptionsListFromData } from "../../../../utils";
import Icon from "../../../../components/elements/icon";

const Container = ({ departments, positions, item }) => {
  const [positionOptions, setPositions] = useState(positions);
  useEffect(() => {
    if (!isEmpty(positions)) setPositions(positions);
  }, [positions]);

  return (
    <>
      <Field
        type={"custom-select"}
        defaultValue={head(get(item, "department.values")) ?? " "}
        options={departments}
        name={"departmentId"}
        label={"SELECT DEPARTMENT"}
        onChange={(val) => setPositions(positions.filter((item) => get(item, "departmentId", "") === val))}
        params={{ required: true }}
      />
      <Field
        type={"custom-select"}
        defaultValue={head(get(item, "position.values")) ?? " "}
        options={positionOptions}
        name={"positionId"}
        label={"SELECT POSITION"}
        params={{ required: true }}
      />
    </>
  );
};

const ModalBody = ({ addOrEdit, cancel, item, btnText = "Add", openModal, departments, positions, types, t }) => {
  let temp = {};
  if (isEmpty(item) && openModal)
    temp = {
      resetData: {
        departmentId: "",
        positionId: "",
        employeeCategoryTypeId: "",
        requirement: "",
        description: "",
        active: false,
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
        <Col xs={12} className={"mb-20"}>
          <Container
            {...{
              departments,
              positions,
              item,
            }}
          />
          <Field
            type={"custom-select"}
            defaultValue={head(get(item, "employeeCategoryType.values")) ?? " "}
            options={types}
            name={"employeeCategoryTypeId"}
            label={t("select_employee_category_type") ?? "SELECT EMPLOYEE CATEGORY TYPE"}
            params={{ required: true }}
          />
          <Field
            type={"textarea"}
            defaultValue={get(item, "requirement")}
            name={"requirement"}
            label={t("type_requirement") ?? "TYPE requirement"}
            params={{ required: true }}
          />
          <Field
            type={"textarea"}
            defaultValue={get(item, "description")}
            name={"description"}
            label={t("type_description") ?? "TYPE description"}
            params={{ required: true }}
          />
        </Col>
        <Col xs={12}>
          <Flex justify={"flex-end"} align={"center"}>
            <Field
              defaultValue={get(item, "active")}
              inBtn
              type={"checkbox"}
              name={"active"}
              label={
                <>
                  {" "}
                  {t("active") ?? "Active"} <Icon icon="icon-question" className="questionIcon" />
                </>
              }
            />
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

const ListContainer = ({ t, getFormData, formData, departments, positions, types, ...rest }) => {
  useEffect(() => {
    getFormData();
  }, []);

  departments = getSelectOptionsListFromData(get(formData, "result.data.department.options", []), "id", "name", "other");
  positions = getSelectOptionsListFromData(get(formData, "result.data.position.options", []), "id", "name", "other");
  types = getSelectOptionsListFromData(get(formData, "result.data.employeeCategoryType.options", []), "id", "name");

  return (
    <>
      <GridView
        url={{
          list: "staff/v1/employee-category/get-all",
          one: "staff/v1/employee-category/get/",
          add: "staff/v1/employee-category/add",
          update: "staff/v1/employee-category/edit",
          delete: "staff/v1/employee-category/delete",
        }}
        storeName="employee-category-list"
        entityName="employee-category"
        scheme={EmployeeCategoryTypeScheme}
        params={{}}
        disabledOnClose
        hasModal={{ create: true, update: true, delete: true }}
        ModalBody={ModalBody}
        dataForModal={{
          departments,
          positions,
          types,
          t,
        }}
        searchFields={[
          {
            name: "requirement",
            id: "1",
            type: "name",
            customField: "requirement",
            searchable: true,
          },
          {
            name: "departmentName",
            id: "1",
            type: "name",
            customField: "departmentName",
            searchable: true,
          },
          {
            name: "positionName",
            id: "1",
            type: "name",
            customField: "positionName",
            searchable: true,
          },
          {
            name: "description",
            id: "1",
            type: "name",
            customField: "description",
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
                accessor: "employeeCategoryTypeName",
              },
              {
                Header: `${t("minimum_requiremets") ?? "Minimum requirements"}`,
                accessor: "requirement",
              },
              {
                Header: `${t("section") ?? "Section"}`,
                accessor: "departmentName",
              },
              {
                Header: `${t("position") ?? "Position"}`,
                accessor: "positionName",
              },
              {
                Header: `${t("description") ?? "Description"}`,
                accessor: "description",
              },
              {
                Header: `${t("status") ?? "Status"}`,
                accessor: "active",
                status: "true",
                width: 60,
              },
              {
                Header: `${t("action") ?? "Action"}`,
                accessor: "action",
                width: 60,
              },
            ],
          },
        ]}
        row={["id", "number", "requirement", "departmentName", "positionName", "description"]}
        modalTitle={t("employee_category") ?? "EMPLOYEE CATEGORY"}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    formData: get(state, "api.hr-employee-category-form-data.data", {}),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFormData: () => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: "staff/v1/employee-category/get",
          method: "get",
          storeName: "hr-employee-category-form-data",
        },
      });
    },
  };
};

export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(ListContainer));
