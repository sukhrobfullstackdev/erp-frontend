import styled, { css } from "styled-components";

export const SelectStyled = styled.div`
  width: ${({ width }) => width || 260}px;
  width: ${({ widthPre }) => widthPre}%;
  min-width: ${({ minW }) => minW || 0}px;
  .select {
    height: 38px;
    &__control {
      background: #fcfcfd;
      border: 1px solid #e6e8ec;
      border-radius: 8px;
      cursor: pointer;
      transition: 0.1s;
      &:hover {
        border: 1px solid #777e91;
      }
      &--is-focused {
        box-shadow: none;
        border: 1px solid #777e91;
      }
    }
    &__value-container {
      padding: 0;
    }
    &__single-value {
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      color: #353945;
      box-sizing: border-box;
      padding: 10px 14px;
      margin: 0;
    }
    &__menu {
      transition: 0.3s;
      box-shadow: 0px 8px 16px rgba(145, 158, 171, 0.24);
      border-radius: 8px;
      margin: 11px 0 0 0;
    }
    &__option {
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      color: #000000;
      border: 0.5px solid #f4f5f6;
      padding: 5px;
      cursor: pointer;
      &:last-child {
        border-radius: 0 0 8px 8px;
      }
      &--is-selected {
        background: #3772ff;
      }
    }
    &__input {
      margin-left: 9px !important;
      &-container {
        font-weight: normal;
        font-size: 12px;
        line-height: 12px;
      }
    }
    &__placeholder {
      margin-left: 10px;
      font-weight: normal;
      font-size: 12px;
      line-height: 12px;
    }
  }
  p {
    font-weight: 500;
    font-size: 10px;
    line-height: 12px;
    color: #ef466f;
    display: flex;
    align-items: center;
    margin: 5px 0 0 0px;
    img {
      margin: 0 5px;
    }
  }
  ${({ theme: { mode } }) =>
    mode === "dark" &&
    css`
      .select {
        &__control {
          background: #141416;
          border: 1px solid #353945;
        }
        &__menu {
          background: #141416;
          box-shadow: 0px 16px 64px -48px #454f5b;
          border-radius: 8px;
        }
        &__option {
          color: #f4f5f6;
          border: 0.5px solid #353945;
          &:first-child {
            border-radius: 8px 8px 0 0;
          }
          &:last-child {
            border-radius: 0 0 8px 8px;
          }
          &:hover {
            background: #23262f;
          }
          &--is-focused {
            background: #23262f;
          }
        }
        &__single-value {
          color: #b1b5c4;
        }
        &__input-container {
          color: #b1b5c4;
        }
      }
    `}
  ${({ checked }) =>
    checked &&
    css`
      .select {
        &__control {
          border: 1px solid #45b36b;
        }
      }
    `}
    ${({ error }) =>
    error &&
    css`
      .select {
        &__control {
          border: 1px solid #ef466f;
        }
      }
    `}
`;

export const colourStyles = {
  control: (
    styles,
    {
      isDisabled,
      isFocused,
      isSelected,
      selectProps: {
        theme: { mode },
        controlStyle,
        checked,
        error,
      },
    }
  ) => ({
    ...styles,
    ...controlStyle,
    backgroundColor: mode === "dark" ? "#141416" : "#FCFCFD",
    border: isFocused
      ? "1px solid #777E91"
      : checked
      ? "1px solid #45B36B"
      : error
      ? "1px solid #EF466F"
      : mode === "dark"
      ? "1px solid #353945"
      : "1px solid #E6E8EC",
    boxShadow: isFocused ? "none" : null,
    borderRadius: "8px",
    ":hover": {
      border: checked ? "1px solid #45B36B" : error ? "1px solid #EF466F" : "1px solid #777E91",
    },
  }),
  menu: (
    styles,
    {
      selectProps: {
        theme: { mode },
        value,
      },
    }
  ) => ({
    ...styles,
    transition: "0.3s",
    boxShadow: mode === "dark" ? "0px 16px 64px -48px #454F5B" : "0px 8px 16px rgba(145, 158, 171, 0.24)",
    borderRadius: "8px",
    background: mode === "dark" ? "#141416" : "#fff",
    marginTop: `${value.length * 12}px`,
  }),
  option: (
    styles,
    {
      data,
      isDisabled,
      isFocused,
      isSelected,
      selectProps: {
        theme: { mode },
      },
    }
  ) => {
    const color = data.color;
    return {
      ...styles,
      border: mode === "dark" ? "0.5px solid #353945" : "0.5px solid #F4F5F6",
      fontWeight: "500",
      fontSize: "12px",
      lineHeight: "18px",
      backgroundColor: isDisabled ? undefined : isSelected ? data.color : isFocused ? color : undefined,
      color: isDisabled ? "#ccc" : isSelected ? (data.color ? "white" : "black") : isFocused ? "#fff" : data.color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled ? (isSelected ? data.color : color) : undefined,
      },
      ":first-of-type": {
        borderRadius: "8px 8px 0 0",
      },
      ":last-child": {
        borderRadius: "0 0 8px 8px",
      },
    };
  },
  input: (
    styles,
    {
      selectProps: {
        theme: { mode },
      },
    }
  ) => ({
    ...styles,
    fontWeight: "normal",
    fontSize: "12px",
    lineHeight: "12px",
  }),
  placeholder: (
    styles,
    {
      selectProps: {
        theme: { mode },
      },
    }
  ) => ({
    ...styles,
    fontWeight: "normal",
    fontSize: "12px",
    lineHeight: "12px",
  }),
  menuList: (styles) => ({
    ...styles,
    padding: 0,
  }),
  indicatorSeparator: (styles, { selectProps: { indicatorSeparator = {} } }) => {
    return {
      ...styles,
      ...indicatorSeparator,
    };
  },
  valueContainer: (styles, { selectProps: { valueContainer = {} } }) => {
    return {
      ...styles,
      ...valueContainer,
    };
  },
  multiValue: (
    styles,
    {
      data: { color },
      selectProps: {
        multiValue = {},
        theme: { mode },
      },
    }
  ) => {
    let rgb = "";
    if (color) {
      rgb = color.split("(")[0];
      let opacityValue = mode === "dark" ? "0.2" : "0.1";
      if (rgb === "rgba") {
        let seperate = color.split(",");
        if (seperate.length === 4 && seperate[seperate.length - 1] == "1)") seperate[seperate.length - 1] = `${opacityValue})`;
        color = seperate.join(",");
      } else if (rgb === "rgb") {
        let value = color.split("(")[1].split(")")[0];
        color = `rgba(${value},${opacityValue})`;
      }
    }
    return {
      ...styles,
      backgroundColor: color,
      color: rgb === "rgb" || rgb === "rgba" ? color : "#fff",
      borderRadius: "2px 6px 6px 2px",
      fontSize: "12px",
      fontWeight: "500",
      lineHeight: "18px",
      ...multiValue,
    };
  },
  multiValueLabel: (styles, { data: { color }, selectProps: { multiLabelValue } }) => {
    return {
      ...styles,
      color: color ? (color.split("(")[0] === "rgb" || color.split("(")[0] === "rgba" ? color : "#fff") : "#fff",
      ...multiLabelValue,
    };
  },
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ":hover": {
      backgroundColor: data.color,
      color: "white",
    },
  }),
};
