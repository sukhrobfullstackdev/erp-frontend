import React, { memo, useEffect, useState } from "react";
import Checkbox2 from "rc-checkbox";
import styled, { css } from "styled-components";

const StyledCheckbox = styled.div`
  .rc-checkbox {
    height: 15px;

    &:hover {
      .rc-checkbox-inner {
        border: 1px solid #777e91;

        &:hover {
          border: 1px solid #777e91;
        }
      }
    }

    .rc-checkbox-inner {
      width: 15px;
      height: 15px;
      background: none;
      border: 1px solid #777e91;
      transition: 0.2s;

      &:hover {
        border: 1px solid #777e91;
      }

      &:after {
        top: 3px;
        left: 5px;
        width: 5px;
        height: 8px;
        opacity: 0;
        transition: 0.3s;
      }

      ${({ sm }) =>
        sm &&
        css`
          width: 14px;
          height: 14px;

          &:after {
            top: 3px;
            left: 5px;
            width: 4px;
          }
        `}
      ${({ md }) =>
        md &&
        css`
          width: 18px;
          height: 18px;

          &:after {
            top: 3px;
            left: 6.2px;
            width: 5px;
            height: 10px;
          }
        `}
    }

    &.rc-checkbox-checked {
      .rc-checkbox-inner {
        border: none;
        background: #45b36b;

        &:after {
          opacity: 1;
        }

        &:hover {
          border: none;
        }
      }
    }
  }

  .checkbox-with-button {
    button {
      &:hover {
        color: #353945;
      }
    }
  }

  .disabled {
    .checkbox-with-button {
      button {
        color: #b1b5c3;
      }
    }
  }

  ${({ switchBtn }) =>
    switchBtn &&
    css`
      input {
        width: 40px;
        height: 21px;
      }

      .rc-checkbox {
        height: 21px;
        width: 40px;

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
    `}
`;
const Checkbox = ({ onChange = () => {}, defaultValue = false, disabled = false, className = "" }) => {
  const [checked, setChecked] = useState(defaultValue);

  useEffect(() => {
    setChecked(defaultValue);
  }, [defaultValue]);

  return (
    <StyledCheckbox className={className}>
      <Checkbox2
        id={"checkbox"}
        defaultChecked={defaultValue}
        checked={checked}
        onChange={(e) => {
          if (!disabled) {
            setChecked(e.target.checked);
            onChange(e.target.checked);
          }
        }}
      />
    </StyledCheckbox>
  );
};

export default memo(Checkbox);
