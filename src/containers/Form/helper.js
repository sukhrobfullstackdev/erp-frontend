import React from "react";
import { Input, MaskedInput } from "./components/input";
import Textarea from "./components/textarea";
import { AsyncSelect } from "./components/select";
import { DatePicker } from "./components/date-picker/index";
import { Checkbox } from "./components/checkbox";
import { get } from "lodash";
import VerificationInput from "./components/verification-code-input/verification-code-input";
import VerificationCodeInput from "./components/verification-code-input/verification-code";

class helper {
  static choose = (data) => {
    const customRender = get(data, "field.custom");
    const renderInput = (data) => {
      const attrs = get(data, "attrs");
      const field = {
        name: get(data, "field.name"),
        type: get(data, "field.type"),
        options: get(data, "field.options", []),
        property: get(data, "field.property", get(attrs, "property")),
        params: get(data, "field.params", get(attrs, "params")),
        defaultValue: get(data, "field.defaultValue", ""),
        label: get(data, "field.label", ""),
        wrapCol: get(data, "field.wrapCol", ""),
      };
      switch (get(field, "type")) {
        case "textarea":
          return <Textarea {...attrs} {...field} />;
        case "input":
          return <Input {...attrs} {...field} />;
        case "number":
          return <Input {...attrs} {...field} />;
        case "masked":
          return <MaskedInput {...attrs} {...field} />;
        case "select":
          return <AsyncSelect {...attrs} {...field} />;
        case "async":
          return <AsyncSelect {...attrs} {...field} />;
        case "datepicker":
          return <DatePicker {...attrs} {...field} />;
        case "checkbox":
          return <Checkbox {...attrs} {...field} />;
        case "verification":
          return <VerificationInput {...attrs} {...field} />;
        case "verification2":
          return <VerificationCodeInput {...attrs} {...field} />;
        default:
          return "";
      }
    };

    if (customRender) {
      return customRender(data, renderInput(data));
    } else {
      return renderInput(data);
    }
  };

  static renderProperty = (
    data,
    params,
    defaultOption = { id: "", title: "No selected" },
    value = params[0],
    title = params[1],
    options = [defaultOption, ...data]
  ) => {
    return (
      options &&
      options.map((result) => {
        return {
          value: get(result, value, ""),
          label: get(result, title, ""),
        };
      })
    );
  };
}

export default helper;
