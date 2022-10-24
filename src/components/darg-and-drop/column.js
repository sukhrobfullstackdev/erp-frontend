import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Item from "./item";
import { get } from "lodash";
import { Col } from "react-grid-system";
import classNames from "classnames";

const StyledColumn = styled.div``;
const Column = ({
  ItemBody,
  column: { items = [], id = "" },
  col = 12,
  itemSize = "lg",
  link,
  changeOrder = () => {},
  columnIndex,
  ...rest
}) => {
  return (
    <Col xs={col}>
      <StyledColumn {...rest}>
        <Droppable droppableId={id} direction="vertical">
          {(provided, snapshotParent) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items &&
                items.map((item, index) => (
                  <Item key={get(item, "id")} item={item} draggableId={`${get(item, "id")}`} index={index}>
                    {({ item, snapshot }) => (
                      <ItemBody
                        isDraggingOver={snapshotParent.isDraggingOver || snapshot.isDragging}
                        changeOrder={changeOrder}
                        link={link}
                        className={classNames(`${itemSize}`, {
                          dragging: snapshot.isDragging,
                        })}
                        key={get(item, "id")}
                        item={item}
                        itemIndex={index}
                        {...rest}
                      />
                    )}
                  </Item>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </StyledColumn>
    </Col>
  );
};

export default Column;
