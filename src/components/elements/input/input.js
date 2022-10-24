import React, { memo, useState } from "react";
import InputMask from "react-input-mask";
import Icon from "../icon";
import { InputStyled } from "./inputStyle";

import check from "../../../assets/icons/Check.svg";
import errorImg from "../../../assets/icons/error2.svg";

const Input = ({
  onChange = () => "",
  password,
  valid,
  error,
  disabled,
  select,
  checked,
  mask,
  className,
  getValue = () => "",
  ...props
}) => {
  const [inputType, setInputType] = useState(password ? true : false);
  const [focused, setFocused] = useState(false);

  const onFocus = () => setFocused(true);
  const onBlur = (e) => {
    setFocused(false);
  };
  const clickEye = () => setInputType((state) => !state);

  return (
    <InputStyled
      {...{
        img: password || select,
        focused,
        valid,
        error,
        disabled,
        checked,
        className,
      }}
      {...props}
    >
      <div className="inputContainer">
        {mask ? (
          <InputMask
            className={"masked-input"}
            mask={"9999 9999 9999"}
            alwaysShowMask={true}
            maskChar={"_"}
            {...{
              onChange,
              onFocus,
              onBlur,
              disabled,
              ...props,
            }}
          />
        ) : (
          <input
            type={inputType ? "password" : "text"}
            {...{
              onChange,
              onFocus,
              onBlur,
              disabled,
              ...props,
            }}
          />
        )}

        {password ? (
          <Icon icon="icon-eye" onClick={clickEye} />
        ) : select ? (
          <Icon icon="icon-bottom-arrow" />
        ) : (
          checked && <img src={check} />
        )}
      </div>
      {error && !disabled && (
        <p>
          {" "}
          <img src={errorImg} /> Error text.
        </p>
      )}
    </InputStyled>
  );
};

export default memo(Input);
