import React, { memo, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { toast } from "react-toastify";
import { withTranslation } from "react-i18next";
import errorImg from "../../../../../assets/icons/error2.svg";
import CurrencyInput from "react-currency-input-field";

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

const NumberCell = ({
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

  // let pattern = /^\d+$/;
  // let decimalRegexp = /^\d+\.\d{0,2}$/;

  let two = new RegExp(/^.{0,15}$/);
  let one = new RegExp(/^[0-9]+([.][0-9]+)?$/);

  const onChange = (e) => {
    // if (two.test(e.target.value) && one.test(e.target.value))
    //     setState(s => ({...s, value: e.target.value, valid: true}));
    // else if (e.target.value === "")
    //     setState(s => ({...s, value: e.target.value, valid: false}));
    // else setState(s => ({...s, valid: false}));

    setState((s) => ({ ...s, valid: !!e, value: e }));
  };

  const onBlur = () =>
    setState((s) => ({
      ...s,
      value: initialValue,
      isEditable: false,
      focus: false,
    }));

  const handleEditable = () => setState((s) => ({ ...s, isEditable: editable, focus: true }));

  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      setState((s) => ({ ...s, valid: true, focus: false }));
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
      {/*<input*/}
      {/*    onKeyDown={(e) => handleEnter(e)}*/}
      {/*    readOnly={!state.isEditable}*/}
      {/*    onDoubleClick={handleEditable}*/}
      {/*    onChange={onChange}*/}
      {/*    onBlur={onBlur}*/}
      {/*    value={state.value}*/}
      {/*/>*/}
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
      {!state.valid && (
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

export default withTranslation("pdp")(memo(NumberCell));
