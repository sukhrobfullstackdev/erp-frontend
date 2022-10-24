import React, { memo } from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";

const StyledBoard = styled.div``;
const Board = ({ BoardColumn, BoardItem, ignoreContainerClipping = true, isCombineEnabled = true, type, direction, ...rest }) => {
  return (
    <StyledBoard {...rest}>
      <Droppable
        droppableId="board"
        type={type}
        direction={direction}
        ignoreContainerClipping={ignoreContainerClipping}
        isCombineEnabled={isCombineEnabled}
      >
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {BoardColumn}
          </div>
        )}
      </Droppable>
    </StyledBoard>
  );
};

export default memo(Board);
