import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkTab } from "utils";
import CashContainer from "../../containers/cash/cashContainer";

const Style = styled.div`
  .modal__body {
    width: 620px;
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

    .form-select-container-select {
      margin-bottom: 20px;
      .select {
        &__header {
          height: 38px;
          &__content__placeholder{
            font-weight: 400;
            font-size: 12px;
            line-height: 18px;
            color: #B1B5C4;
          }
        }
      }
    }
    .footer {
      margin-top: 10px;
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
          min-width: 67px;
          border-radius: 6px;
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;

        }
      }
      .cancelBtn {
        margin: 0 8px;
      }
    }

    .form-error-message {
      margin: 15px 0;
    }
  }
`;

const CashPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Cash");
  }, []);

  return (
    <Style>
      <CashContainer {...rest} />
    </Style>
  );
};
export default CashPage;
