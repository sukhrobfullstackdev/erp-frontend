import React, { memo, useEffect } from "react";
import { get, isEmpty } from "lodash";
import { withTranslation } from "react-i18next";
import { Col, Row } from "react-grid-system";
import { connect } from "react-redux";
import FormDemo from "../../../../containers/Form/form-demo";
import Field from "../../../../containers/Form/field";
import Flex from "../../../../components/elements/flex";
import Button from "../../../../components/elements/button";
import PaymentTypeScheme from "../../../../schema/PaymentTypeScheme";
import GridView from "../../../../containers/GridView/GridView";
import Icon from "../../../../components/elements/icon";
import ApiActions from "../../../../services/api/actions";
import { getSelectOptionsListFromListData } from "../../../../utils";

const ModalBody = memo(({ addOrEdit, cancel, item, btnText = "Add", t, currencyTypesOptions, openModal }) => {
  let options = React.useMemo(
    () => getSelectOptionsListFromListData(get(currencyTypesOptions, "result.data.currencyType.options", []), "id", "name"),
    [currencyTypesOptions]
  );
  let temp = {};
  if (isEmpty(item) && openModal) temp = { resetData: { name: "", currencyType: "", active: false } };

  return (
    <FormDemo
      {...temp}
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
            labelRequired
            params={{ required: true }}
            property={{
              placeholder: t("enter_name") ?? "Enter name...",
            }}
          />
          <Field
            type={"custom-select"}
            defaultValue={!isEmpty(item) ? get(item, "currencyType.values", "") : " "}
            name={"currencyType"}
            label={t("currency_type") ?? "CURRENCY TYPE"}
            labelRequired
            options={options}
            params={{ required: true }}
            property={{ placeholder: t("enter_name") ?? "Enter name..." }}
            onChangeKey="label"
          />
        </Col>
        <Col xs={12}>
          <Flex className={"footer"} justify={"flex-end"} align={"center"}>
            <Field
              defaultValue={get(item, "active")}
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

const PaymentTypeContainer = ({ getSelectOptions, currencyTypesOptions, t }) => {
  useEffect(() => {
    if (isEmpty(currencyTypesOptions)) getSelectOptions();
  }, []);
  return (
    <>
      <GridView
        url={{
          list: "finance/v1/payment-type/get-all",
          one: "finance/v1/payment-type",
          add: "finance/v1/payment-type/add",
          update: "finance/v1/payment-type/edit",
          delete: "finance/v1/payment-type/delete",
        }}
        storeName="paymentType"
        entityName="paymentType"
        scheme={PaymentTypeScheme}
        params={{}}
        hasModal={{ create: true, update: true, delete: true }}
        ModalBody={ModalBody}
        disabledOnClose
        select
        dataForModal={{
          getSelectOptions,
          currencyTypesOptions,
          t,
        }}
        searchFields={[
          {
            name: "Name",
            id: "1",
            type: "name",
            customField: "name",
            searchable: true,
          },
          {
            name: "Currency Type",
            id: "2",
            type: "currencyType",
            customField: "currencyType",
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
                Header: `${t("currency_type") ?? "CURRENCY TYPE"}`,
                accessor: "currencyType",
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
        modalTitle={t("adding_payment_type") ?? "ADDING PAYMENT TYPE"}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  currencyTypesOptions: get(state, "api.currencyTypes.data", {}),
});

const mapDispatchToProps = (dispatch) => ({
  getSelectOptions: () =>
    dispatch({
      type: ApiActions.GET_DATA.REQUEST,
      payload: {
        url: `finance/v1/payment-type/`,
        method: "get",
        storeName: "currencyTypes",
      },
    }),
});

export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(memo(PaymentTypeContainer)));
