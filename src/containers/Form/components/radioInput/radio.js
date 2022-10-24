import React, { useEffect } from "react";
import styled from "styled-components";
import { ErrorMessage } from "@hookform/error-message";
import errorImg from "../../../../assets/icons/error2.svg";
import { isBoolean, isEmpty, isNil, isNull, isString, isUndefined } from "lodash";
import Button from "../../../../components/elements/button";

const StyledRadio = styled.div`
  input[type="radio"] {
    height: 0;
    position: relative;

    &:after,
    &:before {
      content: "";
      position: absolute;
      border-radius: 15px;
      display: inline-block;
      visibility: visible;
      background-color: none;
      cursor: pointer;
    }

    &:after {
      width: 16px;
      height: 16px;
      top: -7px;
      left: -3px;
      background-color: transparent;
      border: 1px solid #353945;
    }

    &:before {
      width: 12px;
      height: 12px;
      top: -5px;
      left: -1px;
      border: 2px solid white;
      z-index: 2;
    }

    &:checked {
      &:after {
        background-color: rgba(69, 178, 107, 1);
        border: 1px solid rgba(69, 178, 107, 1);
      }

      &:before {
        background-color: rgba(69, 178, 107, 1);
        z-index: 2;
      }
    }
  }

  .radio-with-button {
    display: flex;
    align-items: center;

    input {
      margin-right: 5px;
    }
  }
`;

const Radio = ({
  register,
  name,
  errors,
  params,
  setValue,
  property,
  defaultValue = "",
  isEditable = false,
  radioDisable,
  label = "",
  hideLabel,
  getValues,
  getValueFromField = () => {},
  watch,
  valueForChecked = null,
  onChange = () => "",
  ...rest
}) => {
  useEffect(() => {
    getValueFromField(getValues(name), name);
    if (isUndefined(getValues(name))) setValue(name, defaultValue);
  }, [watch(name)]);

  useEffect(() => {
    if (!isUndefined(valueForChecked)) setValue(name, defaultValue);
    else setValue(name, valueForChecked);
    onChange(defaultValue);
  }, [defaultValue]);

  const getDefaultValue = () => {
    if (defaultValue === valueForChecked) return defaultValue;
  };

  const getChecked = () => {
    return getValues(name) === valueForChecked;
  };

  return (
    <StyledRadio {...rest}>
      {hideLabel ? (
        <input
          type="radio"
          name={name}
          className="form-input-radio"
          onChange={(e) => {
            if (!isUndefined(valueForChecked)) setValue(name, valueForChecked);
            else setValue(name, true);
          }}
          disabled={isEditable || radioDisable}
          // defaultChecked={getDefaultValue()}
          value={getValues(name)}
          checked={getChecked()}
        />
      ) : (
        <label className="radio-with-button">
          <input
            type="radio"
            name={name}
            disabled={isEditable || radioDisable}
            // defaultChecked={getDefaultValue()}
            className="form-input-radio"
            onChange={(e) => {
              if (!isUndefined(valueForChecked)) setValue(name, valueForChecked);
              else setValue(name, true);
            }}
            value={getValues(name)}
            checked={getChecked()}
          />{" "}
          {label}
        </label>
      )}

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ messages = `${label} is required` }) => {
          return (
            <small className="form-error-message">
              <img src={errorImg} alt="" /> {messages}
            </small>
          );
        }}
      />
    </StyledRadio>
  );
};

export default Radio;
