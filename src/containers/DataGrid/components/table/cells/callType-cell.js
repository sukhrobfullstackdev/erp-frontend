import React, { memo } from "react";
import styled from "styled-components";
import Icon from "../../../../../components/elements/icon";

const Style = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  .callType {
  }
`;

const CallTypeCell = ({ initialValue, id, editable, rowId, index, updateItemRequest, setLoading, viewId }) => {
  return (
    <Style>
      <>
        {initialValue}{" "}
        <Icon
          mainClassName={"callType"}
          icon={initialValue === "INCOMING" ? "icon-incomeCall" : "icon-outcomeCall"}
          color={initialValue === "INCOMING" ? "#45B36B" : "#EF466F"}
        />
      </>
    </Style>
  );
};

export default memo(CallTypeCell);
