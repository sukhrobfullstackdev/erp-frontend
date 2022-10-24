import React, { useEffect } from "react";
import InputMask from "react-input-mask";
import styled from "styled-components";
import { ErrorMessage } from "@hookform/error-message";
import { get, head, isEmpty, last } from "lodash";
import Label from "../../../../components/elements/label";
import { Col, Row } from "react-grid-system";
import errorImg from "../../../../assets/icons/error2.svg";

const StyledMaskedInput = styled.div`
  label {
    font-weight: 600;
    font-size: 15px;
    line-height: 12px;
    text-transform: uppercase;
    color: #777e91;
    margin-bottom: 14px;
  }
  .masked-input {
    padding: 10px;
    padding: 10px 10px 10px 0px;
    background: #fcfcfd;
    /* border: 1px solid #45b36b; */
    box-sizing: border-box;
    border-radius: 10px;
    font-weight: 500;
    width: 100%;
    font-size: 20px;
    color: #353945;
    line-height: 30px;
    font-family: "Poppins", sans-serif;
    outline: none;
    display: inline-block;

    &::placeholder {
      color: #b1b5c4;
    }
  }
  .prefix[prefix] {
    display: flex;
    align-items: center;
    height: 54px;
    &::before {
      content: attr(prefix);
      display: inline-block;
      margin-right: 10px;
      margin-left: 20px;
      font-size: 20px;
      color: #353945;
      line-height: 30px;
      font-family: "Poppins", sans-serif;
      font-weight: 500;
      white-space: nowrap;
    }
  }
`;
const MaskedInput = ({
  Controller,
  control,
  register,
  name,
  errors,
  params,
  property,
  defaultValue,
  getValues,
  watch,
  getValueFromField = () => {},
  label,
  cols = [12, 12],
  hideLabel = false,
  ...rest
}) => {
  useEffect(() => {
    getValueFromField(getValues(name), name);
  }, [watch(name)]);
  return (
    <StyledMaskedInput {...rest}>
      <Row>
        {!hideLabel && (
          <Col xs={head(cols)}>
            <Label htmlFor={name}>{label}</Label>
          </Col>
        )}
        <Col xs={last(cols)}>
          <div className="prefix" prefix={property.prefix}>
            <Controller
              as={InputMask}
              control={control}
              name={name}
              defaultValue={defaultValue}
              rules={params}
              render={({ field }) => (
                <InputMask
                  {...field}
                  className={`masked-input ${!isEmpty(errors) ? "error" : ""}`}
                  placeholder={get(property, "placeholder")}
                  mask={get(property, "mask")}
                  maskChar={"-"}
                  onFocus={() => property.setIsFocused(true)}
                  onBlur={() => property.setIsFocused(false)}
                />
              )}
            />
          </div>
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
        </Col>
      </Row>
    </StyledMaskedInput>
  );
};

export default MaskedInput;
