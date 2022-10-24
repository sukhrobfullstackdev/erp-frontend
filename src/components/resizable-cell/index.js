import React, { useState } from "react";
import styled from "styled-components";
import { get } from "lodash";
import { Resizable } from "react-resizable";

const Style = styled.div`
  padding: 15px;
  .box {
    outline: 1px solid red;
  }
`;
const ResizeableCell = ({ ...rest }) => {
  const [state, setState] = useState({ width: 100, height: 100 });
  const onResize = (event, { element, size: { width, height }, handle }) => {
    setState((state) => ({ ...state, width, height }));
  };
  return (
    <Style {...rest}>
      <Resizable width={get(state, "width")} height={get(state, "height")} onResize={onResize}>
        <div
          className="box"
          style={{
            width: get(state, "width") + "px",
            height: get(state, "height") + "px",
          }}
        >
          <span>Resize cell</span>
        </div>
      </Resizable>
    </Style>
  );
};

export default ResizeableCell;
