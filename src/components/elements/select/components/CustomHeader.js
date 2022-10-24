import React, { memo } from "react";
import { get, isArray, isEmpty } from "lodash";
import CustomMultiLabel from "./CustomMultiLabel";

const getLabelByValueForSelect = ({ options, val, valueKey, labelKey }) => {
  val = isArray(val) ? val[0] : val;
  if (isArray(options) && val) {
    let res = options.find((item) => item[valueKey] === val);
    return get(res, labelKey, res);
  }
  return "";
};

const customHeader = ({
  value,
  isMulti,
  undo,
  maxShowSelected,
  selected,
  defaultValue,
  placeholder,
  CustomIcon,
  options,
  action,
  editable,
  isClearAll,
  clearAll,
  clickHeader,
  hideRemoveIcon,
  clickDelete,
  clickRename,
  clickChangeColor,
  valueKey,
  labelKey,
  headerTitle,
}) => {
  const getValue = (val) => {
    let res = getLabelByValueForSelect({
      options,
      val,
      valueKey,
      labelKey,
    });
    if (isEmpty(res)) return <span className="select__header__content__placeholder">{placeholder}</span>;
    return res;
  };
  return (
    <>
      <div className="select__header__content" onClick={clickHeader}>
        <div className="select__header__content__text">
        {headerTitle ? (
          <span className="select__header__content__placeholder">{headerTitle}</span>
        ) : !isEmpty(`${selected}`) ? (
          isMulti ? (
            <CustomMultiLabel
              {...{
                data: selected,
                undo,
                maxShowSelected,
                defaultValue,
                options,
                editable,
                isMulti,
                clickDelete,
                clickRename,
                clickChangeColor,
                hideRemoveIcon,
                valueKey,
                labelKey,
              }}
            />
          ) : (
            getValue(get(selected, valueKey))
          )
        ) : !isEmpty(defaultValue) ? (
          isMulti ? (
            <CustomMultiLabel
              {...{
                data: defaultValue.slice(0, maxShowSelected),
                undo,
                maxShowSelected,
                defaultValue,
                options,
                action,
                editable,
                isMulti,
                clickDelete,
                clickRename,
                clickChangeColor,
                valueKey,
                labelKey,
              }}
            />
          ) : (
            getValue(defaultValue)
          )
        ) : (
          <span className="select__header__content__placeholder">{placeholder}</span>
        )}
      </div>
      </div>
      {CustomIcon && (
        <CustomIcon
          {...{
            isMulti,
            selected,
            isClearAll,
            clearAll,
            clickHeader,
          }}
        />
      )}
    </>
  );
};

export default memo(customHeader);
