import React from "react";
import styled, { css } from "styled-components";
import { connect } from "react-redux";
import { get } from "lodash";
import { useHistory } from "react-router-dom";
import Breadcrumb from "../breadcrumb";
import Account from "../elements/account";
import AuthActions from "../../modules/auth/actions";
import SettingsActions from "../../modules/settings/actions";

const StyledHeader = styled.header`
  background-color: #eff1f3;
  padding: 26px 30px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  max-width: 100vw;
  transition: 0.2s;
  height: 76px;
  .btn {
    margin-bottom: 8px;
  }

  .header__account {
    position: absolute;
    right: 38px;
    transition: 0.2s;
  }

  ${({ isSubmenuOpen }) =>
    !isSubmenuOpen &&
    css`
      max-width: 82vw;
    `}
`;

const Header = ({ user, isSubmenuOpen, checkAuth, logoutRequest, trigger, ...rest }) => {
  const history = useHistory();
  const logout = () => {
    logoutRequest({
      cb: {
        success: () => {
          trigger();
          window.localStorage.clear();
          history.push("/");
          checkAuth();
        },
      },
    });
  };

  return (
    <StyledHeader {...{ isSubmenuOpen, ...rest }}>
      <Breadcrumb />
      <Account className="header__account" user={user} logoutRequest={logout} history={history} />
    </StyledHeader>
  );
};

const mapStateToProps = (state) => {
  return {
    mode: get(state, "settings.mode", "light"),
    isSubmenuOpen: get(state, "settings.is_open_submenu", false),
    isSidebarOpen: get(state, "settings.is_open_sidebar", true),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutRequest: ({ cb }) => dispatch({ type: AuthActions.LOGOUT.REQUEST, payload: { cb } }),
    trigger: () => {
      dispatch({ type: AuthActions.AUTH_TRIGGER.TRIGGER });
      dispatch({ type: SettingsActions.SET_ACTIVE_MENU_ITEM_ID.TRIGGER });
      dispatch({ type: SettingsActions.REMOVE_BREADCRUMB_ITEM.TRIGGER });
      dispatch({ type: SettingsActions.SET_ACTIVE_BREADCRUMB_ITEM.TRIGGER, payload: { pathname: "" } });
    },
    checkAuth: (token = null) =>
      dispatch({
        type: AuthActions.CHECK_AUTH.REQUEST,
        payload: { token: null },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Header));
