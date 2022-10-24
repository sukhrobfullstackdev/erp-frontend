import React, { memo } from "react";
import { get } from "lodash";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import Header from "../header";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

const StyledContent = styled.div`
  min-height: 100vh;
  background-color: #fff;
  width: 100%;
  min-width: 94vw;
  height: 100%;
  .Content__body {
    overflow: auto;
    height: calc(100vh - 80px);
    .simplebar-content {
      height: 100%;
    }
    max-width: ${({ isSubmenuOpen }) => (isSubmenuOpen ? " 95vw" : "81.9vw")};
    transition: 0.2s;
    ${({ isSidebarOpen }) =>
      !isSidebarOpen &&
      css`
        max-width: 100vw;
      `}
    &::-webkit-scrollbar {
      width: 20px;
      height: 10px;
      /* border: none; */
      background: transparent;
      &-track,
      &-thumb {
        border: none;
        background: transparent;
      }
      &-button,
      &-track-piece,
      &-corner {
        display: none;
      }
      &-button {
        /* padding: 5px; */
      }
      &-track {
        background: #eff1f3;
      }
      &-thumb {
        background: #777e91;
        border-radius: 3px;
        /* border-left: 3px solid transparent;
                border-right: 3px solid transparent; */
        background-clip: padding-box;
        &:vertical {
          border-left: 5px solid #eff1f3;
          border-right: 5px solid #eff1f3;
          box-sizing: border-box;
          border-radius: 8px;
        }
        &:hover {
          background: rgba(129, 136, 154, 1);
        }
      }
    }
  }
`;
const Content = ({ children, isSubmenuOpen, isSidebarOpen, user, ...rest }) => {
  return (
    <StyledContent {...rest} {...{ isSubmenuOpen, isSidebarOpen }}>
      <Header user={user} />
      {/*<div className="Content__body">*/}
      <SimpleBar className="Content__body">{children}</SimpleBar>
      {/*</div>*/}
    </StyledContent>
  );
};

const mapStateToProps = (state) => {
  return {
    sidebarActiveMenuId: get(state, "settings.menu_item_active_id", 1),
    isSubmenuOpen: get(state, "settings.is_open_submenu", false),
    isSidebarOpen: get(state, "settings.is_open_sidebar", true),
    user: get(state, "auth.user", {}),
  };
};

export default connect(mapStateToProps, null)(memo(Content));
