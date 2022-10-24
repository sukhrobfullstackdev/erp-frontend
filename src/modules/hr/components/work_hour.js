import React from "react";
import styled, { css } from "styled-components";
import FormDemo from "../../../containers/Form/form-demo";
import Field from "../../../containers/Form/field";
import Icon from "../../../components/elements/icon";
import { get } from "lodash";
import { getSelectOptionsListFromListData } from "../../../utils";

const StyledWorkHours = styled.div`
  height: 86px;
  width: 100%;
  background: #fcfcfd;
  border-left: 1px solid #e6e8ec;
  border-right: 1px solid #e6e8ec;
  border-bottom: 1px solid #f4f5f6;
  padding: 18px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ dataIndex }) =>
    dataIndex &&
    css`
      border-radius: 12px 12px 0 0;
      border-top: 1px solid #e6e8ec;
    `}
  ${({ dataLastIndex }) =>
    dataLastIndex &&
    css`
      border-radius: 0 0 12px 12px;
      border-bottom: 1px solid #e6e8ec;
      margin: 0;
    `}
    .d-flex {
    display: flex;
    align-items: center;
  }
  form {
    display: flex;
    align-items: center;
  }
  .time {
    .select {
      min-width: 40px;
      &__header {
        height: 50px;
        width: 60px;
        padding: 0 !important;
        border: 1px solid #e6e8ec;
        border-radius: 10px;
        background-color: #f4f5f6;
        transition: 0.3s ease;
        &__content {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #777e90;
          font-size: 16px;
          font-weight: 500;
          text-align: center;
        }
        &:hover {
          background: #fcfcfd;
        }
        &.active {
          border: 1px solid #45b36b;
        }
      }
      &__body {
        padding-right: 5px;
      }
    }
  }
  .dots {
    color: #777e90;
    font-size: 24px;
    font-weight: 500;
    cursor: default;
    min-width: 36px;
    text-align: center;
  }
  .ui__icon__wrapper {
    margin: 0 24px;
    width: 32px;
    height: 32px;
    cursor: default;
  }
  ${({ dinner }) =>
    dinner &&
    css`
      width: 100%;
      padding: 18px 24px 18px 27px;
      label {
        margin: 0 20px 0 0;
        .rc-checkbox {
          &-inner {
            //border: 1px solid #777E91 ;
            &:after {
              top: 3.3px;
              left: 6.3px;
            }
          }
          &.rc-checkbox-checked {
            &-inner {
              border: none !important;
            }
          }
        }
      }
    `}
`;

const Work_hour = ({ startTime, endTime, dinner, index = false, dataLastIndex = false, editable, name, lunch }) => {
  const attributes = {
    CustomIcon: () => "",
    hideLabel: "true",
    placeholder: "--",
    type: "custom-select",
    className: "time",
    isSearchable: false,
    editable,
    disabled: !editable,
    defaultHideAnimation: false,
  };
  return (
    <StyledWorkHours className="d-flex WorkHours" {...{ dataIndex: index === 0, dinner, dataLastIndex }}>
      <div className="d-flex">
        {dinner && <Field type={"checkbox"} name={`${name}.lunch`} md label={""} defaultValue={lunch} disabled={!editable} />}
        <Field
          name={`${name}.${dinner ? "lunchStartTime.hour" : "startTime.hour"}`}
          options={getSelectOptionsListFromListData(get(startTime, "hours.options", []))}
          defaultValue={get(startTime, "hours.values", [])}
          {...attributes}
        />
        <span className="dots">:</span>
        <Field
          name={`${name}.${dinner ? "lunchStartTime.minute" : "startTime.minute"}`}
          options={getSelectOptionsListFromListData(get(startTime, "minutes.options", []))}
          defaultValue={get(startTime, "minutes.values", [])}
          {...attributes}
        />
      </div>
      <Icon icon="icon-arrow-right-stick" />
      <div className="d-flex">
        <Field
          name={`${name}.${dinner ? "lunchEndTime.hour" : "endTime.hour"}`}
          options={getSelectOptionsListFromListData(get(endTime, "hours.options", []))}
          defaultValue={get(endTime, "hours.values", [])}
          {...attributes}
        />
        <span className="dots">:</span>
        <Field
          name={`${name}.${dinner ? "lunchEndTime.minute" : "endTime.minute"}`}
          options={getSelectOptionsListFromListData(get(endTime, "minutes.options", []))}
          defaultValue={get(endTime, "minutes.values", [])}
          {...attributes}
        />
      </div>
    </StyledWorkHours>
  );
};

export default Work_hour;
