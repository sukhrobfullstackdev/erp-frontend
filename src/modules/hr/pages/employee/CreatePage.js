import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { checkTab } from "utils";
import CreateContainer from "../../containers/employee/CreateContainer";

import dateIcon from "../../../../assets/icons/date.svg";

const PageStyle = styled.div`
  .initialLoader {
    background: rgba(0, 0, 0, 0.3);
  }
  .form-label,
  .form-select-label {
    margin-bottom: 14px;
  }
  .firstCollapseForAdd {
    .form-input-container {
      /* margin-bottom: 40px; */
      .form-input {
        height: 50px;
      }
    }
    .radio-section-input {
      .form-input-container {
        margin-bottom: 0px;
      }
    }
    &.active {
      .collapse__title {
        background: #353945;
        color: #fcfcfd;
        border-radius: 9px 9px 2px 2px;
        .icon {
          background: #fcfcfd;
        }
        &:hover {
          background: #353945 !important;
          color: #fcfcfd !important;
        }
      }
    }
    .collapse__body {
      &.active {
        padding: 40px;
      }
      .rmdp-container {
        height: 50px !important;
        position: relative;
        &:after {
          content: "";
          background: url(${dateIcon});
          background-repeat: no-repeat;
          background-size: 28px 26px;
          background-position: center;
          width: 31px;
          height: 100%;
          position: absolute;
          right: 12px;
          top: 0px;
        }
      }
      .rmdp-container,
      .Select__controller {
        width: 100%;
        height: 50px;
        background: #fcfcfd;
        box-sizing: border-box;
        border-radius: 10px;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        color: #777e91;

        /* color: #B1B5C4; */
        .rmdp-input {
          width: 100%;
          height: 100%;
          border: none;
          background: none;
          outline: none;
          padding-left: 10px;
          border: 1px solid #e6e8ec;
          border-radius: 10px;
        }
      }
      .form-input-container {
      }
    }
  }
  .submitBtn {
    button {
      border-radius: 6px;
      margin-top: 20px;
    }
  }
  .form-select-container {
    &-select {
      .select {
        &__header {
          height: 50px;
        }
      }
      .rs {
        &-btn {
          height: 50px;
          &:focus {
            border: 1px solid #45b36b !important;
          }
        }
        &-picker-toggle {
          &-value,
          &-placeholder {
            font-weight: normal;
            font-size: 16px;
            line-height: 24px;
            color: #353945;
          }
        }
      }
    }
  }

  .datePicker {
    width: 100%;
    .rs-btn {
      height: 50px;
      display: flex;
      align-items: center;
    }
    .rs-picker-toggle {
      background-color: #fcfcfd !important;
      &-placeholder {
        color: #b1b5c4 !important;
      }
      &::before {
        width: 24px;
        height: 24px;
        top: 50%;
        right: 10px;
        transform: translateY(-50%) scale(1.2);
      }
      &:after {
        right: 40px;
        top: 50%;
        transform: translateY(-50%);
        opacity: 0;
      }
      &-value,
      &-placeholder {
        font-weight: normal;
        font-size: 16px !important;
        line-height: 24px;
        color: #353945;
      }
    }
  }
  .form-dropzone-container {
    .imgContainer {
      height: 268px;
    }
    .dzu-dropzone {
      height: 100%;
    }
  }
  .firstCollapseForAdd,
  .secondCollapse,
  .seventhCollapse,
  .fourthCollapse,
  .fifthCollapse,
  .sixthCollapse,
  .thirdCollapse {
    margin-bottom: 10px;
    border-radius: 10px;
    .collapse__title {
      height: 50px;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      border-radius: 10px;
      background: #fcfcfd;
      border: 1px solid #f4f5f6;
      transition: 0.5s ease;
      :hover {
        background-color: #f4f5f6;
        border: 1px solid #e6e8ec;
      }
    }
    &.active {
      border: 1px solid #e6e8ec;
      margin-top: 21px;
      .collapse__title {
        height: 50px;
        font-size: 16px;
        background: #353945;
        color: #fcfcfd;
        border-radius: 9px 9px 2px 2px;
        border: none;
        .icon {
          background: #fcfcfd;
        }
        &:hover {
          background: #353945 !important;
          color: #fcfcfd !important;
        }
      }
      .form-input {
        font-weight: 500;
        color: #777e91;
        font-size: 16px;
      }
      .form-select-container-select {
        .select {
          &__header {
            padding: 12px;
            border-radius: 10px;
            &__content {
              color: #777e91;
              font-weight: 500;
            }
          }
        }
      }
    }
  }
  .main__upload__label {
    width: 100%;
  }
  .form-error-message {
    margin-top: 15px;
  }
  .form-label {
    width: 100%;
    color: #353945;
    margin-bottom: 8px;
    line-height: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .collapse__body {
    &.active {
      overflow: inherit;
    }
  }
`;

const CreatePage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Employee create page");
  }, []);

  return (
    <PageStyle {...rest}>
      <CreateContainer />
    </PageStyle>
  );
};

export default withRouter(CreatePage);
