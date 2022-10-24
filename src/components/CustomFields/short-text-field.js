import React, { memo, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { toast } from "react-toastify";
import { isNull } from "lodash";

const Styled = styled.div`
  /* padding: 6px 12px; */
  height: 100%;
  border: 1px solid transparent;
  input {
    cursor: default;
    height: 100%;
  }

  ${({ focus }) =>
    focus &&
    css`
      border: 1px solid #45b36b;

      input {
        cursor: text;
      }
    `}
`;

const ShortTextField = ({
  updateItemRequest = () => {},
  setLoading = () => {},
  initialValue = null,
  rowId = null,
  id = null,
  editable = false,
  viewId,
  ...rest
}) => {
  const [data, setData] = useState({
    value: !isNull(initialValue) ? initialValue : "",
    isEditable: false,
    focus: false,
  });

  useEffect(() => {
    !isNull(initialValue) && setData((s) => ({ ...s, value: initialValue }));
  }, [initialValue]);

  const onChange = (e) => setData((s) => ({ ...s, value: e.target.value, focus: true }));

  const onBlur = () =>
    setData((s) => ({
      ...s,
      value: !isNull(initialValue) ? initialValue : "",
      focus: false,
    }));

  const handleEditable = () => editable && setData((s) => ({ ...s, isEditable: editable, focus: true }));

  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      setLoading(true);
      setData((s) => ({ ...s, focus: false }));
      updateItemRequest({
        id: rowId,
        // viewId,
        attributes: { [id]: data.value },
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
    }
  };

  return (
    <Styled {...{ focus: data.focus, ...rest }}>
      <input
        onKeyDown={(e) => handleEnter(e)}
        readOnly={!data.isEditable}
        value={data.value}
        onDoubleClick={handleEditable}
        onChange={onChange}
        onBlur={onBlur}
      />
    </Styled>
  );
};

export default memo(ShortTextField);
