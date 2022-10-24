import React, { memo, useEffect } from "react";
import styled from "styled-components";
import { get, isEmpty, isNull, toLower } from "lodash";
import ApiActions from "../../../services/api/actions";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import Table from "./table";
import { InitialLoader } from "../../../components/loader";
import Board from "./board/Board";
import List from "./list/List";
import Actions from "../../../services/normalizer/actions";
import { toast } from "react-toastify";

const Style = styled.div``;
const GridBody = ({
  t,
  type = "TABLE",
  view = {},
  getIdList,
  idList,
  url,
  viewId,
  entityName,
  scheme,
  loadView,
  hideOrShowColumn = () => {},
  pinOrUnpinColumn = () => {},
  BoardItemComponent,
  redirectUrl,
  sortFromView,
  updateNormalizeData,
  ...rest
}) => {
  useEffect(() => {
    if (loadView) {
      if (!isEmpty(view)) {
        if (isNull(view)) toast.info("Internetda muammo bo'lishi mumkin. Iltimos qaytadan urinib ko'ring");
        else
          getIdList({
            config: view,
            cb: {
              success: ({ data }) => {
                // let chunk = get(data, "genericResult", []).slice(0,25);
                // updateNormalizeData({ data: [] });
              },
              fail: (e) => "",
            },
          });
      }
    }
  }, [view, loadView]);

  // if (!get(idList, "isFetched", false)) {
  //   return <InitialLoader />;
  // }

  if (get(idList, "result.data.genericResult", undefined) === undefined) return <InitialLoader />;

  return (
    <Style {...rest}>
      {((type) => {
        switch (type) {
          case "BOARD":
            return (
              <Board
                view={view}
                viewId={viewId}
                idList={get(idList, "result.data.genericResult", [])}
                url={url}
                entityName={entityName}
                scheme={scheme}
                BoardItemComponent={BoardItemComponent}
              />
            );
          case "LIST":
            return (
              <List
                view={view}
                viewId={viewId}
                idList={get(idList, "result.data.genericResult", [])}
                url={url}
                entityName={entityName}
                scheme={scheme}
              />
            );
          case "TABLE":
          default:
            return (
              <Table
                idList={get(idList, "result.data.genericResult", [])}
                {...{
                  updateNormalizeData,
                  sortFromView,
                  redirectUrl,
                  pinOrUnpinColumn,
                  hideOrShowColumn,
                  scheme,
                  entityName,
                  url,
                  viewId,
                  view,
                }}
              />
            );
        }
      })(type)}
    </Style>
  );
};

const mapStateToProps = (state, props) => {
  return {
    entities: get(state, "normalizer.entities", {}),
    idList: get(state, `api.${toLower(props.type)}-data-id-list.data`, {}),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getIdList: ({ config, cb = {} }) => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: get(props, "url.ids", "#"),
          config,
          storeName: `${toLower(props.type)}-data-id-list`,
          cb,
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
  };
};

export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(memo(GridBody)));
