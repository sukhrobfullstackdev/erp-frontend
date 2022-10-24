import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { checkTab } from "utils";
import styled from "styled-components";
import ListContainer from "../../../containers/content/course/ListContainer";

const PageStyle = styled.div`
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
      .form-label {
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
      }
      .rc-checkbox {
        margin-right: 8px;
      }
      .cancelBtn {
        margin: 0 10px;
      }
    }
  }
`;

const ListPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Course content  page");
  }, []);

  return (
    <PageStyle>
      <ListContainer {...rest} />
    </PageStyle>
  );
};

export default withRouter(ListPage);
