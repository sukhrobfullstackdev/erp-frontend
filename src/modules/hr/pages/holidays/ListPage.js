import React, { useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { checkTab } from "utils";
import styled from "styled-components";
import ListContainer from "../../containers/holidays/ListContainer";

const ListPageStyle = styled.div`
  .modal {
    &__body {
      .title {
        margin-bottom: 20px;
      }

      label {
        font-size: 10px;
        line-height: 12px;
        color: #a7adbf;
      }

      .form-input-container {
        height: 38px;
        background: #fafafb;
        border-radius: 6px;
        margin-top: 5px;
        margin-bottom: 10px;

        input {
          font-size: 14px;
        }
      }

      .checkbox-with-button {
        .rc-checkbox {
          margin-right: 8px;
        }
        button {
          min-width: 103px;
          height: 34px;
          background: #fcfcfd;
          border: 1px solid #e6e8ec;
          border-radius: 6px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10px;
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;
          color: #353945;
          margin-left: 10px;

          .questionIcon {
            width: 14px;
            height: 14px;

            .icon {
              width: 100%;
              height: 100%;
            }
          }
        }
      }

      .form-date-container {
        .datepicker {
          &__input {
            width: 86px;
            height: 34px;
            background: #fafafb;
            border: 0.5px solid #e6e8ec;
            border-radius: 6px;
            color: #353945;
            font-weight: 500;
            font-size: 12px;
            line-height: 15px;
            padding: 0 8px 4px;
            border-right: none;
            &.range {
              border-radius: 6px 0 0 6px;
            }
            &.second__input {
              border-radius: 0 6px 6px 0;
              border-right: 0.5px solid #e6e8ec;
              border-left: none;
            }

            &::placeholder {
              color: #353945;
              font-weight: 500;
              font-size: 12px;
              line-height: 10px;
              display: flex;
              align-items: center;
            }
          }
        }

        .date__icon {
          top: 16%;
          right: 9px;
        }
      }

      .form-error-message {
        margin: 15px 0;
      }

      .cancelBtn,
      .addBtn {
        button {
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;
          border-radius: 6px;
          height: 34px;
          min-width: 63px;
        }
      }

      .cancelBtn {
        margin: 0 10px;
      }
    }
  }

  .statusBtn {
    button {
      text-transform: uppercase;
      font-size: 10px !important;
      line-height: 15px;
    }
  }
`;

const ListPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "HR Holidays  page");
  }, []);

  return (
    <ListPageStyle>
      <ListContainer {...rest} />
    </ListPageStyle>
  );
};

export default withRouter(memo(ListPage));
