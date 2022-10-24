import React from "react";
import Slider, { SliderTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import styled from "styled-components";

const StyledRangeInput = styled.div`
  height: 34px;
  display: flex;
  align-items: center;
  padding: 10px 5px 0;
  .rc-slider-step {
    border-radius: 2px;
    background-color: #fafafb;
    border: 1px solid #e6e8ec;
    height: 8px;
    /* width: 200px; */
    .rc-slider-dot {
      border-radius: 0;
      border: none;
      background-color: #e6e8ec;
      width: 1px;
      height: 4px;
      margin: 0;
      top: 1px;
    }
  }
  .rc-slider-mark-text {
    top: -32px;
    color: #777e90;
    font-weight: 600;
    font-size: 10px;
  }
  .rc-slider-handle {
    width: 7px;
    height: 18px;
    border-radius: 2px;
    background-color: #45b26b;
    border: none;
    transition: 0.2s;
    ::after {
      position: absolute;
      left: 3px;
      top: 5px;
      z-index: 9;
      content: "";
      height: 8px;
      width: 1px;
      background-color: #fff;
      border-radius: 5px;
    }
  }
  .rc-slider-handle:active {
    box-shadow: 0 0 5px #45b26b;
    border-color: #45b26b;
  }
`;

const RangeInput = ({ onChange = () => "" }) => {
  return (
    <StyledRangeInput>
      <Slider min={20} defaultValue={20} marks={{ 20: 1, 40: 2, 60: 3, 80: 4, 100: 5 }} step={null} onChange={onChange} />
    </StyledRangeInput>
  );
};

export default RangeInput;
