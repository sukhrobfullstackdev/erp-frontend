import React, { useEffect, memo, useState } from "react";
import styled, { css } from "styled-components";
import Checkbox2 from "rc-checkbox";

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

const Switcher = ({ name, defaultValue = false, label, onChange = () => {}, disabled = false, ...rest }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    if (!disabled) {
      onChange(e.target.checked, name);
      setChecked(e.target.checked);
    }
  };

  useEffect(() => {
    setChecked(defaultValue);
  }, [defaultValue]);

  return (
    <StyledSwitch {...rest}>
      <div className="form-switch-container">
        <label htmlFor="">
          <Checkbox2 className="form-input" name={name} defaultChecked={defaultValue} checked={checked} onChange={handleChange} />{" "}
          {label}
        </label>
      </div>
    </StyledSwitch>
  );
};

export default Switcher;
