import React, { memo, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { toast } from "react-toastify";
import { withTranslation } from "react-i18next";
import errorImg from "../../assets/icons/error2.svg";
import { isNull, isNumber } from "lodash";

const Styled = styled.div`
  height: 100%;

  input {
    padding: 0px 12px;
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

  ${({ valid }) =>
    !valid &&
    css`
      input {
        width: 89% !important;
      }

      border: 1px solid #ef466f;
    `}
`;

const PhoneNumberField = ({
  updateItemRequest = () => {},
  setLoading = () => {},
  initialValue = "",
  rowId = null,
  id = null,
  editable = false,
  t,
  defaultValue,
  viewId,
  ...rest
}) => {
  const [data, setData] = useState({
    value: !isNull(initialValue) ? initialValue : "",
    isEditable: editable,
    valid: true,
    focus: false,
  });

  let pattern = /^\d+$/;

  useEffect(() => {
    setData((s) => ({
      ...s,
      value: !isNull(initialValue) ? initialValue : "",
    }));
  }, [initialValue]);

  const onChange = (e) => {
    if (pattern.test(e.target.value)) setData((s) => ({ ...s, value: e.target.value, valid: true }));
    else if (e.target.value === "") setData((s) => ({ ...s, value: e.target.value, valid: true }));
    else setData((s) => ({ ...s, valid: false }));
  };

  const onBlur = () => {
    setData((s) => ({
      ...s,
      isEditable: false,
      focus: false,
      value: initialValue,
    }));
  };

  const handleEditable = () => {
    setData((s) => ({ ...s, isEditable: editable, focus: true }));
  };

  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      if (data.value.length > 7 && data.value.length < 18) {
        setData((s) => ({ ...s, valid: true }));
        setData((s) => ({ ...s, valid: true }));
        setLoading(true);
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
      } else setData((s) => ({ ...s, valid: false }));
    }
  };

  return (
    <Styled {...{ valid: data.valid, focus: data.focus, ...rest }}>
      <input
        onKeyDown={(e) => handleEnter(e)}
        readOnly={!data.isEditable}
        onDoubleClick={handleEditable}
        onChange={onChange}
        onBlur={onBlur}
        value={data.value}
      />
      {!data.valid && (
        <img
          src={errorImg}
          alt={"error"}
          // data-tip={t("invalid-money-entered") ?? "invalid money entered"}
          // data-place={"top"}
          // data-effect={"solid"}
          // data-for={"errorToolTip"}
        />
      )}
    </Styled>
  );
};

export default withTranslation("pdp")(memo(PhoneNumberField));
