import Button from "components/elements/button";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import Dropdown from "components/elements/dropDown";
import Icon from "components/elements/icon";

const Style = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;

  .payment__info {
    .info__item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      /* line-height: 2px; */
      font-weight: 400;

      &.secondary {
        color: #777e91;
      }

      &.total {
        color: #45b36b;
      }

      &.cash {
        margin-bottom: 10px;
        color: #ef466f;
      }
    }

    .discount__card {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 25px 0;
      .discount__id {
        font-size: 14px;
        color: #fff;
        background: #353945;
        color: #e6e8ec;
        padding: 8px 15px;
        border-radius: 6px;
      }

      .add__dis__btn {
        padding: 10px 20px;
      }

      .discount__fild {
        display: flex;
        align-items: center;
        padding: 10px 20px;
        background: #fafafb;
        border: 0.5px solid #e6e8ec;
        border-radius: 6px;
        gap: 8px;

        input {
          max-width: 150px;
          border: none;
          outline: none;
          background: transparent;

          ::placeholder {
            color: #b1b5c4;
          }
        }

        .dotsIcon {
          padding: 0 8px;
          border-left: 0.5px solid #e6e8ec;
          border-right: 0.5px solid #e6e8ec;
        }

        .dropdown__menu {
          padding: 15px;
          background: #fff;
          .dropdown__menu__item {
            margin: 10px;
            cursor: pointer;
          }
        }
      }

      .action__btn {
        cursor: pointer;
        width: 30px;
        height: 30px;
        border-radius: 50%;

        background-color: transparent;
        border: none;
        outline: none;
        background: #e2f5e9;
        display: flex;
        align-items: center;
        justify-content: center;

        .ui__icon__wrapper.md .icon-check2 {
          width: 14px;
          height: 14px;
        }

        &.exit {
          background-color: #fff1f5;
        }
      }
    }
  }

  .payment__history {
    .history__title {
      font-weight: 500;
      font-size: 18px;
      line-height: 21px;
      color: #777e91;
      margin-bottom: 20px;
    }

    table {
      background: #f4f5f6;
      border: 1px solid #e6e8ec;
      box-shadow: 0px 1px 8px -8px rgba(15, 15, 15, 0.12);
      border-radius: 6px;
      overflow: hidden;
      width: 100%;

      th,
      td {
        padding: 8px 16px;
      }

      thead {
        background: #777e91;
        th {
          font-size: 14px;
          font-weight: 500;
          text-align: left;
          color: #fff;
        }
      }

      tbody {
        tr {
          border-top: 1px solid #e6e8ec;
          td {
            border-right: 1px solid #e6e8ec;
          }
        }
      }
    }
  }
`;

const LeadOnePayment = () => {
  const [addDiscount, setAddDiscount] = useState(false);
  const [discountType, setDiscountType] = useState("");
  const discountTypeRef = useRef(null);

  return (
    <Style>
      <div className="payment__info">
        <p className="info__item secondary total">
          Invoice total amoutn <span className="pay__sum">+ 14 000 000 UZS</span>
        </p>
        <p className="info__item secondary cash">
          Residual amount <span className="pay__sum">- 6 000 000 UZS</span>
        </p>
        <p className="info__item">
          1 Timetable <span className="pay__sum">3 000 000 UZS</span>
        </p>
        <p className="info__item">
          2 Timetable <span className="pay__sum">14 000 000 UZS</span>
        </p>

        <div className="discount__card">
          <p className="discount__id">INV-AA123456</p>

          {!addDiscount ? (
            <Button className="add__dis__btn" bg="var(--warning) !important" onClick={() => setAddDiscount(true)}>
              Give Discount
            </Button>
          ) : (
            <div className="discount__fild">
              <span className="d__sum">1.000.0000</span>
              <input value={discountType} readOnly className="d__type" placeholder="Quantum" />
              <Dropdown
                onClose={() => {}}
                button={<Icon icon={"icon-bottom-arrow"} color={"#777E91"} mainClassName={"dotsIcon"} />}
              >
                <div className="dropdown__menu">
                  <div className="dropdown__menu__item" onClick={() => setDiscountType("Percentage")}>
                    Percentage
                  </div>
                  <div className="dropdown__menu__item" onClick={() => setDiscountType("Quantum")}>
                    Quantum
                  </div>
                </div>
              </Dropdown>
              <button className="action__btn exit" onClick={() => setAddDiscount(false)}>
                <Icon icon="icon-exit" color="#EF466F" />
              </button>
            </div>
          )}
        </div>
      </div>

      <hr />

      <div className="payment__history">
        <p className="history__title">Payment history</p>

        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Left over</th>
              <th>Payment method</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1.000.0000</td>
              <td>1.000.0000</td>
              <td>Cash</td>
              <td>12.12.2019</td>
            </tr>
            <tr>
              <td>1.000.0000</td>
              <td>1.000.0000</td>
              <td>Cash</td>
              <td>12.12.2019</td>
            </tr>
            <tr>
              <td>1.000.0000</td>
              <td>1.000.0000</td>
              <td>Cash</td>
              <td>12.12.2019</td>
            </tr>
            <tr>
              <td>1.000.0000</td>
              <td>1.000.0000</td>
              <td>Cash</td>
              <td>12.12.2019</td>
            </tr>
            <tr>
              <td>1.000.0000</td>
              <td>1.000.0000</td>
              <td>Cash</td>
              <td>12.12.2019</td>
            </tr>
            <tr>
              <td>1.000.0000</td>
              <td>1.000.0000</td>
              <td>Cash</td>
              <td>12.12.2019</td>
            </tr>
            <tr>
              <td>1.000.0000</td>
              <td>1.000.0000</td>
              <td>Cash</td>
              <td>12.12.2019</td>
            </tr>
            <tr>
              <td>1.000.0000</td>
              <td>1.000.0000</td>
              <td>Cash</td>
              <td>12.12.2019</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Style>
  );
};

export default LeadOnePayment;
