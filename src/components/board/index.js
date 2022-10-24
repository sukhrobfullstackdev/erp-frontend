import React, { memo } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import Board from "./board";
import BoardColumn from "./board-column";
import BoardItem from "./board-item";

const Styled = styled.div``;
const BoardDragAndDrop = ({
  data = [],
  BoardColumn = BoardColumn,
  BoardItem = BoardItem,
  type = "COLUMN",
  direction = "horizontal",
  ...rest
}) => {
  const onDragEnd = () => {};
  return (
    <Styled {...rest}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Board type={type} direction={direction} BoardColumn={BoardColumn} BoardItem={BoardItem} />
      </DragDropContext>
    </Styled>
  );
};

export default memo(BoardDragAndDrop);
