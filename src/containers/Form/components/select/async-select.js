import React from "react";
import styled from "styled-components";

const StyledAsyncSelect = styled.div``;
const AsyncSelect = ({
  Controller,
  name,
  register,
  errors,
  params,
  control,
  property,
  label,
  cols = [12, 12],
  url = "/",
  onChange = () => {},

  ...rest
}) => {
  const loadOptions = async (search, loadedOptions, { page }) => {};
  return <StyledAsyncSelect {...rest}></StyledAsyncSelect>;
};

export default AsyncSelect;
