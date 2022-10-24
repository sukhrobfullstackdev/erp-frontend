import React, { useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { checkTab } from "utils";
import styled from "styled-components";
import ListContainer from "../../containers/group-type/ListContainer";

const ListPageStyle = styled.div`
  .modal {
    &__body {
      width: 622px;
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
        margin: 5px 0 20px;
        input {
          font-size: 14px;
        }
      }

      .checkbox__btn {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;

        .checkbox-with-button {
          button {
            background: #fafafb;
            border-radius: 6px;
            border: none;
            padding: 10px;
            min-width: 280px;
            justify-content: flex-start;
            font-weight: 400;
            text-transform: none;

            .rc-checkbox {
              margin-right: 14px;
            }
          }
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
    checkTab(dispatch, pathname, "SALES GroupType  page");
}, []);

  return (
    <ListPageStyle>
      <ListContainer {...rest} />
    </ListPageStyle>
  );
};

export default withRouter(memo(ListPage));
