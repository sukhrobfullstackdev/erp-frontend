import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { find, get, head, isEmpty, isEqual, isNil, isNull, uniqBy } from "lodash";
import { withRouter } from "react-router-dom";
import ViewTypeScheme from "../../schema/ViewTypeScheme";
import ViewOneScheme from "../../schema/ViewOneScheme";
import ApiActions from "../../services/api/actions";
import { withTranslation } from "react-i18next";
import Normalizer from "../../services/normalizer";
import GridHeader from "./components/GridHeader";
import { changeUrlWithoutRefresh, showError } from "../../utils";
import GridBody from "./components/GridBody";
import { InitialLoader } from "../../components/loader";
import ViewOneSchemeDynamic from "schema/ViewOneSchemeDynamic";
import DynamicScheme from "schema/DynamicScheme";

const Container = ({
  t,
  history,
  match: {
    params: { id },
  },
  getViewTypesList,
  entities,
  viewTypesList,
  getViewOne,
  view,
  scheme,
  entityName,
  url,
  updateViewRequest,
  addViewRequest,
  redirectUrl,
  BoardItemComponent,
  itemAddModal,
  deleteViewRequest,
  duplicateViewRequest,
  customLeftElement,
  customRightElement,
  createButtonConfig = {},
  setTempData,
  getData,
  viewTypes,
  ...rest
}) => {
  const viewStateKey = `${entityName}-viewState`;
  const viewState = getData(viewStateKey);
  const loadView = getData("loadView");

  useEffect(() => {
    if (!isEmpty(get(url, "viewList", "")) && isEmpty(viewTypesList)) {
      getViewTypesList();
    }
    setTempData({ storeName: "loadView", data: true });
  }, []);

  viewTypesList = useMemo(
    () => Normalizer.Denormalize(viewTypesList, { result: { data: { viewTypes: [ViewTypeScheme] } } }, entities),
    [viewTypesList, viewTypes]
  );

  useEffect(() => {
    if (get(viewTypesList, "isFetched")) {
      if (!isEmpty(get(url, "viewList", ""))) {
        const viewId = !isNil(id) ? id : get(head(get(viewTypesList, `result.data.viewTypes`, [])), "defaultView.id", null);
        getViewOne(viewId);
      }
    }
    if (isEmpty(get(url, "viewList", ""))) {
      getViewOne(null);
    }
  }, [id, get(viewTypesList, "isFetched")]);

  useEffect(() => {
    let denormalizeView = Normalizer.Denormalize(view, { result: { data: ViewOneScheme(`${entityName}-view-one`) } }, entities);

    if (!isEmpty(get(denormalizeView, "result.data"))) {
      setTempData({
        storeName: viewStateKey,
        data: get(denormalizeView, "result.data", {}),
      });
    }
  }, [view, get(entities, `${entityName}-view-one.${id}.columns`, null)]);

  view = useMemo(
    () => Normalizer.Denormalize(view, { result: { data: ViewOneScheme(`${entityName}-view-one`) } }, entities),
    [view]
  );

  if (!id && get(head(get(viewTypesList, `result.data.viewTypes`, [])), "defaultView.id", "")) {
    history.push(`${redirectUrl.view}${get(head(get(viewTypesList, `result.data.viewTypes`, [])), "defaultView.id", "")}`);
    // changeUrlWithoutRefresh(
    //   `${redirectUrl.view + get(head(get(viewTypesList, `result.data.viewTypes`, [])), "defaultView.id", "")}`
    // );
  }

  const canUpdateView = (result = {}) => {
    return !isEmpty(result) && get(result, "autoSave", false) && get(result, "permissionsUser.canUpdateView", false);
  };

  const searchView = useCallback(
    (search, columns) => {
      const result = {
        ...viewState,
        viewFilter: {
          ...get(viewState, "viewFilter", {}),
          search,
          searchingColumns: columns,
        },
      };

      setTempData({ storeName: viewStateKey, data: result });

      if (canUpdateView(result)) {
        updateViewRequest({ attributes: result });
      }
    },
    [viewState]
  );

  const sortFromView = useCallback(
    (column, isAdd = null) => {
      if (isAdd) {
        let hasColumn = find(get(viewState, "sorting"), (item) => isEqual(get(item, "field"), get(column, "field")));
        hasColumn = hasColumn
          ? {
              ...hasColumn,
              direction: isEqual(get(column, "direction"), 1) ? -1 : 1,
            }
          : column;

        const columns = [...get(viewState, "sorting", [])].sort((a, b) => a.orderIndex - b.orderIndex);
        const idxColumn = columns?.findIndex((item) => item.field == column.field);

        if (idxColumn > -1) columns.splice(idxColumn, 1, hasColumn);

        const prevResult = { ...get(view, "result.data", {}) };
        const result = {
          ...viewState,
          sorting: idxColumn > -1 ? columns : uniqBy([...get(viewState, "sorting"), hasColumn], "field"),
        };

        setTempData({ storeName: viewStateKey, data: result });

        if (canUpdateView(result)) {
          updateViewRequest({
            attributes: result,
            cbFail: (e) => {
              setTempData({
                storeName: viewStateKey,
                data: prevResult,
              });
              showError(e);
            },
          });
        }
      } else if (!isNil(isAdd)) {
        const result = {
          ...viewState,
          sorting: get(viewState, "sorting").filter((item) => !isEqual(get(item, "field"), get(column, "field"))),
        };

        setTempData({ storeName: viewStateKey, data: result });

        if (canUpdateView(result)) updateViewRequest({ attributes: result });
      }
    },
    [viewState]
  );

  const filterView = useCallback(
    (filterFields, filterOperator) => {
      const result = {
        ...viewState,
        viewFilter: {
          ...get(viewState, "viewFilter", {}),
          filterFields,
          filterOperator,
        },
      };

      setTempData({ storeName: viewStateKey, data: result });
      if (canUpdateView(result)) {
        updateViewRequest({ attributes: result });
      }
    },
    [viewState]
  );

  const hideOrShowColumn = useCallback(
    (column, show) => {
      let result = {
        ...viewState,
        columns: get(viewState, "columns", []).map((col) => {
          if (!isNil(column))
            return isEqual(get(col, "id"), column)
              ? {
                  ...col,
                  hidden: !show,
                }
              : col;
          else
            return !isEqual(get(col, "root"), true)
              ? {
                  ...col,
                  hidden: !show,
                }
              : { ...col, hidden: false };
        }),
      };

      if (!isEmpty(result)) {
        setTempData({ storeName: "loadView", data: false });
        setTempData({ storeName: viewStateKey, data: result });
        if (canUpdateView(result)) {
          updateViewRequest({ attributes: result });
        }
      }
    },
    [viewState, loadView]
  );

  const pinOrUnpinColumn = useCallback(
    (column, pin) => {
      let result = viewState;
      if (pin && !isNil(column)) {
        result = {
          ...result,
          columns: get(result, "columns", []).map((col) =>
            isEqual(get(col, "id"), column)
              ? {
                  ...col,
                  pinned: true,
                }
              : col
          ),
        };
      }
      if (!pin && !isNil(column)) {
        result = {
          ...result,
          columns: get(result, "columns").map((col) =>
            isEqual(get(col, "id"), column)
              ? {
                  ...col,
                  pinned: false,
                }
              : col
          ),
        };
      }
      if (!isEmpty(result)) {
        setTempData({ storeName: "loadView", data: false });
        setTempData({ storeName: viewStateKey, data: result });
      }
      if (canUpdateView(result)) {
        updateViewRequest({ attributes: result });
      }
    },
    [viewState, loadView]
  );

  const resizeColumn = useCallback((column, width) => {}, [view]);

  const reOrderColumn = useCallback(() => {}, [view]);

  const changeRowSize = useCallback(
    (rowSize) => {
      const result = {
        ...viewState,
        rowSize,
      };
      setTempData({ storeName: "loadView", data: false });
      setTempData({ storeName: viewStateKey, data: result });
      if (canUpdateView(result)) {
        updateViewRequest({ attributes: result });
      }
    },
    [viewState, loadView]
  );

  // BAZI PAGEDA ID NULL BO'LADI SHUNING UCHUN UNI SAGADAN STRINGGA AYLANTIRIB BU YERDA UN LOADINGGA TUSHMASLIGI UCHUN ID NI NULLGA TEKSHIRDIM
  // if (get(viewState, "id") !== "null" && !get(viewState, "viewFilter", false)) return <InitialLoader />;
  if (!get(viewState, "id") && !get(viewState, "viewFilter", false)) return <InitialLoader />;

  const type = get(viewState, "type", "TABLE");

  const changeSearchHandling = (value) =>
    setTempData({
      storeName: viewStateKey,
      data: {
        ...viewState,
        viewFilter: { ...viewState.viewFilter, search: value },
      },
    });

  return (
    <>
      <GridHeader
        view={viewState}
        searchFromView={searchView}
        filter={get(viewState, "viewFilter", {})}
        {...{
          duplicateViewRequest,
          deleteViewRequest,
          itemAddModal,
          type,
          redirectUrl,
          history,
          filterView,
          addViewRequest,
          changeRowSize,
          hideOrShowColumn,
          viewTypesList,
          customLeftElement,
          customRightElement,
          createButtonConfig,
          changeSearchHandling,
          entityName,
          url: {
            ids: get(url, "ids", "#"),
          },
        }}
      />
      <GridBody
        type={type}
        view={viewState}
        loadView={loadView}
        entityName={entityName}
        scheme={scheme}
        sortFromView={sortFromView}
        hideOrShowColumn={hideOrShowColumn}
        pinOrUnpinColumn={pinOrUnpinColumn}
        redirectUrl={redirectUrl}
        BoardItemComponent={BoardItemComponent}
        url={{
          ids: get(url, "ids", "#"),
          data: get(url, "data", "#"),
          addOrEditCell: get(url, "addOrEditCell", "#"),
          addCustomField: get(url, "addCustomField", "#"),
          editCustomField: get(url, "editCustomField", "#"),
        }}
        viewId={id ?? get(head(get(viewTypesList, `result.data.viewTypes`, [])), "defaultView.id", null)}
      />
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    entities: get(state, "normalizer.entities", {}),
    viewTypesList: get(state, `normalizer.data.${ownProps.entityName}-view-types-list`, {}),
    viewTypes: get(state, `normalizer.entities.view-type`, {}),
    view: get(state, `normalizer.data.${ownProps.entityName}-view-one`, {}),
    getData: (storeName) => get(state, `api.${storeName}`, {}),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getViewTypesList: () => {
      const storeName = `${ownProps.entityName}-view-types-list`;
      const entityName = `${ownProps.entityName}-view-type`;
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: `${get(ownProps, "url.viewList", "#")}`,
          config: {
            params: {},
          },
          scheme: { result: { data: { viewTypes: DynamicScheme(entityName, "name") } } },
          storeName: storeName,
          entityName: entityName,
        },
      });
    },
    getViewOne: (id) => {
      const storeName = `${ownProps.entityName}-view-one`;
      const entityName = `${ownProps.entityName}-view-one`;
      const scheme = { data: ViewOneScheme(entityName) };
      dispatch({
        type: ApiActions.GET_ONE.REQUEST,
        payload: {
          url: `${get(ownProps, "url.viewOne", "#")}/${id === "dc7ea51c-7c16-4790-8533-8e4d49901f7d" ? "null" : id}`,
          scheme,
          storeName,
          entityName,
        },
      });
    },
    addViewRequest: ({ attributes, formMethods, cb }) => {
      const storeName = "view-types-list";
      const entityName = "view-type";
      // const storeName = `${ownProps.entityName}-view-types-list`;
      // const entityName = `${ownProps.entityName}-view-type`;
      const scheme = { data: ViewTypeScheme };
      dispatch({
        type: ApiActions.OPERATION_ADD.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          url: get(ownProps, "url.viewAdd", "#"),
          config: {
            ...ownProps.params,
          },
          scheme,
          storeName,
          entityName,
          isChangeListState: false,
        },
      });
    },

    deleteViewRequest: ({ id, formMethods, cb }) => {
      const storeName = "view-types-list";
      const entityName = "view-type";
      // const storeName = `${ownProps.entityName}-view-types-list`;
      // const entityName = `${ownProps.entityName}-view-type`;
      const scheme = { data: ViewTypeScheme };
      dispatch({
        type: ApiActions.OPERATION_DELETE.REQUEST,
        payload: {
          id,
          formMethods,
          cb,
          url: `${get(ownProps, `url.viewDelete`, "#")}/${id}`,
          config: {
            ...ownProps.params,
          },
          scheme,
          storeName,
          entityName,
        },
      });
    },

    updateViewRequest: async ({
      attributes,
      cbFail = (e) => {
        showError(e);
      },
      formMethods = {},
      cb = {},
    }) => {
      const storeName = `${ownProps.entityName}-view-one`;
      const entityName = `${ownProps.entityName}-view-one`;
      const scheme = { data: ViewOneScheme(entityName) };

      dispatch({
        type: ApiActions.OPERATION_UPDATE.REQUEST,
        payload: {
          attributes,
          formMethods,
          url: `${get(ownProps, "url.viewUpdate", "#")}`,
          config: {
            ...ownProps.params,
          },
          scheme,
          storeName,
          entityName,
          isChangeListState: false,
          cb: {
            success: () => {},
            fail: cbFail,
          },
        },
      });
    },

    duplicateViewRequest: (id) => {
      const storeName = "duplicate-view";
      const entityName = "view-type";
      // const storeName = `${ownProps.entityName}-duplicate-view`;
      // const entityName = `${ownProps.entityName}-view-type`;
      const scheme = { data: ViewTypeScheme };
      dispatch({
        type: ApiActions.GET_ONE.REQUEST,
        payload: {
          url: `${get(ownProps, "url.viewDuplicate", "#")}/${id}`,
          scheme,
          storeName,
          entityName,
        },
      });
    },
    setTempData: ({ data, storeName }) => {
      dispatch({
        type: ApiActions.TEMP_DATA.SUCCESS,
        payload: {
          item: data,
          storeName,
        },
      });
    },
  };
};

export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(withRouter(memo(Container))));
