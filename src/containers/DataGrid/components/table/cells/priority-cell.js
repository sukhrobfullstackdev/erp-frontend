import React, { memo, useEffect, useState } from "react";
import { get, isArray, isEmpty, isNull } from "lodash";
import styled from "styled-components";
import Select from "../../../../../components/elements/select/Select";
import { getSelectOptionsListFromData } from "../../../../../utils";
import { toast } from "react-toastify";
import Icon from "../../../../../components/elements/icon";

const Style = styled.div`
  height: 100%;

  .h-100 {
    height: 100%;

    & > div {
      &:first-child {
        height: 100%;
      }
    }
  }

  .select {
    height: 100%;

    &__header {
      height: 100%;
      min-height: 100%;
      background: none;
      border: 1px solid transparent;
      border-radius: 0;

      &__content {
        padding: 0 10px;

        .ui__icon__wrapper {
          &.md {
            .icon {
              transition: none;
            }
          }
        }
      }
    }

    &__body {
      &__options {
        &__option {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          position: relative;
          cursor: pointer;
          padding: 3px 0 0px 5px;
          text-transform: capitalize;
          .Icon {
            margin-right: 15px;
          }
          .checked {
            position: absolute;
            right: 0;

            .ui__icon__wrapper {
              &.md {
                .icon {
                  width: 14px;
                  height: 12px;
                }
              }
            }
          }
        }
      }
    }
  }
`;

const PriorityCell = ({
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
  isMulti = false,
  ...rest
}) => {
  const [options, setOptions] = useState(getSelectOptionsListFromData(get(typeConfig, "priorities", []), "id", "name"));
  let boardHeader = get(typeConfig, "boardHeader", false);

  // useEffect(() => {
  //     let optionss = getSelectOptionsListFromData(get(typeConfig, "options", []), "id", "name", "other");
  //     setOptions(optionss);
  // }, [])

  const handleChange = (value) => {
    if (value != initialValue) {
      setLoading(true);
      let requestData = {
        id: rowId,
        // viewId,
        attributes: { [id]: value === "CLEAR" ? null : value },
        cb: {
          success: () => {
            setLoading(false);
            toast.success("SUCCESSFULLY UPDATED");
          },
          fail: () => {
            setLoading(false);
          },
        },
      };
      updateItemRequest(requestData);
    }
  };
  if (options.length == 4) options.push({ value: "CLEAR", label: "Clear" });

  const CustomOption = ({
    options,
    isMulti,
    selectHandling,
    selected,
    action,
    nullable,
    clickDelete,
    clickRename,
    clickChangeColor,
    searchValue,
  }) => {
    return isEmpty(options) ? (
      <div className="select__body__options__empty">
        {" "}
        {action.create && !isEmpty(searchValue) ? "Press Enter or click create button" : "Result not found"}{" "}
      </div>
    ) : (
      isArray(options) &&
        options.map(
          ({ value, label, ...other }, index) =>
            (isEmpty(selected) ? value !== "CLEAR" : true) && (
              <div
                className={"select__body__options__option"}
                key={value}
                onClick={() => selectHandling({ value, label, ...other })}
              >
                <Icon
                  mainClassName={"Icon"}
                  icon={value === "CLEAR" ? "icon-exit" : "icon-flag2"}
                  color={
                    value === "URGENT"
                      ? "rgb(245,0,0)"
                      : value === "HIGH"
                      ? "rgb(255,204,0)"
                      : value === "NORMAL"
                      ? "rgb(111,221,255)"
                      : value === "LOW"
                      ? "rgb(216, 216,216)"
                      : "#ff8176"
                  }
                />

                {label}
                {!isEmpty(selected) && selected.value === value && selected.value !== "CLEAR" && (
                  <Icon icon={"icon-check2"} color={"#2ea52c"} mainClassName={"checked"} />
                )}
              </div>
            )
        )
    );
  };

  const CustomHeader = ({
    value,
    isMulti,
    undo,
    maxShowSelected,
    selected,
    defaultValue,
    placeholder,
    customIcon,
    options,
    action,
    editable,
    isClearAll,
    clearAll,
    clickHeader,
    hideRemoveIcon,
  }) => {
    return (
      <>
        <div className="select__header__content" onClick={clickHeader}>
          {isEmpty(`${selected}`) ? (
            <Icon icon="icon-flag2" color={"grey"} />
          ) : (
            <Icon
              icon="icon-flag2"
              color={
                selected.value === "URGENT"
                  ? "rgb(245,0,0)"
                  : selected.value === "HIGH"
                  ? "rgb(255,204,0)"
                  : selected.value === "NORMAL"
                  ? "rgb(111,221,255)"
                  : selected.value === "LOW"
                  ? "rgb(216, 216,216)"
                  : "grey"
              }
            />
          )}
        </div>
      </>
    );
  };

  return (
    <Style>
      <Select
        {...{
          className: "h-100",
          onChange: handleChange,
          // onClose: handleEnter,
          defaultValue: initialValue,
          action: get(typeConfig, "action", {}),
          options,
          isMulti,
          isChangeDefaultValue: false,
          CustomIcon: () => "",
          placeholder: "",
          maxShowSelected: 9999,
          otherDataForAction: { customFieldId: id },
          hideRemoveIcon: true,
          CustomOption,
          CustomHeader,
          isSearchable: false,
          defaultHideAnimation: false,
        }}
      />
    </Style>
  );
};

export default memo(PriorityCell);
