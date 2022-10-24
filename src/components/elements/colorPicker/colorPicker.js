import { ChromePicker, CirclePicker } from "react-color";
import { colors } from "../../../mock/colors";
import Button from "../button";
import React, { useState } from "react";
import classnames from "classnames";
import styled from "styled-components";
import stopImg from "../../../assets/icons/stop.svg";
import picker from "../../../assets/icons/picker-color.svg";
import Icon from "../icon";

const ColorPickerStyle = styled.div`
  .circle-picker {
    //position: absolute;
    //top: 20px;
    //left: 20px;
    background: #fcfcfd;
    padding-top: 5px;
    border-radius: 10px;
    span {
      &:first-child {
        div {
          span {
            div {
              background: url(${stopImg}) !important;
              box-shadow: none !important;
            }
          }
        }
      }
      &:last-child {
        div {
          span {
            div {
              background: url(${picker}) !important;
              box-shadow: none !important;
            }
          }
        }
      }
    }
  }
  .chrome-picker__footer {
    display: flex;
  }
  .styled-chrome-picker {
    position: relative;
    width: 210px;
    .chrome-picker__footer {
      position: absolute;
      bottom: 5px;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      button {
        height: 25px;
        padding: 0 10px;
        font-size: 12px;
        width: 60px;
        border-radius: 6px;
        margin: 0 5px;
      }
    }
    .chrome-picker {
      min-height: 230px !important;
    }
    label {
      display: none !important;
    }
  }
  .circle__picker__container {
    &__head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 600;
      font-size: 10px;
      line-height: 14px;
      color: #777e91;
      padding: 8px 10px;
      height: 30px;
      border-bottom: 1px solid #f4f5f6;
    }
  }
`;

const ColorPicker = ({
  handleChange = () => "",
  defaultValue = "",
  className = "",
  colorPicker,
  setColorPicker = () => "",
  type = "default",
  title = "STATUS COLOR",
}) => {
  // types = "default", "status"

  const [isCirclePicker, setCirclePicker] = useState(true);
  const [color, setColor] = useState(defaultValue);
  const chooseColor = () => {
    handleChange(color);
  };
  const handleChangeComplete = (color) => {
    if (color.hex == colors[colors.length - 1].toLowerCase()) {
      setCirclePicker(true);
      // setColorPicker(false);
    }
    setColor(color.hex);
  };

  const handleComplete = (color) => {
    if (color.hex == colors[0]) {
      setColorPicker(false);
    } else if (color.hex == colors[colors.length - 1].toLowerCase()) {
      setCirclePicker(false);
    } else {
      handleChange(color.hex);
      setColor(color.hex);
    }
    setColorPicker(false);
  };
  return (
    <ColorPickerStyle
      {...{ type }}
      className={classnames("colorPicker-container", {
        [className]: className,
      })}
    >
      {isCirclePicker ? (
        <div className="circle__picker__container">
          <div className="circle__picker__container__head">
            {title}
            <Icon icon="icon-exit" color={"#777E91"} onClick={() => setColorPicker(false)} />
          </div>
          <CirclePicker width=" 210px" circleSize={12} colors={colors} onChangeComplete={handleComplete} />
        </div>
      ) : (
        <div className="styled-chrome-picker">
          <ChromePicker width="211px" color={color} disableAlpha={true} onChangeComplete={handleChangeComplete} />
          <div className="chrome-picker__footer">
            <Button
              className="cancel-btn"
              onClick={() => {
                setColorPicker(false);
                type === "status" && setCirclePicker((s) => !s);
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
    </ColorPickerStyle>
  );
};
export default ColorPicker;
