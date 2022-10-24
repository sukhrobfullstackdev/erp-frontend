import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { checkTab } from "utils";
import SalaryContainer from "../../containers/salary/salaryContainer";

const Styled = styled.div`
  background-color: #f7f7fa;
  padding: 38px;
  height: 91vh;
  .makeFilter {
    button {
      width: 79px;
      height: 34px;
      background-color: #e6e8ec;
      border-radius: 8px;
      color: #777e91;
      font-size: 12px;
      line-height: 18px;
      display: grid;
      place-items: center center;
      grid-template-columns: 39px 20px;
      .ui__icon__wrapper.md .icon {
        width: 15px;
        height: 15px;
      }
    }
  }
  .select__header__content {
    height: 37px !important;
  }

  .table {
    padding: 15px;
  }
  .cashRegister {
    margin-top: 140px;
    border-top: 1px solid #e6e8ec;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;

    .leftContent {
      width: 842px;
      height: 249px;
      max-height: 249px;
      .firstRow {
        display: grid;
        grid-template-columns: 44.5% 44.5% 15%;
        .btnBox {
          width: 92px;
          height: 40px;
          background: #fcfcfd;
          border: 1px solid #f4f5f6;
          border-radius: 6px;
          margin-top: 28px;
          padding: 11px 13px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .minus {
            height: 18px;
            width: 18px;
            background-color: #ef466f;
            border-radius: 50%;
            display: grid;
            place-items: center center;
            cursor: pointer;
            button {
              padding: 0;
              height: 1.3px;
              width: 8px;
            }
          }

          .plus {
            border-radius: 50%;
            background-color: #e6e8ec;
            display: grid;
            place-items: center center;
            button {
              padding: 0;
            }
            .ui__icon__wrapper {
              width: 18px;
              height: 18px;
            }
            .eDTsdp .ui__icon__wrapper.md .icon {
              width: 13px;
              height: 17px;
            }
          }
          [disabled] {
            background-color: #e6e8ec;
            display: grid;
            place-items: center center;
            button {
              padding: 0;
            }
            .ui__icon__wrapper {
              width: 18px;
              height: 18px;
            }
          }
        }
        .form-input-container {
          border-radius: 6px;
          height: 40px;
        }
        .form-input {
          padding: 5px 12px;
        }
        .select__header {
          border-radius: 6px;
          margin-top: 5px;
        }

        .form-label {
          color: #3772ff;
          font-weight: 500;
          font-size: 10px;
          line-height: 15px;
        }
      }
    }
    .rightContent {
      width: 842px;
      height: 249px;

      background: #fcfcfd;
      border: 1px solid #f4f5f6;
      border-radius: 8px;
      padding: 30px 10px 10px 30px;

      .keyValues {
        display: flex;
        text-transform: uppercase;
        font-size: 14px;
        line-height: 21px;
        font-weight: 500;
      }

      .totalSumKeys {
        color: #777e91;
      }

      .totalSumValues {
        margin-left: 68px;
        color: #353945;
      }
    }

    .autoBtn {
      display: grid;
      place-items: end end;
      padding-top: 94px;
      button {
        padding: 5px 23px;
        font-weight: 400;
        border-radius: 6px;
      }
    }
  }

  .th__content {
    width: 318px;
  }

  .wrapper {
    /* padding: 15px; */
    background-color: #fff;
    border-radius: 12px;
    border: 1px solid #e6e8ec;
    box-sizing: border-box;
  }

  .makeStatement {
    button {
      height: 34px;
      text-transform: uppercase;
      font-weight: 600;
      font-size: 12px;
      line-height: 14px;
      margin-right: 10px;
    }
  }

  .th,
  .td {
    justify-content: flex-start !important;
  }

  .form-input-container {
    border-radius: 6px;
    .form-input {
      padding: 5px 12px !important;
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      color: #353945;
    }
  }

  .deleteBtn button {
    width: 40px;
    height: 30px;
    padding: 0;
    margin-left: 46px;
    border-radius: 4px;
    display: grid;
    place-items: center center;
  }

  .salaryFooter {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 18px 30px 18px 0;
    border-top: 1px solid #e6e8ec;
    margin-top: 5px;
    button {
      width: 80px;
      height: 34px;
      border-radius: 6px;
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
    }
    .footerCancel button {
      color: #777e91;
      background-color: #f4f5f6;
      margin-right: 10px;
      cursor: pointer;
    }
  }
`;

const SalaryPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Salary");
  }, []);

  return (
    <Styled>
      <SalaryContainer {...rest} />
    </Styled>
  );
};

export default SalaryPage;
