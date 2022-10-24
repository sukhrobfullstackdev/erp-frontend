import React, { useCallback, useEffect, useState } from "react";
import { get, isEmpty } from "lodash";
import { connect } from "react-redux";
import { Col, Row } from "react-grid-system";

import GridView from "../../../../containers/GridView/GridView";
import FormDemo from "../../../../containers/Form/form-demo";
import Field from "../../../../containers/Form/field";
import Flex from "../../../../components/elements/flex";
import Button from "../../../../components/elements/button";
import SpecializationDiscountGridScheme from "../../../../schema/SpecializationDiscountGridScheme";
import ApiActions from "../../../../services/api/actions";
import Icon from "../../../../components/elements/icon";

let dataForForm = {};
const ModalBody = ({ addOrEdit, cancel, item, btnText = "Add", openModal, discountData, status }) => {
  const [state, setState] = useState({
    addRow: [
      {
        timeTableCount: "",
        amount: "",
        discountType: "",
        id: Math.floor(Math.random() * 9876543210),
      },
    ],
    items: get(item, "discounts", []),
    render: false,
  });

  useEffect(() => {
    setState({
      addRow: [
        {
          timeTableCount: "",
          amount: "",
          discountType: "",
          id: Math.floor(Math.random() * 9876543210),
        },
      ],
      items: get(item, "discounts", []),
    });
  }, [item]);

  useEffect(() => {
    return () => {
      console.log("unmount");
    };
  }, []);

  let temp = {};

  let payment = {
    options: [
      { id: 2, name: "PRICE" },
      { id: 1, name: "PERCENT" },
    ],
  };

  useEffect(() => {
    if (openModal == false) {
      temp = {
        resetData: {
          branchId: "",
          specializationId: "",
          groupTypeId: "",
          discounts: [],
        },
      };
      setState((s) => ({
        ...s,
        addRow: [
          {
            timeTableCount: "",
            amount: "",
            discountType: "",
            id: Math.floor(Math.random() * 9876543210),
          },
        ],
        items: [],
      }));
    }
  }, [openModal]);

  // if (openModal == false) {
  //   temp = {
  //     resetData: {
  //       branchId: "",
  //       specializationId: "",
  //       groupTypeId: "",
  //       discounts: [],
  //     },
  //   };
  //   setState((s) => ({
  //     ...s,
  //     addRow: [
  //       {
  //         timeTableCount: "",
  //         amount: "",
  //         discountType: "",
  //         id: Math.floor(Math.random() * 9876543210),
  //       },
  //     ],
  //     // items: [],
  //   }));
  // }

  // openModal === false ? state.items == [] : state.items;

  const educationCallBack = useCallback(({ getValues, setValue, id }) => {
    let getEducation = getValues(`discounts`);
    delete getEducation[id];
    setValue(`discounts`, getEducation);
  }, []);

  const deleteEducation = useCallback((id) => {
    dataForForm = {
      ...dataForForm,
      formCb: educationCallBack,
      dataForCb: { id },
    };
    setState((s) => ({ ...s, render: true }));
  }, []);

  const addCustomRow = () => {
    state.items == []
      ? setState((s) => ({
          ...s,
          addRow: [
            ...s.addRow,
            {
              timeTableCount: "",
              amount: "",
              discountType: "",
              id: Math.floor(Math.random() * 9876543210),
            },
          ],
        }))
      : setState((s) => ({
          ...s,
          items: [
            ...s.items,
            {
              timeTableCount: "",
              amount: "",
              discountType: "",
              id: Math.floor(Math.random() * 9876543210),
            },
          ],
        }));
  };

  const removeCustomRow = (index, id) => {
    setState((s) => {
      return {
        ...s,
        addRow: s.addRow.filter((row, i) => i !== index),
        items: s.items.filter((row, i) => i !== index),
      };
    });

    deleteEducation(id);
  };

  return (
    <FormDemo
      {...dataForForm}
      {...temp}
      formRequest={(data) => {
        console.log(data.data);
        // data.data = { ...data.data, discounts: Object.values(data.data.discounts) };
        // addOrEdit(get(item, "id", null), data);
      }}
    >
      <Row>
        <Col xs={12} className={"mb-15"}>
          <Field
            type={"custom-select"}
            options={get(discountData, "branches.options", [])}
            defaultValue={get(item, "branch.id") ?? " "}
            name={"branchId"}
            label={"choose a branch"}
            params={{ required: true }}
            valueKey={"id"}
            labelKey={"name"}
          />
          <Field
            type={"custom-select"}
            options={get(discountData, "specializations.options", [])}
            defaultValue={get(item, "specialization.id") ?? " "}
            name={"specializationId"}
            label={"choose a speciality"}
            params={{ required: true }}
            valueKey={"id"}
            labelKey={"name"}
          />
          <Field
            type={"custom-select"}
            options={get(discountData, "groupTypes.options", [])}
            defaultValue={get(item, "groupType.id") ?? " "}
            name={"groupTypeId"}
            label={"SELECT A GROUP TYPE"}
            params={{ required: true }}
            valueKey={"id"}
            labelKey={"name"}
          />
          {(isEmpty(state.items) ? state.addRow : state.items).map((val, ind) => (
            <Flex align="center" justify="between" key={val.id}>
              <Row style={{ maxWidth: "600px" }}>
                <Col xs={6} style={{ paddingRight: "0" }}>
                  <Field
                    type={"input"}
                    property={{ type: "number" }}
                    name={`discounts.${val.id}.timeTableCount`}
                    defaultValue={String(get(val, `timeTableCount`, 0))}
                    label={"ENTER TIMETABLE NUMBER"}
                    params={{ required: true }}
                  />
                </Col>
                <Col xs={6}>
                  <div className="inputSelect">
                    <Field
                      type={"input"}
                      property={{ type: "number" }}
                      name={`discounts.${val.id}.amount`}
                      defaultValue={String(get(val, `amount`, 0))}
                      label={"ENTER THE DISCOUNT AMOUNT"}
                      params={{ required: true }}
                      rowClassName="customInput"
                    />
                    <Field
                      type={"custom-select"}
                      options={get(payment, "options", [])}
                      name={`discounts.${val.id}.discountType`}
                      defaultValue={String(get(val, `discountType`, " "))}
                      nullable={false}
                      hideLabel
                      valueKey={"name"}
                      labelKey={"name"}
                      rowClassName="customSelect"
                      colClassName="customSelectCol"
                      isSearchable={false}
                    />
                    <div className="stick"></div>
                    {ind === 0 && (
                      <Button className="plusBtn" onCLick={addCustomRow} success>
                        +
                      </Button>
                    )}
                    {ind !== 0 && (
                      <Button className="plusBtn" onCLick={() => removeCustomRow(ind, val.id)} danger>
                        <Icon icon="icon-deleteDisabled" color="#fff" />
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>
            </Flex>
          ))}
        </Col>
        <Col xs={12}>
          <Flex justify={"flex-end"} align={"center"}>
            <Button outlineDanger className="cancelBtn" onCLick={cancel}>
              Cancel
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
  getDiscountData,
  discountData,
  branches,
  specialization,
  groupType,
  entities,
  ...rest
}) => {
  useEffect(() => {
    getDiscountData();
  }, []);

  const customColumn = (cell) => {
    return (
      <Flex align="center" justify="between">
        {get(cell, "row.original.discounts", []).map(
          (val, ind) =>
            `${get(val, "timeTableCount", 0)} Months
          - ${get(val, "amount", 0)}${get(val, "discountType", "") === "PERCENT" ? "%" : " UZS"} ${
              ind === get(cell, "row.original.discounts", []).length - 1 ? "" : "/ "
            }`
        )}
      </Flex>
    );
  };

  return (
    <>
      <GridView
        url={{
          list: "education/v1/specialization-discount",
          one: "education/v1/specialization-discount",
          add: "education/v1/specialization-discount",
          update: "education/v1/specialization-discount",
          delete: "education/v1/specialization-discount",
        }}
        storeName="specialization-discount-list"
        entityName="specialization-discount-grid"
        scheme={SpecializationDiscountGridScheme}
        params={{}}
        disabledOnClose
        hasModal={{ create: true, update: true, delete: true }}
        ModalBody={ModalBody}
        dataForModal={{
          discountData,
        }}
        searchFields={[
          {
            name: "Branch",
            id: "1",
            type: "branch.name",
            customField: "branch.name",
            searchable: true,
          },
          {
            name: "Specialization",
            id: "2",
            type: "specialization.name",
            customField: "specialization.name",
            searchable: true,
          },
          {
            name: "Group Type",
            id: "3",
            type: "groupType.name",
            customField: "groupType.name",
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
                width: 50,
              },

              {
                Header: "Branch",
                accessor: "branch.name",
                width: 150,
              },
              {
                Header: "Specialization",
                accessor: "specialization.name",
                width: 150,
              },
              {
                Header: "Group Type",
                accessor: "groupType.name",
                width: 150,
              },
              {
                Header: "Duration",
                accessor: "timeTableCount",
                width: 100,
                customColumn: ({ cell }) => {
                  return <div>{get(cell, "row.original.timeTableCount", "") + " Months"}</div>;
                },
              },
              {
                Header: "Discount",
                accessor: "price",
                width: 250,
                customColumn: ({ cell }) => customColumn(cell),
              },
              {
                Header: "Action",
                accessor: "action",
                width: 50,
              },
            ],
          },
        ]}
        row={["id", "number", "specialization.name", "groupType.name"]}
        modalTitle={"DISCOUNTS FOR SPECIALISTS"}
      />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    discountData: get(state, "api.sales-special-discount-form-data.data.result.data", {}),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDiscountData: () => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: "education/v1/specialization-discount/form",
          method: "get",
          storeName: "sales-special-discount-form-data",
        },
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
