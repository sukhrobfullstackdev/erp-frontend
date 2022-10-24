import React, { memo, useCallback, useEffect } from "react";
import { get, isEqual } from "lodash";
import { FixedSizeList as List } from "react-window";
import TableRow from "./TableRow";

const sizes = {
  SMALL: 30,
  MEDIUM: 50,
  LARGE: 80,
  HUGE: 110,
};

const TableBody = ({
  data = [],
  loadNextPage = () => {},
  totalColumnsWidth,
  scrollBarSize,
  listRef,
  rowSize,
  prepareRow,
  rows,
  openRowItem,
  itemCount,
}) => {
  const RenderRow = useCallback(
    ({ index, isScrolling, style, ...rest }) => (
      <TableRow
        rows={rows}
        prepareRow={prepareRow}
        index={index}
        isScrolling={isScrolling}
        style={style}
        openRowItem={openRowItem}
        {...rest}
      />
    ),
    [rows, prepareRow]
  );
  return (
    <div>
      <List
        height={750}
        itemCount={data.length}
        onItemsRendered={({ visibleStartIndex, visibleStopIndex }) => loadNextPage(visibleStartIndex, visibleStopIndex)}
        itemSize={get(sizes, rowSize, 30)}
        itemData={data}
        width={totalColumnsWidth + scrollBarSize}
        ref={listRef}
        useIsScrolling
        className={"flexedSizeList"}
      >
        {RenderRow}
      </List>
    </div>
  );
};

export default memo(TableBody);
