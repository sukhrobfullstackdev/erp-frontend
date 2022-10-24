import Actions from "./actions";
import { get } from "lodash";

export default function AuthReducer(state = {}, action) {
  switch (action.type) {
    case Actions.REGION_OPTIONS.REQUEST:
      return ((action, state) => {
        return {
          ...state,
          is_open_sidebar: null,
        };
      })(action, state);
    default:
      return state;
  }
}
