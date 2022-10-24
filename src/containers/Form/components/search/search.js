import { get } from "lodash";
import React from "react";
import styled from "styled-components";
import { ErrorMessage } from "@hookform/error-message";
import errorImg from "../../../../assets/icons/error2.svg";
import Icon from "../../../../components/elements/icon";

const SearchStyle = styled.div`
  .form-search-container {
    width: 350px;
    display: flex;
    background: #fcfcfd;
    padding: 5px;
    border-radius: 4px;
    &-input {
      width: 100%;
      background: none;
      border: none;
      outline: none;
      margin-left: 15px;
      font-weight: 300;
      font-size: 16px;
      line-height: 20px;
      color: #777e91;
    }
  }
`;

export default function Search({
  register,
  name,
  errors,
  params,
  property,
  defaultValue,
  getValues,
  watch,
  hideLabel = false,
  label,
  getValueFromField = () => {},
  cols = [12, 12],
  ...rest
}) {
  return (
    <SearchStyle>
      <label className="form-search-container">
        <Icon icon="icon-search-hr" />
        <input
          className="form-search-container-input"
          name={name}
          {...register(name, params)}
          readOnly={get(property, "disabled")}
          placeholder={get(property, "placeholder") ? get(property, "placeholder") : "Search..."}
          type={"text"}
          defaultValue={defaultValue}
        />
      </label>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ messages = `${label} is required` }) => {
          if ((errors[name].type = "required")) {
            messages = `${label} is required`;
          }
          if ((errors[name].type = "pattern")) {
            messages = `${label} is not valid`;
          }
          if ((errors[name].type = "manual")) {
            messages = `${label} ${errors[name].message}`;
          }
          return (
            <small className="form-error-message">
              <img src={errorImg} alt="" /> {messages}
            </small>
          );
        }}
      />
    </SearchStyle>
  );
}
