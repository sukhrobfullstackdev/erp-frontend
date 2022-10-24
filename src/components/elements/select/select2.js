import React, { useState } from "react";
import RSelect from "react-select";
import { withTheme } from "styled-components";
import { SelectStyled, colourStyles } from "./select2Styled";
import errorImg from "../../../assets/icons/error2.svg";

function Select2({
  data,
  value,
  onChange,
  checked,
  error,
  disable,
  colourOptions,
  multi,
  className = "",
  customOption,
  multiLabelValue = {},
  multiValue = {},
  indicatorSeparator = {},
  valueContainer = {},
  controlStyle = {},
  isClear = true,
  ...props
}) {
  const [selectOption, setSelectOption] = useState({
    isClearable: isClear,
    isDisabled: false,
    isLoading: false,

    isRtl: false,
    isSearchable: true,
  });
  const { isClearable, isSearchable, isDisabled, isLoading, isRtl } = selectOption;
  return (
    <SelectStyled
      {...props}
      {...{
        className: `selectContainer ${className}`,
        data,
        checked: checked ? checked : "",
        error: error ? "error" : "",
      }}
    >
      <RSelect
        className={!multi ? `basic-single select` : `multiSelect`}
        classNamePrefix={!multi && "select"}
        defaultValue={(multi && [colourOptions[0], colourOptions[1]]) || colourOptions[0]}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
        name="color"
        formatOptionLabel={customOption}
        options={colourOptions}
        isMulti={multi}
        styles={multi && colourStyles}
        multiLabelValue={multi && multiLabelValue}
        multiValue={multi && multiValue}
        indicatorSeparator={multi && indicatorSeparator}
        valueContainer={multi && valueContainer}
        controlStyle={multi && controlStyle}
        {...{
          checked: checked ? checked : "",
          error: error ? "error" : "",
          onChange,
        }}
        {...props}
      />
      {error ? (
        <p>
          {" "}
          <img src={errorImg} /> Error text.
        </p>
      ) : (
        ""
      )}
    </SelectStyled>
  );
}

export default withTheme(Select2);
