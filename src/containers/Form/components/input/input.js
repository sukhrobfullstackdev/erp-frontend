import ColorPicker from "../../../../modules/academy/components/colorPicker";
import React, { useEffect, useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import CurrencyInput from "react-currency-input-field";

import { get, head, last, includes, isNull, isEmpty, isUndefined, isString } from "lodash";
import { Col, Row } from "react-grid-system";
import styled, { css } from "styled-components";
import OutsideClickHandler from "react-outside-click-handler";
import Label from "../../../../components/elements/label";
import errorImg from "../../../../assets/icons/error2.svg";
import eye2Img from "../../../../assets/icons/eye2.svg";
const StyledInput = styled.div`
  .form-input-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fcfcfd;
    border: 1px solid #e6e8ec;
    box-sizing: border-box;
    border-radius: 10px;
    position: relative;

    ${({ error, isFocused }) =>
      (error || isFocused) &&
      css`
        border: 1px solid ${error ? "#EF466F" : "#45b36b"};
      `}

    ${({ isOpen, isFocused, magic, typee }) =>
      typee === "password" &&
      !isOpen &&
      css`
        &:after {
          content: "${magic}";
          position: absolute;
          top: 1px;
          left: 1px;
          background: green;
          height: 98%;
          box-sizing: border-box;
          border-radius: 10px;
          font-size: 18px;
          padding: ${isFocused || !isOpen ? "18px 10px 18px 15px" : "18px 0px"};
          display: flex;
          align-items: center;
          background: #fcfcfd;
          z-index: 1;
        }
      `}
    .form-input {
      padding: 10px 12px;
      background: none;
      font-size: 18px;
      width: 100%;
      outline: none;
      border: none;
      padding-left: ${({ addColor }) => addColor && "20px"};
      font-family: "Poppins", sans-serif;
      &::placeholder {
        color: #b1b5c4;
      }
      appearance: none !important;
      -moz-appearance: none !important;
      -webkit-appearance: none !important;
      &:autofill,
      &:-internal-autofill-selected,
      &:webkit-autofill {
        background: none !important;
        &:active,
        &:hover,
        &:focus {
          background: none !important;
        }
      }
      &[type="password"] {
        opacity: ${({ magic }) => (magic ? 0 : 1)};
        z-index: 2;
        &:focus {
          &::placeholder {
            opacity: 0;
          }
        }
      }
      &[disabled] {
        cursor: default;
      }
    }
    .eye {
      width: 30px;
      min-width: 30px;
      height: 30px;
      background: rgba(244, 245, 246, 1);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      transition: 0.2s;
      cursor: pointer;
      margin: 0 12px;
      &:hover {
        background: rgba(240, 240, 240, 1);
      }
    }
    .colorLabel {
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      color: #9757d7;
      position: absolute;
      right: 25px;
      border-bottom: 1px dashed #9757d7;
      cursor: pointer;
    }
    .color-picker {
      top: 55px;
    }
    ${({ color }) =>
      color &&
      css`
        padding-left: 22px !important;
        .form-input {
          padding-left: 20px;
        }
        &:after {
          content: "";
          width: 4px;
          height: 90%;
          position: absolute;
          left: 6px;
          border-radius: 4px;
          background: ${color};
        }
      `}
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px #fcfcfd inset;
    box-shadow: 0 0 0 30px #fcfcfd inset;
    border-radius: 10px;
  }

  input[type="number"] {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      /* display: none; <- Crashes Chrome on hover */
      -webkit-appearance: none;
      margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
    }
    -moz-appearance: textfield; /* Firefox */
  }
  .required-input-wrapper {
    height: 90px;
  }
`;

const Input = ({
  register,
  disabled = false,
  name,
  errors,
  params,
  property,
  defaultValue = "",
  getValues,
  watch,
  hideLabel,
  label,
  setValue,
  getValueFromField = () => {},
  colClassName = "",
  rowClassName = "",
  hideError = false,
  cols = [12, 12],
  labelRequired,
  maxLength = 524288,
  minLength = 1,
  addColor = false,
  addColorInValue = false,
  colorKey = "colorCode",
  inputKey = "name",
  getColor = () => {},
  defaultColor,
  colorLabel = "add color",
  placeholder,
  canFocus = true,
  onChange = () => "",
  labelClassName,
  children,
  ...rest
}) => {
  const [state, setState] = useState({
    isOpen: false,
    isFocused: false,
    color: "",
    showColor: false,
    isError: false,
  });

  const setValueInState = (value) => {
    if (addColor && addColorInValue && colorKey) setValue(name, { [inputKey]: value, [colorKey]: state.color });
    else setValue(name, value);
    onChange(value, state.color);
    setState((s) => ({ ...s, isError: false }));
    getValueFromField(value, name);
  };

  function checkNum(num) {
    let two = new RegExp(/^.{0,15}$/);
    let one = new RegExp(/^[0-9]+([.][0-9]+)?$/);
    return one.test(num) && two.test(num);
  }

  const onChangeHandling = (e) => {
    if (getValues(name) == null) setValue(name, "");
    if (get(property, "type") === "number") {
      if (checkNum(e.target.value) || e.target.value === "") setValueInState(e.target.value);
    } else if (get(property, "type") === "tel") {
      let pattern = /^\d+$/;
      let val = parseInt(e.target.value);
      if (pattern.test(e.target.value)) setValueInState(e.target.value);
    } else if (get(property, "type") === "email") {
      setValueInState(e.target.value);
      if (/.+@.+\.[A-Za-z]+$/.test(e.target.value)) setState((s) => ({ ...s, isError: false }));
      else setState((s) => ({ ...s, isError: true }));
    } else setValueInState(e.target.value);
  };

  function replaceStar(value) {
    let len = String(value).length;
    let temp = "";
    for (let i = 0; len > i; i++) {
      temp += "*";
    }
    return temp;
  }

  useEffect(() => {
    if (isUndefined(getValues(name)) || isNull(getValues(name))) {
      setValue(name, defaultValue);
      // onChange(defaultValue);
    }
  }, [watch(name)]);

  useEffect(() => {
    if (getValues(name) !== defaultValue && isString(defaultValue)) {
      setValue(name, defaultValue);
      // onChange(defaultValue);
    } else if (get(getValues(name), inputKey) !== get(defaultValue, inputKey)) {
      if (addColor && addColorInValue && colorKey) setValue(name, defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (defaultColor === undefined || state.color !== defaultColor) {
      setState((s) => ({ ...s, color: defaultColor }));
    }
  }, [defaultColor]);

  const eyeHandling = () => setState((state) => ({ ...state, isOpen: !state.isOpen }));

  const getInputType = (type) => {
    if (type === "number") return "text";
    else return type;
  };

  const handleChangeForColor = (e) => {
    getColor(e);
    onChange(getValues(name), e);
    setState((s) => ({ ...s, showColor: !s.showColor, color: e }));
    if (addColor && addColorInValue && colorKey) {
      setValue(name, {
        [inputKey]: get(getValues(name), inputKey, ""),
        [colorKey]: e,
      });
    }
  };

  const getValueForInput = () => {
    let temp = "";
    if (addColor && addColorInValue && colorKey) temp = get(getValues(name), inputKey, getValues(name) ?? "");
    else temp = getValues(name);
    return temp;
  };

  const getValueForColor = () => {
    let temp = "";
    if (addColor && addColorInValue && colorKey) temp = get(getValues(name), colorKey, state.color ?? "");
    return temp;
  };

  const isError = () => name in errors && isEmpty(getValues(name)) && get(params, "required", false);

  return (
    <StyledInput
      {...{
        isFocused: state.isFocused && canFocus,
        magic: replaceStar(watch(name) ? watch(name) : ""),
        isOpen: state.isOpen,
        typee: get(property, "type"),
        color: state.color,
        addColor: addColor,
        error: (!isEmpty(get(errors, name, "")) && isEmpty(getValues(name))) || state.isError,
        // ...rest,
      }}
    >
      <Row className={rowClassName}>
        {!hideLabel && (
          <Col xs={head(cols)} className={labelClassName}>
            <Label htmlFor={name} className="form-label">
              {label} {labelRequired && <span style={{ color: "red" }}>*</span>}
            </Label>
          </Col>
        )}
        <Col className={`${colClassName}`} xs={last(cols)}>
          <div
            className={`form-input-container ${state.isFocused && "focused"}`}
            onDoubleClick={(e) => get(property, "onDoubleClick", () => {})(e)}
          >
            {!(get(property, "type") === "money") ? (
              <input
                className="form-input"
                name={name}
                {...register(name, params)}
                readOnly={get(property, "disabled")}
                placeholder={get(property, "placeholder", placeholder)}
                type={state.isOpen ? "text" : getInputType(get(property, "type", "text"))}
                // pattern={state.isOpen ? 'text' : get(property, 'pattern', "text")}
                onChange={onChangeHandling}
                value={getValueForInput() ?? ""}
                autoComplete="off"
                disabled={disabled}
                maxLength={maxLength}
                minLength={minLength}
                onFocus={(e) => {
                  setState((state) => ({
                    ...state,
                    isFocused: true,
                  }));
                  get(property, "onFocus", () => {})(e);
                }}
                onBlur={(e) => {
                  setState((state) => ({
                    ...state,
                    isFocused: false,
                  }));
                  get(property, "onBlur", () => {})(e);
                }}
              />
            ) : (
              <CurrencyInput
                decimalsLimit={0}
                className="form-input"
                name={name}
                {...register(name, params)}
                readOnly={get(property, "disabled")}
                placeholder={get(property, "placeholder", placeholder)}
                type={state.isOpen ? "text" : get(property, "type", "text")}
                defaultValue={defaultValue}
                autoComplete="off"
                disabled={disabled}
                maxLength={maxLength}
                minLength={minLength}
                onFocus={(e) => {
                  setState((state) => ({
                    ...state,
                    isFocused: true,
                  }));
                  get(property, "onFocus", () => {})(e);
                }}
                onBlur={(e) => {
                  setState((state) => ({
                    ...state,
                    isFocused: false,
                  }));
                  get(property, "onBlur", () => {})(e);
                }}
              />
            )}
            {get(property, "type") === "password" && (
              <div className="eye" onClick={eyeHandling}>
                <img src={eye2Img} alt="eye2" />
              </div>
            )}
            {addColor && state.showColor && (
              <OutsideClickHandler
                onOutsideClick={() =>
                  setState((s) => ({
                    ...s,
                    showColor: false,
                  }))
                }
              >
                <ColorPicker className={"color-picker"} myColor={getValueForColor()} handleChange={handleChangeForColor} />
              </OutsideClickHandler>
            )}
            {addColor && (
              <div
                className="colorLabel"
                onClick={() =>
                  setState((s) => ({
                    ...s,
                    showColor: !s.showColor,
                  }))
                }
              >
                {colorLabel}
              </div>
            )}

            {children}
          </div>
          {!hideError && isError() && (
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ messages = `${label} is required` }) => {
                let isThereDot = includes(name, ".");
                if (isThereDot) {
                  if (get(errors, `${name}.type`) == "required") {
                    messages = `${label} is required`;
                  }
                  if (get(errors, `${name}.type`) == "pattern") {
                    messages = `${label} is not valid`;
                  }
                  if (get(errors, `${name}.type`) == "manual") {
                    messages = `${label} ${errors[name].message}`;
                  }
                } else {
                  if (errors[name].type == "required") {
                    messages = `${label} is required`;
                  }
                  if (errors[name].type == "pattern") {
                    messages = `${label} is not valid`;
                  }
                  if (errors[name].type == "manual") {
                    messages = `${label} ${errors[name].message}`;
                  }
                }
                return (
                  <small className="form-error-message">
                    <img src={errorImg} alt="" /> {messages}
                  </small>
                );
              }}
            />
          )}
        </Col>
      </Row>
    </StyledInput>
  );
};

export default Input;
