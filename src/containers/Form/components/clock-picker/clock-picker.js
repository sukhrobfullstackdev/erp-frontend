import React, { useEffect, memo } from "react";
import { ErrorMessage } from "@hookform/error-message";
import errorImg from "../../../../assets/icons/error2.svg";
import { Col, Row } from "react-grid-system";
import { get, head, includes, last } from "lodash";
import Label from "../../../../components/elements/label";
import ClockPickerComponent from "../../../../components/elements/clockPikcer";
import styled from "styled-components";

const Style = styled.div``;

const ClockPicker = ({
  register,
  name,
  errors,
  params,
  property,
  defaultValue,
  getValues,
  watch,
  hideLabel,
  label,
  setValue,
  getValueFromField = () => {},
  colClassName = "",
  className = ``,
  rowClassName = "",
  hideError = false,
  cols = [12, 12],
  labelRequired,
  onChange = () => "",
  ...rest
}) => {
  useEffect(() => {
    getValueFromField(getValues(name), name);
    if (getValues(name) == undefined) setValue(name, defaultValue);
  }, [watch(name)]);

  useEffect(() => {
    setValue(name, defaultValue);
    onChange(defaultValue);
  }, [defaultValue]);

  return (
    <Style className={className}>
      <Row className={rowClassName}>
        {!hideLabel && (
          <Col xs={head(cols)}>
            <Label htmlFor={name} className="form-label">
              {label} {labelRequired && <span style={{ color: "red" }}>*</span>}
            </Label>
          </Col>
        )}
        <Col className={colClassName} xs={last(cols)}>
          <div className={`form-clock-container`}>
            <ClockPickerComponent
              {...{
                value: getValues(name),
                defaultValue,
                onChange: (value) => {
                  setValue(name, value);
                  onChange(value);
                },
                ...rest,
              }}
            />
          </div>
          {!hideError && (
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
    </Style>
  );
};

export default memo(ClockPicker);
