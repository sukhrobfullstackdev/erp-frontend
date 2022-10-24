export const colourStyles = {
  control: (
    styles,
    {
      isDisabled,
      isFocused,
      isSelected,
      selectProps: {
        theme: { mode },
        checked,
        error,
      },
    }
  ) => {
    return {
      ...styles,
      backgroundColor: mode === "dark" ? "#141416" : "#FCFCFD",

      border: isFocused
        ? "0.5px solid #F4F5F6"
        : checked
        ? "1px solid #45B36B"
        : error
        ? "1px solid #EF466F"
        : mode === "dark"
        ? "1px solid #353945"
        : "1px solid #F4F5F6",
      boxShadow: isFocused ? "none" : null,
      borderColor: "#F4F5F6",
      borderRadius: "8px",
      ":hover": {
        border: checked ? "1px solid #45B36B" : "1px solid #F4F5F6",
      },
    };
  },
  menu: (
    styles,
    {
      selectProps: {
        theme: { mode },
      },
    }
  ) => ({
    ...styles,
    transition: "0.3s",
    boxShadow: mode === "dark" ? "0px 16px 64px -48px #454F5B" : "0px 8px 16px rgba(145, 158, 171, 0.24)",
    borderRadius: "8px",
    background: mode === "dark" ? "#141416" : "#fff",
    padding: "10px",
    border: "1px solid #E6E8EC",
    borderTop: "none",
    borderTopLeftRadius: "unset",
    borderTopRightRadius: "unset",
    paddingRight: 0,
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
        params: { optionStyles = {} },
      },
    }
  ) => {
    // const color = data.color;
    const color = "#353945";
    return {
      ...styles,
      borderBottom: mode === "dark" ? "0.5px solid #353945" : "0.5px solid #F4F5F6",
      fontWeight: "500",
      fontSize: "12px",
      lineHeight: "18px",
      margin: "0 10px 0 10px",
      padding: "8px 12px",
      wdith: "100%",
      backgroundColor: isDisabled ? undefined : isSelected ? "#FFFFFF" : isFocused ? "#FFFFFF" : "#FFFFFF",
      color: isDisabled ? "#ccc" : isSelected ? (data.color ? "#353945" : "black") : isFocused ? "#353945" : "#353945",
      cursor: isDisabled ? "not-allowed" : "pointer",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
          : // ? data.color
            // : color
            undefined,
      },
      ":first-of-type": {
        borderRadius: "8px 8px 0 0",
      },
      ":last-child": {
        borderRadius: "0 0 8px 8px",
      },
      ...optionStyles,
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
    overflowX: "hidden",
    "::-webkit-scrollbar": {
      width: "6px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: "none",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "6px 1px 1px 6px",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  }),
  multiValue: (
    styles,
    {
      data: { color },
      selectProps: {
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
    };
  },
  multiValueLabel: (styles, { data: { color } }) => ({
    ...styles,
    color: color ? (color.split("(")[0] === "rgb" || color.split("(")[0] === "rgba" ? color : "#fff") : "#fff",
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ":hover": {
      backgroundColor: data.color,
      color: "white",
    },
  }),
};
