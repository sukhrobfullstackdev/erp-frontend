import React, { memo, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { toast } from "react-toastify";
import OutsideClickHandler from "react-outside-click-handler";
import { withTranslation } from "react-i18next";
import { get, isArray, isEmpty, isNil, isNull } from "lodash";
import errorImg from "../../../../../assets/icons/error2.svg";
import Select from "../../../../../components/elements/select/Select";

const Styled = styled.div`
  height: 100%;
  & > div {
    &:first-child {
      display: flex;
      height: 100%;
    }
  }

  input {
    padding: 0px 12px;
    cursor: default;
    height: 100%;
  }

  ${({ focus }) =>
    focus &&
    css`
      border: 1px solid #45b36b;

      input {
        cursor: text;
      }
    `}
  ${({ valid }) =>
    !valid &&
    css`
      input {
        width: 89% !important;
      }

      border: 1px solid #ef466f;
    `}
  .country {
    height: 100%;

    & > div {
      &:first-child {
        height: 100%;
      }
    }

    .select {
      height: 100%;
      min-width: 50px;
      &__header {
        width: 50px;
        height: 100%;
        min-height: 25px;
        background: #f4f5f6;
        border-radius: 2px;
        border: 1px solid transparent;

        &__content {
          padding: 6px;

          img {
            width: 20px;
            border-radius: 2px;
          }
        }

        &__iconContainer {
          right: 0;

          .ui__icon__wrapper {
            &.md {
              .icon {
                width: 18px;
                height: 18px;
              }
            }
          }
        }
      }

      &__body {
        width: 210px;
        &__options {
          &__option {
            background: #fcfcfd;
            border-radius: 5px;
            padding: 7px 10px 7px 10px;

            .content {
              display: flex;
              justify-content: space-between;

              span {
                //display: flex;
                //align-items: center;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                img {
                  width: 20px;
                  border-radius: 2px;
                  margin-right: 10px;
                }
              }
            }
          }
        }
      }
    }
  }
  .defaultValue {
    padding: 0 12px;
    width: 100%;
    display: flex;
    align-items: center;
  }
`;

const CustomHeader = ({ isMulti, selected, CustomIcon, isClearAll, clearAll, clickHeader }) => {
  return (
    <>
      <div className="select__header__content" onClick={clickHeader}>
        {/*{*/}
        {/*    !isEmpty(`${selected}`)*/}
        {/*        ? get(selected, labelKey,"")*/}
        {/*        : !isEmpty(defaultValue)*/}
        {/*            ? get(selected, labelKey,"")*/}
        {/*            : <span className="select__header__content__placeholder">{placeholder}</span>*/}
        {/*}*/}
        <img src={get(selected, "flagUrl", "")} />
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
const CustomOption = ({
  options,
  selectHandling,
  selected,
  action,
  nullable,
  searchValue,
  disabledSomeOptions,
  ignoreOption,
  valueKey,
  labelKey,
}) => {
  const render = ({ index, ...val }) => {
    let res = isArray(disabledSomeOptions) ? disabledSomeOptions.find((item) => get(item, valueKey, "") === val[valueKey]) : [];
    if (!isEmpty(ignoreOption)) {
      if (ignoreOption[val[valueKey]]) return "";
    }
    //
    return (
      <div key={get(val, "id", index)}>
        {nullable && !index && (
          <div className={`select__body__options__option nullable`}>
            <div className="content" onClick={() => selectHandling(null)}>
              -
            </div>
          </div>
        )}
        <div
          className={`select__body__options__option ${val[valueKey] === selected && "selected"} ${!isNil(res) ? "disabled" : ""}`}
          data-index={index}
        >
          <div className="content" onClick={() => isNil(res) && selectHandling(val)}>
            <span>
              <img src={get(val, "flagUrl", "")} />
              {val[labelKey]}
            </span>
            {get(val, "callingCode", "")}
          </div>
        </div>
      </div>
    );
  };

  return isEmpty(options) ? (
    <div className="select__body__options__empty">
      {action.create && !isEmpty(searchValue) ? "Press Enter or click create button" : "Result not found"}
    </div>
  ) : (
    isArray(options) && options.map((val, index) => render({ index, ...val }))
  );
};

const findCallingCode = (value, options) => {
  let temp = [];
  if (isArray(options))
    options.forEach((val, index) => {
      if (!isEmpty(get(val, "callingCode", "")) && value.startsWith(get(val, "callingCode", "")))
        temp.push({ code: get(val, "callingCode", ""), index });
    });

  if (!isEmpty(temp)) temp = temp.sort((a, b) => a.code.length - b.code.length);
  return get(temp, "[0]", "");
};

const PhoneNumberCell = ({
  updateItemRequest = () => {},
  setLoading = () => {},
  initialValue = "",
  rowId = null,
  id = null,
  editable = false,
  t,
  defaultValue,
  viewId,
  typeConfig,
  ...rest
}) => {
  const [data, setData] = useState({
    value: !isNull(initialValue) ? initialValue : "",
    isEditable: false,
    valid: true,
    focus: false,
    focusColumn: false,
    selected: {},
    initialValue,
  });

  let pattern = /^\d+$/;

  useEffect(() => {
    if (!isEmpty(get(typeConfig, "phoneNumberConfig.phoneOptions", []))) {
      let selected = get(typeConfig, "phoneNumberConfig.phoneOptions[0]", {});
      if (isNull(initialValue) ? "" : initialValue) {
        let res = findCallingCode(initialValue, get(typeConfig, "phoneNumberConfig.phoneOptions", []));
        if (!isEmpty(res)) selected = get(typeConfig, `phoneNumberConfig.phoneOptions[${get(res, "index", 0)}]`, "");
      }
      setData((s) => ({
        ...s,
        selected,
        value: isNull(initialValue) ? "" : initialValue.replace(selected.callingCode, ""),
      }));
    }
  }, [typeConfig]);

  const onChange = (e) => {
    if (pattern.test(e.target.value)) setData((s) => ({ ...s, value: e.target.value, valid: true }));
    else if (e.target.value === "") setData((s) => ({ ...s, value: e.target.value, valid: true }));
    else setData((s) => ({ ...s, valid: false }));
  };

  const onBlur = () => setData((s) => ({ ...s, isEditable: false, focus: false }));

  const handleEditable = () => setData((s) => ({ ...s, isEditable: editable, focus: true }));

  const selectHandling = (val, item) => setData((s) => ({ ...s, selected: item }));

  const onDoubleClick = () => editable && setData((s) => ({ ...s, focusColumn: true }));

  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      if (data.value.length > 7 && data.value.length < 18) {
        setData((s) => ({
          ...s,
          valid: true,
          focusColumn: false,
          initialValue: `${get(data, "selected.callingCode", "")}${data.value}`,
        }));
        setLoading(true);
        updateItemRequest({
          id: rowId,
          attributes: {
            [id]: `${get(data, "selected.callingCode", "")}${data.value}`,
          },
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
      } else setData((s) => ({ ...s, valid: false }));
    }
  };

  return (
    <Styled {...{ valid: data.valid, focus: data.focusColumn, ...rest }} onDoubleClick={onDoubleClick}>
      <OutsideClickHandler onOutsideClick={() => data.focusColumn && setData((s) => ({ ...s, focusColumn: false }))}>
        {data.focusColumn && (
          <>
            <Select
              options={get(typeConfig, "phoneNumberConfig.phoneOptions", [])}
              onChange={selectHandling}
              CustomHeader={CustomHeader}
              CustomOption={CustomOption}
              valueKey={"id"}
              labelKey={"name"}
              isFixed
              nullable={false}
              className={"country"}
              placeholder={""}
              defaultValue={get(data, "selected.id", "")}
            />
            <input
              onKeyDown={(e) => handleEnter(e)}
              onClick={handleEditable}
              onChange={onChange}
              onBlur={onBlur}
              value={data.value}
              autoFocus
              placeholder={get(data, "selected.phoneNumberPlaceholder", "")}
            />
            {!data.valid && <img src={errorImg} alt={"error"} />}
          </>
        )}
        {!data.focusColumn && <div className="defaultValue">{data.initialValue}</div>}
      </OutsideClickHandler>
    </Styled>
  );
};

export default withTranslation("pdp")(memo(PhoneNumberCell));
