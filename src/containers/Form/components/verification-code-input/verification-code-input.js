import React, { useEffect } from "react";
import ReactCodeInput from "react-verification-code-input";
import styled from "styled-components";
import { get, isEmpty } from "lodash";
import Label from "../../../../components/elements/label";
import { ErrorMessage } from "@hookform/error-message";
import errorImg from "../../../../assets/icons/error2.svg";

const StyledVerificationInput = styled.div`
  .verification-input {
    width: 100% !important;
    & > div {
      display: flex;
      justify-content: space-between;
    }

    input {
      margin-right: 9px;
      width: 65px !important;
      height: 60px !important;
      border: 1.5px solid ${({ errors }) => (isEmpty(errors) ? "#E6E8EC" : "#EF466F")} !important;
      border-radius: 14px !important;
      font-family: "Poppins", sans-serif;
      font-weight: 500;
      font-size: 30px;
      &:focus {
        border: 2px solid #45b36b !important;
      }

      &:last-child {
        margin-right: 0 !important;
      }
    }
  }
`;

const VerificationInput = ({
  Controller,
  control,
  register,
  name,
  watch,
  getValues,
  errors,
  params,
  property,
  defaultValue,
  label,
  setError,
  hideLabel,
  ...rest
}) => {
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
      <Controller
        className={"verification-controller"}
        as={ReactCodeInput}
        control={control}
        name={name}
        defaultValue={defaultValue}
        rules={params}
        render={({ field }) => <ReactCodeInput {...field} fields={get(property, "fields", 6)} className={"verification-input"} />}
      />
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

export default VerificationInput;
