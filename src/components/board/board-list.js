import React, { memo } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import BoardItem from "./board-item";

const StyledBoardList = styled.div``;
const BoardList = ({ items = [], ...rest }) => {
  return (
    <StyledBoardList {...rest}>
      <Draggable key={1} draggableId={1} index={1} shouldRespectForceTouch={false}>
        {(dragProvided, dragSnapshot) => (
          <BoardItem
            key={1}
            item={{}}
            isDragging={dragSnapshot.isDragging}
            isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
            provided={dragProvided}
          />
        )}
      </Draggable>
    </StyledBoardList>
  );
};

export default memo(BoardList);
