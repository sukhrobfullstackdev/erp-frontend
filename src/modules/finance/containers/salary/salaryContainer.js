import React, { useMemo, useEffect, useState } from "react";
import CustomTable from "../../../../components/customTable";
import { get, isEmpty, isNaN, isNil, isUndefined } from "lodash";
import { connect } from "react-redux";
import ApiActions from "../../../../services/api/actions";
import { getSelectOptionsListFromData } from "../../../../utils";
import Button from "../../../../components/elements/button";
import FormDemo from "../../../../containers/Form/form-demo";
import Field from "../../../../containers/Form/field";
import Icon from "../../../../components/elements/icon";
import linedIcon from "../../../../assets/icons/line.svg";
import verticalLine from "../../../../assets/icons/verticalLine.svg";
import { count } from "rsuite/esm/utils/ReactChildren";
import SimpleBar from "simplebar-react";
import Fade from "rsuite/esm/Animation/Fade";
import { useHistory } from "react-router-dom";

const SalaryContainer = ({ tableId, sendCheckedRowId, addItemRequest }) => {
  const [counter, setCounter] = useState({
    rows: [],
    selected: [],
    options: [],
    employeeData: [],
    employeePayment: [],
    cashPayment: [],
  });
  const history = useHistory();

  const addSelect = (ind, id) => {
    let res = counter.options.filter((val, ind) => val.cashId !== counter.rows.find((value, index) => value === val.cashId));
    if (!isEmpty(res)) {
      counter.options.length !== counter.rows.length &&
        setCounter((s) => ({
          ...s,
          rows: [...s.rows, get(res, `[0].cashId`, ind + 1)],
        }));
    }
  };

  const deleteSelect = (ind, val) => {
    delete counter.selected[ind];
    setCounter((s) => ({
      ...s,
      rows: [...s.rows.filter((item) => item !== val)],
      selected: { ...counter.selected },
    }));
  };

  const deleteRow = (index) => {
    if (index !== null) {
      let res = counter.employeeData.filter((val, ind) => ind !== index);
      let res1 = counter.employeePayment.filter((val, ind) => ind !== index);
      setCounter({
        ...counter,
        employeeData: res,
        employeePayment: res1,
      });
    }
  };

  useEffect(() => {
    if (!isEmpty(tableId))
      sendCheckedRowId({
        attributes: tableId,
        cb: {
          success: (res) => {
            let options = getSelectOptionsListFromData(get(res, "data.cashRegisters", []), "cashId", "name", "other");
            setCounter({
              ...counter,
              options,
              rows: [get(options, `[0].value`, {})],
              employeeData: get(res, "data.payWages", []),
              employeePayment: get(res, "data.payWages", []).map((val) => val.residue),
            });
          },
          fail: (err) => "",
        },
      });
  }, []);

  const salaryColumns = [
    {
      Header: "name",
      columns: [
        {
          Header: "#",
          accessor: "number",
          width: 50,
        },
        {
          Header: "FIO",
          accessor: "fullName",
        },
        {
          Header: "SECTION",
          accessor: "department",
        },
        {
          Header: "POSITION",
          accessor: "position",
        },
        {
          Header: "THE AMOUNT TO BE RECEIVED",
          accessor: "residue",
        },
        {
          Header: "LOAN",
          accessor: "amount",
          customColumn: ({ cell }) => {
            return (
              <div style={{ display: "flex" }}>
                <FormDemo>
                  <Field
                    className={"input"}
                    type="input"
                    hideLabel
                    onChange={(value) => employeePaymentData(value, get(cell, "row.index", null))}
                    property={{ type: "number" }}
                    name={"input9"}
                    defaultValue={String(get(cell, "value", ""))}
                  />
                </FormDemo>
                <div
                  style={{
                    display: "grid",
                    placeItems: "center center",
                  }}
                >
                  <Button danger className="deleteBtn" onClick={() => deleteRow(get(cell, "row.index", null))}>
                    <Icon icon="icon-delete" color="#FCFCFD" />
                  </Button>
                </div>
              </div>
            );
          },
        },
      ],
    },
  ];

  const newData = {
    payWages: counter.employeeData.map((val, ind) => ({
      id: val.id,
      amount: val.amount,
    })),

    cashRegisters: counter.rows.map((val, ind) => ({
      cashId: val,
      amount: parseInt(counter.cashPayment[ind]),
    })),
  };

  const payToEmployees = () => {
    addItemRequest({
      attributes: newData,
      formMethods: {},
      cb: {
        success: (res) => {
          setCounter({ ...counter });
        },
        fail: (res) => {
          setCounter({ ...counter });
        },
      },
    });
  };

  const employeePaymentData = (value, index) => {
    counter.employeePayment[index] = value;
    let sum = eval(get(counter, "employeePayment", []).join(" + "));
    setCounter({ ...counter, employeePayment: sum });
    setCounter({ ...counter });
  };

  const onCashInputChange = (value, index) => {
    if (value.length > 0) {
      counter.cashPayment[index] = value;
      setCounter({ ...counter });
    } else if (value.length <= 0) counter.cashPayment[index] = "0";
    setCounter({ ...counter });
  };

  const getValueFromOptionsByKey = (keys, index, id) => {
    let res = counter.options.find((item) => get(item, "value") === id);
    return res ? get(res, keys, "name" + index) : "name" + index;
  };

  const disableSelectedOptions = () => Object.values(counter.selected);

  const residualAmount = () => {
    let residual = eval(
      eval(get(counter, "cashPayment", []).join(" + ")) - eval(get(counter, "employeePayment", []).join(" + "))
    );
    return isNaN(residual) ? 0 : residual;
  };

  const totalAmount = () => {
    return eval(get(counter, "employeePayment", []).join(" + "));
  };

  const onSelectOption = (item, ind) => {
    !isUndefined(item) &&
      setCounter({
        ...counter,
        selected: { ...counter.selected, [ind]: item },
        options: get(counter, "options", []).filter((val) => val.currencyType === item.currencyType),
      });
  };

  const autoCalcBtn = () => {
    let totalAmount = isUndefined(eval(get(counter, "cashPayment", []).join(" + ")))
      ? 0
      : eval(get(counter, "cashPayment", []).join(" + "));
    let calc = totalAmount / counter.employeeData.length;
    setCounter({
      ...counter,
      employeeData: counter.employeeData.map((val) => ({
        ...val,
        amount: calc,
      })),
    });
  };

  return (
    <div className="wrapper">
      <CustomTable data={counter.employeeData} columns={salaryColumns} md />
      <div className="cashRegister">
        <SimpleBar className="leftContent">
          <FormDemo>
            {counter.rows.map((val, ind) => (
              <div className="firstRow" key={getValueFromOptionsByKey("cashId", ind, val)}>
                <Field
                  type="custom-select"
                  name="select"
                  disabledSomeOptions={disableSelectedOptions()}
                  onChange={(value, item) => onSelectOption(item, ind)}
                  // defaultValue={get(counter, `rows[${ind}]`, '')}
                  options={counter.options}
                />
                <Field
                  type="input"
                  name={getValueFromOptionsByKey("name", ind, val)}
                  className="form-input"
                  label={`Non-existent amount : ${getValueFromOptionsByKey("amount", ind, val)} ${getValueFromOptionsByKey(
                    "currencyType",
                    ind,
                    val
                  )}`}
                  onChange={(value) => onCashInputChange(value, ind)}
                  property={{ type: "number" }}
                  disabled={isEmpty(counter.selected)}
                />
                <div className="btnBox">
                  <Button
                    className="minus"
                    onClick={() =>
                      !(counter.rows.length === 1) && deleteSelect(getValueFromOptionsByKey("cashId", ind, val), val)
                    }
                    disabled={counter.rows.length === 1}
                  >
                    <img src={linedIcon} alt="" />
                  </Button>
                  <img src={verticalLine} alt="verticalLine" />
                  <Button
                    success
                    className="plus"
                    disabled={(counter.rows.length - 1 !== ind, isEmpty(counter.selected))}
                    onClick={() => addSelect(ind, getValueFromOptionsByKey("cashId", ind, val))}
                  >
                    <Icon
                      icon="icon-exit"
                      color="#fff"
                      style={{
                        transform: "rotate(136deg)",
                      }}
                    />
                  </Button>
                </div>
              </div>
            ))}
          </FormDemo>
        </SimpleBar>
        <div className="rightContent">
          <div className="keyValues">
            <div className="totalSumKeys">
              <p>total collected amount</p>
              <p>residual amount</p>
              <p>total amount</p>
            </div>
            <div className="totalSumValues">
              <p>
                {totalAmount()}
                <span>{get(counter.options, "currencyType", " UZS")}</span>
              </p>
              <p>
                {residualAmount()} <span>{get(counter.options, "currencyType", "UZS")}</span>
              </p>
              <p>
                {isUndefined(eval(get(counter, "cashPayment", []).join(" + ")))
                  ? 0
                  : eval(get(counter, "cashPayment", []).join(" + "))}
                <span>{get(counter.options, "currencyType", " UZS")} </span>
              </p>
            </div>
          </div>
          <div className="autoBtn" onClick={autoCalcBtn}>
            <Button outline_success>Auto</Button>
          </div>
        </div>
      </div>
      <div className="salaryFooter">
        <Button className="footerCancel" onClick={() => history.push("/finance/finance/payroll")}>
          Cancel
        </Button>
        <Button success onClick={payToEmployees} disabled={residualAmount() !== 0}>
          Pay
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    tableId: get(state, "api.tableId", {}),
    payWagesData: get(state, "api.payWagesData.data", {}),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendCheckedRowId: ({ attributes, formMethods, cb }) => {
      dispatch({
        type: ApiActions.REQUEST.REQUEST,
        payload: {
          attributes,
          formMethods,
          method: "post",
          storeName: "payWagesData",
          cb,
          url: `finance/v1/payroll/pay-wages`,
        },
      });
    },
    addItemRequest: ({ attributes, formMethods, cb }) => {
      dispatch({
        type: ApiActions.OPERATION_ADD.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          url: `finance/v1/payroll/submit`,
        },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SalaryContainer);
