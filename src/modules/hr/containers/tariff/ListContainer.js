import React, { useEffect } from "react";
import { get, head, isEmpty } from "lodash";
import { connect } from "react-redux";
import { Col, Row } from "react-grid-system";
import { withTranslation } from "react-i18next";
import GridView from "../../../../containers/GridView/GridView";
import TariffGridScheme from "../../../../schema/TariffGridScheme";
import FormDemo from "../../../../containers/Form/form-demo";
import Field from "../../../../containers/Form/field";
import Flex from "../../../../components/elements/flex";
import Button from "../../../../components/elements/button";
import Icon from "../../../../components/elements/icon";
import ApiActions from "../../../../services/api/actions";

const ModalBody = ({ addOrEdit, cancel, item, btnText = "Add", formData, openModal, t }) => {
  let temp = {};
  if (isEmpty(item) && openModal)
    temp = {
      resetData: {
        branchId: "",
        departmentId: "",
        positionId: "",
        employeeCategoryId: "",
        paymentCriteriaType: "",
        paymentAmount: "",
        hourPaymentAmount: "",
        dayPaymentAmount: "",
        bonusType: "",
        bonusPercent: "",
        day: false,
        active: false,
      },
    };

  return (
    <FormDemo
      {...temp}
      formRequest={(data) => {
        data.data.bonusPercent = parseInt(data.data.bonusPercent);
        data.data.dayPaymentAmount = parseInt(data.data.dayPaymentAmount);
        data.data.hourPaymentAmount = parseInt(data.data.hourPaymentAmount);
        addOrEdit(get(item, "id", null), data);
      }}
    >
      <Row>
        <Col xs={12} className={"mb-15"}>
          <Field
            type={"custom-select"}
            options={get(formData, "result.data.branch.options", [])}
            defaultValue={head(get(item, "branch.values")) ?? " "}
            name={"branchId"}
            label={t("select_filial") ?? "SELECT FILIAL"}
            params={{ required: true }}
            valueKey={"id"}
            labelKey={"name"}
          />
          <Field
            type={"custom-select"}
            options={get(formData, "result.data.department.options", [])}
            defaultValue={head(get(item, "department.values")) ?? " "}
            name={"departmentId"}
            label={t("select_section") ?? "SELECT SECTION"}
            params={{ required: true }}
            valueKey={"id"}
            labelKey={"name"}
          />
          <Field
            type={"custom-select"}
            options={get(formData, "result.data.position.options", [])}
            defaultValue={head(get(item, "position.values")) ?? " "}
            name={"positionId"}
            label={t("select_position") ?? "SELECT POSITION"}
            params={{ required: true }}
            valueKey={"id"}
            labelKey={"name"}
          />
          <Field
            type={"custom-select"}
            options={get(formData, "result.data.employeeCategory.options", [])}
            defaultValue={head(get(item, "employeeCategory.values")) ?? " "}
            name={"employeeCategoryId"}
            label={t("select_category_type") ?? "SELECT CATEGORY TYPE"}
            params={{ required: true }}
            valueKey={"id"}
            labelKey={"employeeCategoryTypeName"}
          />
          <Field
            type={"custom-select"}
            options={get(formData, "result.data.paymentCriteriaTypes.options", [])}
            defaultValue={head(get(item, "paymentCriteriaTypes.values")) ?? " "}
            name={"paymentCriteriaType"}
            label={t("select_pay_criteria") ?? "SELECT PAY CRITERIA"}
            params={{ required: true }}
            valueKey={"id"}
            labelKey={"name"}
          />
          <Field
            type={"input"}
            property={{ type: "number" }}
            name={"paymentAmount"}
            defaultValue={get(item, "paymentAmount")}
            label={t("salary") ?? "SALARY"}
            params={{ required: true }}
          />

          <span className="second-title">{t("holiday_pay") ?? "HOLIDAY PAY"}</span>

          <div className="wrapper">
            <Field
              type={"input"}
              property={{ type: "number" }}
              name={"hourPaymentAmount"}
              defaultValue={get(item, "hourPaymentAmount")}
              label={t("enter_the_quontity") ?? "ENTER THE QUONTITY"}
              params={{ required: true }}
            />

            <Field
              type={"checkbox"}
              defaultValue={get(item, "hour")}
              inBtn
              name={"hour"}
              label={t("hour") ?? "hour"}
              params={{ required: true }}
            />

            <Field
              type={"input"}
              property={{ type: "number" }}
              defaultValue={get(item, "dayPaymentAmount")}
              name={"dayPaymentAmount"}
              label={t("enter_the_quontity") ?? "ENTER THE QUONTITY"}
              params={{ required: true }}
            />

            <Field
              type={"checkbox"}
              defaultValue={get(item, "hour")}
              name={"day"}
              inBtn
              label={t("day") ?? "day"}
              params={{ required: true }}
            />
          </div>

          <Field
            type={"custom-select"}
            options={get(formData, "result.data.bonusTypes.options", [])}
            defaultValue={head(get(item, "bonusTypes.values")) ?? " "}
            name={"bonusType"}
            label={t("enter_the_bonus_type") ?? "ENTER THE BONUS TYPE"}
            params={{ required: true }}
            valueKey={"id"}
            labelKey={"name"}
          />

          <Field
            type={"input"}
            property={{ type: "number" }}
            defaultValue={get(item, "bonusPercent", "")}
            name={"bonusPercent"}
            label={t("enter_bonus_percent_type") ?? "ENTER BONUS PERCENT TYPE"}
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

const ListContainer = ({
  t,
  getFormData,
  formData,
  employeeCategoryType,
  branch,
  bonusTypes,
  paymentCriteriaTypes,
  department,
  position,
  entities,
  ...rest
}) => {
  useEffect(() => {
    isEmpty(get(formData, "result", {})) && getFormData();
  }, []);

  return (
    <>
      <GridView
        url={{
          list: "staff/v1/tariff-grid/get-all",
          one: "staff/v1/tariff-grid/get",
          add: "staff/v1/tariff-grid/add",
          update: "staff/v1/tariff-grid/edit",
          delete: "staff/v1/tariff-grid/delete",
        }}
        storeName="tariff-type-list"
        entityName="tariff-grid"
        scheme={TariffGridScheme}
        params={{}}
        disabledOnClose
        hasModal={{ create: true, update: true, delete: true }}
        ModalBody={ModalBody}
        dataForModal={{
          formData,
          t,
        }}
        searchFields={[
          {
            name: "Filial",
            id: "1",
            type: "branchName",
            customField: "branchName",
            searchable: true,
          },
          {
            name: "Section",
            id: "2",
            type: "departmentName",
            customField: "departmentName",
            searchable: true,
          },
          {
            name: "bonus Type",
            id: "3",
            type: "name",
            customField: "bonusType",
            searchable: true,
          },
          {
            name: "payment Amount",
            id: "4",
            type: "name",
            customField: "paymentAmount",
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
                Header: `${t("filial") ?? "Filial"}`,
                accessor: "branchName",
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
                Header: `${t("categories") ?? "Categories"}`,
                accessor: "employeeCategoryName",
              },
              {
                Header: `${t("salary") ?? "Salary"}`,
                accessor: "paymentAmount",
                customColumn: ({ cell, row }) =>
                  new Intl.NumberFormat("fr-FR", { currency: "UZS" }).format(get(cell, "value", "")),
              },
              {
                Header: `${t("salary_type") ?? "Salary type"}`,
                accessor: "paymentCriteriaType",
              },
              {
                Header: `${t("bonus") ?? "Bonus"}`,
                accessor: "bonusPercent",
                customColumn: ({ cell }) => `${get(cell, "row.original.bonusType", "")} ${get(cell, "value", "")}%`,
              },
              {
                Header: `${t("holiday_pay_for_day") ?? "Holiday pay For day"}`,
                accessor: "dayPaymentAmount",
                customColumn: ({ cell, row }) =>
                  new Intl.NumberFormat("fr-FR", { currency: "UZS" }).format(get(cell, "value", "")),
              },
              {
                Header: `${t("holiday_pay_for_hour") ?? "Holiday pay For Hour"}`,
                accessor: "hourPaymentAmount",
                customColumn: ({ cell, row }) =>
                  new Intl.NumberFormat("fr-FR", { currency: "UZS" }).format(get(cell, "value", "")),
              },
              {
                Header: `${t("status") ?? "Status"}`,
                accessor: "active",
                status: "true",
                width: 100,
              },
              {
                Header: `${t("action") ?? "Action"}`,
                accessor: "action",
                width: 100,
              },
            ],
          },
        ]}
        row={["id", "number", "name", "branchId", "paymentAmount"]}
        modalTitle={t("department") ?? "DEPARTMENT"}
      />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    formData: get(state, "api.hr-tariff-form-data.data", {}),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFormData: () => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: "staff/v1/tariff-grid/get",
          method: "get",
          storeName: "hr-tariff-form-data",
        },
      });
    },
  };
};
export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(ListContainer));
