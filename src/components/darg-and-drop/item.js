import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const StyledItem = styled.div``;
const Item = ({ children, item, index, draggableId, ...rest }) => {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <StyledItem {...rest} ref={provided.innerRef} {...provided.draggableProps}>
          {children({ item, snapshot })}
        </StyledItem>
      )}
    </Draggable>
  );
};

export default Item;
