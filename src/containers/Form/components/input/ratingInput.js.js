import React, { useEffect, useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import styled from "styled-components";
import { Col, Row } from "react-grid-system";
import { head, last, get } from "lodash";
import Rating from "../../../../components/elements/rating";
import Label from "../../../../components/elements/label";
const StyledTextarea = styled.div`
  .form-textarea {
    border: 1.5px solid #e6e8ec;
    background: #fcfcfd;
    box-sizing: border-box;
    border-radius: 10px;
    width: 100%;
    padding: 15px;
    outline: none;
    font-size: 20px;
    color: #353945;
    line-height: 30px;
    font-family: "Poppins", sans-serif;
    min-height: 200px;
    &::placeholder {
      color: #b1b5c4;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar {
      width: 5px;
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 100px;
      background-color: rgba(30, 30, 30, 0.5);
    }
  }
  .emoji {
    font-size: 25px;
  }
`;

const RatingInput = ({
  register,
  name,
  params,
  errors,
  typeConfig,
  property,
  defaultValue = 0,
  hideLabel,
  getValues,
  setValue,
  isEditable,
  label,
  hideError = false,
  cols = [12, 12],
  disabled,
  placeholder = "Type here...",
  ...rest
}) => {
  useEffect(() => {
    if (getValues(name) === "" || getValues(name) !== defaultValue) setValue(name, defaultValue);
  }, [defaultValue]);
  const onChange = (val) => {
    setValue(name, val);
  };
  return (
    <StyledTextarea {...rest}>
      <Row>
        {!hideLabel && (
          <Col xs={head(cols)}>
            <Label className="form-textarea-label" htmlFor={name}>
              {label}
            </Label>
          </Col>
        )}
        <Col xs={last(cols)}>
          <Rating
            iconsCount={get(typeConfig, "ratingConfig.count")}
            codePoint={get(typeConfig, "ratingConfig.codePoint")}
            initialRating={defaultValue}
            onClick={onChange}
            // onChange={() => setValue(name, data)}
            name={name}
            editable={isEditable}
          />
          {!hideError && (
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ messages = `${name} is required` }) => {
                return <small className="form-control-feedback">{messages}</small>;
              }}
            />
          )}
        </Col>
      </Row>
    </StyledTextarea>
  );
};

export default RatingInput;
