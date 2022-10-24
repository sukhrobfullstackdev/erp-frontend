import React, { memo, useState } from "react";
import CustomDatepicker from "components/custom-datepicker";
import styled from "styled-components";
import { toast } from "react-toastify";
import CustomDatepickerForGlobal from "components/custom-datepicker/custom-datepicker-for-global";

const Style = styled.div`
  height: 100%;
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

const DateCell = ({
  updateItemRequest = () => {},
  setLoading = () => {},
  initialValue = null,
  rowId = null,
  id = null,
  editable = false,
  // viewId,
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
      <CustomDatepickerForGlobal
        className={"custom-datepicker"}
        placeholder={" "}
        onChange={handleEnter}
        isDoubleClick
        defaultValue={new Date(initialValue).getTime()}
      />
    </Style>
  );
};

export default memo(DateCell);
