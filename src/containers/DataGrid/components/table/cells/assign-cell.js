import React, { memo, useEffect, useState } from "react";
import { get, isArray, isEmpty, isNull } from "lodash";
import styled from "styled-components";
import Select from "../../../../../components/elements/select/Select";
import { getSelectOptionsListFromData } from "../../../../../utils";
import { toast } from "react-toastify";
import Icon from "../../../../../components/elements/icon";
import Dropdown from "../../../../../components/elements/dropDown";
import Assign from "../../../../../components/assign";

const Style = styled.div`
  height: 100%;

  .h-100 {
    height: 100%;

    & > div {
      &:first-child {
        height: 100%;
      }
    }
  }
`;

const AssignCell = ({
  updateItemRequest = () => {},
  setLoading = () => {},
  initialValue = "",
  rowId = null,
  id = null,
  editable = false,
  t,
  defaultValue,
  viewId,
  typeConfig,
  rowSize,
  ...rest
}) => {
  const handleChange = (value) => {
    let isHaveIn = false;

    let requestData = {
      id: rowId,
      // viewId,
      attributes: { [id]: isEmpty(value) ? null : value },
      cb: {
        success: () => {
          setLoading(false);
          toast.success("SUCCESSFULLY UPDATED");
        },
        fail: () => {
          setLoading(false);
        },
      },
    };

    if (isArray(initialValue) && isArray(value)) {
      if (value.length === initialValue.length) {
        isHaveIn = initialValue.every((item) => value.some((item2) => item2 === item));
      }
    }

    if (!isHaveIn && !isNull(initialValue)) {
      setLoading(true);
      updateItemRequest(requestData);
    } else if (!isHaveIn && isNull(initialValue) && !isEmpty(value)) {
      setLoading(true);
      updateItemRequest(requestData);
    }
  };

  return (
    <Style>
      <Assign
        {...{
          options: get(typeConfig, "assignOptions", []),
          editable,
          defaultValue: initialValue,
          onChange: handleChange,
          rowSize,
        }}
      />
    </Style>
  );
};

export default memo(AssignCell);
