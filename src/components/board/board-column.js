import React, { memo } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const StyledBoardColumn = styled.div``;
const BoardColumn = ({ ...rest }) => {
  return (
    <StyledBoardColumn {...rest}>
      <Draggable draggableId={1} index={1}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.draggableProps}>
            <h2 isDragging={snapshot.isDragging} {...provided.dragHandleProps}>
              Column header
            </h2>
          </div>
        )}
      </Draggable>
    </StyledBoardColumn>
  );
};

export default memo(BoardColumn);
