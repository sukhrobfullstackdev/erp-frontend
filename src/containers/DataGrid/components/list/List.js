import React, { memo, useState } from "react";
import { withTranslation } from "react-i18next";
import styled from "styled-components";
import { Col, Row } from "react-grid-system";
import ListRow from "./ListRow";
import Box from "../../../../components/elements/box";
import { connect } from "react-redux";
import { get } from "lodash";
import ApiActions from "../../../../services/api/actions";

const Style = styled.div``;

const List = ({ t, view, viewId, idList, url, entityName, scheme, ...rest }) => {
  const [statusList, setStatusList] = useState([]);
  return (
    <Style {...rest}>
      <Box sm gray>
        <Row>
          <Col xs={12}>
            <ListRow />
          </Col>
        </Row>
      </Box>
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
        },
      });
    },
  };
};

export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(memo(List)));
