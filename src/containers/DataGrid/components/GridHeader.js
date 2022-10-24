import React, { memo, useEffect, useMemo, useState } from "react";
import { find, get, isEmpty, isEqual, toLower } from "lodash";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { withTranslation } from "react-i18next";
import ViewHeaderBox from "./view-header/view-header-box";
import ViewHeaderRowSize from "./view-header/view-header-row-size";
import ViewHeaderColumns from "./view-header/view-header-columns";
import ViewHeaderFilter from "./view-header/view-header-filter";
import ViewHeaderViews from "./view-header/view-header-view";
import ViewHeaderSearch from "./view-header/view-header-search";
import ViewHeaderCreateBtn from "./view-header/view-header-create-btn";
import ApiActions from "../../../services/api/actions";
import { connect } from "react-redux";
import Actions from "../../../services/normalizer/actions";
import actions from "../../../services/normalizer/actions";

const Style = styled.div`
  .dropDown {
    &__button {
      margin: 0 5px;

      button {
        display: flex;
        border-radius: 6px;
        height: 32px;
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        align-items: center;
      }

      .icon-add-plus {
        width: 13px !important;
        height: 13px !important;
      }

      .filterBtn {
        button {
          padding: 0 14px;

          .ui__icon__wrapper {
            margin-left: 12px;
          }

          .icon-filter {
            width: 14px;
            height: 14px;
          }
        }
      }
    }

    &__body {
      overflow: inherit;
    }
  }

  .view_drop {
    .dropDown__body {
      z-index: 999;
      overflow: inherit;
      left: auto !important;
      right: 0px !important;
      top: 77px;

      .view {
        min-width: 720px;
        min-height: 400px;
        padding: 0 15px;

        &__left {
          padding: 20px 15px;
          border-right: 1px solid #e6e8ec;

          &__content {
            font-size: 12px;
            line-height: 18px;

            .ui__icon__wrapper {
              height: 24px;
              width: 24px;

              .icon-more-dots {
                height: 24px;
                width: 24px;
              }
            }
          }

          &__form {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-top: 20px;

            .personalPublic {
              color: #353945;
              font-size: 12px;
              font-weight: 400;

              .rc-checkbox-inner {
                border: 1px solid #002930;

                ::after {
                  top: 1px;
                  left: 4px;
                }
              }

              .rc-checkbox-checked {
                .rc-checkbox-inner {
                  border: 1px solid #45b26b;
                }
              }
            }

            .addNewList {
              margin-left: 30px;

              button {
                border-radius: 4px;
                font-size: 12px !important;
                font-weight: 500;
              }
            }
          }
        }

        &__right {
          padding-left: 8px !important;

          &__container {
            &__top__label {
              padding: 5px 14px;
              background-color: #fcfcfd;
              display: flex;
              align-items: center;
              margin-top: -36px;
              margin-bottom: 10px;
              min-width: 165px;
              border-bottom: none;
              border-radius: 7px 7px 0 0px;
              position: relative;
              box-shadow: 1px -6px 10px rgb(40 40 40 / 15%);

              ::after {
                content: "";
                position: absolute;
                border-radius: 100% 0 0;
                bottom: 1px;
                left: -3px;
                height: 10px;
                width: 10px;
                background-color: #fcfcfd;
              }

              &__input {
                .form-input-container {
                  border: none;
                  margin-left: 7px;

                  input {
                    padding: 5px;
                    outline: none;
                    font-size: 14px;
                    font-weight: 400;
                  }
                }
              }
            }

            &__body {
              padding: 15px 0 0 7px !important;

              &__title {
                margin-bottom: 10px;
                font-size: 14px;
                font-weight: 500;
                color: #b1b5c3;
              }

              &__button {
                button {
                  background-color: #fcfcfd;
                  display: flex;
                  align-items: center;
                  border-radius: 4px;
                  width: 100%;
                  font-size: 14px;
                  font-weight: 400;
                  padding: 8px 10px;
                  margin-bottom: 4px;
                  transition: 0.5s ease;

                  :hover {
                    color: #353945;
                    background-color: #fcfcfd;
                  }

                  .ui__icon__wrapper {
                    margin-right: 12px;

                    .icon {
                      background-color: #323232;
                    }
                  }
                }
              }
            }
          }

          .selected {
            button {
              background-color: #141416;
              color: #fcfcfd;

              .icon {
                background-color: #fcfcfd;
              }
            }
          }
        }
      }
    }
  }
`;

const GridHeader = ({
  t,
  viewTypesList = {},
  searchFromView,
  view,
  hideOrShowColumn,
  changeRowSize = () => {},
  addViewRequest,
  filterView = () => {},
  filter = {},
  redirectUrl,
  type,
  itemAddModal,
  deleteViewRequest,
  duplicateViewRequest,
  customLeftElement = "",
  customRightElement = "",
  createButtonConfig,
  getIdList,
  changeSearchHandling,
  updateNormalizeData,
  entities,
  setEntityOne,
  viewType,
}) => {
  const [check, setCheck] = useState("SMALL");
  const [selectedViewType, setSelectedViewType] = useState("TABLE");
  const [viewTypesListState, setViewTypesListState] = useState({});

  useEffect(() => {
    if (!isEmpty(view)) {
      setSelectedViewType(get(view, "type"));
      setCheck(get(view, "rowSize", "SMALL"));
    }
  }, [view]);

  const rowSizes = useMemo(
    () => [
      { value: "SMALL", label: t("SMALL") ?? "SMALL" },
      { value: "MEDIUM", label: t("MEDIUM") ?? "MEDIUM" },
      { value: "LARGE", label: t("LARGE") ?? "LARGE" },
      { value: "HUGE", label: t("HUGE") ?? "HUGE" },
    ],
    []
  );
  const columns = useMemo(() => get(view, "columns", []).filter(({ searchable }) => searchable), [view]);
  // const search = useMemo(() => get(view, "viewFilter.search", ""), [view]);
  const history = useHistory();

  const createView = ({ data, setError }) => {
    addViewRequest({
      attributes: {
        ...data,
        defaultViewId: get(entities, `view-type.${selectedViewType}.defaultView.id`, null),
      },
      formMethods: { setError },
      cb: {
        success: (normalizedData, data) => {
          const result = {
            ...viewType[selectedViewType],
            views: [...get(viewType, `${selectedViewType}.views`, []), get(data, "data", {})],
          };
          setEntityOne({ data: result, id: selectedViewType });
        },
      },
    });
  };

  const deleteView = (id) => {
    deleteViewRequest({
      id,
      cb: {
        success: (data) => {
          // const result = {
          //   ...viewTypesListState,
          //   result: {
          //     ...get(viewTypesListState, "result", {}),
          //     data: {
          //       ...get(viewTypesListState, "result.data", {}),
          //       viewTypes: get(viewTypesListState, "result.data.viewTypes", []).map((viewTypeItem) =>
          //         isEqual(get(viewTypeItem, "type"), get(data, "type"))
          //           ? {
          //               ...viewTypeItem,
          //               views: get(viewTypeItem, "views", []).filter(
          //                 (item) => !isEqual(get(item, "type", get(data, "data.type")))
          //               ),
          //             }
          //           : viewTypeItem
          //       ),
          //     },
          //   },
          // };
          // setViewTypesListState(result);
          const result = {
            ...viewType[selectedViewType],
            views: [...get(viewType, `${selectedViewType}.views`, []).filter((view) => view.id !== id)],
          };
          setEntityOne({ data: result, id: selectedViewType });
        },
      },
    });
  };

  const duplicateView = (id) => {};

  const getView = (type = "TABLE") => {
    return find(get(viewTypesList, "result.data.viewTypes", []), (viewItem) => isEqual(get(viewItem, "name"), type));
  };

  const redirectAdd = () => {
    if (get(redirectUrl, "itemAdd")) {
      history.push(get(redirectUrl, "itemAdd"));
    } else {
      itemAddModal(true);
    }
  };

  const reRender = () => {
    getIdList({
      config: view,
      cb: {
        success: ({ data }) => {
          // let chunk = get(data, "genericResult", []).slice(0,25);
          updateNormalizeData({ data: [] });
        },
        fail: (e) => "",
      },
    });
  };

  return (
    <Style>
      <ViewHeaderBox>
        {customLeftElement}
        <div style={{ flex: 1 }}>
          <ViewHeaderSearch
            searchingColumns={get(filter, "searchingColumns", [])}
            searchFields={columns}
            searchFromView={searchFromView}
            search={get(filter, "search", "")}
            changeSearchHandling={changeSearchHandling}
          />
        </div>

        <ViewHeaderCreateBtn
          {...{
            createButtonConfig,
            reRender,
          }}
        />
        <ViewHeaderViews
          {...{
            t,
            viewTypesList,
            redirectUrl,
            createView,
            deleteView,
            getView,
            viewTypesListState: viewTypesList,
            setSelectedViewType,
            selectedViewType,
          }}
        />
        <ViewHeaderFilter {...{ view, filter, filterView }} />
        <ViewHeaderRowSize changeRowSize={changeRowSize} defaultRowSize={get(view, "rowSize", "SMALL")} />
        <ViewHeaderColumns hideOrShowColumn={hideOrShowColumn} columns={get(view, "columns", [])} />
        {customRightElement}
      </ViewHeaderBox>
    </Style>
  );
};

const mapStateToProps = (state, props) => {
  return {
    entities: get(state, "normalizer.entities", {}),
    viewType: get(state, "normalizer.entities.view-type", {}),
    // viewTypesList: get(state, `normalizer.data.${props.entityName}-view-types-list.result.data`, {}),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getIdList: ({ config }) => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: get(props, "url.ids", "#"),
          config,
          storeName: `${toLower(props.type)}-data-id-list`,
        },
      });
    },
    updateNormalizeData: ({ storeName = `${get(props, "entityName", "")}-view-data-list`, data }) => {
      dispatch({
        type: Actions.UPDATE_NORMALIZER_DATA.REQUEST,
        payload: {
          data,
          storeName,
        },
      });
    },
    setEntityOne: ({ data, id, entity = null }) => {
      dispatch({
        type: actions.UPDATE_NORMALIZER_ENTITY_ONE.SUCCESS,
        payload: {
          data,
          entity: entity ? entity : `view-type`,
          id,
        },
      });
    },
  };
};

export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(memo(GridHeader)));
