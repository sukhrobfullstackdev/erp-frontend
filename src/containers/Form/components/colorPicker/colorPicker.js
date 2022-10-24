import React, { useState } from "react";
import { CirclePicker, ChromePicker } from "react-color";
import { Col, Row } from "react-grid-system";
import { head, last } from "lodash";

import styled from "styled-components";
import Label from "../../../../components/elements/label";
import Button from "../../../../components/elements/button";
import { colors } from "../../../../mock/colors";

const StyledColorPicker = styled.div`
  &.form__colorPicker {
    position: absolute;
    z-index: 1;
    right: 20px;
    background-color: #fff;
    top: 125px;
    border-radius: 8px;
    box-shadow: 1px 2px 20px 0px #ccc;
    overflow: hidden;
    width: max-content;
    padding: 12px;
  }
  .circle-picker {
    span {
      div {
        span {
          div {
            border-radius: 4px !important;
          }
        }
      }
    }
  }
  .chrome-picker {
    box-shadow: none !important;
    div {
      .flexbox-fix:first-child {
        div:first-child {
          /* background: red; */
        }
        div:last-child {
          /* background: blue; */
        }
      }
    }
  }
  .chrome-picker__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    div {
      width: 100%;
    }
    .cancel-btn {
      margin-right: 5px;
    }
    .save-btn {
      margin-left: 5px;
    }
    button {
      font-size: 10px;
      width: 100%;
    }
  }
`;
const ColorPicker = ({
  register,
  name,
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
  className = "",
  handleChange = () => {},
  ...rest
}) => {
  const [isCirclePicker, setCirclePicker] = useState(true);
  const [color, setColor] = useState(defaultValue);
  const chooseColor = () => {
    handleChange(color);
  };
  const handleChangeComplete = (color) => {
    if (color.hex == "#f4f5f6") {
      setCirclePicker(false);
    }
    setColor(color.hex);
  };
  const handleComplete = (color) => {
    if (color.hex == "#f4f5f6") {
      setCirclePicker(false);
    } else {
      handleChange(color.hex);
      setValue(name, color.hex);
    }
  };
  return (
    <StyledColorPicker className={`form__colorPicker ${className}`}>
      <Row className={rowClassName}>
        {!hideLabel && (
          <Col xs={head(cols)}>
            <Label htmlFor={name} className="form-label">
              {label} {labelRequired && <span style={{ color: "red" }}>*</span>}
            </Label>
          </Col>
        )}
        <Col className={colClassName} xs={last(cols)}>
          {isCirclePicker ? (
            <CirclePicker
              name={name}
              {...register(name, params)}
              color={getValues(name)}
              width=" 210px"
              circleSize={12}
              colors={colors}
              onChangeComplete={handleComplete}
            />
          ) : (
            <div className="styled-chrome-picker">
              <ChromePicker width="211px" color={color} disableAlpha={true} onChangeComplete={handleChangeComplete} />
              <div className="chrome-picker__footer">
                <Button
                  className="cancel-btn"
                  onClick={() => {
                    chooseColor();
                  }}
                  outlineDanger
                >
                  Cancel
                </Button>
                <Button className="save-btn" onClick={() => chooseColor()} success>
                  Save
                </Button>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </StyledColorPicker>
  );
};

export default ColorPicker;
