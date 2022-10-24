import React, { memo, useState } from "react";
import { get, isArray, isEmpty } from "lodash";
import { Col, Row } from "react-grid-system";
import { withTranslation } from "react-i18next";
import GridView from "../../../../containers/GridView/GridView";
import FormDemo from "../../../../containers/Form/form-demo";
import Field from "../../../../containers/Form/field";
import Flex from "../../../../components/elements/flex";
import Button from "../../../../components/elements/button";
import Icon from "../../../../components/elements/icon";
import HolidaysGridScheme from "../../../../schema/HolidaysGridScheme";
import { formatDate } from "../../../../utils";

const ModalBody = ({ addOrEdit, cancel, item, btnText = "Add", t, modalButtonDisabled, openModal }) => {
  let temp = {};
  if (isEmpty(item) && openModal) temp = { resetData: { name: "", dates: "" } };
  return (
    <FormDemo
      formRequest={(data) => {
        addOrEdit(get(item, "id", null), data);
      }}
      {...temp}
    >
      <Row>
        <Col xs={12} className={"mb-15"}>
          <Field type={"input"} defaultValue={get(item, "name", " ")} name={"name"} label={t("name") ?? "name"} params={{ required: true }} />
          <Flex align={"end"}>
            <Field
              type={"custom-datepicker"}
              name={"dates"}
              defaultValue={get(item, "dates", "")}
              hideLabel
              label={t("dates") ?? "dates"}
              params={{ required: true }}
              isRange
              placeholder={"Calendar"}
              beArray
            />
            <Field
              type={"checkbox"}
              inBtn
              defaultValue={get(item, "calcMonthlySalary")}
              name={"calcMonthlySalary"}
              label={t("monthly_payment") ?? "Monthly payment"}
            />
          </Flex>
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
            <Button success className="addBtn" type={"submit"} disabled={modalButtonDisabled}>
              {btnText}
            </Button>
          </Flex>
        </Col>
      </Row>
    </FormDemo>
  );
};

const ListContainer = ({ entities, t, ...rest }) => {
  return (
    <>
      <GridView
        url={{
          list: "staff/v1/holiday/get-all",
          one: "staff/v1/holiday/get/",
          add: "staff/v1/holiday/add",
          update: "staff/v1/holiday/edit",
          delete: "staff/v1/holiday/delete",
        }}
        storeName="holidays-type-list"
        entityName="holidays-grid"
        scheme={HolidaysGridScheme}
        params={{}}
        disabledOnClose
        hasModal={{ create: true, update: true, delete: true }}
        ModalBody={ModalBody}
        dataForModal={{ t }}
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
                width: 100,
              },
              {
                Header: `${t("title") ?? "Title"}`,
                accessor: "name",
              },
              ///
              {
                Header: `${t("weekend_day") ?? "Weekend day"}`,
                accessor: "dates",
                customColumn: ({ cell: { value } }) => {
                  return (
                    isArray(value) &&
                    `${formatDate(new Date(get(value, "0", 0)), "dd/MM/yyyy")} ${
                      get(value, "1", 0) ? "- " + formatDate(new Date(get(value, "1", 0)), "dd/MM/yyyy") : ""
                    }`
                  );
                },
              },
              {
                Header: `${t("monthly_calculation") ?? "Monthly calculation"}`,
                accessor: "calcMonthlySalary",
                width: 60,
                customColumn: ({ cell }) => (get(cell, "value", false) ? "Paid" : "Not Paid"),
              },
              {
                Header: `${t("status") ?? "Status"}`,
                accessor: "active",
                status: "true",
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
        modalTitle={t("holidays") ?? "HOLIDAYS"}
      />
    </>
  );
};

export default withTranslation("pdp")(memo(ListContainer));
