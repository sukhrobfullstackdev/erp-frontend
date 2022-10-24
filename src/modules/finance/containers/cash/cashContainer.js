import React, { memo, useEffect, useState } from "react";
import { get, head, isArray, isEmpty, isNull } from "lodash";
import { withTranslation } from "react-i18next";
import { Col, Row } from "react-grid-system";
import { connect } from "react-redux";
import FormDemo from "../../../../containers/Form/form-demo";
import Field from "../../../../containers/Form/field";
import Flex from "../../../../components/elements/flex";
import Button from "../../../../components/elements/button";
import CashScheme from "../../../../schema/CashScheme";
import GridView from "../../../../containers/GridView/GridView";
import Icon from "../../../../components/elements/icon";
import ApiActions from "../../../../services/api/actions";
import { getSelectOptionsListFromListData, getSelectOptionsListFromData } from "../../../../utils";

const ModalBody = memo(({ addOrEdit, cancel, item, btnText = "Add", t, currencyTypesOptions, openModal }) => {
  const [selectedCurrencyTypes, setSelectedCurrencyTypes] = useState(
    !isEmpty(item) && !isEmpty(get(item, "currencyType.values", [])) && isArray(get(item, "currencyType.values", []))
      ? head(get(item, "currencyType.values", []))
      : []
  );

  let currencyOptions = React.useMemo(
    () => getSelectOptionsListFromListData(get(currencyTypesOptions, "result.data.currencyType.options")),
    [currencyTypesOptions]
  );
  let paymentOptions = React.useMemo(
    () => getSelectOptionsListFromData(get(currencyTypesOptions, "result.data.paymentType.options"), "id", "name", "other"),
    [currencyTypesOptions]
  );

  paymentOptions =
    !isEmpty(selectedCurrencyTypes) || !isNull(item)
      ? paymentOptions.filter((i) => get(i, "currencyType", "") === selectedCurrencyTypes)
      : [];
  useEffect(() => {
    if (isEmpty(item)) setSelectedCurrencyTypes(null);
  }, [item]);

  if (!isEmpty(item)) paymentOptions = getSelectOptionsListFromData(get(item, "paymentType.options"), "id", "name", "other");

  let temp = {};
  if (isEmpty(item) && openModal && (isNull(selectedCurrencyTypes) || isEmpty(selectedCurrencyTypes)))
    temp = {
      resetData: {
        name: "",
        currencyType: "",
        payTypesId: "",
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
        <Col xs={12}>
          <Field
            type={"input"}
            defaultValue={get(item, "name", "")}
            name={"name"}
            label={t("title") ?? "TITLE"}
            labelRequired
            params={{ required: true }}
            placeholder={`${t("enter_name") ?? "Enter name"}...`}
          />
          <Field
            type={"custom-select"}
            defaultValue={
              !isEmpty(item)
                ? get(item, "currencyType.values", " ")
                : !isNull(selectedCurrencyTypes)
                ? selectedCurrencyTypes
                : " "
            }
            name={"currencyType"}
            label={t("currency_type") ?? "CURRENCY TYPE"}
            labelRequired
            options={currencyOptions}
            params={{ required: true }}
            placeholder={`${t("enter_name") ?? "Enter name"}...`}
            onChangeKey="label"
            onChange={setSelectedCurrencyTypes}
            nullable={false}
          />
          <Field
            type={"custom-select"}
            name={"payTypesId"}
            label={t("select_types_of_payment") ?? "SELECT TYPES OF PAYMENT"}
            labelRequired
            options={paymentOptions}
            params={{ required: true }}
            placeholder={`${t("enter_name") ?? "Enter name"}...`}
            isMulti
            defaultValue={!isEmpty(item) ? get(item, "paymentType.values", []) : !isEmpty(selectedCurrencyTypes) ? [] : null}
            // onChangeKey="label"
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

const CashContainer = ({ getSelectOptions, currencyTypesOptions, t }) => {
  useEffect(() => {
    if (isEmpty(currencyTypesOptions)) getSelectOptions();
  }, []);
  return (
    <>
      <GridView
        url={{
          list: "finance/v1/cash/get-all",
          one: "finance/v1/cash",
          add: "finance/v1/cash/add",
          update: "finance/v1/cash/edit",
          delete: "finance/v1/cash/delete",
        }}
        storeName="cash"
        entityName="cash"
        scheme={CashScheme}
        params={{}}
        hasModal={{ create: true, update: true, delete: true }}
        ModalBody={ModalBody}
        select
        disabledOnClose
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
          {
            name: "Payment Type",
            id: "3",
            type: "paymentTypes",
            customField: "paymentTypes",
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
                Header: `${t("payment_type") ?? "PAYMENT TYPE"}`,
                accessor: "paymentTypes",
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
        modalTitle={t("cash") ?? "CASH"}
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
        url: `finance/v1/cash/`,
        method: "get",
        storeName: "currencyTypes",
      },
    }),
});

export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(memo(CashContainer)));
