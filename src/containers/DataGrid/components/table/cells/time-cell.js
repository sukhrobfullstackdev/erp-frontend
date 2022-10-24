import React, { memo, useState } from "react";
import CustomDatepicker from "../../../../Form/components/date-picker/custom-datepicker";
import styled from "styled-components";
import { toast } from "react-toastify";
import { isNumber } from "lodash";
import { formatDate } from "../../../../../utils";

const Style = styled.div`
  height: 100%;
  padding: 0 12px;
  display: flex;
  align-items: center;
  .datepicker {
    //&__outside {
    //  top: 0px !important;
    //  right: 0px;
    //  position: fixed !important;
    //  z-index: 2;
    //  min-width: 800px;
    //  height: 520px;
    //  display: flex;
    //  justify-content: center;
    //  align-items: center;
    //}
    //
    //&__container {
    //  position: unset !important;
    //}
    &__container {
      top: 10px;
      right: 0;
    }
    &__input {
      height: 100% !important;
      padding: 6px 12px !important;
      background: none !important;
    }

    &__body_right {
      display: flex;
      flex-direction: column;
    }
  }
  .custom-datepicker {
    height: 100%;
    & > div {
      &:first-child {
        height: 100%;
      }
    }
  }

  .date__icon {
    display: none;
  }
`;

const TImeCell = ({
  updateItemRequest = () => {},
  setLoading = () => {},
  initialValue = null,
  rowId = null,
  id = null,
  editable = false,
  viewId,
  ...rest
}) => {
  const handleEnter = (value) => {
    if (value !== initialValue) {
      setLoading(true);
      updateItemRequest({
        id: rowId,
        // viewId,
        attributes: { [id]: value },
        cb: {
          success: () => {
            setLoading(false);
            toast.success("SUCCESSFULLY UPDATED");
          },
          fail: () => {
            setLoading(false);
          },
        },
      });
    }
  };

  return (
    <Style>
      {isNumber(initialValue) && formatDate(new Date(initialValue), "HH:mm")}
      {/*<CustomDatepicker*/}
      {/*    className={"custom-datepicker"}*/}
      {/*    placeholder={" "}*/}
      {/*    onChange={(v) => handleEnter(v)}*/}
      {/*    isDoubleClick*/}
      {/*    defaultValue={new Date(initialValue).getTime()}*/}
      {/*    type={"time"}*/}
      {/*/>*/}
    </Style>
  );
};

export default memo(TImeCell);
