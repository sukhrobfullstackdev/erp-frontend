import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { checkTab } from "utils";
import styled from "styled-components";
import ListContainer from "../../../containers/content/specialty/ListContainer";

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
  .content__box {
    .table {
      .tr {
        .th {
          font-size: 12px;
          line-height: 18px;
          font-weight: 400;
        }
        .td {
          span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: inline-block;
            font-weight: 600;
            font-size: 12px;
          }
          &:nth-child(2) {
            span {
              font-size: 14px;
              font-weight: 500;
            }
          }
          &:first-child {
            span {
              text-overflow: inherit;
            }
          }
        }
      }
      div[role="rowgroup"] {
        .tr {
          background: #fcfcfd;
          .td {
            .statusBtn {
              button {
                width: 70px;
                height: 24px;
                text-transform: uppercase;
                padding: 4px 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 10px;
                line-height: 15px;
              }
            }
          }
        }
      }
    }
  }
  .__react_component_tooltip {
    max-width: 300px;
  }
  .content__box {
    overflow: inherit;
    height: 100%;
  }
`;

const ListPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Specialty list  page");
  }, []);

  return (
    <PageStyle>
      <ListContainer {...rest} />
    </PageStyle>
  );
};

export default withRouter(React.memo(ListPage));
