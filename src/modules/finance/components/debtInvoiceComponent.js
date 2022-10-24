import React, { memo } from "react";
import styled from "styled-components";
import Logo from "../../../assets/images/dark-logo.svg";
import Title from "../../../components/elements/title";
import Tab from "../../../components/tabs";
import FormDemo from "../../../containers/Form/form-demo";
import Field from "../../../containers/Form/field";
import CustomTable from "../../../components/customTable/customTable";
import Button from "../../../components/elements/button";

const StyledDebtInvoiceComponent = styled.div`
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid #f4f5f6;
  border-radius: 12px;
  width: 700px;

  img {
    margin-bottom: 45px;
    height: 24px;
  }

  .top_part {
    padding: 40px 30px 20px;
    border-bottom: 1px solid #e6e8ec;

    svg {
      width: 86px;
      height: 24px;
    }

    .invoice {
      background: #fcfcfd;
      border-radius: 8px;
      padding: 16px 30px 20px 20px;
      margin: 8px 0 20px;

      &_row {
        display: flex;
        align-items: center;
        justify-content: space-between;

        :first-child {
          border-bottom: 1px solid #f4f5f6;
          margin-bottom: 16px;
          .invoice_content {
            margin: 12px 0 20px;
          }
        }

        h2 {
          font-weight: 500;
          font-size: 10px;
          line-height: 15px;
        }

        .invoice_title {
          color: #777e91;
        }

        .invoice_content {
          margin-top: 12px;
        }
      }
    }

    .table {
      margin-top: 8px;
      background: #fcfcfd;
      border-radius: 8px;
      padding: 10px;

      div {
        .tr {
          background: #f8f9fa;
          border-radius: 4px;
          height: 24px;
          margin-bottom: 4px;

          .td {
            font-weight: 400 !important;
            font-size: 10px !important;
            line-height: 15px !important;
            color: #353945;

            :first-child {
              padding-left: 0;
            }
            :last-child {
              justify-content: flex-start;
              font-weight: 500 !important;
            }
          }
        }

        :first-child {
          .tr {
            background: #edeff2;
            border-radius: 4px;
            padding: 7px 10px 8px 13px;
            height: 30px;
            margin-bottom: 6px;

            .th {
              font-weight: 500 !important;
              font-size: 10px !important;
              line-height: 15px !important;
              color: #353945;

              :first-child {
                padding-left: 0;
              }

              :last-child {
                justify-content: flex-start;
              }

              :hover {
                background: #edeff2;
                color: #353945;
              }
            }
          }
        }
      }
    }
  }
  .footer_part {
    display: flex;
    align-items: stretch;
    padding: 20px 30px 30px;
    justify-content: space-between;

    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .tab {
      display: flex;
      align-items: flex-start;
      position: relative;

      .datepicker__input {
        display: none;
      }
      .form-date-container {
        position: absolute;
        top: 20px;
        left: -100px;
        padding: 6px;
        background: #f4f5f6;
        border-radius: 6px;
        height: 30px;
        width: 30px;
        cursor: pointer;

        .datepicker__container {
          top: 40px;
        }
      }
      .date__icon {
        width: 18px;
        height: 18px;
        right: 0;
      }
    }

    .tabs {
      width: 100%;
    }
    .tabs__list {
      height: fit-content;
      background: #f4f5f6;
      border-radius: 6px;
      padding: 3px;
      margin: 20px 0 30px;
      width: fit-content;

      .tabs__list__left {
        .tabs__list__tab {
          font-weight: 500;
          font-size: 10px;
          line-height: 15px;
          padding: 5px 17px;
          height: 24px;
          margin: 0;
          color: #000000;
          border-radius: 4px;
        }

        .active {
          background: #45b36b;
          color: #fcfcfd;
        }
      }
    }

    .input {
      display: flex;
      background: #fcfcfd;
      border: 1px solid #f4f5f6;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 3px;
      width: 232px;

      button {
        font-weight: 400;
        font-size: 10px;
        line-height: 15px;
        min-width: 49px;
        border-radius: 4px;
        padding: 5px 15px;
      }
      .form-input-container {
        border: none;
        background-color: transparent;
        .form-input {
          font-weight: 400;
          font-size: 10px;
          line-height: 15px;
          padding: 5px 7px;
        }
      }
    }

    .balance {
      background: #fcfcfc;
      border-radius: 4px;
      width: 240px;
      height: 222px;
      margin-top: 20px;

      .list {
        min-height: 177px;
        padding: 15px;

        .row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
      }
      .total {
        border-top: 1px solid #f4f5f6;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px;
      }
    }
  }
`;

const data = [
  {
    name: "Bessie Cooper",
    date: "05 / 03 / 2022",
    payment: "Cash",
    amount: "5.000.000 UZS",
  },
  {
    name: "Bessie Cooper",
    date: "05 / 03 / 2022",
    payment: "Cash",
    amount: "5.000.000 UZS",
  },
];

const DebtInvoiceComponent = () => {
  const table_columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Date",
            accessor: "date",
            date: true,
            format: "dd/mm/yyyy",
          },
          {
            Header: "Payment type",
            accessor: "payment",
          },
          {
            Header: "Amount",
            accessor: "amount",
          },
        ],
      },
    ],
    []
  );

  return (
    <StyledDebtInvoiceComponent>
      <FormDemo>
        <div className="top_part">
          <img src={Logo} />
          <Title semiBold fs={10} lHeight={15}>
            User invoice
          </Title>
          <div className="invoice">
            <div className="invoice_row">
              <div>
                <Title className="invoice_title">Payer</Title>
                <Title className="invoice_content">James Cooper</Title>
              </div>
              <div>
                <Title className="invoice_title">Date of issue</Title>
                <Title className="invoice_content">24 / 01 / 2022</Title>
              </div>
              <div>
                <Title className="invoice_title">Payment term</Title>
                <Title className="invoice_content">28 / 02 / 2022</Title>
              </div>
              <div>
                <Title className="invoice_title">Invoice number</Title>
                <Title className="invoice_content">INV-e9804578</Title>
              </div>
              <div>
                <Title className="invoice_title">Amount (UZS)</Title>
                <Title className="invoice_content">1.000.000 UZS</Title>
              </div>
            </div>
            <div className="invoice_row">
              <div>
                <Title className="invoice_title">Course</Title>
                <Title className="invoice_content">Foundation</Title>
              </div>
              <div>
                <Title className="invoice_title">Group</Title>
                <Title className="invoice_content">G - 17</Title>
              </div>
              <div>
                <Title className="invoice_title">Start date</Title>
                <Title className="invoice_content">01 / 03 / 2022</Title>
              </div>
              <div>
                <Title className="invoice_title">Duration</Title>
                <Title className="invoice_content">1 Mounth</Title>
              </div>
              <div>
                <Title className="invoice_title">Loan</Title>
                <Title className="invoice_content"> -</Title>
              </div>
              <div>
                <Title className="invoice_title">Amount</Title>
                <Title className="invoice_content">1.000.000 UZS</Title>
              </div>
            </div>
          </div>
          <Title semiBold fs={10} lHeight={15}>
            Payment history
          </Title>
          <CustomTable data={data} columns={table_columns} />
        </div>
        <div className="footer_part">
          <div className="right">
            <div>
              <Title semiBold fs={10} lHeight={15}>
                Make a payment
              </Title>
              <div className="tab">
                <Tab
                  leftList={["Cash", "Plastic", "Bank"]}
                  rightList={[]}
                  leftContent={[
                    <div className="input">
                      <Field hideLabel type={"input"} name={"amount"} placeholder={"Enter amount..."} />
                      <Button success>Pay</Button>
                    </div>,
                  ]}
                />
                <Field hideLabel type={"custom-datepicker"} />
              </div>
            </div>
            <div>
              <Title semiBold fs={12} lHeight={18}>
                Inflex, Inc
                <br />
                (78) 777-47-47
              </Title>
              <Title semiBold fs={10} lHeight={35}>
                Toshkent shahar Shayhontohur tumani,Beruniy ko‘chasi, 3A-uy
              </Title>
            </div>
          </div>
          <div>
            <Title semiBold fs={10} lHeight={15}>
              Balance
            </Title>
            <div className="balance">
              <div className="list">
                <div className="row">
                  <Title semiBold fs={10} lHeight={15}>
                    Total
                  </Title>
                  <Title semiBold fs={10} lHeight={15}>
                    1.000.000 UZS
                  </Title>
                </div>
                <div className="row">
                  <Title semiBold fs={10} lHeight={15}>
                    Paid
                  </Title>
                  <Title semiBold fs={10} lHeight={15}>
                    300.000 UZS
                  </Title>
                </div>
                <div className="row">
                  <Title semiBold fs={10} lHeight={15}>
                    Discount
                  </Title>
                  <Title semiBold fs={10} lHeight={15} cl={"#777E90"}>
                    -100.000 UZS
                  </Title>
                </div>
              </div>
              <div className="total">
                <Title semiBold fs={10} lHeight={15}>
                  Total loan
                </Title>
                <Title semiBold fs={10} lHeight={15} cl={"#EF466F"}>
                  -600.000 UZS
                </Title>
              </div>
            </div>
          </div>
        </div>
      </FormDemo>
    </StyledDebtInvoiceComponent>
  );
};

export default memo(DebtInvoiceComponent);
