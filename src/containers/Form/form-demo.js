import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { isArray, isEmpty, isFunction } from "lodash";
import FormProvider from "../../context/form/FormProvider";

const StyledForm = styled.form`
  .form-group {
    margin-bottom: 30px;
  }

  .form-error-message {
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    display: flex;
    align-items: center;
    color: #ef466f;
    margin-top: 25px;
  }
`;
const FormDemo = ({
  children,
  formRequest,
  isFetched,
  footer = "",
  getValueFromField = () => {},
  mainClassName = "",
  isClear = false,
  resetData = {},
  setValueData = [],
  formCb,
  dataForCb = {},
  ...rest
}) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    getValues,
    setValue,
    watch,
    control,
    reset,
    clearErrors,
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    // if (isFunction(formCb)) formCb({ getValues, setValue, ...dataForCb });
    formRequest({ data, setError });
    isClear && reset();
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
    clearErrors,
    ...rest,
  };

  useEffect(() => {
    if (!isEmpty(resetData)) reset(resetData);
  }, [resetData]);

  useEffect(() => {
    if (isFunction(formCb)) formCb({ getValues, setValue, ...dataForCb });
  }, [formCb]);

  useEffect(() => {
    if (!isEmpty(setValueData) && isArray(setValueData)) {
      setValueData.forEach((item) => {
        setValue(item?.name, item?.value);
      });
    }
  }, [setValueData]);

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} {...rest} className={mainClassName}>
      <FormProvider value={{ attrs, getValueFromField }}>{children}</FormProvider>
      {footer}
    </StyledForm>
  );
};

export default FormDemo;
