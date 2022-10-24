import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { ErrorMessage } from "@hookform/error-message";

import { get, head, includes, isEmpty, last } from "lodash";
import Label from "../../../../components/elements/label";
import { Col, Row } from "react-grid-system";

import CustomDatepickerComponent from "../../../../components/custom-datepicker";
import errorImg from "../../../../assets/icons/error2.svg";
import Checkbox2 from "rc-checkbox";
import CustomDatepickerForGlobal from "components/custom-datepicker/custom-datepicker-for-global";

const Style = styled.div`
  position: relative;
`;

const CustomDatepicker = ({
  onChange = () => {},
  defaultValue,
  setValue,
  getValues,
  name,
  label,
  labelRequired,
  hideLabel,
  cols = [12, 12],
  hideError = false,
  errors,
  colClassName,
  className,
  getValueFromField = () => "",
  watch = () => "",
  property = {},
  params,
  register,
  isRange,
  control,
  Controller,
  setError,
  ...rest
}) => {
  useEffect(() => {
    getValueFromField(getValues(name), name);
    if (getValues(name) === undefined) {
      if (isRange) setValue(name, [...defaultValue]);
      else setValue(name, defaultValue);
    }
  }, [watch(name)]);

  useEffect(() => {
    if (getValues(name) === "" || getValues(name) !== defaultValue) {
      if (isRange) setValue(name, [...defaultValue]);
      else setValue(name, defaultValue);
    }
  }, [defaultValue]);

  const onChangeHandling = (value, endDate) => {
    if (isRange) {
      setValue(name, [value, endDate]);
      onChange([value, endDate]);
    } else {
      setValue(name, value);
      onChange(value);
    }
  };
  const isError = () => name in errors && isEmpty(getValues(name)) && get(params, "required", false);

  return (
    <Style className={className}>
      <Row>
        {!hideLabel && (
          <Col xs={head(cols)}>
            <Label htmlFor={name} className="form-label">
              {label} {labelRequired && <span style={{ color: "red" }}>*</span>}
            </Label>
          </Col>
        )}
        <Col className={colClassName} xs={last(cols)}>
          <div className={`form-date-container`}>
            {/*<Controller*/}
            {/*    control={control}*/}
            {/*    name={name}*/}
            {/*    rules={params}*/}
            {/*    render={({ field }) => <div>*/}
            {/*        {console.log(field, errors)}*/}
            {/*        {createError}*/}

            {/*        <CustomDatepickerComponent*/}
            {/*            {...register(name, params)}*/}
            {/*            ref={undefined}*/}
            {/*            {...{*/}
            {/*                defaultValue,*/}
            {/*                onChange: onChangeHandling,*/}
            {/*                value: getValues(name),*/}
            {/*                isRange,*/}
            {/*                ...property,*/}
            {/*                ...rest*/}
            {/*            }} />*/}
            {/*    </div> }/>*/}
            <CustomDatepickerForGlobal
              {...register(name, params)}
              ref={undefined}
              {...{
                defaultValue,
                onChange: onChangeHandling,
                value: getValues(name),
                isRange,
                ...property,
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

export default memo(CustomDatepicker);
