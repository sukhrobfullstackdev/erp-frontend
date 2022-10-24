import React, { memo, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { toast } from "react-toastify";
import { withTranslation } from "react-i18next";
import errorImg from "../../assets/icons/error2.svg";
import Field from "../../containers/Form/field";

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

const NumberField = ({
  updateItemRequest = () => {},
  setLoading = () => {},
  initialValue = "",
  rowId = null,
  property = { type: "text" },
  id = null,
  editable = false,
  t,
  defaultValue,
  viewId,
  ...rest
}) => {
  const [value, setValue] = useState(initialValue ?? "");
  const [isEditable, setIsEditable] = useState(false);
  const [valid, setValid] = useState(true);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    setValue(initialValue ?? "");
  }, [initialValue]);

  let pattern = /^\d+$/;

  const onChange = (e) => {
    if (pattern.test(e.target.value)) {
      setValue(e.target.value);
      setValid(true);
    } else setValid(false);
  };

  const onBlur = () => {
    setValue(initialValue);
    setIsEditable(false);
    setFocus(false);
  };

  const handleEditable = () => {
    setIsEditable(editable);
    setFocus(true);
  };

  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      setValid(true);
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
    }
  };
  return (
    <Styled {...{ valid, focus, ...rest }}>
      <Field
        // onKeyDown={(e) => handleEnter(e)}
        // readOnly={!isEditable}
        // onDoubleClick={handleEditable}
        // onChange={onChange}
        // onBlur={onBlur}
        type={"input"}
        name="ded"
        value={value}
        property={property}
      />
      {!valid && (
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

export default withTranslation("pdp")(memo(NumberField));
