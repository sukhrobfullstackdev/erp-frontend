import React from "react";
import { Controller, useForm } from "react-hook-form";
import helper from "./helper";
import { get } from "lodash";
import styled from "styled-components";

const StyledForm = styled.form`
  .form-group {
    margin-bottom: 30px;
  }

  .form-error-message {
    display: inline-block;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    display: flex;
    align-items: center;
    color: #ef466f;
    margin-top: 10px;
  }
`;
const Form = ({ children, formRequest, fields = [], isFetched, ...rest }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    getValues,
    setValue,
    watch,
    control,
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    formRequest({ data, setError });
  };
  const attrs = {
    Controller,
    register,
    errors,
    control,
    getValues,
    watch,
    setError,
    setValue,
    ...rest,
  };
  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} {...rest}>
      {fields &&
        fields.map((field) => {
          return (
            <div className="form-group" key={get(field, "id", 1)}>
              {helper.choose({ field, attrs })}
            </div>
          );
        })}
      {children({ errors, getValues })}
    </StyledForm>
  );
};

export default Form;
