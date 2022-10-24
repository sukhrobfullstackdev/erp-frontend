import React, { memo, useEffect } from "react";
import { Col, Row } from "react-grid-system";
import { get, head, includes, last } from "lodash";
import Label from "../../../../components/elements/label";
import styled from "styled-components";
import { ErrorMessage } from "@hookform/error-message";
import errorImg from "../../../../assets/icons/error2.svg";
import Tree from "../../../../components/elements/tree";

const Styled = styled.div``;

const TreeComponent = ({
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
  clearErrors,
  ...rest
}) => {
  useEffect(() => {
    getValueFromField(getValues(name), name);
  }, [watch(name)]);

  const onChangeHandling = ({ ids, label }) => {
    setValue(name, ids);
    onChange({ ids, label });
  };

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
          <div className={`form-tree-container`}>
            <Tree
              {...{
                options,
                onChange: onChangeHandling,
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
    </Styled>
  );
};

export default memo(TreeComponent);
