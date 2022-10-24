import React, { memo } from "react";
import styled from "styled-components";

const StyledBoardItem = styled.div``;

const BoardItem = ({ item = {}, isDragging, isGroupedOver, provided, ...rest }) => {
  return (
    <StyledBoardItem
      isDragging={isDragging}
      isGroupedOver={isGroupedOver}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      {...rest}
    >
      Board Item
    </StyledBoardItem>
  );
};

export default memo(BoardItem);
