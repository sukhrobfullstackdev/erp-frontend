import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { checkTab } from "utils";
import ListContainer from "../../containers/position/ListContainer";
import styled from "styled-components";

const PositionPageStyle = styled.div`
  .modal__body {
    .title {
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 21px;
      color: #777e91;
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
    .form-input-container,
    .select__header {
      height: 38px;
      background: #fafafb;
      border-radius: 6px;
      padding: 12px 0px;
      input {
        color: #353945;
        font-size: 14px;
        font-weight: 500;
      }
    }
    .select__body {
      width: 818px;
    }
  }
  .checkboxBtn,
  .cancelBtn,
  .addBtn {
    button {
      border-radius: 6px;
      font-style: normal;
      font-size: 12px;
      line-height: 18px;
      min-width: 63px;
    }
  }
  .checkboxBtn {
    .checkbox-with-button {
      color: #353945;
    }
    .rc-checkbox {
      margin-right: 9px;
    }
  }
  .cancelBtn {
    margin: 0 10px;
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
    checkTab(dispatch, pathname, "HR position  page");
  }, []);

  return (
    <PositionPageStyle>
      <ListContainer {...rest} />
    </PositionPageStyle>
  );
};

export default withRouter(ListPage);
