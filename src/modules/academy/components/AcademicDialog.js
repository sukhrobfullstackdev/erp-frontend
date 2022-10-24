import React, { useEffect, useState } from "react";
import slugify from "react-slugify";
import { get, isEmpty } from "lodash";
import ColorPicker from "./colorPicker";
import Field from "../../../containers/Form/field";
import styled from "styled-components";
import Button from "../../../components/elements/button";
import Icon from "../../../components/elements/icon";
import FormDemo from "../../../containers/Form/form-demo";
import pick from "../../../assets/icons/picker-color.svg";
import { withTranslation } from "react-i18next";

const StyledDialog = styled.div`
  .modall {
    &__body {
      padding: 15px 18px;
      width: 520px;
      min-height: fit-content;
    }
  }

  .modall {
    width: 490px;

    &__title {
      margin-bottom: 15px;
      font-size: 14px;
      font-weight: 600;
      color: #777e91;
    }

    .form-input {
      font-weight: 500;
      font-size: 12px !important;
      padding-left: 0 !important;
    }

    .input-wrapper {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;

      textarea {
        color: #353945;
        font-size: 12px;
        resize: inherit;
        padding: 8px 15px;
      }

      .inputContainer {
        width: 100%;
        padding: 6px 2px;
        border: none;
        width: 300px;
      }

      .form-label,
      .form-textarea-label {
        font-weight: 600;
        font-size: 10px;
        line-height: 12px;
        text-transform: uppercase;
        color: #a7adbf;
        margin-bottom: 6px;
      }
    }

    &__footer {
      margin-top: 5px;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: end;

      .buttons-wrapper {
        display: flex;

        div:first-child {
          margin-right: 10px;
        }

        button {
          font-size: 12px;
          font-weight: 500;
          border-radius: 8px;
          padding: 8px 12px;
        }
      }

      .active-option {
        display: flex;
        align-items: center;

        .check_btn {
          margin-right: 10px;
          /* .rc-checkbox {
            height: 11px;
            .rc-checkbox-inner{
                width: 11px;
                height: 11px;
                :after{
                    width: 1px;
                    height: 5px;
                }
            }
          } */

          button {
            display: flex;
            align-items: center;
            font-size: 12px;
            padding: 8px 12px;
            color: #353945;
            justify-content: space-between;
            width: 108px;
            font-weight: 500;
          }
        }

        .ui__icon__wrapper.lg {
          width: 12px;
          height: 12px;
        }

        .icon-question {
          width: 12px;
          height: 12px;
        }
      }
    }
  }

  .colorPickerBackground {
    div[title="#F4F5F6"] {
      &:after {
        content: url("${pick}");
        width: 12px;
        height: 12px;
        position: absolute;
        top: -2px;
        left: 0;
      }
    }
  }
`;

const AcademicDialog = ({
  add,
  label = "ADD COURSE",
  closeDialog = () => {},
  editableData,
  modalActive,
  t,
  dataForFormDemo = {},
  ...rest
}) => {
  const create = ({ data, setError }) => {
    add({
      data: {
        ...data,
        name: get(data, "name.name", ""),
        colorCode: get(data, "name.colorCode", ""),
        url: slugify(get(data, "name.name", "#")),
      },
      setError,
      closeModal: closeDialog,
      id: get(editableData, "id", ""),
    });
  };

  return (
    <StyledDialog>
      <FormDemo {...dataForFormDemo} formRequest={create}>
        <div className="modall">
          <div className="modall__title">
            <span> {label} </span>
          </div>

          <div className="input-wrapper">
            <Field
              type={"input"}
              name={"name"}
              addColor
              addColorInValue
              // getColor={(color) => setColor(color)}
              defaultColor={get(editableData, "colorCode", "")}
              defaultValue={{
                name: get(editableData, "name", ""),
                colorCode: get(editableData, "colorCode", ""),
              }}
              params={{ required: true }}
              labelRequired
              label={t("academic-module-name") ?? "Course Name"}
            />
          </div>
          <div className="input-wrapper">
            <Field
              type={"textarea"}
              hideError
              name={"description"}
              defaultValue={get(editableData, "description", "")}
              label={t("academic-module-description") ?? "DESCRIPTION"}
            />
          </div>
          <div className="modall__footer">
            <div className="active-option">
              <Field
                name={"active"}
                type="checkbox"
                className="check check_btn"
                inBtn
                defaultValue={get(editableData, "active", false)}
                label={
                  <>
                    {t("Active") ?? "Active"}
                    <Icon className="role__question-icon" icon="icon-question" size="lg" color="#B1B5C4" />
                  </>
                }
              />
            </div>
            <div className="buttons-wrapper">
              <Button outlineDanger onClick={closeDialog}>
                {" "}
                {t("Cancel") ?? "Cancel"}{" "}
              </Button>
              <Button type={"submit"} success>
                {t("Save") ?? "SAVE"}{" "}
              </Button>
            </div>
          </div>
        </div>
      </FormDemo>
    </StyledDialog>
  );
};

export default withTranslation("pdp")(AcademicDialog);
