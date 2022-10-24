import React, { memo, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { toast } from "react-toastify";
import { withTranslation } from "react-i18next";
import CurrencyInput from "react-currency-input-field";
import errorImg from "../../assets/icons/error2.svg";

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

const MoneyField = ({
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
  const [value, setValue] = useState(initialValue ?? "");
  const [isEditable, setIsEditable] = useState(false);
  const [valid, setValid] = useState(true);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    setValue(initialValue ?? "");
  }, [initialValue]);

  const onChange = (val, name) => {
    setValue(val);
    setValid(!!val);
  };

  const onBlur = () => {
    setValue(initialValue);
    setIsEditable(false);
    setFocus(false);
  };

  const handleEditable = () => {
    if (editable) {
      setIsEditable(editable);
      setFocus(true);
    }
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
      <CurrencyInput
        onKeyDown={(e) => handleEnter(e)}
        decimalsLimit={0}
        readOnly={!isEditable}
        onDoubleClick={handleEditable}
        onValueChange={onChange}
        onBlur={onBlur}
        value={value}
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

export default withTranslation("pdp")(memo(MoneyField));
