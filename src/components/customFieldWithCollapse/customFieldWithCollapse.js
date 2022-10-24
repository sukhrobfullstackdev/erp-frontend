import { get, head } from "lodash";
import React from "react";
import Field from "../../containers/Form/field";
import { getSelectOptionsListFromData } from "../../utils";
import Collapse from "../elements/collapse";
import CustomFieldContainer from "./customFieldContainer";
import { Styled } from "./customFieldStyle";
const CustomLead = ({ data }) => {
  const getCustomField = (data, type) => {
    switch (type) {
      case "FILES": {
        return (
          <CustomFieldContainer data={data} type={type}>
            <Field
              type={"multi-file"}
              initialValue={data.value}
              fieldId={data.id}
              editable={true}
              typeConfig={get(data, "typeConfig")}
            />
          </CustomFieldContainer>
        );
      }
      case "DROPDOWN": {
        return (
          <CustomFieldContainer data={data} type={type}>
            <Field
              hideLabel
              placeholder={"Interested Course"}
              defaultValue={head(get(data, "value"))}
              type="custom-select"
              options={getSelectOptionsListFromData(get(data.typeConfig, "options", []), "id", "name", "other")}
              name={`customFieldValues.dropdown/${data.id}`}
            />
          </CustomFieldContainer>
        );
      }
      case "CHECKBOX": {
        return (
          <CustomFieldContainer data={data} type={type}>
            <Field hideLabel name={`customFieldValues.checkbox/${data.id}`} type={"checkbox"} defaultValue={data.value} />
          </CustomFieldContainer>
        );
      }
      case "RATING": {
        return (
          <CustomFieldContainer data={data} type={type}>
            <Field
              hideLabel
              type={"rating-input"}
              isEditable={true}
              defaultValue={data.value}
              name={`customFieldValues.rating/${data.id}`}
              typeConfig={get(data, "typeConfig")}
            />
          </CustomFieldContainer>
        );
      }
      case "LONG_TEXT": {
        return (
          <CustomFieldContainer data={data} type={type}>
            <Field
              hideLabel
              resposive
              type={"textarea"}
              name={`customFieldValues.longtext/${data.id}`}
              defaultValue={data.value}
            />
          </CustomFieldContainer>
        );
      }
      case "SHORT_TEXT": {
        return (
          <CustomFieldContainer data={data} type={type}>
            <Field hideLabel type={"input"} name={`customFieldValues.shorttext/${data.id}`} defaultValue={data.value} />
          </CustomFieldContainer>
        );
      }
      case "DATE": {
        return (
          <CustomFieldContainer data={data} type={type}>
            <Field hideLabel name={`customFieldValues.date/${data.id}`} type={"custom-datepicker"} defaultValue={data.value} />
          </CustomFieldContainer>
        );
      }
      case "LABELS": {
        return (
          <CustomFieldContainer data={data} type={type}>
            <Field
              hideLabel
              defaultValue={get(data, "value")}
              isMulti
              placeholder={"Interested Course"}
              type="custom-select"
              options={getSelectOptionsListFromData(get(data.typeConfig, "options", []), "id", "name", "other")}
              name={`customFieldValues.label/${data.id}`}
            />
          </CustomFieldContainer>
        );
      }
      case "EMAIL": {
        return (
          <CustomFieldContainer data={data} type={type}>
            <Field
              hideLabel
              type={"input"}
              property={{ type: "email" }}
              name={`customFieldValues.email/${data.id}`}
              defaultValue={data.value}
            />
          </CustomFieldContainer>
        );
      }
      case "MONEY": {
        return (
          <CustomFieldContainer data={data} type={type}>
            <Field
              hideLabel
              type={"input"}
              name={`customFieldValues.money/${data.id}`}
              property={{ type: "money" }}
              defaultValue={data.value}
            />
          </CustomFieldContainer>
        );
      }
      case "NUMBER": {
        return (
          <CustomFieldContainer data={data} type={type}>
            <Field
              hideLabel
              maxLength={15}
              type={"input"}
              name={`customFieldValues.number/${data.id}`}
              property={{ type: "money" }}
              defaultValue={data.value}
            />
          </CustomFieldContainer>
        );
      }
      case "PHONE": {
        return (
          <CustomFieldContainer data={data} type={type}>
            <Field
              hideLabel
              type={"input"}
              name={`customFieldValues.phone/${data.id}`}
              property={{ type: "tel" }}
              defaultValue={data.value}
            />
          </CustomFieldContainer>
        );
      }
      case "MONEY": {
        return (
          <CustomFieldContainer data={data} type={type}>
            <Field
              hideLabel
              type={"input"}
              name={`customFieldValues.money/${data.id}`}
              property={{ type: "money" }}
              defaultValue={data.value}
            />
          </CustomFieldContainer>
        );
      }
      default:
        return type;
    }
  };
  return (
    <Styled>
      <Collapse className="customField collapse" title="CUSTOM FIELD">
        <div className="field">{data.map((e, i) => getCustomField(data[i], e.type))}</div>
      </Collapse>
    </Styled>
  );
};

export default CustomLead;
