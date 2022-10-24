import React, { useEffect } from "react";
import styled from "styled-components";
import Table from "../../../../components/table/table";
import { get } from "lodash";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ApiActions from "../../../../services/api/actions";
import FormDemo from "../../../../containers/Form/form-demo";
import Button from "../../../../components/elements/button";

const Styled = styled.div`
  .wrapper {
    margin: 32px 38px 40px;
    border-radius: 12px;
    border: 1px solid #e6e8ec;
    background: #fff;
  }
  .hr {
    height: 1px;
    width: 100%;
    background: #e6e8ec;
  }
  .table-Wrapper {
    display: flex;
    background: #f4f5f6;
    align-items: center;
    border-radius: 8px;
    margin: 20px;
    table {
      width: 100%;
    }
    thead {
      border-bottom: 1px solid #e6e8ec;
    }
    th {
      padding: 20px 10px;
      font-weight: 500;
      font-size: 12px;
      line-height: 24px;
      text-align: center;
      color: #353945;
    }
    td {
      padding: 20px 10px;
      font-weight: 500;
      font-size: 12px;
      line-height: 24px;
      text-align: center;
      color: #353945;
    }
  }
  .tableWrapper {
    margin: 20px;
  }
  .total-price {
    background: #fcfcfd;
    border: 1px solid #f4f5f6;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
    margin: 20px;
    .price {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #353945;
    }
  }
  .tableWrapper {
    table {
      width: 100%;
      tr {
        td {
          text-align: center;
        }
        th {
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;
          text-align: center;
          color: #ffffff;
        }
        th:nth-child(1) {
          padding: 0;
          width: 50px;
        }

        th:nth-child(2) {
          display: flex;
          justify-content: start;
          align-items: center;
        }

        th:last-child {
          display: flex;
          align-items: center;
          justify-content: end;
        }
        td:nth-child(1) {
          padding: 0;
          width: 50px;
        }

        td:nth-child(2) {
          display: flex;
          justify-content: start;
          align-items: center;
        }

        td:last-child {
          display: flex;
          align-items: center;
          justify-content: end;
        }
      }
    }
  }
  .total-price {
    span {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #353945;
    }
    span:nth-child(2) {
      margin-left: 13.7%;
    }
    span:nth-child(3) {
      margin-left: 7.4%;
    }
    span:nth-child(4) {
      margin-left: 8.2%;
    }
    span:nth-child(5) {
      margin-left: 8.5%;
    }
    span:nth-child(6) {
      margin-left: 9.4%;
    }
    span:nth-child(7) {
      margin-left: 7%;
    }
    span:nth-child(8) {
      margin-left: 10.6%;
    }
    span:nth-child(9) {
      margin-left: 10.7%;
    }
    span:nth-child(10) {
      width: 235px;
      display: flex;
      align-items: center;
      justify-content: end;
    }
  }
`;
const ListContainer = ({ getDataOfEmployeeInfo, formData }) => {
  const paidInfoData = get(formData, "data.result.data.employeePaidInfo", []);
  const infoData = get(formData, "data.result.data.employmentInfo", []);
  const salaryInfoData = get(formData, "data.result.data.employeeSalaryInfo", []);
  useEffect(() => {
    getDataOfEmployeeInfo("888d5cfe-6fba-42dc-80d5-8006b51a67d2");
  }, []);
  const salaryColumns = React.useMemo(
    () => [
      {
        Header: "a",
        columns: [
          {
            Header: "#",
            accessor: "number",
          },
          {
            Header: "DATE",
            accessor: "data",
            date: true,
            format: "dd/mm/yyyy",
          },
          {
            Header: "SALARY",
            accessor: "salary",
          },
          {
            Header: "BONUS ACCRUAL",
            accessor: "bonus",
          },
          {
            Header: "Premium",
            accessor: "premium",
          },
          {
            Header: "advanceSalary",
            accessor: "advanceSalary",
          },
          {
            Header: "ACCOUNTED",
            accessor: "additional",
          },
          {
            Header: "TAX SUM",
            accessor: "taxAmount",
          },
          {
            Header: "AFTER TAX CALCULATION",
            accessor: "totalSalary",
          },
          {
            Header: "CATCHES",
            accessor: "retentionSalary",
          },
          {
            Header: "TOTAL QUANTITY",
            accessor: "mustBePaid",
          },
        ],
      },
    ],
    []
  );
  const paidColumns = React.useMemo(
    () => [
      {
        Header: "a",
        columns: [
          {
            Header: "#",
            accessor: "number",
          },
          {
            Header: "DATE",
            accessor: "createDate",
            date: true,
            format: "dd/mm/yyyy",
          },
          {
            Header: "ADD HANDOVER",
            accessor: "branch",
          },
          {
            Header: "TOTAL QUANTITY",
            accessor: "amount",
          },
        ],
      },
    ],
    []
  );
  const update = (data) => {};
  return (
    <Styled checkable={true}>
      <div className="wrapper">
        <div className="table-Wrapper">
          <table>
            <thead>
              <tr>
                <th>FIO</th>
                <th>SECTION</th>
                <th>POSITION</th>
                <th>CATEGORY</th>
                <th>PAYMENT CRITERIA</th>
                <th>SALARY</th>
                <th>CONTRACT FORM</th>
                <th>BET</th>
                <th>PHONE</th>
                <th>WORKING DAYS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{get(infoData, "fullName")}</td>
                <td>{get(infoData, "department")}</td>
                <td>{get(infoData, "position")}</td>
                <td>{get(infoData, "employeeCategory")}</td>
                <td>{get(infoData, "paymentCriteriaType")}</td>
                <td>{get(infoData, "fullName")}</td>
                <td>{get(infoData, "contractForm")}</td>
                <td>{get(infoData, "fullName")}</td>
                <td>{get(infoData, "phoneNumber")}</td>
                <td>{get(infoData, "workingDays")}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="hr"></div>
        <div className="tableWrapper salary">
          <Table data={get(salaryInfoData, "salaries", [])} checkable={true} number={true} columns={salaryColumns} />
        </div>
        <div className="total-price">
          <span>TOTAL:</span>
          <span className="price">{get(salaryInfoData, "salary", "-")}</span>
          <span className="price">{get(salaryInfoData, "bonus", "-")}</span>
          <span className="price">{get(salaryInfoData, "premium", "-")}</span>
          <span className="price">{get(salaryInfoData, "advanceSalary", "-")}</span>
          <span className="price">{get(salaryInfoData, "additional", "-")}</span>
          <span className="price">{get(salaryInfoData, "taxAmount", "-")}</span>
          <span className="price">{get(salaryInfoData, "totalSalary", "-")}</span>
          <span className="price">{get(salaryInfoData, "retentionSalary", "-")}</span>
          <span className="price">{get(salaryInfoData, "mustBePaid", "-")}</span>
        </div>
        <div className="total-price">
          <span>THE REST:</span>
          <span className="price">{get(salaryInfoData, "debt", "-")}</span>
        </div>
        <div className="hr"></div>
        <div className="tableWrapper ">
          <Table data={get(paidInfoData, "paidHistories", [])} checkable={true} number={true} columns={paidColumns} />
        </div>
        <div className="total-price">
          <span>TOTAL</span>
          <span className="price">{get(paidInfoData, "total", "-")}</span>
        </div>
      </div>
    </Styled>
  );
};
const mapStateToProps = (state) => {
  return {
    formData: get(state, "api.employee-info-data", {}),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDataOfEmployeeInfo: (id) => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: `finance/v1/payroll/employee/${id}`,
          method: "get",
          storeName: "employee-info-data",
        },
      });
    },
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListContainer));
