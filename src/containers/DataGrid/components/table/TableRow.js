import React, { memo } from "react";
import styled from "styled-components";
import { get } from "lodash";
import Icon from "../../../../components/elements/icon";

const Style = styled.div``;

const TableRow = ({ index, isScrolling, style, rows, prepareRow, openRowItem, ...rest }) => {
  const row = rows[index];
  prepareRow(row);
  return (
    <div
      {...row.getRowProps({
        style,
        index,
      })}
      className="tr"
      key={index}
    >
      {row.cells.map((cell) => {
        const type = get(cell, "column.type", "");

        return (
          <div
            data-tip={get(cell, "value")}
            data-place={"top"}
            data-effect={"solid"}
            data-for={"foo"}
            {...cell.getCellProps()}
            className={`td ${
              type == "DROPDOWN" ||
              type == "LABELS" ||
              type == "FILES" ||
              type == "ASSIGN_LABEL" ||
              type == "FILE" ||
              type == "TREE" ||
              type == "SPECIAL_LABEL" ||
              type == "PRIORITY" ||
              type == "ENUM_DROPDOWN" ||
              type == "COMMENTS" ||
              type == "DATE" ||
              type == "PHONE"
                ? "unsetOverflow"
                : ""
            }`}
          >
            {/* {!isScrolling ? ( */}
            <>
              {cell.render("Cell")}
              {get(cell, "column.root", false) && (
                <Icon
                  icon={"icon-open-row-item"}
                  color={"#45B36B"}
                  mainClassName={"open-row-item-container"}
                  onClick={() => openRowItem(cell.row.original.id)}
                  data-tip="Open employee"
                  data-for="foo"
                  data-effect={"solid"}
                />
              )}
            </>
            {/* ) : ( */}
            {/* "" */}
            {/* )} */}
          </div>
        );
      })}
    </div>
  );
};

export default memo(TableRow);
