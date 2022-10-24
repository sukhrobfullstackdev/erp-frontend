import React, { memo, useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import Rating from "../../../../../components/elements/rating";
import { get } from "lodash";

const Style = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 5px;
`;

const RatingCell = ({
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
  ...rest
}) => {
  const [isEditable, setIsEditable] = useState(false);

  const onChange = (val) => {
    setLoading(true);
    updateItemRequest({
      id: rowId,
      // viewId,
      attributes: { [id]: val },
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
    <Style onDoubleClick={() => setIsEditable((s) => !s)}>
      <Rating
        iconsCount={get(typeConfig, "ratingConfig.count")}
        codePoint={get(typeConfig, "ratingConfig.codePoint")}
        initialRating={initialValue ?? 0}
        onClick={onChange}
        editable={isEditable}
      />
    </Style>
  );
};

export default memo(RatingCell);
