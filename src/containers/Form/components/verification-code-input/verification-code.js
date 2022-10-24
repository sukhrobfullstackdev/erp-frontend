import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import styled from "styled-components";
import { get, isEmpty } from "lodash";
import Label from "../../../../components/elements/label";
import { ErrorMessage } from "@hookform/error-message";
import errorImg from "../../../../assets/icons/error2.svg";
import tireImg from "../../../../assets/icons/chiziqcha.svg";
import Flex from "components/elements/flex";

const StyledVerificationInput = styled.div`
  .verification__input {
    position: relative;
    margin-right: 9px;
    border-radius: 14px;
    & > div {
      display: flex;
      justify-content: space-between;
    }

    input {
      width: 59px !important;
      height: 55px !important;
      font-family: "Poppins", sans-serif;
      font-weight: 500;
      font-size: 30px;
      outline: none;
      border: 2px solid ${({ errors }) => (isEmpty(errors) ? "#E6E8EC" : "#EF466F")};
      border-radius: 14px;
      caret-color: transparent;
      background: #fcfcfd;
      &:focus {
        border: 2px solid #45b36b;
        background: url(${tireImg});
        background-repeat: no-repeat;
        background-size: 14px;
        background-position: center;
        animation: blink 1s step-end infinite;
      }
      &:not(:placeholder-shown) {
        border: 2px solid #45b36b;
        animation: none;
        background: none;
        caret-color: black;
      }
    }
    &:last-child {
      margin-right: 0 !important;
    }
  }
  @keyframes blink {
    from,
    to {
      background-size: 0px;
    }
    50% {
      background-size: 14px;
    }
  }
`;

const VerificationCodeInput = ({
  Controller,
  control,
  register,
  name,
  watch,
  getValues,
  setValue,
  errors,
  params,
  property,
  defaultValue,
  label,
  setError,
  hideLabel,
  ...rest
}) => {
  const handleChange = (otp) => {
    let value = getValues(name);
    if (otp === "") setValue(name, value.substring(0, value.length - 1));
    else setValue(name, otp);
  };
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    if (getValues(name)) {
      if (getValues(name).length < 6) {
        setError(name, { type: "required", message: "Error" });
      }
    }
  }, [watch(name)]);
  return (
    <StyledVerificationInput errors={errors} {...rest}>
      {!hideLabel && <Label htmlFor={name}>{label}</Label>}
      <Flex justify={"center"}>
        <Controller
          className={"verification-controller"}
          as={OtpInput}
          control={control}
          name={name}
          defaultValue={defaultValue}
          rules={params}
          render={({ field }) => (
            <OtpInput
              {...field}
              numInputs={get(property, "fields", 6)}
              className={"verification__input"}
              value={getValues(name)}
              onChange={handleChange}
              // separator={<span className="verification__input__separator">-</span>}
              placeholder="      "
            />
          )}
        />
      </Flex>
      <div>
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ messages = `${label} is required` }) => {
            if ((errors[name].type = "required")) {
              messages = `${label} is required`;
            } else if ((errors[name].type = "pattern")) {
              messages = `${label} is not valid`;
            }
            return (
              <small className="form-error-message">
                <img src={errorImg} alt="" /> {messages}
              </small>
            );
          }}
        />
      </div>
    </StyledVerificationInput>
  );
};

export default VerificationCodeInput;
