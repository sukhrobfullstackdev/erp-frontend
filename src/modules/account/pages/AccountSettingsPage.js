import React, { memo, useEffect } from "react";
import styled from "styled-components";
import AccountSettingsContainer from "../container/AccountSettingsContainer";
import { useDispatch } from "react-redux";
import { checkTab } from "utils";

const PageStyle = styled.div`
  width: 100%;
  min-height: 91vh;
  padding: 60px 80px 70px;

  .row {
    padding: 25px 0;
    border-bottom: 1px solid #f4f5f6;
    display: flex !important;
    align-items: center !important;
  }

  .form_demo {
    padding-bottom: 90px;

    .form_btn {
      height: 80px;
      background: #fcfcfd;
      width: 100%;
      position: fixed;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-right: 80px;
      border-top: 1px solid #f4f5f6;
      z-index: 2;

      button {
        font-weight: 400;
        font-size: 13px;
        line-height: 18px;
        border-radius: 8px;
        padding: 8px 16px;
      }
    }
  }
`;

const AccountSettingsPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Account  page");
  }, []);


  return (
    <PageStyle>
      <AccountSettingsContainer {...rest} />
    </PageStyle>
  );
};

export default memo(AccountSettingsPage);
