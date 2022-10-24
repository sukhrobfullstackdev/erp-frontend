import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkTab } from "utils";
import ExpensePropositionContainer from "../../containers/expensePropositionType/expensePropositionTypeContainer";

const Style = styled.div`
  .modal__body {
    padding: 0;
    width: 620px;

    .title {
      padding: 20px 20px 0;
    }
    .form-label {
      font-size: 10px;
      line-height: 12px;
      color: #a7adbf;
      margin: 20px 0 6px 20px;
    }
    .form-error-message {
      margin: 0 0 5px 20px;
    }

    .form-input-container {
      height: 38px;
      background: #fafafb;
      border: 1px solid #e6e8ec;
      box-sizing: border-box;
      border-radius: 6px;
      margin: 0 20px 20px;

      .form-input {
        height: 100%;
        padding: 5px 12px;
      }
    }

    .referral {
      border-top: 1px solid #f4f5f6;
      padding: 20px;

      &__title {
        font-weight: 600;
        font-size: 14px;
        line-height: 21px;
        color: #777e91;
        margin-bottom: 20px;
      }

      &__radio {
        margin-right: 30px;
        input {
          margin-right: 10px;
        }
      }
      .form-checkbox-controler {
      }
      label {
        .rc-checkbox {
          margin-right: 8px;
        }
      }
    }

    .footer {
      padding: 0 20px 20px 0;

      .cancelBtn,
      .addBtn {
        button {
          border-radius: 6px;
          height: 34px;
          min-width: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
          font-size: 12px;
        }
      }
      .cancelBtn {
        margin: 0 8px;
      }
      .form-checkbox-controler {
        .checkbox-with-button {
          button {
            display: flex;
            align-items: center;
            height: 34px;
            border-radius: 6px;
            font-size: 12px;
            border: 1px solid #e6e8ec;
            .rc-checkbox {
              margin-right: 10px;
            }
            .ui__icon__wrapper {
              &.md {
                margin-left: 10px;
                .icon {
                  width: 16px;
                  height: 16px;
                }
              }
            }
          }
        }
      }
    }
  }
`;

const ExpensePropositionTypePage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Expense Propostion Type");
  }, []);

  return (
    <Style>
      <ExpensePropositionContainer {...rest} />
    </Style>
  );
};
export default ExpensePropositionTypePage;
