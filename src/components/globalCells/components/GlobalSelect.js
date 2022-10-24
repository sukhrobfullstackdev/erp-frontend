import { get, isArray, isEmpty, isNil, isNull } from "lodash";
import React, { memo, useCallback } from "react";
import OutsideClickHandler from "react-outside-click-handler/esm/OutsideClickHandler";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import ApiActions from "../../../services/globalContextMenu/actions";
import SimpleBar from "simplebar-react";

import CustomMultiLabelComponent from "../../elements/select/components/CustomMultiLabel";
import CustomOptionsComponent from "../../elements/select/components/CustomOptions";
import { getGlobalSelectData, getGlobalSelectStateData } from "../selectors";

const Style = styled.div`
  .select__body {
    width: 100%;
    min-width: 50px;
    margin: 12px 0 0 0;
    z-index: 20;
    background: #ffffff;
    border: 1px solid #e6e8ec;
    box-sizing: border-box;
    box-shadow: 0 8px 16px rgba(145, 158, 171, 0.24);
    border-radius: 8px;
    padding-bottom: 10px;
    opacity: 0;
    /* overflow: ${({ isFixed }) => (isFixed ? "unset" : "hidden")}; */
    ${({ defaultHideAnimation }) =>
      defaultHideAnimation ? "animation: hideAnim 0.1s forwards;" : "transform: scale(0);"} //animation: hideAnim 0.1s forwards;
      position: absolute;

    &__options {
      box-sizing: border-box;
      border-radius: 8px;
      background: #fff;
      border: none;
      overflow-y: auto;
      min-height: ${({ action }) => (action ? "160px" : "76px")};
      padding-right: 8px;
      max-height: 250px;

      &::-webkit-scrollbar {
        width: 0 !important;
      }

      &__selected {
        min-height: 0;
        /* overflow: hidden; */
      }

      &__title {
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: #777e91;
        padding: 6px 7px;
        border-radius: 8px 8px 0px 0px;
      }

      &__search {
        background: #f4f5f6;
        border-radius: 6px;
        box-sizing: border-box;
        margin-bottom: 10px;
        margin-top: 5px;

        input {
          background: none;
          border: none;
          outline: none;
          width: 100%;
          padding: 10px 6px 9px 6px;
          padding-left: 10px;
          font-weight: normal;
          font-size: 14px;
          line-height: 21px;
          color: #353945;

          &::placeholder {
            color: #b1b5c4;
          }
        }
      }

      &__option {
        display: flex;
        justify-content: space-between;
        font-weight: normal;
        font-size: 14px;
        line-height: 21px;
        color: #353945;
        margin-bottom: 5px;
        padding: 7px 0 7px 10px;
        border-radius: 8px;

        .content {
          cursor: pointer;
          width: 100%;
          background: none;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        &.disabled {
          color: #9e9e9e;
          cursor: not-allowed;

          .content {
            cursor: not-allowed;
          }
        }

        ${({ optionsDisabled }) =>
          optionsDisabled &&
          css`
            background: #777e9129;
            cursor: not-allowed;

            .content {
              cursor: not-allowed;
            }
          `}
      }

      &__empty {
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 14px;
        padding: 40px 0 45px;
      }

      &__footer {
        position: absolute;
        bottom: 10px;
        left: 10px;

        &__button {
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          line-height: 1;
          color: #7c828d;
        }
      }
    }

    .colorPicker-container {
      position: fixed;
      top: 105px;
      right: 30px;
      width: 224px;
      height: 145px;
      background: #fcfcfd;
      box-shadow: 0 8px 16px rgba(145, 158, 171, 0.24);
      border-radius: 8px;
      .circle-picker {
        position: absolute;
        //top: 60px;
        //right: 30px;
        top: 33px;
        right: 16px;
      }

      .styled-chrome-picker {
      }
    }
  }

  .dropDown {
    &__button {
      position: absolute;
      top: -17px;
      right: 8px;
      z-index: 2;
    }

    &__body {
      padding: 8px 12px;
      z-index: 10;
      min-width: 140px;
      z-index: 10 !important;
      //position: fixed;
      //top: auto;
      //right: -20px;

      .dropdown__option {
        display: flex;
        align-items: center;
        padding: 4px 0;
        font-weight: 500;
        font-size: 12px;
        line-height: 12px;
        letter-spacing: -0.01em;
        color: #353945;
        cursor: pointer;

        .notClose {
          margin-right: 6px;

          .icon {
            width: 18px !important;
            height: 18px !important;
          }
        }
      }
    }

    &.active {
      .dropDown__body {
        //position: inherit;
        //margin-right: 15px;
        //margin-top: 25px;
      }
    }
  }

  .simplebar-content {
    padding: 10px !important;
    padding-bottom: 0px !important;
  }

  .simplebar-track.simplebar-vertical {
    width: 8px;
  }

  .simplebar-content-wrapper {
    height: 100% !important;
  }

  &.active.multi {
    .select__header {
      .multiValueList {
        .multiValue {
        }
      }
    }

    .select__body {
      &__options__selected {
        .multiValueList {
          display: flex;
          flex-wrap: wrap;
          /* overflow: hidden; */

          .multiValue {
            display: flex;
            margin: 0 5px 5px 5px;
            border-radius: 2px 10px 10px 2px;
            padding: 2px 8px 2px 6px;
            position: relative;

            .drop-down-dots {
              animation: hideAnim 0ms forwards;
            }

            .exitBtn {
              animation: hideAnim 0ms forwards;
              /* overflow: hidden; */
              margin-left: 4px;
              border-radius: 2px 10px 10px 2px;
              position: absolute;
              right: 0;
              top: 2px;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 24px;

              .ui__icon__wrapper {
                width: 15px;
                border-radius: 2px 10px 10px 2px;
                margin-bottom: 1px;

                .icon {
                  background: #fcfcfd;
                  width: 17px !important;
                  height: 17px !important;
                }
              }

              &:after {
                content: "";
                width: 10px;
                height: 100%;
                position: absolute;
                top: 0;
                left: -10px;
                background: linear-gradient(to right, transparent, rgba(255, 255, 255, 1));
              }
            }

            &:hover {
              border-radius: 2px 10px 10px 2px;

              .exitBtn {
                animation: showAnim 0ms forwards;
                padding: 0 1px;
                padding-right: 3px;
              }

              .drop-down-dots {
                animation: showAnim 0ms forwards;
              }
            }
          }
        }
      }
    }
  }

  &.active {
    .select__body {
      animation: showAnim 0.1s forwards;
    }
  }
  ${({ position }) =>
    css`
      .select__body {
        position: fixed;
        width: ${position?.width}px;
        z-index: 99999;
      }
    `}
  ${({ position }) =>
    position?.top + 200 > window.innerHeight && window.innerHeight - position?.bottom < position?.top
      ? css`
          .select__body {
            bottom: ${window.innerHeight - position?.top + 10}px;
          }
        `
      : css`
          .select__body {
            top: ${position?.bottom}px;
          }
        `}
  ${({ position }) =>
    position?.left + position?.width < window.innerWidth
      ? css`
          .select__body {
            left: ${position?.left}px;
          }
        `
      : css`
          .select__body {
            right: ${window.innerWidth - position?.right}px;
          }
        `}
`;

const GlobalSelect = ({
  selectStateData: {
    optionsDisabled = false,
    optionsState = [],
    selected = [],
    searchValue = "",
    clickDelete = () => {},
    clickRename = () => {},
    clickChangeColor = () => {},
    createButtonHandling = () => {},
    undoSelected = () => {},
  },
  selectFirstData: {
    action = {},
    position = {},
    optionTitle = "",
    ignoreOption = false,
    viewSelectOption = false,
    defaultHideAnimation = false,
    name = "",

    options = [],
    defaultValue = {},
    disabledSomeOptions = [],
    searchPlaceholder = "Type to search...",
    onChangeKey = "value",
    valueKey = "value",
    // selected = [],
    labelKey = "label",
    // optionsDisabled = false,
    editable = true,
    isSearchable = true,
    isMulti = true,
    nullable = true,
    isFixed = false,
    otherDataForAction = {},
    MultiLabel = CustomMultiLabelComponent,
    CustomOption = CustomOptionsComponent,

    setOptionsState = () => {},
    inputOnChange = () => {},
    getActionValue = () => {},
    setSelected = () => {},
    onChange = () => {},
    setViewSelectOption = () => {},
    setSearchValue = () => {},
    onClose = () => {},
    ...props
  },
  setTemp,
}) => {
  const searchChange = useCallback(
    (e) => {
      const {
        target: { value },
      } = e;
      // set value for control in input
      setSearchValue(value);
      if (!optionsDisabled) {
        // search data

        let searchedOptions = value.length
          ? options.filter((val) => val[labelKey].toLocaleLowerCase().startsWith(value.toLocaleLowerCase()))
          : options;

        // set Options for showing display
        setOptionsState(searchedOptions);
        inputOnChange(e);
      }
    },
    [optionsDisabled, options, labelKey]
  );
  // SEARCH ENTER KEY HANDLING
  const handlingKye = (e) => {
    if (e.code === "Enter") {
      let {
        target: { value },
      } = e;
      e.preventDefault();
      createButtonHandling(value);
    }
  };

  const clickOutside = () => {
    if (viewSelectOption && isMulti) {
      handleClose();
      if (!isEmpty(selected) || defaultValue) {
        onClose([...selected.map((item) => item[valueKey])]);
      }
    } else if (viewSelectOption && !isMulti) {
      handleClose();
    }
  };

  // OPTIONS SELECT HANDLING
  const selectHandling = (val) => {
    let res =
      isArray(disabledSomeOptions) && !isNull(val)
        ? disabledSomeOptions.find((item) => get(item, valueKey, "") === val[valueKey])
        : [];

    if (editable && !optionsDisabled && (isNull(val) ? true : isNil(res))) {
      if (isMulti) {
        onChange([...selected.map((item) => item[valueKey]), val[valueKey]], selected);
        setSelected((s) => [...s, val]);
        // (selected.length === options.length - 1) && setViewSelectOption((state) => !state);
      } else {
        if (isNull(val)) {
          onChange("");
          handleClose();
          setSelected("");
          // setSelectedOption("");
          defaultValue && onClose(val);
        } else {
          onChange(get(val, onChangeKey, get(val, valueKey, "")), val);
          handleClose();
          setSelected(val);
          onClose(get(val, onChangeKey, get(val, valueKey, "")), val);
        }
      }
    }
  };

  const handleClose = () => {
    setViewSelectOption(false);
    setSearchValue("");
    setTemp({ viewSelectOption: false });
  };

  return (
    <Style
      action
      position={position}
      {...{
        ...props,
        action: action.create || action.edit || action.delete ? "true" : null,
        optionsDisabled: optionsDisabled ? "true" : "",
        active: viewSelectOption ? "active" : "",
        defaultHideAnimation,
        isFixed,
      }}
      className={`select ${viewSelectOption && "active"} ${isMulti && "multi"}`}
    >
      {viewSelectOption && (
        <OutsideClickHandler onOutsideClick={clickOutside}>
          <div className={`select__body`}>
            <SimpleBar className="select__body__options">
              {optionTitle && <div className="select__body__options__title">{optionTitle}</div>}
              {!isEmpty(selected) && (
                <div className="select__body__options__selected">
                  {isMulti && (
                    <MultiLabel
                      {...{
                        data: selected,
                        undo: undoSelected,
                        selected,
                        defaultValue,
                        options,
                        action,
                        editable,
                        clickDelete,
                        clickRename,
                        clickChangeColor,
                        isFixed,
                        valueKey,
                        labelKey,
                      }}
                    />
                  )}
                </div>
              )}

              {isSearchable && (
                <div className="select__body__options__search">
                  <input
                    type="text"
                    autoFocus={viewSelectOption}
                    ref={(inputElement) => inputElement && viewSelectOption && inputElement.focus()}
                    className="select__body__options__search__input"
                    placeholder={searchPlaceholder}
                    value={searchValue}
                    onChange={searchChange}
                    onKeyPress={handlingKye}
                  />
                </div>
              )}
              <CustomOption
                {...{
                  options: optionsState,
                  isMulti,
                  selectHandling,
                  selected,
                  action,
                  nullable,
                  clickDelete,
                  clickRename,
                  clickChangeColor,
                  searchValue,
                  isFixed,
                  disabledSomeOptions,
                  ignoreOption,
                  valueKey,
                  labelKey,
                }}
              />
              {action.create && isEmpty(optionsState) && !isEmpty(searchValue) && (
                <div className="select__body__options__footer" onClick={() => createButtonHandling(searchValue)}>
                  <div className="select__body__options__footer__button">+ create</div>
                </div>
              )}
            </SimpleBar>
          </div>
        </OutsideClickHandler>
      )}
    </Style>
  );
};

const mapStateToProps = (state, props) => {
  return {
    selectFirstData: getGlobalSelectData(state),
    selectStateData: getGlobalSelectStateData(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setTemp: (data) => {
      dispatch({
        type: ApiActions.SET_DATA_IN_GLOBAL_CONTEXT.REQUEST,
        payload: {
          data,
          storeName: "selectGlobalData",
        },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(GlobalSelect));
