import actions from "./actions";
import get from "lodash/get";
import ApiActions from "../api/actions";
import { isEqual } from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case actions.NORMALIZE.REQUEST:
      return ((action, state) => {
        const { storeName } = action.payload;
        return {
          ...state,
          data: {
            ...get(state, "data", {}),
            [storeName]: {
              ...get(state, `data.${storeName}`, {}),
              isFetched: false,
            },
          },
        };
      })(action, state);
    case actions.NORMALIZE.SUCCESS:
      return ((action, state) => {
        const { entities, result, storeName, entityName, infinite = false, setDataOnlyEntities = false } = action.payload;
        const entitiesKeys = Object.keys(entities);
        let _entities_ = get(state, "entities", {});
        let entities_ = get(state, "entities", {});
        if (entitiesKeys.length > 0) {
          entitiesKeys.map((_entityName_) => {
            return (_entities_[_entityName_] = {
              ...entities_[_entityName_],
              ...entities[_entityName_],
            });
          });
        }
        return {
          ...state,
          entities: {
            ...get(state, "entities"),
            ..._entities_,
          },
          data: {
            ...get(state, "data", {}),
            ...(setDataOnlyEntities
              ? {}
              : {
                  [storeName]: infinite
                    ? {
                        ...get(state, `data[${storeName}]`, {}),
                        result: {
                          ...get(state, `data.${storeName}.result`, {}),
                          data: Array.from(
                            new Set([...get(state, `data.${storeName}.result.data`, []), ...get(result, "data", [])])
                          ),
                        },
                        isFetched: true,
                        entityName,
                      }
                    : { result, isFetched: true, entityName },
                }),
          },
        };
      })(action, state);
    case actions.NORMALIZE.FAILURE:
      return (() => {
        const { storeName, errors } = action.payload;
        return {
          ...state,
          data: {
            ...get(state, "data", {}),
            [storeName]: {
              isFetched: true,
              hasErrors: true,
              errors,
            },
          },
        };
      })();

    case ApiActions.CHANGE_DATA.SUCCESS:
      return (() => {
        const { storeName, entityName, data } = action.payload;
        return {
          ...state,
          data: {
            ...get(state, "data", {}),
            [storeName]: {
              result: {
                ...get(state, `data.${storeName}.result`, {}),
                data,
              },
              isFetched: true,
              entityName,
            },
          },
        };
      })();
    case actions.NORMALIZE.TRIGGER:
      return (() => {
        const { storeName } = action.payload;
        return {
          ...state,
          data: {
            ...get(state, "data", {}),
            [storeName]: {
              isFetched: false,
            },
          },
        };
      })();
    case ApiActions.OPERATION_DELETE.SUCCESS:
      return ((action, state) => {
        const { id, storeName, entityName } = action.payload;
        let result = get(state, `data.${storeName}.result.data`, []);
        if (result && id) {
          result = get(state, `data.${storeName}.result.data`, []).filter((item) => !isEqual(item, id));
        }
        return {
          ...state,
          data: {
            ...get(state, "data", {}),
            [storeName]: {
              result: { data: result },
              isFetched: true,
              entityName,
            },
          },
        };
      })(action, state);

    case ApiActions.OPERATION_ADD.SUCCESS:
      return ((action, state) => {
        const {
          result: { data: id },
          storeName,
          entityName,
        } = action.payload;
        let data = get(state, `data.${storeName}.result.data`, []);
        if (id) {
          data = [...get(state, `data.${storeName}.result.data`, []), id];
        }
        return {
          ...state,
          data: {
            ...get(state, "data", {}),
            [storeName]: {
              result: { data: data },
              isFetched: true,
              entityName,
            },
          },
        };
      })(action, state);

    case actions.CHANGE_NORMALIZE_DATA.REQUEST:
      return ((action, state) => {
        const { normalize_data, entities, storeName, data, entityName } = action.payload;
        return {
          ...state,
        };
      })(action, state);

    case actions.CHANGE_NORMALIZE_DATA.SUCCESS:
      return ((action, state) => {
        const { normalize_data, entities, storeName, data, entityName } = action.payload;
        // let data = get(state, `data.${storeName}.result.data`, []);
        // if (id) {
        //     data = [...get(state, `data.${storeName}.result.data`, []),id];
        // }
        // debugger;
        return {
          ...state,
          // data: {
          //     ...get(state, 'data', {}),
          //     [storeName]: {result:{data:data}, isFetched: true, entityName},
          // },
        };
      })(action, state);

    case actions.UPDATE_NORMALIZER_DATA.REQUEST:
      return ((action, state) => {
        const { storeName } = action.payload;
        return {
          ...state,
          data: {
            ...get(state, "data", {}),
            [storeName]: {
              ...get(state, `data.${storeName}`, {}),
              isFetched: false,
            },
          },
        };
      })(action, state);
    case actions.UPDATE_NORMALIZER_DATA.SUCCESS:
      return ((action, state) => {
        const { data, storeName } = action.payload;

        return {
          ...state,
          entities: {
            ...get(state, "entities"),
          },
          data: {
            ...get(state, "data", {}),
            [storeName]: {
              ...get(state, `data[${storeName}]`, {}),
              result: {
                ...get(state, `data.${storeName}.result`, {}),
                data,
              },
              isFetched: true,
            },
          },
        };
      })(action, state);
    case actions.UPDATE_NORMALIZER_DATA.FAILURE:
      return (() => {
        const { storeName, errors } = action.payload;
        return {
          ...state,
          data: {
            ...get(state, "data", {}),
            [storeName]: {
              isFetched: true,
              hasErrors: true,
              errors,
            },
          },
        };
      })();

    case actions.UPDATE_NORMALIZER_ENTITIES.REQUEST:
      return ((action, state) => {
        const { entities } = action.payload;
        return state;
      })(action, state);
    case actions.UPDATE_NORMALIZER_ENTITIES.SUCCESS:
      return ((action, state) => {
        const { data, entities } = action.payload;

        return {
          ...state,
          entities: {
            ...get(state, "entities"),
            [entities]: data,
          },
        };
      })(action, state);
    case actions.UPDATE_NORMALIZER_ENTITIES.FAILURE:
      return (() => {
        const { entities, errors } = action.payload;
        return {
          ...state,
          entities: {
            ...get(state, "entities", {}),
            [entities]: {
              isFetched: true,
              hasErrors: true,
              errors,
            },
          },
        };
      })();

    case actions.UPDATE_NORMALIZER_ENTITY_ONE.REQUEST:
      return ((action, state) => {
        return state;
      })(action, state);
    case actions.UPDATE_NORMALIZER_ENTITY_ONE.SUCCESS:
      return ((action, state) => {
        const { data, entity, id, trigger } = action.payload;

        const formatData = (entityData) => {
          let temp = {};
          temp = entityData;
          temp[id] = data;
          if (trigger) delete temp[id];
          return temp;
        };

        return {
          ...state,
          entities: {
            ...get(state, "entities"),
            [entity]: {
              ...formatData(get(state, `entities.${entity}`)),
            },
          },
        };
      })(action, state);
    case actions.UPDATE_NORMALIZER_ENTITY_ONE.FAILURE:
      return (() => {
        const { data, entity, id, errors } = action.payload;
        return {
          ...state,
          entities: {
            ...get(state, "entities", {}),
            [entity]: {
              isFetched: true,
              hasErrors: true,
              errors,
            },
          },
        };
      })();

    default:
      return state;
  }
};
