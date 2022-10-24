import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { ceil, chunk, find, floor, get, groupBy, head, isArray, isEmpty, isEqual, unionBy } from "lodash";
import ApiActions from "../../../../services/api/actions";
import BoardColumn from "./BoardColumn";
import Normalizer from "../../../../services/normalizer";

const Style = styled.div`
  padding: 20px 30px 0 30px;

  .board-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  div {
    &[data-simplebar] {
      width: 100%;
    }
  }

  .simplebar-track {
    &.simplebar-vertical,
    &.simplebar-hover {
      .simplebar-scrollbar {
        &:before {
          transition: none !important;
        }

        &.simplebar-visible,
        &.simplebar-hover {
          &:before {
            transition: none !important;
          }
        }
      }
    }
  }

  .horizontalSimpleBar {
    .horizontalSimpleBarBody {
      display: flex;

      .head-and-card {
        .status__container {
          margin-bottom: 10px;
          min-width: 274px;
          margin-right: 20px;

          &:last-child {
            margin-right: 0px;
          }
        }
      }

      .verticalSimpleBar {
        width: 288px;
        margin-right: 6px;

        &:hover {
          //background-color: red;
          .simplebar-track {
            &.simplebar-vertical {
              .simplebar-scrollbar {
                &:before {
                  opacity: 0.5;
                }
              }
            }
          }
        }

        .verticalSimpleBarBody {
          max-height: 81vh;

          &::-webkit-scrollbar {
            width: 0px;
            height: 0px;
          }

          .board-content-box {
            &-body {
              padding-bottom: 75px;

              .board-card {
                margin-bottom: 10px;
              }
            }
          }
        }
      }
    }
  }
`;
const Board = ({
  t,
  BoardItemComponent,
  view,
  idList,
  addStatus,
  getDataList,
  viewId,
  scheme,
  entities,
  redirectUrl,
  type,
  viewData,
  getBoardItemData,
  getIdListByStatusIdAndPage,
  ...rest
}) => {
  const [statusList, setStatusList] = useState([]);
  const [chunkedIdListData, setChunkedIdListData] = useState([]);
  const [groupedViewData, setGroupedViewData] = useState({});
  const [count, setCount] = useState(10);
  const [scrolling, setScrolling] = useState(true);

  useEffect(() => {
    if (statusList.length !== get(view, "statuses", []).length) {
      setStatusList(get(view, "statuses", []));
    }
  }, [view]);

  useEffect(() => {
    if (!isEmpty(idList)) {
      setIdListDataWithLoop(idList);
    }
  }, [idList]);

  useEffect(() => {
    if (!isEmpty(viewData)) {
      viewData = Normalizer.Denormalize(get(viewData, "result.data", []), [scheme], entities);
      viewData = groupBy(viewData, (item) => get(item, "status_id"));
      setGroupedViewData(viewData);
    }
  }, [viewData]);

  const setIdListDataWithLoop = (idListWithStatus) => {
    let chunkedIdList = idListWithStatus.map((item) => {
      return chunkIdList(item.statusId, item.idList, item);
    });

    setChunkedIdListData(chunkedIdList);
    getFirstTimeDataForCard(chunkedIdList);
  };

  const chunkIdList = (statusId, idListByStatus, item) => {
    let array = chunk(idListByStatus, count);
    return {
      statusId,
      idListData: array,
      count: get(item, "count", 0),
      page: 0,
      pageForServer: 0,
      hasNext: array.length * count <= get(item, "count", 0),
    };
  };

  const getFirstTimeDataForCard = (chunkedIdListData) => {
    let temp = [];
    chunkedIdListData.forEach((item) => {
      temp = temp.concat(head(get(item, "idListData", [])));
    });
    getDataList({
      id: viewId,
      params: temp,
      infinite: true,
    });
  };

  const getCardItemData = (statusId, nextIdList) => {
    if (!isEmpty(nextIdList)) {
      getBoardItemData({
        viewId,
        config: nextIdList,
        cb: {
          success: (data) => {
            setGroupedViewData((groupedViewData) => ({
              ...groupedViewData,
              [statusId]: [...get(groupedViewData, `${statusId}`, []), ...get(data, "data", [])],
            }));
            setScrolling(true);
          },
        },
      });
    }
  };

  const loadNextPage = (lastItemIndex, statusId) => {
    setScrolling(false);
    const page = ceil(lastItemIndex / count);
    let currentChunkedItem = null;
    const result = chunkedIdListData.map((item) => {
      if (isEqual(get(item, "statusId"), statusId)) {
        currentChunkedItem = { ...item, page };
        return currentChunkedItem;
      }
      return item;
    });

    setChunkedIdListData(result);
    const nextIdList = getNextIdList(page, statusId, currentChunkedItem);
    if (!isEmpty(nextIdList)) {
      getCardItemData(statusId, nextIdList);
    } else {
      if (get(currentChunkedItem, "hasNext", false)) {
        getIdListByStatusIdAndPage({
          statusId,
          page: get(currentChunkedItem, "pageForServer", 0) + 1,
          config: view,
          cb: {
            success: (data) => {
              setScrolling(false);
              const resultChunkedItemIdList = [
                ...get(currentChunkedItem, "idListData", []),
                ...chunk(get(head(get(data, "data.genericResult", [])), "idList", []), count),
              ];
              currentChunkedItem = {
                ...currentChunkedItem,
                idListData: resultChunkedItemIdList,
                pageForServer: get(data, "data.page", 0),
                hasNext: resultChunkedItemIdList.length * count <= get(currentChunkedItem, "count", 0),
              };
              setChunkedIdListData((chunkedIdListData) => unionBy([currentChunkedItem], chunkedIdListData, "statusId"));
              getCardItemData(
                get(currentChunkedItem, "statusId"),
                get(currentChunkedItem, `idListData[${get(currentChunkedItem, "page")}]`, [])
              );
            },
          },
        });
      }
    }
  };

  const getNextIdList = (page, statusId, currentChunkedItem) => {
    return get(currentChunkedItem, `idListData[${page}]`, []);
  };

  return (
    <Style {...rest}>
      <div>
        <div className="board-header">
          {isArray(statusList) &&
            statusList.map((status, index) => (
              <div className="head-and-card" key={index}>
                <BoardColumn
                  BoardItemComponent={BoardItemComponent}
                  status={status}
                  data={get(groupedViewData, `${get(status, "id")}`)}
                  loadNextPage={loadNextPage}
                  count={get(
                    find(idList, (item) => isEqual(get(item, "statusId"), get(status, "id"))),
                    "count",
                    0
                  )}
                  scrolling={scrolling}
                />
              </div>
            ))}
        </div>
      </div>
    </Style>
  );
};

const mapStateToProps = (state, props) => {
  return {
    entities: get(state, "normalizer.entities", {}),
    viewData: get(state, `normalizer.data.${props.entityName}-view-data-list`, {}),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addStatus: ({ attributes, formMethods, cb, statusIdList }) => {
      dispatch({
        type: ApiActions.OPERATION_ADD.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          url: get(ownProps, "url.addStatus", "#"),
        },
      });
    },
    getDataList: ({ id = null, params, infinite = false, statusIdList }) => {
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
          attributes: statusIdList,
        },
      });
    },
    getBoardItemData: ({ viewId, config, cb }) => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: `${get(ownProps, `url.data`, "#")}/${viewId}`,
          config,
          storeName: "board-item-data-list",
          cb,
        },
      });
    },
    getIdListByStatusIdAndPage: ({ page, statusId, config, cb }) => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: `${get(ownProps, "url.ids", "#")}${statusId ? `?statusId=${statusId}&page=${page}` : ""}`,
          config,
          cb,
          // notSave:true
        },
      });
    },
  };
};

export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(memo(Board)));
