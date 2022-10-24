import React, { useState } from "react";
import { CirclePicker, ChromePicker } from "react-color";
import Button from "../../../components/elements/button";
import styled from "styled-components";
const StyledColorPicker = styled.div`
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
    /* span:last-child{
          span{
           div:after{
             content: url('src/assets/icons/picker-color.svg');
          }
}
} */
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
const ColorPicker = ({ handleChange = () => {}, myColor, className = "" }) => {
  const [isCirclePicker, setCirclePicker] = useState(true);
  const [color, setColor] = useState(myColor);
  const chooseColor = () => {
    handleChange(color);
  };
  const handleChangeComplete = (color) => {
    if (color.hex === "#f4f5f6") {
      setCirclePicker(false);
    }
    setColor(color.hex);
  };
  const handleComplete = (color) => {
    if (color.hex == "#f4f5f6") {
      setCirclePicker(false);
    } else {
      handleChange(color.hex);
    }
  };
  return (
    <StyledColorPicker className={className}>
      {isCirclePicker ? (
        <CirclePicker
          color={color}
          width=" 210px"
          circleSize={12}
          colors={[
            "#ccc",
            "#E57373",
            "#EF5350",
            "#F44336",
            "#E53935",
            "#D32F2F",
            "#C62828",
            "#B71C1C",
            "#8E24AA",
            "#3949AB",
            "#039BE5",
            "#00897B",
            "#689F38",
            "#FBC02D",
            "#EF6C00",
            "#4DB6AC",
            "#BA68C8",
            "#3F51B5",
            "#80CDF2",
            "#00897A",
            "#7CB342",
            "#FDD835",
            "#FF9800",
            "#4DB6AA",
            "#CE93D8",
            "#7986CB",
            "#4FC3F7",
            "#4DB6AB",
            "#AED581",
            "#FFF176",
            "#FFB74D",
            "#F4F5F6",
          ]}
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
    </StyledColorPicker>
  );
};

export default ColorPicker;
