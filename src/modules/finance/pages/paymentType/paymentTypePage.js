import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkTab } from "utils";
import PaymentTypeContainer from "../../containers/paymentType/paymentTypeContainer";

const Style = styled.div`
  .modal__body {
    .title {
      margin-bottom: 20px;
    }
    .form-label {
      font-size: 10px;
      line-height: 12px;
      margin-bottom: 6px;
    }
    .form-input-container {
      height: 38px;
      border-radius: 6px;
      margin-bottom: 20px;
      background: #fafafb;
      .form-input {
        font-weight: 400;
        font-size: 12px;
        line-height: 18px;
      }
    }
    .select {
      &__header {
        height: 38px;
      }
    }
    .footer {
      margin-top: 30px;
      .form-checkbox-controler {
        button {
          display: flex;
          align-items: center;
          font-size: 12px;
          line-height: 18px;
          background: #fcfcfd;
          border: 1px solid #e6e8ec;
          border-radius: 6px;
          .rc-checkbox {
            margin-right: 5px;
          }
          .ui__icon__wrapper {
            margin-left: 5px;
            &.md {
              .icon {
                width: 15px;
                height: 15px;
              }
            }
          }
        }
      }
      .cancelBtn,
      .addBtn {
        button {
          min-height: 34px;
          border-radius: 6px;
        }
      }
      .cancelBtn {
        margin: 0 8px;
      }
    }
  }
`;

const PaymentTypePage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Payment Type");
  }, []);

  return (
    <Style>
      <PaymentTypeContainer {...rest} />
    </Style>
  );
};
export default PaymentTypePage;
