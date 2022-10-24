import Actions from "./actions";
import { get } from "lodash";

export default function ApiReducer(state = {}, action) {
  switch (action.type) {
    case Actions.SET_DATA_IN_GLOBAL_CONTEXT.REQUEST:
      return ((action, state) => {
        const { storeName, data } = action.payload;
        return {
          ...state,
          [storeName]: data,
        };
      })(action, state);
    default:
      return state;
  }
}
