import Actions from "./actions";
import { get, unionBy } from "lodash";

export default function ApiReducer(state = {}, action) {
  switch (action.type) {
    case Actions.SET_ACTIVE_MENU_ITEM_ID.REQUEST:
      return ((action, state) => {
        return {
          ...state,
          menu_item_active_id: null,
        };
      })(action, state);
    case Actions.SET_ACTIVE_MENU_ITEM_ID.SUCCESS:
      return ((action, state) => {
        const { id } = action.payload;
        return {
          ...state,
          menu_item_active_id: id,
        };
      })(action, state);
    case Actions.SET_ACTIVE_MENU_ITEM_ID.FAILURE:
      return (() => {
        return {
          ...state,
          menu_item_active_id: null,
        };
      })();

    case Actions.SET_ACTIVE_MENU_ITEM_ID.TRIGGER:
      return (() => {
        return {
          ...state,
          menu_item_active_id: null,
        };
      })();

    case Actions.SET_OPEN_SUBMENU.REQUEST:
      return ((action, state) => {
        return {
          ...state,
          is_open_submenu: null,
        };
      })(action, state);
    case Actions.SET_OPEN_SUBMENU.SUCCESS:
      return ((action, state) => {
        const { open } = action.payload;
        return {
          ...state,
          is_open_submenu: open,
        };
      })(action, state);
    case Actions.SET_OPEN_SUBMENU.FAILURE:
      return (() => {
        return {
          ...state,
          is_open_submenu: null,
        };
      })();

    case Actions.SET_OPEN_SUBMENU.TRIGGER:
      return (() => {
        return {
          ...state,
          is_open_submenu: null,
        };
      })();

    case Actions.SET_OPEN_SIDEBAR.REQUEST:
      return ((action, state) => {
        return {
          ...state,
          is_open_sidebar: null,
        };
      })(action, state);
    case Actions.SET_OPEN_SIDEBAR.SUCCESS:
      return ((action, state) => {
        const { open } = action.payload;
        return {
          ...state,
          is_open_sidebar: open,
        };
      })(action, state);
    case Actions.SET_OPEN_SIDEBAR.FAILURE:
      return (() => {
        return {
          ...state,
          is_open_sidebar: null,
        };
      })();

    case Actions.SET_OPEN_SIDEBAR.TRIGGER:
      return (() => {
        return {
          ...state,
          is_open_sidebar: null,
        };
      })();

    case Actions.ADD_BREADCRUMB_ITEM.REQUEST:
      return ((action, state) => {
        return {
          ...state,
          breadcrumbs: get(state, "breadcrumbs", []),
        };
      })(action, state);
    case Actions.ADD_BREADCRUMB_ITEM.SUCCESS:
      return ((action, state) => {
        const { item } = action.payload;
        return {
          ...state,
          breadcrumbs: unionBy(get(state, "breadcrumbs", []), [item], "url"),
        };
      })(action, state);
    case Actions.ADD_BREADCRUMB_ITEM.FAILURE:
      return (() => {
        return {
          ...state,
          breadcrumbs: get(state, "breadcrumbs", []),
        };
      })();

    case Actions.ADD_BREADCRUMB_ITEM.TRIGGER:
      return (() => {
        return {
          ...state,
          breadcrumbs: [],
        };
      })();

    case Actions.SET_ACTIVE_BREADCRUMB_ITEM.REQUEST:
      return ((action, state) => {
        return {
          ...state,
          breadcrumb: null,
        };
      })(action, state);
    case Actions.SET_ACTIVE_BREADCRUMB_ITEM.SUCCESS:
      return ((action, state) => {
        const { pathname } = action.payload;
        return {
          ...state,
          breadcrumb: pathname,
        };
      })(action, state);
    case Actions.SET_ACTIVE_BREADCRUMB_ITEM.FAILURE:
      return (() => {
        return {
          ...state,
          breadcrumb: null,
        };
      })();

    case Actions.SET_ACTIVE_BREADCRUMB_ITEM.TRIGGER:
      return (() => {
        return {
          ...state,
          breadcrumb: null,
        };
      })();

    case Actions.REMOVE_BREADCRUMB_ITEM.REQUEST:
      return ((action, state) => {
        return {
          ...state,
          breadcrumbs: get(state, "breadcrumbs", []),
        };
      })(action, state);
    case Actions.REMOVE_BREADCRUMB_ITEM.SUCCESS:
      return ((action, state) => {
        const { items = [] } = action.payload;
        return {
          ...state,
          breadcrumbs: items,
        };
      })(action, state);
    case Actions.REMOVE_BREADCRUMB_ITEM.FAILURE:
      return (() => {
        return {
          ...state,
          breadcrumbs: get(state, "breadcrumbs", []),
        };
      })();

    case Actions.REMOVE_BREADCRUMB_ITEM.TRIGGER:
      return (() => {
        return {
          ...state,
          breadcrumbs: [],
        };
      })();

    case Actions.CHANGE_BREADCRUMB_ITEM.REQUEST:
      return ((action, state) => {
        const { index, url, name } = action.payload;
        let breadcrumbs = state.breadcrumbs;
        breadcrumbs[index] = {
          ...breadcrumbs[index],
          url,
          name,
        };

        return {
          ...state,
          breadcrumbs,
          breadcrumb: url,
        };
      })(action, state);

    case Actions.SET_LOADER.REQUEST:
      return ((action, state) => {
        return {
          ...state,
          loading: true,
        };
      })(action, state);
    case Actions.SET_LOADER.SUCCESS:
      return ((action, state) => {
        return {
          ...state,
          loading: false,
        };
      })(action, state);
    case Actions.SET_MODE.REQUEST:
      return ((action, state) => {
        const { mode = "light" } = action.payload;
        return {
          ...state,
          mode,
        };
      })(action, state);
    case Actions.SET_LANG.SUCCESS:
      return ((action, state) => {
        const { lang = "uz" } = action.payload;
        return {
          ...state,
          lang,
        };
      })(action, state);
    default:
      return state;
  }
}
