import React from "react";
import styled from "styled-components";

const CheckboxStyled = styled.label`
  padding-left: 5px;
  /* display: flex;
    align-items: center; */
  input {
    position: relative;
    margin-right: 11px;
    &:after {
      position: absolute;
      top: 0;
      left: 0;
      content: "";
      width: 75%;
      height: 80%;
      border: 1.5px solid #353945;
      border-radius: 3px;
    }
    &:checked {
      &:after {
        display: none;
      }
    }
  }
`;

export default function Checkbox({ label = "", value, onChange = () => {}, className = "", ...props }) {
  return (
    <CheckboxStyled>
      <input {...{ type: "checkbox", value }} onChange={(e) => onChange(e.target.value)} />
      {label}
    </CheckboxStyled>
  );
}
