import React, { memo, useCallback } from "react";
import { withTranslation } from "react-i18next";
import styled from "styled-components";
import { get, isEqual } from "lodash";
import BoardHeader from "./BoardHeader";
import { FixedSizeList as List } from "react-window";
import BoardItem from "./BoardItem";

const Style = styled.div`
  margin-right: 15px;

  .custom-scrollbar {
    &::-webkit-scrollbar {
      width: 7px;
      height: 11px;
    }

    &::-webkit-scrollbar-track {
      display: none;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(119, 126, 144, 1);
      border-radius: 5px;
      transition: 0.2s;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: rgba(119, 126, 144, 0.8);
    }
  }
`;

const BoardColumn = ({ t, BoardItemComponent, status = {}, data = [], loadNextPage = () => {}, count, scrolling, ...rest }) => {
  const listRef = React.createRef();

  const ListRow = useCallback(
    ({ index, style }) => {
      const row = data[index];
      return (
        <div style={style}>
          <BoardItem style={style} BoardItemComponent={BoardItemComponent} key={index} item={row} />
        </div>
      );
    },
    [data]
  );

  return (
    <Style {...rest}>
      <BoardHeader data={status} count={count} />
      <List
        height={750}
        itemCount={data.length}
        itemSize={135}
        ref={listRef}
        className={"custom-scrollbar"}
        onItemsRendered={({ visibleStopIndex }) => {
          if (scrolling && isEqual(visibleStopIndex + 1, data.length)) {
            loadNextPage(visibleStopIndex + 1, get(status, "id", null));
          }
        }}
      >
        {ListRow}
      </List>
    </Style>
  );
};

export default withTranslation("pdp")(memo(BoardColumn));
