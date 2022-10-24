import React from "react";
import styled, { css } from "styled-components";
import ListItem from "./ListItem";
import DragAndDrop from "../../../components/darg-and-drop/drag-and-drop";

const StyledListBox = styled.div`
  padding: 20px;
  background: #e6e8ec;
  border-radius: 10px;
  margin-bottom: 20px;
  margin-top: 20px;
  border: 2px solid ${({ isDraggingOver }) => (isDraggingOver ? "#45B36B" : "transparent")};
  ::-webkit-scrollbar-track {
    display: none;
  }
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: #777e91;
    border-radius: 7px 1px 1px 7px;
  }
  .dragging.md,
  .dragging.sm {
    .form-input {
      color: #fff !important;
    }
  }
  ${({ active }) =>
    active &&
    css`
      box-shadow: 0px 8px 16px -8px rgba(15, 15, 15, 0.2);
      max-height: 470px;
      overflow: auto;
      border: 1px solid #b1b5c4;
    `}
`;
const ListBox = ({ data, itemSize = "lg", changeOrder = () => {}, link, ...rest }) => {
  return (
    <StyledListBox {...rest}>
      <DragAndDrop data={data} link={link} itemSize={itemSize} ItemBody={ListItem} changeOrder={changeOrder} />
    </StyledListBox>
  );
};

export default ListBox;
