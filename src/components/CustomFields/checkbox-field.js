import React, { memo } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import Checkbox from "../elements/checkbox";

const Style = styled.div`
  height: 100%;
  .td-checkbox {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CheckField = ({ initialValue, id, editable, rowId, index, updateItemRequest, setLoading, viewId }) => {
  const onChange = (value) => {
    setLoading(true);
    updateItemRequest({
      id: rowId,
      // viewId,
      attributes: { [id]: value },
      cb: {
        success: () => {
          setLoading(false);
          toast.success("SUCCESSFULLY UPDATED");
        },
        fail: () => {
          setLoading(false);
        },
      },
    });
  };

  return (
    <Style>
      <Checkbox defaultValue={initialValue} disabled={!editable} onChange={onChange} className={"td-checkbox"} />
    </Style>
  );
};

export default memo(CheckField);
