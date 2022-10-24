import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { checkTab } from "utils";
import ListContainer from "../../containers/employee-category/ListContainer";

const EmployeeCategoryTypeStyle = styled.div`
  .modal {
    &__body {
      label,
      .title {
        font-weight: 600;
        font-size: 12px;
        line-height: 12px;
        text-transform: uppercase;
        color: #a7adbf;
      }
      .title {
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 21px;
        color: #777e91;
        margin-bottom: 20px;
      }
      .select__header {
        margin-bottom: 10px;
        .select__header__content {
          font-weight: 500;
          font-size: 14px;
          line-height: 18px;
          color: #353945;
          padding: 10px 10px;
        }
      }
      .select__body {
        min-width: 595px;
      }
      .dropdown {
        margin-bottom: 20px;
      }
      .form-label,
      .form-select-label {
        font-weight: 600;
        font-size: 10px;
        line-height: 12px;
        text-transform: uppercase;
        color: #a7adbf;
        margin-bottom: 6px;
      }
      .form-textarea-label {
        font-size: 10px;
        line-height: 12px;
        margin-bottom: 6px;
      }
      .form-input-container {
        height: 38px;
        background: #fafafb;
        border-radius: 6px;
        padding: 12px 10px;
        margin-bottom: 20px;
        input {
          font-size: 14px;
        }
      }
      button {
        border-radius: 6px;
        font-style: normal;
        font-size: 12px;
        line-height: 18px;
        min-width: 63px;
      }
      .rc-checkbox {
        margin-right: 8px;
      }
      .cancelBtn {
        margin: 0 10px;
      }
      .form-textarea {
        font-size: 14px;
        padding: 8px 10px;
        min-height: 150px;
        resize: none;
      }
      .checkbox-with-button {
        button {
          display: flex;
          align-items: center;
          .questionIcon {
            &.ui__icon__wrapper {
              &.md {
                width: 15px;
                height: 15px;
                margin-left: 5px;
                .icon {
                  width: 15px;
                  height: 15px;
                }
              }
            }
          }
        }
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
  .select__header__content {
    height: 38px;
  }
`;

const ListPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Employee category  page");
  }, []);

  return (
    <EmployeeCategoryTypeStyle>
      <ListContainer {...rest} />
    </EmployeeCategoryTypeStyle>
  );
};

export default withRouter(ListPage);
