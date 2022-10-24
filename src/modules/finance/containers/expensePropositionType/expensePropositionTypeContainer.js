import React, { memo } from "react";
import { get, head, isEmpty } from "lodash";
import { withTranslation } from "react-i18next";
import { Col, Row } from "react-grid-system";
import FormDemo from "../../../../containers/Form/form-demo";
import Field from "../../../../containers/Form/field";
import Flex from "../../../../components/elements/flex";
import Button from "../../../../components/elements/button";
import ExpensePropositionTypeScheme from "../../../../schema/ExpensePropositionTypeScheme";
import GridView from "../../../../containers/GridView/GridView";
import Icon from "../../../../components/elements/icon";

const ModalBody = memo(({ addOrEdit, cancel, item, btnText = "Add", t, openModal }) => {
  let temp = {};
  if (isEmpty(item) && openModal)
    temp = {
      resetData: {
        name: "",
        expensePropositionTypeForward: "",
        rent: false,
        active: false,
      },
    };

  return (
    <FormDemo
      {...temp}
      isClear
      formRequest={(data) => {
        addOrEdit(get(item, "id", null), data);
      }}
    >
      <Row>
        <Col xs={12}>
          <Field
            type={"input"}
            defaultValue={get(item, "name", "")}
            name={"name"}
            label={t("title") ?? "TITLE"}
            params={{ required: true }}
            property={{
              placeholder: t("enter_name") ?? "Enter name...",
            }}
          />
        </Col>
        <Col xs={12} className={"mb-15"}>
          <div className="referral">
            <div className="referral__title">
              {t("referral") ?? "REFERRAL"} <span style={{ color: "red", fontWeight: 700 }}>*</span>
            </div>
            <Flex align={"center"}>
              <Field
                defaultValue={
                  isEmpty(get(item, "expensePropositionTypeForward.values", []))
                    ? ""
                    : head(get(item, "expensePropositionTypeForward.values", []))
                }
                type={"radio"}
                name={"expensePropositionTypeForward"}
                label={t("student") ?? "Student"}
                className={"referral__radio"}
                valueForChecked={t("STUDENT") ?? "STUDENT"}
              />
              <Field
                defaultValue={
                  isEmpty(get(item, "expensePropositionTypeForward.values", []))
                    ? ""
                    : head(get(item, "expensePropositionTypeForward.values", []))
                }
                type={"radio"}
                name={"expensePropositionTypeForward"}
                label={t("General") ?? "General"}
                className={"referral__radio"}
                valueForChecked={t("ALL") ?? "ALL"}
              />
              <Field defaultValue={get(item, "rent", false)} type={"checkbox"} name={"rent"} label={t("rent") ?? "Rent"} />
            </Flex>
          </div>
        </Col>
        <Col xs={12}>
          <Flex className={"footer"} justify={"flex-end"} align={"center"}>
            <Field
              defaultValue={get(item, "active", false)}
              type={"checkbox"}
              inBtn
              name={"active"}
              sm
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
});

const ExpensePropositionTypeContainer = ({ t }) => (
  <>
    <GridView
      url={{
        list: "finance/v1/expense-proposition-type/all",
        one: "finance/v1/expense-proposition-type/",
        add: "finance/v1/expense-proposition-type/add",
        update: "finance/v1/expense-proposition-type/edit",
        delete: "finance/v1/expense-proposition-type/delete",
      }}
      storeName="expensePropositionType"
      entityName="expensePropositionType"
      scheme={ExpensePropositionTypeScheme}
      hasModal={{ create: true, update: true, delete: true }}
      disabledOnClose
      ModalBody={ModalBody}
      dataForModal={{ t }}
      select
      // rightContent={"hello"}
      buttonText="Create"
      searchFields={[
        {
          name: "Name",
          id: "1",
          type: "name",
          customField: "name",
          searchable: true,
        },
        {
          name: "Referral",
          id: "2",
          type: "expensePropositionTypeForward",
          customField: "expensePropositionTypeForward",
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
              Header: `${t("name") ?? "NAME"}`,
              accessor: "name",
            },
            {
              Header: `${t("referral") ?? "REFERRAL"}`,
              accessor: "expensePropositionTypeForward",
              // width: 100,
            },
            {
              Header: `${t("status") ?? "STATUS"}`,
              accessor: "active",
              status: "active",
              customColumnTrue: (
                <Button className="statusBtn" success="1">
                  {t("active") ?? "ACTIVE"}
                </Button>
              ),
              customColumnFalse: (
                <Button className="statusBtn" danger="1">
                  {t("in_active") ?? "IN ACTIVE"}
                </Button>
              ),
            },
            {
              Header: `${t("action") ?? "Action"}`,
              accessor: "action",
              width: 60,
            },
          ],
        },
      ]}
      row={["id", "number", "name"]}
      modalTitle={t("add_a_cost_type") ?? "ADD A COST TYPE"}
    />
  </>
);

export default withTranslation("pdp")(memo(ExpensePropositionTypeContainer));
