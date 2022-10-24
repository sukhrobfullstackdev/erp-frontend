import React, { memo, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { toast } from "react-toastify";
import { withTranslation } from "react-i18next";
import CurrencyInput from "react-currency-input-field";
import errorImg from "../../../../../assets/icons/error2.svg";

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

const MoneyCell = ({
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
  const [state, setState] = useState({
    value: initialValue ?? "",
    isEditable: false,
    valid: true,
    focus: false,
  });

  useEffect(() => {
    setState((s) => ({ ...s, value: initialValue ?? "" }));
  }, [initialValue]);

  const onChange = (val, name) => setState((s) => ({ ...s, value: val, valid: !!val }));

  const onBlur = () => setState((s) => ({ ...s, focus: false, isEditable: false }));

  const handleEditable = () => editable && setState((s) => ({ ...s, focus: true, isEditable: editable }));

  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      setState((s) => ({ ...s, valid: true }));
      setLoading(true);
      event.target.blur();
      updateItemRequest({
        id: rowId,
        // viewId,
        attributes: { [id]: state.value },
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
    <Styled {...{ valid: state.valid, focus: state.focus, ...rest }}>
      <CurrencyInput
        onKeyDown={(e) => handleEnter(e)}
        decimalsLimit={0}
        readOnly={!state.isEditable}
        onDoubleClick={handleEditable}
        onValueChange={onChange}
        onBlur={onBlur}
        value={state.value}
        maxLength={15}
      />
      {!state.valid && <img src={errorImg} alt={"error"} />}
    </Styled>
  );
};

export default withTranslation("pdp")(memo(MoneyCell));
