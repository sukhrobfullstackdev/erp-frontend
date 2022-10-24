import { get, isNull } from "lodash";
import React, { memo, useState } from "react";
import styled, { css } from "styled-components";
import { Col, Row } from "react-grid-system";
import Icon from "../../../components/elements/icon";
import Field from "../../../containers/Form/field";
import trashIcon from "../../../assets/icons/trash-icon.svg";
import Label from "../../../components/elements/label";
const RadioStyle = styled.div`
  .radio-section {
    display: flex;
    align-items: center;
    background: #fcfcfd;
    border: 1px solid #e6e8ec;
    box-sizing: border-box;
    border-radius: 10px;
    padding-left: 15px;
    position: relative;
    height: 50px;
    margin-bottom: 10px;

    .form-select-container {
      &-select {
        margin-left: 5px;

        &-icon {
          opacity: 0;
        }

        .rs {
          &-btn {
            height: 40px;
            border: none !important;

            &:hover,
            &:focus,
            &-active {
              border: none !important;
            }
          }

          &-picker-toggle.rs-btn {
            padding: 5px;
            padding-top: 6px;
          }
        }
      }
    }

    .Select__controller,
    .select__text {
      width: 85px;
      width: 45%;
      height: 20px;
      border: none;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #353945;
      padding: 12px 5px;
      text-align: start;
      margin-left: 10px;
      border-right: 1px solid #ccc;
      border-radius: 0;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .bottom-arrow {
        display: none;
      }
    }

    .radio__select {
      width: 45%;

      .Select__controller {
        width: 100%;
      }
    }

    .select__text {
    }

    .form-input-container {
      width: 150px;
      border: none;
      position: relative;
      margin-left: 5px;

      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 2px;
        width: 1px;
        height: 30px;
        background: #e6e8ec;
      }

      input {
        height: 47px !important;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: #353945;

        &::placeholder {
          font-weight: normal;
          font-size: 16px;
          line-height: 24px;
          color: #b1b5c4;
        }
      }
    }

    &-radioInput {
      height: 100%;
      display: flex;
      align-items: center;

      .form-input-radio {
        position: relative;
      }
    }

    .select {
      &__header {
        margin-bottom: 0;
        border: none;
        height: 99% !important;
        width: 150px;
        background: none;
      }

      &.active {
        .select__header {
          border: none;
        }
      }
    }

    .form-label {
      display: none;
    }

    .options {
      position: absolute;
      right: 10px;

      .tarshIcon {
        width: 30px;
        height: 30px;
        background: rgba(239, 70, 111, 0.1);
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }

      .phoneWithPlus {
        display: none;
      }
    }

    .radio-section-input {
      width: 50%;
    }

    .select__header {
      width: 100%;
    }

    .form-input-container {
      width: 90%;
    }

    &.isNew {
      .options {
        ${({ isEditable }) =>
          isEditable &&
          css`
            width: 68px;
            border-radius: 6px;
            position: absolute;
            right: 10px;
            top: 10px;
            display: flex;
            justify-content: flex-end;

            .tarshIcon,
            .phoneWithPlus {
              width: 30px;
              height: 30px;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .tarshIcon {
              /* width: 100%; */
              border-radius: 6px;
              position: relative;
              margin-right: 8px;

              img {
                height: 80%;
              }
            }

            .phoneWithPlus {
              background: #45b36b;
              border-radius: 8px;

              .ui__icon__wrapper,
              .icon {
                width: 20px !important;
                height: 20px !important;
              }
            }
          `}
      }
    }
  }
`;

const Radio = React.memo(
  ({
    isEditable = false,
    isNew = false,
    options = [],
    index,
    name,
    clickPhone = () => {},
    clickTrash = () => {},
    removeItem = () => {},
    clickRadio = () => {},
    hideLabel,
    isRemove = false,
    labelRequired,
    label,
    fildDisable,
    isLast,
    indexOfRadio,
    value,
    selectAction,
    radioDisable,
    optionHandling,
    defaultValueForSelect = "",
    firstValue = {},
  }) => {
    const [state, setState] = useState({
      indexOfRadio: null,
    });

    const defaultValueForCheckbox = () => {
      let temp = "";
      if (isLast && index === 0) temp = value.id;
      else if (state.indexOfRadio == value.id) temp = value.id;
      else temp = get(firstValue, "id", 0);
      return String(temp);
    };
    return (
      <RadioStyle {...{ isEditable }}>
        <Row>
          {index === 0 && (
            <Col xs={12}>
              <Label className="form-label">
                {label} {labelRequired && <span style={{ color: "red" }}>*</span>}
              </Label>
            </Col>
          )}
          <Col xs={12}>
            <div className="radio-section isNew">
              <Field
                type={"radio"}
                radioDisable={radioDisable}
                name={`activePhoneNumber`}
                defaultValue={defaultValueForCheckbox()}
                hideLabel
                className="radio-section-radioInput"
                onClick={() =>
                  setState((s) => ({
                    ...s,
                    indexOfRadio: String(value.id),
                  }))
                }
                valueForChecked={String(value.id)}
              />
              <Field
                type={"custom-select"}
                CustomIcon={() => ""}
                className="radio__select"
                options={options}
                name={`relationId`}
                defaultValue={defaultValueForSelect}
                hideLabel
                placeholder="Name"
                editable={isEditable}
                isSearchable={isEditable}
                action={selectAction}
                getActionValue={optionHandling}
                nullable={false}
              />
              {console.log(value)}
              <Field
                hideLabel
                type={"input"}
                name={`enteredNumber`}
                defaultValue={!isNull(value.phoneNumber) ? value.phoneNumber : ""}
                className="radio-section-input"
                maxLength={15}
                minLength={9}
                placeholder="Phone number"
                disabled={!isEditable || fildDisable}
                property={{ type: "number" }}
              />
              <div className="options">
                {isRemove && (
                  <div className="tarshIcon" onClick={() => clickTrash(index, name, value.index, value.id)}>
                    <img src={trashIcon} alt="trash" />
                  </div>
                )}
                {isLast && (
                  <Icon
                    icon="icon-phone-with-plus"
                    color="#FCFCFD"
                    mainClassName="phoneWithPlus"
                    onClick={() => clickPhone(index)}
                  />
                )}
              </div>
            </div>
          </Col>
        </Row>
      </RadioStyle>
    );
  }
);

export default memo(Radio);
