import React, { memo, useEffect } from "react";
import styled from "styled-components";
import { ErrorMessage } from "@hookform/error-message";
import errorImg from "../../../../assets/icons/error2.svg";
import classNames from "classnames";
import { Col, Row } from "react-grid-system";
import { head, last } from "lodash";
import Label from "../../../../components/elements/label";
import Emoji from "../../../../components/elements/emoji";

const Style = styled.div``;
const EmojiField = ({
  Controller,
  control,
  register,
  name,
  errors,
  params,
  property,
  defaultValue = false,
  leftLabel = false,
  label,
  setValue,
  inBtn,
  getValues,
  watch = () => {},
  onChange = () => {},
  getValueFromField = () => {},
  disabled = false,
  className = "",
  colClassName = "",
  rowClassName = "",
  hideError = false,
  labelRequired = false,
  hideLabel = false,
  cols = [12, 12],
  ...rest
}) => {
  useEffect(() => {
    getValueFromField(getValues(name), name);
  }, [watch(name)]);

  useEffect(() => {
    if (getValues(name) !== defaultValue) {
      setValue(name, defaultValue);
      onChange(defaultValue);
    }
  }, [defaultValue]);

  return (
    <Style
      {...rest}
      className={classNames("form-emoji-container", {
        [className]: className,
        disabled: disabled,
      })}
    >
      <Row className={rowClassName}>
        {!hideLabel && (
          <Col xs={head(cols)}>
            <Label htmlFor={name} className="form-label">
              {label} {labelRequired && <span style={{ color: "red" }}>*</span>}
            </Label>
          </Col>
        )}
        <Col className={colClassName} xs={last(cols)}>
          <Emoji onChange={(val) => setValue(name, val)} {...rest} />
        </Col>
      </Row>
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
    </Style>
  );
};

export default memo(EmojiField);
