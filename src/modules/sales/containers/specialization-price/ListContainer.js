import React, { useEffect } from "react";
import { get, isEmpty } from "lodash";
import { connect } from "react-redux";
import { Col, Row } from "react-grid-system";
import { withTranslation } from "react-i18next";

import GridView from "../../../../containers/GridView/GridView";
import FormDemo from "../../../../containers/Form/form-demo";
import Field from "../../../../containers/Form/field";
import Flex from "../../../../components/elements/flex";
import Button from "../../../../components/elements/button";
import SpecializationPriceGridScheme from "../../../../schema/SpecializationPriceGridScheme";
import ApiActions from "../../../../services/api/actions";
import Icon from "../../../../components/elements/icon";

const ModalBody = ({ addOrEdit, cancel, item, btnText = "Add", openModal, formData, status, t }) => {
  let temp = {};
  if (isEmpty(item) && openModal && status)
    temp = {
      resetData: {
        branchId: "",
        specializationId: "",
        groupTypeId: "",
        price: "",
      },
    };

  return (
    <FormDemo
      {...temp}
      formRequest={(data) => {
        data.data = { ...data.data, price: parseInt(data.data.price) };
        addOrEdit(get(item, "id", null), data);
      }}
    >
      <Row>
        <Col xs={12} className={"mb-15"}>
          <Field
            type={"custom-select"}
            options={get(formData, "result.data.branches", [])}
            defaultValue={get(item, "branch.id") ?? " "}
            name={"branchId"}
            label={t("branch") ?? "branch"}
            params={{ required: true }}
            valueKey={"id"}
            labelKey={"name"}
          />
          <Field
            type={"custom-select"}
            options={get(formData, "result.data.specializations", [])}
            defaultValue={get(item, "specialization.id") ?? " "}
            name={"specializationId"}
            label={t("specialization") ?? "specialization"}
            params={{ required: true }}
            valueKey={"id"}
            labelKey={"name"}
          />
          <Field
            type={"custom-select"}
            options={get(formData, "result.data.groupTypes", [])}
            defaultValue={get(item, "groupType.id") ?? " "}
            name={"groupTypeId"}
            label={t("grouptype") ?? "grouptype"}
            params={{ required: true }}
            valueKey={"id"}
            labelKey={"name"}
          />
          <Field
            type={"input"}
            property={{ type: "number" }}
            name={"price"}
            defaultValue={String(get(item, "price", ""))}
            label={t("dan") ?? "Dan"}
            params={{ required: true }}
          />
        </Col>
        <Col xs={12}>
          <Flex justify={"flex-end"} align={"center"}>
            <Field
              defaultValue={get(item, "active")}
              type={"checkbox"}
              sm
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
  name,
  specializationList,
  groupTypeList,
  getFormData,
  formData,
  branches,
  specialization,
  groupType,
  entities,
  ...rest
}) => {
  useEffect(() => {
    getFormData();
  }, []);

  const test = [{ name: "btest5" }, { name: "atest1" }, { name: "test6" }, { name: "test2" }];
  const test2 = [{ name: 5 }, { name: "test4" }, { name: 2 }, { name: "test2" }];
  const randomAlphabet = [
    { name: "s" },
    { name: "t" },
    { name: "u" },
    { name: "v" },
    { name: "a" },
    { name: "x" },
    { name: "b" },
    { name: "z" },
  ];

  const stortData = (data) => {
    const sortStringAndNumber = (a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    };
    return data.sort(sortStringAndNumber);
  };

  console.log(stortData(test));

  return (
    <>
      <GridView
        url={{
          list: "education/v1/specialization-price",
          one: "education/v1/specialization-price",
          add: "education/v1/specialization-price",
          update: "education/v1/specialization-price",
          delete: "education/v1/specialization-price",
        }}
        storeName="specialization-price-list"
        entityName="specialization-price-grid"
        scheme={SpecializationPriceGridScheme}
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
            name: "Branch Name",
            id: "1",
            type: "branch.name",
            customField: "branch.name",
            searchable: true,
          },
          {
            name: "Specialization Name",
            id: "2",
            type: "specialization.name",
            customField: "specialization.name",
            searchable: true,
          },
          {
            name: "GroupType Name",
            id: "3",
            type: "groupType.name",
            customField: "groupType.name",
            searchable: true,
          },
          {
            name: "Price",
            id: "4",
            type: "price",
            customField: "price",
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
                Header: `${t("branch") ?? "Branch"}`,
                accessor: "branch.name",
                width: 150,
              },
              {
                Header: `${t("title") ?? "Title"}`,
                accessor: "specialization.name",
                width: 150,
              },
              {
                Header: `${t("group_title") ?? "Group title"}`,
                accessor: "groupType.name",
                width: 150,
              },
              {
                Header: `${t("price") ?? "Price"}`,
                accessor: "price",
                width: 150,
                Cell: ({ value, props }) => new Intl.NumberFormat("fr-FR", { currency: "UZS" }).format(value),
              },
              {
                Header: `${t("status") ?? "Status"}`,
                accessor: "active",
                status: "true",
                width: 50,
              },
              {
                Header: `${t("action") ?? "Action"}`,
                accessor: "action",
                width: 50,
              },
            ],
          },
        ]}
        row={["id", "number", "specialization.name", "groupType.name"]}
        modalTitle={t("specialization_price") ?? "SPECIALIZATION PRICE"}
      />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    formData: get(state, "api.sales-special-price-form-data.data", {}),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFormData: () => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: "education/v1/specialization-price/form",
          method: "get",
          storeName: "sales-special-price-form-data",
        },
      });
    },
  };
};
export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(ListContainer));
