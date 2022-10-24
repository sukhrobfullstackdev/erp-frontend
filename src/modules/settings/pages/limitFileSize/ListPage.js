import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { checkTab } from "utils";
import styled from "styled-components";
import ListContainer from "../../containers/limitFileSize/ListContainer";

const StyledListPage = styled.div`
  .modal__body {
    .title {
      font-weight: 600;
      font-size: 14px;
      line-height: 21px;
      color: #777e91;
      margin-bottom: 20px;
    }

    .form-label {
      font-weight: 600;
      font-size: 10px;
      line-height: 12px;
      text-transform: uppercase;
      color: #a7adbf;
      margin-bottom: 6px;
    }

    .form-input-container,
    .select__header {
      background: #fafafb;
      border-radius: 6px;

      input {
        color: #353945;
        font-size: 14px;
        font-weight: 500;
        line-height: 18px;
      }
    }

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
    .cancelBtn {
      margin: 0 10px;
    }
  }
`;

const ListPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Limit file size");
  }, []);

  return (
    <StyledListPage>
      <ListContainer {...rest} />
    </StyledListPage>
  );
};

export default withRouter(ListPage);
