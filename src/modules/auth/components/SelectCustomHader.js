import React, { memo } from "react";
import { get, isArray, isEmpty } from "lodash";
import Flex from "../../../components/elements/flex";

const getLabelByValueForSelect = ({ options, val, valueKey, labelKey }) => {
  val = isArray(val) ? val[0] : val;
  if (isArray(options) && val) {
    let res = options.find((item) => item[valueKey] === val);
    return get(res, labelKey, res);
  }
  return "";
};

const CustomHeader = ({
  isMulti,
  selected,
  defaultValue,
  placeholder,
  CustomIcon,
  options,
  isClearAll,
  clearAll,
  clickHeader,
  valueKey,
  labelKey,
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
        {!isEmpty(`${selected}`) ? (
          <>
            <Flex justify={"space-between"}>
              <Flex>
                <img className={"flag"} src={get(selected, "countryFlag", "")} />
              </Flex>
            </Flex>
          </>
        ) : !isEmpty(defaultValue) ? (
          getValue(defaultValue)
        ) : (
          <span className="select__header__content__placeholder">{placeholder}</span>
        )}
      </div>
      {
        <CustomIcon
          {...{
            isMulti,
            selected,
            isClearAll,
            clearAll,
            clickHeader,
          }}
        />
      }
    </>
  );
};
export default memo(CustomHeader);
