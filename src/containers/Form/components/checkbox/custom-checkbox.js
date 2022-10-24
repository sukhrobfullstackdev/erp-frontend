import React from "react";
import styled from "styled-components";
import { get } from "lodash";

const StyledCustomCheckbox = styled.div`
  position: relative;
  input {
    width: 16px;
    height: 16px;
    outline: 1px solid red;
    opacity: 0;
    &:checked + .circle {
      background-color: #00b533;
    }
    position: absolute;
  }
  label {
    position: relative;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    .circle {
      display: inline-block;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 1px solid #00b533;
      margin-right: 5px;
      position: relative;
      padding: 2px;
      background-clip: content-box;
    }
  }
`;
const CustomCheckbox = ({
  Controller,
  control,
  register = () => {},
  name,
  errors,
  params,
  property,
  defaultValue = true,
  label,
  ...rest
}) => {
  return (
    <StyledCustomCheckbox {...rest}>
      <label htmlFor={name}>
        <input type="checkbox" name={name} {...register(name, params)} disabled={get(property, "disabled")} />{" "}
        <span className={"circle"}></span>
        <span className={"text"}>{label}</span>
      </label>
    </StyledCustomCheckbox>
  );
};

export default CustomCheckbox;
