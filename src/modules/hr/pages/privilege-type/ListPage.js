import React, { useEffect } from "react";
import ListContainer from "../../containers/privilege/ListContainer";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { checkTab } from "utils";
import styled from "styled-components";

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
        button {
          width: 108px;
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
    checkTab(dispatch, pathname, "HR privilege-type  page");
  }, []);

  return (
    <ListPageStyle>
      <ListContainer {...rest} />
    </ListPageStyle>
  );
};

export default withRouter(ListPage);
