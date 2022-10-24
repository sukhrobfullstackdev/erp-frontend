import React, { memo } from "react";
import { get, isArray, isEmpty, isNil, upperCase } from "lodash";
import Flex from "../../../components/elements/flex";

const CustomOption = ({
  options,
  isMulti,
  selectHandling,
  selected,
  action,
  searchValue,
  disabledSomeOptions,
  ignoreOption,
  valueKey,
  labelKey,
}) => {
  const render = ({ index, ...other }) => {
    let res = isArray(disabledSomeOptions) ? disabledSomeOptions.find((item) => get(item, valueKey, "") === other[valueKey]) : [];
    if (!isEmpty(ignoreOption)) {
      if (ignoreOption[other[valueKey]]) return "";
    }
    return (
      <div key={other[valueKey] + other[labelKey] + other["countryFlag"]}>
        <div
          className={`select__body__options__option ${other[valueKey] === selected && "selected"} ${
            !isNil(res) ? "disabled" : ""
          }`}
          data-index={index}
        >
          <div className="content" onClick={() => isNil(res) && selectHandling(other)}>
            <Flex justify={"space-between"} className="test">
              <Flex align={"center"}>
                <img className={"flag"} src={get(other, "countryFlag")} />
                <span className={"hide"}>{`${get(other, "countryName")} (${get(other, `countryName[${0}]`)}${upperCase(
                  get(other, `countryName[${1}]`)
                )})`}</span>
              </Flex>
              <span className={"hide"}>+{get(other, "prefix")}</span>
            </Flex>
          </div>
        </div>
      </div>
    );
  };

  return isEmpty(options) ? (
    <div className="select__body__options__empty">
      {" "}
      {action.create && !isEmpty(searchValue) ? "Press Enter or click create button" : "Result not found"}{" "}
    </div>
  ) : (
    isArray(options) && options.map((val, index) => !isMulti && render({ ...val, index }))
  );
};

export default memo(CustomOption);
