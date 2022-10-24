import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { checkTab } from "utils";
import ListContainer from "../../containers/department/ListContainer";
import styled from "styled-components";

const DepartmentStyle = styled.div`
  .modal {
    &__body {
      .title {
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 21px;
        color: #777e91;
        margin-bottom: 20px;
      }
      t .form-label {
        font-weight: 600;
        font-size: 10px;
        line-height: 12px;
        text-transform: uppercase;
        color: #a7adbf;
        margin-bottom: 6px;
      }
      .form-input-container {
        height: 38px;
        background: #fafafb;
        border-radius: 6px;
        padding: 12px 10px;
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
    checkTab(dispatch, pathname, "hrm_department_tab");
  }, []);

  return (
    <DepartmentStyle>
      <ListContainer {...rest} />
    </DepartmentStyle>
  );
};

export default withRouter(ListPage);
