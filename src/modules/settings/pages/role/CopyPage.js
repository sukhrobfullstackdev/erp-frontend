import React, { useEffect } from "react";
import CopyContainer from "../../containers/role/CopyContainer";
import { connect, useDispatch } from "react-redux";
import { checkTab } from "utils";
import styled from "styled-components";
import { get } from "lodash";

const CopyPageStyle = styled.div`
  .form-box-body {
    justify-content: flex-start !important;
  }
  .form-body-title {
    h2 {
      font-weight: 500;
      font-size: 24px;
      line-height: 36px;
      color: #777e91;
    }
  }
  .select__header {
    font-size: 18px;
    line-height: 27px;
    border-radius: 12px;
  }
  .form-input-container,
  .Select__controller {
    height: 50px;
    width: 100%;
  }
  .form-label,
  .form-select-label,
  .form-textarea-label {
    margin-bottom: 8px;
  }
  .buttons {
    /* width: ${({ isSubmenuOpen }) => (!isSubmenuOpen ? "81%" : "93.7%")}; */
    position: fixed;
    bottom: ${({ isSubmenuOpen }) => (!isSubmenuOpen ? "0px" : 0)};
    right: ${({ isSubmenuOpen }) => (!isSubmenuOpen ? "20px" : "20px")};
    left: ${({ isSubmenuOpen }) => (!isSubmenuOpen ? "350px" : "100px")};
    z-index: 4;
    padding: 20px 38px;
    background: #fafbfc;
    transition: 0.25s;
    border-top: 1px solid #e6e8ec;
  }
  .cancelBtn,
  .addBtn {
    button {
      border-radius: 8px;
      height: 40px;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      padding: 10px 16px;
    }
  }
  .cancelBtn {
    margin-right: 10px;
  }
  .createContainer {
    width: 100%;
    padding-bottom: 30px;
    background: rgba(247, 247, 250, 1);
  }
  .main-form-table {
    width: 100%;
    overflow: hidden;
    background: #f4f5f6;
    border: 2px solid #e6e8ec;
    box-sizing: border-box;
    box-shadow: 0px 40px 32px -24px rgba(15, 15, 15, 0.12);
    border-radius: 10px;
    margin-top: 20px;
    &-head {
      display: flex;
      align-items: center;
      background: #353945;
      height: 80px;
      padding: 25px 32px;
      font-weight: 600;
      font-size: 20px;
      line-height: 30px;
      text-transform: uppercase;
      color: #fcfcfd;
      border-radius: 10px 10px 0 0;
      label {
        display: flex;
        align-items: center;
      }
      .rc-checkbox {
        margin-right: 20px;
        input {
          width: 15px;
          height: 15px;
        }
        .rc-checkbox-inner {
          top: -2px;
        }
      }
    }
    .stickyTable {
      width: auto;
    }
  }
`;

const CopyPage = ({ location: { pathname }, isSubmenuOpen, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Role copy page");
  }, []);

  return (
    <CopyPageStyle {...{ isSubmenuOpen }}>
      <CopyContainer {...rest} />
    </CopyPageStyle>
  );
};

const mapStateToProps = (state) => {
  return {
    isSubmenuOpen: get(state, "settings.is_open_submenu", false),
  };
};

export default connect(mapStateToProps, null)(CopyPage);
