import React, { memo } from "react";
import styled from "styled-components";
import { get } from "lodash";

const Style = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 12px;
`;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const capitalizeFirstLetterAnyString = (string) => {
  string = string.toLowerCase();
  string = string.split("_");
  string[0] = capitalizeFirstLetter(get(string, "[0]", ""));
  return string.join(" ");
};

const CallStatusCell = ({ initialValue, id, editable, rowId, index, updateItemRequest, setLoading, viewId }) => {
  return (
    <Style>
      <div
        style={{
          color: initialValue === "ANSWERED" ? "#45B36B" : initialValue === "NO_ANSWERED" && "#EF466F",
        }}
      >
        {capitalizeFirstLetterAnyString(initialValue)}
      </div>
    </Style>
  );
};

export default memo(CallStatusCell);
