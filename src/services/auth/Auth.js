import React, { useEffect } from "react";
import { get, isNil } from "lodash";
import { useIdleTimer } from "react-idle-timer";
import Provider from "../../context/auth/AuthProvider";
import { connect } from "react-redux";
import Actions from "../../modules/auth/actions";
import { hasAccess } from "../../utils";
const Auth = ({
  children,
  isAuthenticated,
  isFetched,
  user,
  departments,
  pages,
  permissions,
  checkAuth,
  lang,
  logoutRequest,
  trigger,
}) => {
  useEffect(() => {
    if (!isNil(lang)) {
      // !window.location.pathname.includes("auth") && checkAuth(lang);
      checkAuth(lang);
    }
  }, [lang]);

  const handleOnIdle = (event) => {
    if (isAuthenticated && getRemainingTime() === 0) {
      logoutRequest({
        cb: {
          success: () => {},
        },
      });
    }
  };

  const handleOnActive = (event) => {};

  const handleOnAction = (event) => {};

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * 60,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500,
  });

  return (
    <Provider
      value={{
        isAuthenticated,
        isFetched,
        user,
        departments,
        pages,
        permissions,
        userCan: (items = [], can = "") => {
          return hasAccess(items, can);
        },
      }}
    >
      {children}
    </Provider>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuth: (lang) =>
      dispatch({
        type: Actions.CHECK_AUTH.REQUEST,
        payload: { token: null, lang },
      }),
    trigger: () => dispatch({ type: Actions.AUTH_TRIGGER.TRIGGER }),
    logoutRequest: ({ cb }) => dispatch({ type: Actions.LOGOUT.REQUEST, payload: { cb } }),
  };
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: get(state, "auth.isAuthenticated", false),
    isFetched: get(state, "auth.isFetched", false),
    user: get(state, "auth.user", {}),
    departments: get(state, "auth.user.departments", []),
    pages: get(state, "auth.user.pages", []),
    permissions: get(state, "auth.user.permissions", []),
    lang: get(state, "settings.lang", "uz"),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
