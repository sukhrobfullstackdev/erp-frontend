import React, { memo, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { get, includes, isNull, keys, slice, sortBy } from "lodash";
import ApiActions from "../../../../services/api/actions";
import actions from "../../../../services/normalizer/actions";
import Normalizer from "../../../../services/normalizer";
import { connect } from "react-redux";
import Table from "./Table";
import { InitialLoader } from "../../../../components/loader";
import { toast } from "react-toastify";

const Style = styled.div`
  position: relative;
`;

let count = 0;
let isFirst = false;

const GridTable = ({
  view = {},
  idList = [],
  getDataList,
  viewData,
  entities,
  viewId,
  url,
  storeName,
  entityName,
  scheme,
  updateItemRequest,
  viewSearchAndFilter,
  sortFromView,
  sorting,
  hideOrShowColumn,
  pinOrUnpinColumn,
  rowSize,
  redirectUrl,
  changeRequest,
  request,
  changeData,
  viewOneData,
  viewTempData,
  updateNormalizeData,
  setEntityOne,
  ...rest
}) => {
  // const [startItemIndex, setStartItemIndex] = useState(0);
  // const [lastItemIndex, setLastItemIndex] = useState(25);
  // const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    startItemIndex: 0,
    lastItemIndex: 25,
  });

  useEffect(() => {
    if (state.lastItemIndex > state.startItemIndex && count && isFirst) {
      loadData(state.startItemIndex, state.lastItemIndex, true);
    }
  }, [state.lastItemIndex]);

  useEffect(() => {
    // updateNormalizeData({data: []});
    count++;
    isFirst = true;
    // setLoading(true);
    loadData(0, 25);
    setState((s) => ({ ...s, startItemIndex: 0, lastItemIndex: 25 }));
  }, [idList]);

  // let viewDataDenormalize = useMemo(() => Normalizer.Denormalize(viewData, {result: {data: [scheme]}}, entities), [viewData, idList]);
  let viewDataDenormalize = useMemo(
    () => Normalizer.Denormalize(viewData, { result: { data: [scheme] } }, entities),
    [viewData, idList, get(entities, entityName)]
  );

  const loadNextPage = (startIndex, lastIndex) => {
    // console.log("loadNextPage", startIndex, lastIndex);
    if (lastIndex + 1 >= state.lastItemIndex) {
      setState((s) => ({
        ...s,
        startItemIndex: state.lastItemIndex,
        lastItemIndex: state.lastItemIndex + 15,
      }));
    }
  };

  // Normlizer data ni ichida mavjud bo'lmagan idlar listini qaytaradi
  const outerJoin = (data) => {
    let entitiesData = get(entities, `${entityName}`, {});
    return data.filter((item) => !entitiesData[item]);
  };

  const loadData = (startIndex, lastIndex, infinite = false) => {
    let neededDataIds = slice(idList, startIndex, lastIndex);
    let ids = outerJoin(neededDataIds);
    // console.log(neededDataIds, ids);
    if (ids.length && idList.length > 0) {
      if (isNull(viewId)) toast.info("Kuting agar malumot kelmasa qaytadan urinib ko'ring");
      else
        getDataList({
          id: viewId === "dc7ea51c-7c16-4790-8533-8e4d49901f7d" ? "null" : viewId,
          params: ids,
          infinite: true,
          setDataOnlyEntities: true,
          cb: {
            success: (res, data) => {
              updateNormalizeData({
                data: infinite ? Array.from(new Set([...get(viewData, "result.data", []), ...neededDataIds])) : neededDataIds,
              });
              // setLoading(false);
            },
            fail: (e) => {
              // setLoading(false);
            },
          },
        });
    } else {
      updateNormalizeData({
        data: infinite ? Array.from(new Set([...get(viewData, "result.data", []), ...neededDataIds])) : neededDataIds,
      });
      // setLoading(false);
    }
  };

  const reorderingData = (data = [], ids = []) => {
    const last = data.length;

    return sortBy(data, function (item) {
      return ids.indexOf(get(item, "id")) !== -1 ? ids.indexOf(get(item, "id")) : last;
    });
  };

  const addCustomField = ({ data, setError }) => {
    request({
      attributes: data,
      formMethods: { setError },
      url: get(url, "addCustomField", "#"),
      cb: {
        success: ({ data }) => {
          const obj = get(entities, `${entityName}-view-one.${viewId}`, {});
          setEntityOne({
            id: viewId,
            data: { ...obj, columns: [...obj?.columns, data] },
          });
        },
        fail: (e) => {},
      },
    });
  };

  if (!get(viewDataDenormalize, "isFetched", true)) return <InitialLoader />;

  return (
    <Style {...rest}>
      {/* {!get(viewDataDenormalize, "isFetched", true) && <InitialLoader />} */}
      <Table
        fields={get(view, "columns", [])}
        updateItemRequest={updateItemRequest}
        data={get(viewDataDenormalize, "result.data", [])}
        columns={get(view, "columns", [])}
        permissions={get(view, "permissionsUser", {})}
        sorting={get(view, "sorting", [])}
        rowSize={get(view, "rowSize")}
        isNextPageLoading={get(viewDataDenormalize, "result.data", undefined) != undefined}
        startItemIndex={state.startItemIndex}
        {...{
          setEntityOne,
          entityName,
          viewId,
          sortFromView,
          hideOrShowColumn,
          pinOrUnpinColumn,
          redirectUrl,
          addCustomField,
          loadNextPage,
        }}
      />
    </Style>
  );
};

const mapStateToProps = (state, props) => {
  return {
    entities: get(state, "normalizer.entities", {}),
    viewData: get(state, `normalizer.data.${props.entityName}-view-data-list`, {}),
    viewOneData: get(state, `normalizer.data.${props.entityName}-view-one`, {}),
    viewTempData: get(state, `api.${props.entityName}-view-data-list-temp.data`, []),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getDataList: ({ id = null, params, infinite = false, cb = {}, setDataOnlyEntities = false }) => {
      const storeName = `${ownProps.entityName}-view-data-list`;
      const entityName = ownProps.entityName;
      const scheme = { data: [ownProps.scheme] };
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: `${get(ownProps, "url.data", "#")}/${id}`,
          method: "post",
          config: params,
          infinite,
          scheme,
          storeName,
          entityName,
          setDataOnlyEntities,
          cb,
        },
      });
    },

    addItemRequest: ({ attributes, formMethods, cb }) => {
      const storeName = ownProps.storeName;
      const entityName = ownProps.entityName;
      const scheme = { data: ownProps.scheme };
      dispatch({
        type: ApiActions.OPERATION_ADD.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          url: get(ownProps, "url.add", "#"),
          config: {
            ...ownProps.params,
          },
          scheme,
          storeName,
          entityName,
        },
      });
    },

    request: ({ attributes, formMethods, cb, url = "#", method = "post" }) => {
      dispatch({
        type: ApiActions.REQUEST.REQUEST,
        payload: {
          attributes,
          formMethods,
          method,
          cb,
          url,
        },
      });
    },

    updateItemRequest: ({
      id,
      viewId = get(ownProps, "viewId", ""),
      attributes,
      url = get(ownProps, "url.addOrEditCell", "#"),
      formMethods = {},
      cb = {
        success: (res) => {},
        fail: (e) => {},
      },
      method = "patch",
      isChangeListState = false,
      isStoreUpdate = false,
    }) => {
      const storeName = `${ownProps.entityName}-view-data-list`;
      const entityName = ownProps.entityName;
      const scheme = { data: ownProps.scheme };
      dispatch({
        type: ApiActions.OPERATION_UPDATE.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          url: `${url}${viewId ? `/${viewId}` : ""}${id ? `/${id}` : ""}`,
          method,
          config: {
            ...ownProps.params,
          },
          scheme,
          storeName,
          entityName,
          isChangeListState,
          isStoreUpdate,
          setResponseToEntity: (data) => {
            dispatch({
              type: actions.UPDATE_NORMALIZER_ENTITY_ONE.REQUEST,
              payload: {
                data,
                entity: entityName,
                id: get(data, "id"),
              },
            });
          },
        },
      });
    },

    changeRequest: ({ data }) => {
      const storeName = `${ownProps.entityName}-view-data-list`;
      const entityName = ownProps.entityName;
      dispatch({
        type: ApiActions.CHANGE_DATA.SUCCESS,
        payload: { storeName, entityName, data },
      });
    },
    setEntityOne: ({ data, id }) => {
      const entityName = ownProps.entityName;
      dispatch({
        type: actions.UPDATE_NORMALIZER_ENTITY_ONE.SUCCESS,
        payload: {
          data,
          entity: `${entityName}-view-one`,
          id,
        },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(GridTable));
