import React, { useEffect } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { get, head, includes, last } from "lodash";
import { Col, Row } from "react-grid-system";
import Label from "../../../../components/elements/label";
import styled, { css } from "styled-components";
import errorImg from "../../../../assets/icons/error2.svg";
import CustomDatepicker from "./custom-datepicker";

const Styled = styled.div``;

const FormCustomDatepicker = ({
  register,
  name = "",
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
  options = [],
  className = "",
  action,
  placeholder = "",
  onChange = () => "",
  ...rest
}) => {
  useEffect(() => {
    getValueFromField(getValues(name), name);
    setValue(name, getValues(name));
  }, [watch(name)]);

  return (
    <Styled className={className}>
      <Row className={rowClassName}>
        {!hideLabel && (
          <Col xs={head(cols)}>
            <Label htmlFor={name} className="form-label">
              {label} {labelRequired && <span style={{ color: "red" }}>*</span>}
            </Label>
          </Col>
        )}
        <Col className={colClassName} xs={last(cols)}>
          <div className={`form-datepicker-container`}>
            <CustomDatepicker
              className="form-datepicker-container-datepicker"
              {...register(name, params)}
              onChange={(data) => {
                setValue(name, data);
                onChange(data);
              }}
              value={getValues(name)}
              {...{
                ...rest,
                action,
                name,
                defaultValue,
                placeholder,
                options,
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
    </Styled>
  );
};

export default FormCustomDatepicker;
