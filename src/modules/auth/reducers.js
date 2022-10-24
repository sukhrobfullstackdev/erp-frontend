import Actions from "./actions";
import { get } from "lodash";

export default function AuthReducer(state = {}, action) {
  switch (action.type) {
    case Actions.CHECK_AUTH.TRIGGER:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isFetched: false,
      };
    case Actions.CHECK_AUTH.REQUEST:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isFetched: false,
      };
    case Actions.CHECK_AUTH.FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isFetched: true,
      };
    case Actions.CHECK_AUTH.SUCCESS:
      return {
        ...state,
        user: get(action, "payload.user"),
        isAuthenticated: true,
        isFetched: true,
      };
    case Actions.SAVE_SIGN_UP_PASSWORD.SUCCESS:
      return {
        ...state,
        sign_up_data: get(action, "payload"),
      };
    case Actions.SAVE_SIGN_UP_PASSWORD.TRIGGER:
      return {
        ...state,
        sign_up_data: null,
      };
    case Actions.SAVE_SIGN_IN_PASSWORD.SUCCESS:
      return {
        ...state,
        sign_in_data: get(action, "payload"),
      };
    case Actions.SAVE_SIGN_IN_PASSWORD.TRIGGER:
      return {
        ...state,
        sign_in_data: null,
      };
    case Actions.SAVE_TOKEN.SUCCESS:
      return {
        ...state,
        token: get(action, "payload.token"),
      };
    case Actions.SAVE_TOKEN.FAILURE:
      return {
        ...state,
        token: null,
      };
    case Actions.AUTH_TRIGGER.TRIGGER:
      return {
        auth: {
          isFetched: true,
        },
      };
    default:
      return state;
  }
}
