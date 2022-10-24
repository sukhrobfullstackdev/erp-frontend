import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import {
  every,
  find,
  get,
  hasIn,
  head,
  includes,
  isArray,
  isEmpty,
  isEqual,
  isNil,
  orderBy,
  some,
  filter as lodashFilter,
} from "lodash";
import { Rating } from "react-simple-star-rating";
import Select from "../../../../components/elements/select/Select";
import Button from "../../../../components/elements/button";
import Icon from "../../../../components/elements/icon";
import FilterTemplates from "./filterTemplates";
import { TYPES as types } from "../../types";
import Dropdown from "../../../../components/elements/dropDown/dropdown";
import { withTranslation } from "react-i18next";
import classNames from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import numeral from "numeral";
import { Style } from "./style";

const Filter = ({ t, columns = [], filter = {}, filterView = () => {}, ...rest }) => {
  const [tempOpen, setTempOpen] = useState(false);
  const [filterOperator, setFilterOperator] = useState("AND");
  const [filterFields, setFilterFields] = useState([]);
  const [outsideClicked, setOutsideClicked] = useState(true);
  const [isFirst, setIsFirst] = useState(true);

  const setFilterFieldsAndUpdate = (data) => {
    setFilterFields(data);
    setIsFirst(false);
  };

  useEffect(() => {
    if (!isFirst && outsideClicked && !isEmpty(filterFields)) {
      if (some(filterFields, "selectedLabel.isLastSelect") || every(filterFields, "value")) {
        filterView(
          filterFields
            .filter(({ field, fieldType, compareOperatorType, additionCompareTypeForLabels, customField, value, orderIndex }) => {
              const res1 = compareOperatorType;
              const res2 =
                value &&
                typeof value === "object" &&
                !isEmpty(value) &&
                Object.keys(value).reduce((result, key) => result || value[key], false);
              // console.log(res1, res2, Object.values(value));
              return res1 && res2;
            })
            .map(({ field, fieldType, compareOperatorType, additionCompareTypeForLabels, customField, value, orderIndex }) => ({
              field,
              fieldType,
              compareOperatorType,
              additionCompareTypeForLabels,
              customField,
              value,
              orderIndex,
            })),
          filterOperator
        );
      }
    }
  }, [filterFields, outsideClicked]);

  useEffect(() => {
    if (!isEmpty(filter) && !isEmpty(columns)) {
      setFilterOperator(get(filter, "filterOperator", "AND"));
      const filters = get(filter, "filterFields", []).map((item) => ({
        ...item,
        type: getType(types, getField(columns, get(item, "field"))),
        additionCompareTypeForLabels: item.additionCompareTypeForLabels ?? "ANY",
        typeOptions: get(getType(types, getField(columns, get(item, "field"))), "types"),
        selectedLabel: getSelectedLabel(
          getType(types, getField(columns, get(item, "field"))),
          getDefaultTypeOption(types, getField(columns, get(item, "field")), item)
        ),
        isLastSelect: !hasIn(getDefaultTypeOption(types, getField(columns, get(item, "field"))), "isLastSelect"),
      }));

      setFilterFields(filters);
    }
  }, []);

  const addFilter = (value, index) => {
    const field = getField(columns, value);
    const type = getType(types, field);
    const defaultTypeOption = getDefaultTypeOption(types, field);
    if (get(filterFields, `${index}.field`, "") !== value) {
      if (!isNil(index)) {
        setFilterFieldsAndUpdate(
          filterFields.map((filter, number) =>
            isEqual(number, index)
              ? {
                  field: value,
                  fieldType: get(
                    find(columns, (column) => isEqual(get(column, "id"), value)),
                    "type"
                  ),
                  compareOperatorType: get(defaultTypeOption, "value"),
                  tempCompareOperatorType: get(defaultTypeOption, "value"),
                  selectedLabel: getSelectedLabel(type, defaultTypeOption),
                  customField: get(field, "customField"),
                  typeOptions: get(type, "types"),
                  type,
                }
              : filter
          )
        );
      } else {
        setFilterFieldsAndUpdate((filterFields) => [
          ...filterFields,
          {
            field: value,
            fieldType: get(
              find(columns, (column) => isEqual(get(column, "id"), value)),
              "type"
            ),
            compareOperatorType: get(defaultTypeOption, "value"),
            tempCompareOperatorType: get(defaultTypeOption, "value"),
            isLastSelect: !hasIn(defaultTypeOption, "isLastSelect"),
            selectedLabel: getSelectedLabel(type, defaultTypeOption),
            customField: get(field, "customField"),
            type,
            typeOptions: get(type, "types"),
          },
        ]);
      }
    }
  };

  const changeCompareOperatorType = (compareOperatorType, index) => {
    if (get(filterFields, `[${index}].compareOperatorType`, "") !== compareOperatorType) {
      setFilterFieldsAndUpdate(
        filterFields.map((filter, number) => {
          return isEqual(number, index)
            ? {
                ...filter,
                compareOperatorType,
                selectedLabel: get(filter, "type.types", []).find((item) => isEqual(get(item, "value"), compareOperatorType)),
              }
            : filter;
        })
      );
    }
  };

  const changeCompareOperatorTypeForLabel = (value, index) => {
    setFilterFieldsAndUpdate(
      filterFields.map((item, idx) => {
        return isEqual(idx, index)
          ? {
              ...item,
              additionCompareTypeForLabels: value,
            }
          : item;
      })
    );
  };

  const removeFilter = (name, isAll = false) => {
    if (isAll) {
      setFilterFieldsAndUpdate([]);
      filterView([], filterOperator);
    } else {
      const filters = lodashFilter(filterFields, (item) => !isEqual(get(item, "field"), name));
      setFilterFieldsAndUpdate(filters);
      if (filters.length == 0) {
        filterView([], filterOperator);
      }
    }
  };

  const setValue = ({ firstValue = null, secondValue = null, type = null, index }) => {
    setFilterFieldsAndUpdate(
      filterFields.map((filter, idx) => {
        return isEqual(idx, index)
          ? includes(["SHORT_TEXT", "LONG_TEXT", "PHONE", "EMAIL"], type)
            ? {
                ...filter,
                value: { searchingValue: firstValue },
              }
            : includes(["RATING", "MONEY", "NUMBER"], type)
            ? {
                ...filter,
                value: {
                  minValue: numeral(firstValue ?? get(filter, "value.minValue")).value() + "",
                  maxValue: numeral(secondValue ?? get(filter, "value.maxValue")).value() + "",
                },
              }
            : isEqual(type, "DATE")
            ? {
                ...filter,
                value: {
                  dateCompareOperatorType: firstValue,
                  dateXValue: 1,
                  dateFilterType: get(
                    head(
                      get(
                        get(filter, "selectedLabel.children", []).find((item) => isEqual(get(item, "value"), firstValue)),
                        "children",
                        []
                      )
                    ),
                    "value"
                  ),
                },
              }
            : includes(["DROPDOWN", "LABELS"], type)
            ? {
                ...filter,
                value: {
                  optionsSelected: firstValue,
                },
              }
            : ""
          : filter;
      })
    );
  };

  const setDateValue = ({ dateXValue, dateFilterType, index }) => {
    console.log("getDateValue");
    setFilterFieldsAndUpdate(
      filterFields.map((filter, number) =>
        isEqual(number, index)
          ? {
              ...filter,
              value: {
                ...filter.value,
                dateXValue: dateXValue ?? get(filter, "value.dateXValue", undefined),
                dateFilterType: dateFilterType ?? get(filter, "value.dateFilterType", undefined),
              },
            }
          : filter
      )
    );
  };

  const getDateOptions = (field) => {
    return get(field, "selectedLabel.children", []).find((child) =>
      isEqual(get(child, "value"), get(field, "value.dateCompareOperatorType"))
    );
  };

  const getField = (columns, value) => {
    return find(columns, (column) => isEqual(get(column, "id"), value));
  };

  const getType = (types, field) => {
    return find(types, (type) => isEqual(get(type, "name"), get(field, "type")));
  };

  const getDefaultTypeOption = (types, field, item = {}) => {
    const selectedTypes = get(
      find(types, (type) => isEqual(get(type, "name"), get(field, "type"))),
      "types"
    );

    return item.compareOperatorType ? selectedTypes.find((row) => row.value == item.compareOperatorType) : head(selectedTypes);
  };

  const getSelectedLabel = (type, defaultTypeOption) => {
    return get(type, "types", []).find((item) => isEqual(get(item, "value"), get(defaultTypeOption, "value")));
  };

  const outsideClickHandler = () => setOutsideClicked(true);

  return (
    <Style {...rest}>
      <div
        className={classNames("filter", {
          long: filterFields.length != 0,
        })}
      >
        <div className="filter__header">
          <span className="filter__header__title">{t("Active Filters") ?? "Active Filters"}</span>
          <div className="filter__header__clear">
            {!isEmpty(filterFields) && <Button onCLick={() => removeFilter(null, true)}>{t("Clear all") ?? "Clear all"}</Button>}
            <Icon icon="icon-question" />
          </div>
        </div>
        <div className="filter__body">
          {filterFields &&
            isArray(filterFields) &&
            filterFields.map((field, index) => (
              <div className="input-wrapper" key={index + 1}>
                {isEqual(index, 0) && (
                  <span className="noInput" style={{ width: "68px" }}>
                    {t("Where") ?? "Where"}
                  </span>
                )}

                {!isEqual(index, 0) && (
                  <Select
                    className="first-child selectContainer"
                    isSearchable={false}
                    defaultValue={filterOperator}
                    options={[
                      { label: "AND", value: "AND" },
                      { label: "OR", value: "OR" },
                    ]}
                    onChange={(value) => setFilterOperator(value)}
                    disable={!isEqual(index, 1)}
                  />
                )}

                <Select
                  className="second-child selectContainer"
                  defaultValue={get(field, "field")}
                  options={
                    isArray(columns) &&
                    columns.map(({ id, name }) => ({
                      value: id,
                      label: name,
                    }))
                  }
                  onChange={(value) => addFilter(value, index)}
                />

                <Select
                  isSearchable={false}
                  className="third-child selectContainer"
                  defaultValue={get(field, "compareOperatorType")}
                  options={get(field, "typeOptions")}
                  onChange={(value) => changeCompareOperatorType(value, index)}
                />

                {!get(field, "selectedLabel.isLastSelect", false) &&
                  (get(field, "selectedLabel.children", false) ? (
                    !isEqual(get(field, "fieldType", ""), "LABELS") ? (
                      <>
                        <Select
                          searchable={false}
                          className="fourth-child last-input selectContainer"
                          options={get(field, "selectedLabel.children", [])}
                          onChange={(value) =>
                            setValue({
                              firstValue: value,
                              type: get(field, "fieldType"),
                              index,
                            })
                          }
                        />
                        {get(getDateOptions(field), "hasNext", false) ? (
                          get(getDateOptions(field), "children", false) ? (
                            <>
                              {!get(getDateOptions(field), "inputNot", false) && (
                                <OutsideClickHandler onOutsideClick={outsideClickHandler} display="flex">
                                  <input
                                    value={get(field, "value.dateXValue")}
                                    className="oneInput"
                                    type="number"
                                    onChange={(e) => {
                                      setOutsideClicked(false);
                                      setDateValue({
                                        dateXValue: e.target.value,
                                        index,
                                      });
                                    }}
                                  />
                                </OutsideClickHandler>
                              )}
                              <Select
                                isSearchable={false}
                                className="fourth-child last-input selectContainer"
                                defaultValue={get(field, "value.dateFilterType")}
                                options={get(getDateOptions(field), "children", [])}
                                onChange={(value) =>
                                  setDateValue({
                                    dateFilterType: value,
                                    index,
                                  })
                                }
                              />
                            </>
                          ) : (
                            <input type="date" />
                          )
                        ) : null}
                      </>
                    ) : (
                      <div className="multi-select-wrapper " style={{ display: "flex" }}>
                        <Select
                          className="fourth-child last-input multi-select-input"
                          options={get(
                            columns.find((column) => isEqual(get(column, "id"), get(field, "field"))),
                            "typeConfig.options"
                          )}
                          isMulti
                          maxShowSelected={1}
                          valueKey="id"
                          labelKey="name"
                          onChange={(value) =>
                            setValue({
                              firstValue: value,
                              type: get(field, "fieldType"),
                              index,
                            })
                          }
                        />
                        <Dropdown
                          button={
                            <Button className="btn" semiBold>
                              <span>
                                {get(field, "selectedLabel.children", []).find(
                                  (item) => item.value === get(field, "additionCompareTypeForLabels", "Any")
                                )?.label ?? "Any"}
                              </span>
                            </Button>
                          }
                        >
                          <div className="dropdawn">
                            {get(field, "selectedLabel.children", []).map((item, i) => (
                              <Button
                                key={i + 1}
                                className="drop_btn"
                                onCLick={() => changeCompareOperatorTypeForLabel(get(item, "value"), index)}
                              >
                                {get(item, "label")}
                              </Button>
                            ))}
                          </div>
                        </Dropdown>
                      </div>
                    )
                  ) : get(field, "selectedLabel.hasNext", false) ? (
                    <Select
                      searchable={false}
                      className="fourth-child last-input selectContainer"
                      options={get(
                        columns.find((column) => isEqual(get(column, "id"), get(field, "field"))),
                        "typeConfig.options"
                      ).map(({ id, name }) => ({
                        value: id,
                        label: name,
                      }))}
                      onChange={(value) =>
                        setValue({
                          firstValue: [value],
                          type: get(field, "fieldType"),
                          index,
                        })
                      }
                    />
                  ) : get(field, "selectedLabel.twoInput", false) ? (
                    <>
                      <OutsideClickHandler onOutsideClick={outsideClickHandler} display="flex">
                        <input
                          className="oneInput"
                          type="number"
                          onChange={(e) => {
                            setOutsideClicked(false);
                            setValue({
                              firstValue: e.target.value,
                              type: get(field, "fieldType"),
                              index,
                            });
                          }}
                        />
                      </OutsideClickHandler>
                      <OutsideClickHandler onOutsideClick={outsideClickHandler} display="flex">
                        <input
                          className="oneInput"
                          type="number"
                          onChange={(e) => {
                            setOutsideClicked(false);
                            setValue({
                              secondValue: e.target.value,
                              type: get(field, "fieldType"),
                              index,
                            });
                          }}
                        />
                      </OutsideClickHandler>
                    </>
                  ) : (
                    <OutsideClickHandler onOutsideClick={outsideClickHandler} display="flex">
                      <input
                        value={
                          includes(["SHORT_TEXT", "LONG_TEXT", "PHONE", "EMAIL"], get(field, "fieldType"))
                            ? get(field, "value.searchingValue", "")
                            : includes(["RATING", "NUMBER"], get(field, "fieldType"))
                            ? get(field, "value.minValue", "")
                            : "MONEY" === get(field, "fieldType")
                            ? numeral(get(field, "value.minValue", "")).format("0,0[.]00")
                            : ""
                        }
                        className="oneInput one"
                        onChange={(e) => {
                          setOutsideClicked(false);
                          setValue({
                            firstValue: e.target.value,
                            type: get(field, "fieldType"),
                            index,
                          });
                        }}
                      />
                    </OutsideClickHandler>
                  ))}

                <div className="close-fild" onClick={() => removeFilter(get(field, "field"))}>
                  <Icon icon="icon-x-close" color="#353945" />
                </div>
              </div>
            ))}
        </div>
        {/*<div className="rating-input">*/}
        {/*    <Rating*/}
        {/*        emptySymbol={<Icon icon="icon-flag-outline" />}*/}
        {/*        fullSymbol={<Icon color="yellow" icon="icon-flag" />}*/}
        {/*    />*/}
        {/*</div>*/}
        <div className="filter__footer">
          <Select
            options={
              isArray(columns) &&
              orderBy(columns, ["name"], ["asc"]).map(({ id, name }) => ({
                value: id,
                label: name,
              }))
            }
            headerTitle={"+ Add Filter"}
            CustomIcon=""
            onChange={(value) => addFilter(value)}
            optionTitle={t("ADD FILTER") ?? "ADD FILTER"}
            customHeader={({ clickHeader }) => (
              <div className="select__header__content" onClick={clickHeader}>
                {t("+Add filter") ?? "+Add filter"}
              </div>
            )}
          />
          <Dropdown
            button={
              <div className="filter__footer__templates" onClick={() => setTempOpen(!tempOpen)}>
                <Icon icon="icon-magic-wand" />
                {t("Templates") ?? "Templates"}
              </div>
            }
          >
            <FilterTemplates />
          </Dropdown>
        </div>
      </div>
    </Style>
  );
};

export default withTranslation("pdp")(memo(Filter));
