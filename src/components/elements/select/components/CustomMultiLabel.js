import React, { memo } from "react";
import { get, isArray, isEmpty } from "lodash";
import { hexToRgb } from "../../../../utils";
import Icon from "../../icon";
import CustomActionDropDown from "./CustomActionDropDown";
import styled, { css } from "styled-components";

const ExitBtnStyle = styled.div`
  ${({ color = "#45B36B" }) =>
    color &&
    css`
      background: ${color};

      &:hover {
        opacity: 0.9 !important;
      }
    `}
`;

const colorKey = "colorCode";

const getColorByValue = (options, val) => {
  if (isArray(options) && val) {
    let res = options.find((item) => item.value === val);
    return res ? res.colorKey : "#45B36B";
  }
};

const CustomMultiLabel = ({
  data,
  undo,
  maxShowSelected = 9999999,
  options,
  action,
  editable,
  isMulti,
  clickDelete,
  clickRename,
  clickChangeColor,
  hideRemoveIcon = false,
  isFixed,
  valueKey,
  labelKey,
}) => {
  return (
    <div className="multiValueList">
      {isArray(data) &&
        data.map(
          (val, index) =>
            index < maxShowSelected && (
              <div
                className="multiValue"
                style={{
                  color: get(val, colorKey, ""),
                  background: `rgba(${hexToRgb(getColorByValue(options, val))},0.1)`,
                }}
                key={String(val[valueKey]) + Math.floor(Math.random() * 100000000)}
              >
                {val[labelKey]}
                {!isEmpty(action) && (
                  <CustomActionDropDown
                    {...{
                      action,
                      color: getColorByValue(options, val),
                      clickDelete,
                      clickRename,
                      clickChangeColor,
                      selectedIndex: index,
                      isFixed,
                    }}
                  />
                )}
                {editable && !hideRemoveIcon && (
                  <ExitBtnStyle className="exitBtn" color={get(val, colorKey, "#45B36B")}>
                    <Icon icon="icon-exit" onClick={() => undo(index)} />
                  </ExitBtnStyle>
                )}
              </div>
            )
        )}
    </div>
  );
};

export default memo(CustomMultiLabel);
