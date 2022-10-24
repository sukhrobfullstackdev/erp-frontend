import BoardHeader from "../../../components/lead/BoardHeader";
import { chunk, find, findIndex, get, head, isArray, isEmpty, isEqual, isNil } from "lodash";
import styled, { css } from "styled-components";
import SimpleBar from "simplebar-react";
import { connect } from "react-redux";
import AddStatus from "../../../components/lead/add-status";
import ApiActions from "../../../services/api/actions";
import Action from "../../../services/api/actions";
import Normalizer from "../../../services/normalizer";

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

const BoardView = ({
  BoardBodyComponent,
  getIdList,
  idList,
  headerData,
  addStatus,
  getDataList,
  viewId,
  viewData,
  scheme,
  entities,
  setIdListData,
  idListData,
  redirectUrl,
}) => {
  const [isScroll, setScroll] = useState(true);
  const [statuses, setStatuses] = useState([]);
  const [statusWithPageNumberList, setStatusWithPageNumberList] = useState([]);
  const [count, setCount] = useState(10);

  useEffect(() => {
    if (!isNil(headerData) && !isEmpty(headerData) && isEmpty(idListData)) getIdList({ config: headerData });
  }, []);

  useEffect(() => {
    if (statuses.length !== get(headerData, "statuses", []).length) {
      setStatuses(get(headerData, "statuses", []));

      setStatusWithPageNumberList(
        get(headerData, "statuses", []).map((item) => ({
          statusId: item.id,
          page: 0,
        }))
      );
    }
  }, [headerData]);

  useEffect(() => {
    if (!isEmpty(get(idList, "result.data.genericResult", [])) && isEmpty(idListData)) {
      setIdListDataWithLoop(get(idList, "result.data.genericResult", []));
    } else if (!isEmpty(get(idList, "result.data.genericResult", [])) && get(idList, "result.data.statusId", "")) {
      let chunkedIdList = chunkIdList(
        get(idList, "result.data.genericResult[0].statusId", ""),
        get(idList, "result.data.genericResult[0].idList", [])
      );

      let temp = idListData.map((item) => {
        return get(item, "statusId", "") == get(idList, "result.data.statusId", "")
          ? {
              statusId: get(chunkedIdList, "statusId", ""),
              idListData: get(item, "idListData", []).concat(get(chunkedIdList, "idListData", [])),
              hasNext: get(chunkedIdList, "hasNext", true),
              count: get(item, "count"),
            }
          : item;
      });

      let nextIdList = getIdListByPageFromStatusIdList(chunkedIdList, 0);

      if (!isEmpty(nextIdList)) {
        statusWithPageNumberList[
          findIndex(statusWithPageNumberList, function (o) {
            return get(o, "statusId") == get(idList, "result.data.statusId", "");
          })
        ].page++;
        setStatusWithPageNumberList(statusWithPageNumberList);
        getDataList({
          id: viewId,
          params: nextIdList,
          infinite: true,
        });
      }

      setIdListData(temp);

      isFetched = true;
    }
  }, [get(idList, "result.data.genericResult", [])]);

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
  let isFetched = get(viewData, "isFetched", false);

  viewData = Normalizer.Denormalize(get(viewData, "result.data", []), [scheme], entities);

  const setIdListDataWithLoop = (idListWithStatus) => {
    let chunkedIdList = idListWithStatus.map((item) => chunkIdList(item.statusId, item.idList, item));
    setIdListData(chunkedIdList);
    getFirstTimeDataForCard(chunkedIdList);
  };

  const chunkIdList = (statusId, idListByStatus, item) => {
    let array = chunk(idListByStatus, count);
    return {
      statusId,
      idListData: array,
      count: get(item, "count", 0),
      hasNext: array.length > 9,
    };
  };

  const getCountByStatusId = (statusId) => {
    return get(
      idListData.find((item) => item.statusId == statusId),
      "count",
      0
    );
  };

  const addStatusHandling = (data) => {
    addStatus({
      attributes: data,
      formMethods: {},
      cb: {
        success: (res, data) => {
          let newStatus = get(res, "result.data");
          if (newStatus) {
            setStatuses([...statuses, newStatus]);
          }
        },
      },
    });
  };

  const getListDataByStatusId = (statusId) => {
    return find(idListData, ["statusId", statusId]);
  };

  const getIdListByPageFromStatusIdList = (statusIdList, page) => {
    let idListByStatusIdTemp = get(statusIdList, "idListData", []);

    return get(idListByStatusIdTemp, page, []);
  };

  const getPageByStatusId = (statusId) => {
    let index = statusWithPageNumberList?.findIndex((item) => item.statusId === statusId);
    return {
      page: get(statusWithPageNumberList[index], "page", ""),
      index,
    };
  };

  const bottomScrollHandling = (status) => {
    isFetched = false;
    let { page, index } = getPageByStatusId(get(status, "id", ""));

    let statusIdList = getListDataByStatusId(get(status, "id", ""));

    let nextIdList = getIdListByPageFromStatusIdList(statusIdList, ++page);

    if (!isEmpty(nextIdList)) {
      statusWithPageNumberList[index].page++;
      setStatusWithPageNumberList(statusWithPageNumberList);
      getDataList({
        id: viewId,
        params: nextIdList,
        infinite: true,
      });
    } else {
      if (get(statusIdList, "hasNext")) {
        getIdList({
          config: headerData,
          statusId: get(status, "id", ""),
          page: get(statusIdList, "page", 0) + 1,
        });
      }
    }
  };

  return (
    <Style {...{ isScroll }}>
      <div>
        <div className="board-header">
          <SimpleBar className={"horizontalSimpleBar"}>
            {({ scrollableNodeRef, contentNodeRef }) => (
              <div ref={scrollableNodeRef}>
                <div className="horizontalSimpleBarBody" ref={contentNodeRef}>
                  {isArray(statuses) &&
                    statuses.map((val, ind) => (
                      <div className="head-and-card" key={ind}>
                        <BoardHeader
                          data={{
                            colorCode: get(val, "colorCode", ""),
                            name: get(val, "name", ""),
                            count: getCountByStatusId(get(val, "id", "")),
                            fillColor: "#3772FF",
                          }}
                        />
                        <SimpleBar
                          // data-simplebar-auto-hide="false"
                          className={"verticalSimpleBar"}
                          style={{
                            maxHeight: "73vh",
                          }}
                          forceVisible={"y"}
                        >
                          {({ scrollableNodeRef, contentNodeRef }) => (
                            <div
                              ref={scrollableNodeRef}
                              className={"verticalSimpleBarBody"}
                              onScroll={({ target }) => {
                                let bottom = target.scrollHeight - target.clientHeight;
                                if (bottom - 200 < target.scrollTop && bottom - 50 > target.scrollTop && isFetched)
                                  bottomScrollHandling(val);
                              }}
                            >
                              <div className={"board-content-box"} ref={contentNodeRef}>
                                <div className="board-content-box-body">
                                  {viewData.map((dataItem, dataIndex) => {
                                    if (get(val, "id", "") == get(dataItem, "status_id", ""))
                                      return (
                                        <BoardBodyComponent
                                          key={get(dataItem, "id", "")}
                                          item={dataItem}
                                          redirectUrl={redirectUrl}
                                          className="board-card"
                                        />
                                      );
                                    else return "";
                                  })}
                                </div>
                              </div>
                            </div>
                          )}
                        </SimpleBar>
                      </div>
                    ))}
                  <SimpleBar className={"verticalSimpleBar"} style={{ maxHeight: "83vh" }}>
                    {({ scrollableNodeRef, contentNodeRef }) => (
                      <div ref={scrollableNodeRef} className={"verticalSimpleBarBody"}>
                        <div className={"board-content-box"} ref={contentNodeRef}>
                          <AddStatus dataHandling={addStatusHandling} />
                        </div>
                      </div>
                    )}
                  </SimpleBar>
                </div>
              </div>
            )}
          </SimpleBar>
        </div>
      </div>
    </Style>
  );
};

const mapStateToProps = (state, props) => {
  return {
    entities: get(state, "normalizer.entities", {}),
    idList: get(state, "api.board-data-id-list.data", {}),
    viewData: get(state, `normalizer.data.${props.entityName}-view-data-list`, {}),
    idListData: get(state, `api.${props.entityName}-idListData`, []),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getIdList: ({ config, statusId, page }) => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: `${get(ownProps, "url.ids", "#")}${statusId ? `?statusId=${statusId}&page=${page}` : ""}`,
          config,
          storeName: "board-data-id-list",
        },
      });
    },
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
        type: ApiActions.GET_DATA_FOR_BOARD_VIEW_AND_LIST_VIEW.REQUEST,
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
    setIdListData: (idList) => {
      dispatch({
        type: Action.TEMP_DATA.REQUEST,
        payload: {
          item: idList,
          storeName: `${ownProps.entityName}-idListData`,
        },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(BoardView));
