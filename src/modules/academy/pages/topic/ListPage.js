import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { checkTab } from "utils";
import styled from "styled-components";
import ListContainer from "../../containers/topic/ListContainer";
import { withTranslation } from "react-i18next";

const PageStyle = styled.div`
  height: 100%;
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
        margin-bottom: 20px;
        input {
          font-size: 14px;
        }
      }
      .datePicker {
        margin-bottom: 10px;
      }
      .form-checkbox-controler {
        font-size: 13px;
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
      .form-checkbox-controler {
        //margin-top: 10px;
      }
      .checkbox-with-button {
        button {
          display: flex;
          align-items: center;
          .questionIcon {
            width: 14px !important;
            height: 14px !important;
            margin-left: 10px;
            .icon {
              width: 14px !important;
              height: 14px !important;
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
      padding: 4px 12px 3px !important;
    }
  }
  .grid-view-table {
    min-height: calc(100vh - 330px);
  }
`;

const ListPage = ({ t, location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Topic page");
  }, []);

  return (
    <PageStyle>
      <ListContainer {...rest} />
    </PageStyle>
  );
};

export default withTranslation("pdp")(withRouter(ListPage));
