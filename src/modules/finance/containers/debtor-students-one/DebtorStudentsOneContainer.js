import React, { memo, useEffect, useState } from "react";
import ApiActions from "../../../../services/api/actions";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { get } from "lodash";
import { Container, Row, Col } from "react-grid-system";
import { useTable } from "react-table";
import { toast } from "react-toastify";

import { formatDate, numberPrettier } from "utils";
import logo from "../../../../assets/images/dark-logo.svg";
import Tabs from "components/tabs";
import FormDemo from "containers/Form/form-demo";
import Feild from "containers/Form/field";
import Button from "components/elements/button";
import actions from "services/normalizer/actions";

const DebtorStudentsOneContainer = ({
  t,
  match: {
    params: { id },
  },
  request,
  getData,
  apiData,
  modalRequest,
  history,
  setEntityOne,
  updateNormalizerData,
  normizerData,
  ...rest
}) => {
  const [paymentType, setPaymentType] = useState(0);

  useEffect(() => {
    getData(id);
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "cashier",
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ value }) => formatDate(new Date(value), "dd / MM / yyyy"),
      },
      {
        Header: "Payment type",
        accessor: "paymentType",
      },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: ({ value }) => numberPrettier(value),
      },
    ],
    []
  );

  const data = React.useMemo(() => get(apiData, "paymentHistories", []), [apiData]);
  const paymentTypes = React.useMemo(() => get(apiData, "paymentTypes", []).map((item) => get(item, "name")), [apiData]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  const submitHandling = ({ data }) => {
    if (get(apiData, "paymentTypes", []).length) {
      data.invoiceId = id;
      data.paymentTypeId = get(apiData, `paymentTypes[${paymentType}].id`, null);
      data.amount = data.amount.replaceAll(",", "").replaceAll(" ", "");
      request({
        attributes: data,
        url: `finance/v1/invoice/pay-debtor-invoice`,
        method: "post",
        cb: {
          success: (res) => {
            getData(id);
            // updateNormalizerData({ data: normizerData.filter((item) => item !== id), storeName: "debtor-students" });
            // setEntityOne({
            //   id,
            //   data: {},
            //   entity: "debtor-students",
            //   trigger: true,
            // });
            //
            // history.push(`/finance/finance/debtor-students`);
          },
          fail: (err) => "",
        },
      });
    } else toast.error("Please select payment type");
  };

  console.log("render");
  return (
    <div className="pageContainer">
      {/* <SalesModal></SalesModal> */}
      <img className={"logo"} src={logo} alt="logo" />

      <p className="head-title">{t("user_invoice") ?? "User invoice"}</p>
      <div className="card-head">
        <div className="head">
          <div className="card-box">
            <p className="title">{t("payer") ?? "Payer"}</p>
            {/* <p className="description">{get(data, "specialization.name", "")}</p> */}
            <p className="description">{get(apiData, "payer")}</p>
          </div>
          <div className="card-box">
            <p className="title">{t("date_of_issue") ?? "Date of issue"}</p>
            <p className="description">
              {get(apiData, "createdDate") && formatDate(new Date(get(apiData, "createdDate")), "dd / MM / yyyy")}
            </p>
          </div>
          <div className="card-box">
            <p className="title">{t("deadline") ?? "Deadline"} </p>
            <p className="description">
              {get(apiData, "deadline") && formatDate(new Date(get(apiData, "deadline")), "dd / MM / yyyy")}
            </p>
          </div>
          <div className="card-box">
            <p className="title">{t("invoice_number") ?? "Invoice number"}</p>
            <p className="description">{get(apiData, "invoiceNumber")}</p>
          </div>
          <div className="card-box">
            <p className="title">{t("amount") ?? "Amount"}</p>
            <p className="description">
              <p className="description">{numberPrettier(get(apiData, "amount", ""))}</p>
            </p>
          </div>
        </div>
        <hr />
        {get(apiData, "details", []).map((item) => (
          <div className="head" key={item?.id}>
            <div className="card-box">
              <p className="title">{t("course") ?? "Course"}</p>
              <p className="description">{get(item, "specialty")}</p>
            </div>
            <div className="card-box">
              <p className="title">{t("group") ?? "Group"}</p>
              <p className="description">{get(item, "group")}</p>
            </div>
            <div className="card-box">
              <p className="title">{t("start_date") ?? "Start date"} </p>
              <p className="description">
                {get(item, "group") && formatDate(new Date(get(item, "startDate"), "dd / MM / yyyy"))}
              </p>
            </div>
            <div className="card-box">
              <p className="title">{t("duration") ?? "Duration"}</p>
              <p className="description">{get(item, "timetableCount")} Timetable</p>
            </div>
            <div className="card-box">
              <p className="title">{t("loan") ?? "Loan"}</p>
              <p className="description">{get(item, "loan") && numberPrettier(get(item, "loan"))}</p>
            </div>
            <div className="card-box">
              <p className="title">{t("amount") ?? "Amount"}</p>
              <p className="description">{get(item, "amount") && numberPrettier(get(item, "amount"))} </p>
            </div>
          </div>
        ))}
      </div>

      <p className="head-title">{t("payment_history") ?? "Payment history"}</p>
      <div className="card-head">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <hr />
      <div className="">
        <Container>
          <Row>
            <Col md={6}>
              <p className="head-title">Make a payment</p>
              <FormDemo formRequest={submitHandling}>
                <div>
                  <Tabs
                    setActiveTab={setPaymentType}
                    leftList={paymentTypes}
                    leftContent={["", "", ""]}
                    rightList={[]}
                    rughtContent={[]}
                    afterLeftList={
                      <Feild type="custom-datepicker2" name="date" hideLabel placeholder="" defaultValue={new Date().getTime()} />
                    }
                  ></Tabs>
                </div>
                <Feild
                  type="input"
                  name="amount"
                  hideLabel
                  label="amount"
                  placeholder="Enter amount..."
                  property={{ type: "money" }}
                  params={{ required: true }}
                >
                  <Button type="submit" success="1">
                    {t("pay") ?? "Pay"}
                  </Button>
                </Feild>
              </FormDemo>
              <p className="first-row-of-footer">
                Inflex, Inc (78) <br /> 777-47-47
              </p>
              <p>Toshkent shahar Shayhontohur tumani,Beruniy ko‘chasi, 3A-uy</p>
            </Col>
            <Col md={6}>
              <div className="head-title">{t("balance") ?? "Balance"}</div>
              <div className="card-head">
                <div>
                  <div className="line">
                    <p className="title">{t("total") ?? "Total"}</p>
                    <p className="price">{get(apiData, "total") && numberPrettier(get(apiData, "total"))}</p>
                  </div>
                  <div className="line">
                    <p className="title">{t("paid") ?? "Paid"}</p>
                    <p className="price">{get(apiData, "paid") && numberPrettier(get(apiData, "paid"))}</p>
                  </div>
                  <div className="line">
                    <p className="title">{t("discount") ?? "Discount"}</p>
                    <p className="price">{get(apiData, "discount") && numberPrettier(get(apiData, "discount"))}</p>
                  </div>
                </div>
                <div>
                  <hr />
                  <div className="line">
                    <p className="title">{t("total_loan") ?? "Total loan"}</p>
                    <p className="price">{get(apiData, "loan") && numberPrettier(get(apiData, "loan"))}</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    apiData: get(state, "api.debtor-student-one.data.result.data", {}),
    normizerData: get(state, "normalizer.data.debtor-students-view-data-list.result.data", []),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (id) => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: `finance/v1/invoice/info-debtor-invoice/${id}`,
          method: "get",
          storeName: "debtor-student-one",
          cb: {
            fail: (e) => "",
          },
        },
      });
    },
    modalRequest: ({ position, body, props }) => {
      dispatch({
        type: ApiActions.GLOBAL_MODAL.REQUEST,
        payload: { position, body, props },
      });
    },
    request: ({ url, method = "get", cb, attributes }) => {
      dispatch({
        type: ApiActions.REQUEST.REQUEST,
        payload: {
          attributes,
          method,
          url,
          cb,
        },
      });
    },
    setEntityOne: ({ data, id, entity, trigger = false }) => {
      dispatch({
        type: actions.UPDATE_NORMALIZER_ENTITY_ONE.REQUEST,
        payload: {
          data,
          entity: entity ? entity : `debtor-students`,
          id,
          trigger,
        },
      });
    },
    updateNormalizerData: ({ data, storeName }) => {
      dispatch({
        type: actions.UPDATE_NORMALIZER_DATA.REQUEST,
        payload: {
          data,
          storeName,
        },
      });
    },
  };
};

export default withRouter(withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(DebtorStudentsOneContainer)));
