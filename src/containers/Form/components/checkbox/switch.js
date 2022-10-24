import React, { useEffect, memo } from "react";
import styled, { css } from "styled-components";
import Checkbox2 from "rc-checkbox";
import { ErrorMessage } from "@hookform/error-message";
import errorImg from "../../../../assets/icons/error2.svg";

const StyledSwitch = styled.div`
  input {
    width: 40px;
    height: 21px;
  }
  .rc-checkbox {
    height: 21px;
    width: 40px;
    &:hover {
    }
    .rc-checkbox-inner {
      box-sizing: border-box;
      width: 40px;
      height: 21px;
      border: 1.6px solid #b1b5c4;
      border-radius: 32px;
      transition: 0.2s;
      &:after {
        transform: rotate(0deg);
        top: 8%;
        left: 2px;
        bottom: 2px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        border: none;
        transition: 0.5s;
        background-color: #b1b5c3;
      }
    }
    &.rc-checkbox-checked {
      .rc-checkbox-inner {
        border: 1.6px solid #45b26b;
        background: #45b26b;
        &:after {
          right: 2px;
          left: 20px;
          background-color: #fcfcfd;
        }
      }
    }
  }
  ${({ sm }) =>
    sm &&
    css`
      input {
        width: 22px;
        height: 12px;
      }
      .rc-checkbox {
        width: 22px;
        height: 12px;
        .rc-checkbox-inner {
          width: 22px;
          height: 12px;
          ::after {
            width: 8px;
            height: 8px;
            left: 1px;
            top: 1px;
          }
        }
        &.rc-checkbox-checked {
          .rc-checkbox-inner {
            ::after {
              right: 1px;
              left: 11px;
            }
          }
        }
      }
    `}
`;

const Switcher = ({
  control,
  register,
  name,
  errors,
  params,
  property,
  getValueFromField = () => {},
  getValues,
  watch = () => {},
  setValue,
  defaultValue = false,
  label,
  onChange = () => {},
  disabled,
  ...rest
}) => {
  useEffect(() => {
    getValueFromField(getValues(name), name);
    if (getValues(name) === undefined) {
      setValue(name, defaultValue);
    }
  }, [watch(name)]);
  useEffect(() => {
    setValue(name, defaultValue);
  }, [defaultValue]);

  return (
    <StyledSwitch {...rest}>
      <div className="form-switch-container">
        <label htmlFor="">
          <Checkbox2
            className="form-input"
            name={name}
            {...register(name, params)}
            defaultChecked={defaultValue}
            checked={getValues(name)}
            onChange={(e) => {
              if (!disabled) {
                setValue(name, e.target.checked);
                onChange(e.target.checked);
              }
            }}
          />{" "}
          {label}
        </label>
      </div>
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
    </StyledSwitch>
  );
};

export default Switcher;
