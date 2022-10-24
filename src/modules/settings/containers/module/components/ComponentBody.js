import React from "react";
import ListItem from "../../../../../containers/ListView/components/ListItem";
import DragAndDrop from "../../../../../components/darg-and-drop/drag-and-drop";

const ComponentBody = ({ children, data = [], changeOrder = () => {}, ...rest }) => {
  return (
    <>
      <DragAndDrop data={data} ItemBody={ListItem} changeOrder={changeOrder} />
    </>
  );
};

export default ComponentBody;
