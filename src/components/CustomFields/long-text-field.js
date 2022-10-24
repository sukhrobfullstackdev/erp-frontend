import React, { memo, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { toast } from "react-toastify";
import OutsideClickHandler from "react-outside-click-handler";

const Styled = styled.div`
  height: 100%;

  textarea {
    height: 200px;
    width: 180px;
    outline: none;
    border-radius: 8px;
    background: #fcfcfd;
    box-shadow: 0px 8px 16px -8px rgba(15, 15, 15, 0.2);
    border: 1px solid #e1e6ec;
    color: #353945;
    font-size: 12px;
    font-weight: 400;
    padding: 5px 12px;
  }
  div {
    height: 100%;
    .value {
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 12px;
    }
  }

  ${({ show }) =>
    show &&
    css`
      position: absolute;
      z-index: 1;
    `}
`;

const LongTextField = ({
  updateItemRequest = () => {},
  setLoading = () => {},
  initialValue = null,
  rowId = null,
  id = null,
  editable = false,
  viewId,
  ...rest
}) => {
  const [value, setValue] = useState(initialValue);
  const [isEditable, setIsEditable] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    setValue(initialValue);
    setShow(false);
  };

  const handleEditable = () => {
    setIsEditable(editable);
  };

  const handleEnter = (event) => {
    if (event.keyCode === 13 && initialValue !== value) {
      setLoading(true);
      setShow(false);
      setIsEditable(false);
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
    }
  };

  const showTextArea = () => {
    setShow(true);
    setIsEditable(true);
  };

  return (
    <Styled {...{ show, ...rest }} onDoubleClick={showTextArea}>
      <OutsideClickHandler onOutsideClick={() => setShow(false)}>
        {show ? (
          <textarea
            onKeyDown={(e) => handleEnter(e)}
            readOnly={!isEditable}
            value={value}
            onDoubleClick={handleEditable}
            onChange={onChange}
            onBlur={onBlur}
          />
        ) : (
          <div className={"value"}>{value}</div>
        )}
      </OutsideClickHandler>
    </Styled>
  );
};

export default memo(LongTextField);
