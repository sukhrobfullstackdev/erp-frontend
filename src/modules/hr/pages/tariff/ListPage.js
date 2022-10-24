import React, { useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { checkTab } from "utils";
import styled from "styled-components";
import ListContainer from "../../containers/tariff/ListContainer";

const ListPageStyle = styled.div`
  .modal {
    &__body {
      max-width: 700px;
      .title {
        margin-bottom: 20px;
      }
      label {
        font-size: 10px;
        line-height: 12px;
        color: #a7adbf;
      }
      .form-input-container {
        height: 40px;
        background: #fafafb;
        border-radius: 6px;
        margin-top: 5px;
        input {
          font-size: 14px;
        }
      }
      .select__header {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 10px;
        height: 40px;
      }
      .select__body {
        min-width: 622px;
      }
      .checkbox-with-button {
        button {
          /* width: 80px; */
          height: 40px;
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
          margin: 0 0 0 10px;
          .rc-checkbox {
            margin: 0 15px 0 0;
          }
          .questionIcon {
            width: 14px;
            height: 14px;
            margin-left: 10px;
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
  .select__header__content {
    height: 40px;
  }
  .wrapper {
    display: flex;
    align-items: end;
    justify-content: space-between;
    margin-bottom: 10px;
    button:first-child {
      margin: 0 13px 0 10px;
    }
  }
  .second-title {
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    color: #777e91;
    display: block;
    margin: 40px 0 20px 5px;
  }
  .table {
    min-width: 1900px !important;
  }
  @media (max-height: 821px) {
    .modal {
      &__body {
        max-width: 600px;
        .title {
          margin-bottom: 15px;
        }
        .select__header {
          min-height: 30px;
          height: 30px;
          border-radius: 6px;
          &__content {
            height: 30px;
          }
        }
        .form-input-container {
          height: 30px;
        }
        .checkbox-with-button {
          button {
            height: 30px;
          }
        }
        .cancelBtn,
        .addBtn {
          button {
            height: 30px;
          }
        }
      }
    }
    .second-title {
      margin: 20px 0 10px 5px;
    }
  }
`;

const ListPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "HR tariff  page");
  }, []);

  return (
    <ListPageStyle>
      <ListContainer {...rest} />
    </ListPageStyle>
  );
};

export default withRouter(memo(ListPage));
