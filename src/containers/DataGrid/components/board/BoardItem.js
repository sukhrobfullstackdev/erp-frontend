import React, { memo } from "react";
import { withTranslation } from "react-i18next";
import styled from "styled-components";
import { get } from "lodash";

const Style = styled.div``;

const BoardItem = ({ item, BoardItemComponent, style, ...rest }) => {
  return (
    <Style {...rest}>
      <BoardItemComponent style={style} key={get(item, "id", "")} item={item} redirectUrl={""} className="board-card" />
    </Style>
  );
};

export default withTranslation("pdp")(memo(BoardItem));
