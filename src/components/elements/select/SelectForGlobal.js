import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { get, head, isArray, isEmpty, isEqual, isNil, isNull, isNumber, set } from "lodash";
import { colors } from "mock/colors";
import { SelectStyled } from "./selectStyled";
import { getSelectOptionsListFromData } from "../../../utils";
import { connect } from "react-redux";
import { default as ApiActionsGlobal } from "../../../services/globalContextMenu/actions";
import ApiActions from "../../../services/api/actions";
import CustomActionDropDownn from "./components/CustomActionDropDown";
import CustomMultiLabelComponent from "./components/CustomMultiLabel";
import CustomOptionsComponent from "./components/CustomOptions";
import CustomHeaderComponent from "./components/CustomHeader";
import CustomIconComponent from "./components/CustomIcon";

const SelectForGlobal = ({
  checked,
  error,
  onChange = () => {},
  inputOnChange = () => "",
  getActionValue = () => "",
  onClose = () => "",

  options = [],
  headerTitle,
  childClassNames = [],
  defaultValue = {},
  action = {},
  disabledSomeOptions = [],
  ignoreOption = {},

  otherDataForAction = "",
  maxShowSelected = 2,
  value = "",
  optionTitle = "",
  placeholder = "Select",
  searchPlaceholder = "Type to search...",
  name = "",
  className = "",
  onChangeKey = "value",
  valueKey = "value",
  labelKey = "label",

  editable = true,
  disabled = false,
  isSearchable = true,
  isMulti = false,
  isClearAll = false,
  nullable = true,
  isChangeDefaultValue = true,
  hideRemoveIcon = false,
  defaultHideAnimation = true,
  isFixed = false,

  CustomActionDropDown = CustomActionDropDownn,
  MultiLabel = CustomMultiLabelComponent,
  CustomOption = CustomOptionsComponent,
  CustomHeader = CustomHeaderComponent,
  CustomIcon = CustomIconComponent,

  actionOptions,
  setTemp,
  ...props
}) => {
  const [viewSelectOption, setViewSelectOption] = useState(false);
  const [optionsState, setOptionsState] = useState([]);
  const [selected, setSelected] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [optionsDisabled, setOptionsDisabled] = useState(false);
  const [colorPicker, setColorPicker] = useState(false);

  const selectHeaderRef = useRef(null);

  useEffect(() => {
    if (!isEqual(options, optionsState)) {
      setOptionsState(options);
    }
  }, [options]);

  useEffect(() => {
    if (isMulti) {
      if (!isEmpty(defaultValue) && !isNull(defaultValue)) {
        isChangeDefaultValue && onChange([...defaultValue], defaultValue);
        setSelected(options.filter((val) => !!defaultValue?.find((i) => i == get(val, valueKey))));
      } else if (isNull(defaultValue)) {
        setSelected([]);
        setOptionsState([]);
      }
    } else if (!isEmpty(defaultValue) || isNumber(defaultValue)) {
      let value = options.find((i) => i[valueKey] == (isArray(defaultValue) ? head(defaultValue) : defaultValue));
      if (!value) value = optionsState.find((i) => i[valueKey] == (isArray(defaultValue) ? head(defaultValue) : defaultValue));

      isChangeDefaultValue && onChange(get(value, valueKey, null), value);
      setSelected(value ?? "");
    }
  }, [defaultValue, options]);

  // OPTIONS SELECT HANDLING
  const selectHandling = useCallback(
    (val) => {
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
            setViewSelectOption((state) => !state);
            setSelected("");
            defaultValue && onClose(val);
          } else {
            onChange(get(val, onChangeKey, get(val, valueKey, "")), val);
            setViewSelectOption((state) => !state);
            setSelected(val);
            onClose(get(val, onChangeKey, get(val, valueKey, "")), val);
          }
        }
      }
    },
    [disabledSomeOptions, editable, optionsDisabled, isMulti, selected, defaultValue, onChangeKey, valueKey]
  );


  // UNDO FOR X ICONS IN MULTI SELECT
  const undoSelected = useCallback(
    (index) => {
      if (editable) {
        selected.splice(index, 1);
        if (isMulti) {
          setSelected([...selected]);
          onChange(
            selected.map((it) => it[valueKey]),
            selected
          );
        } else {
          setSelected({ ...selected });
          onChange(selected);
        }
      }
    },
    [editable, selected, isMulti, valueKey]
  );

  // CLEAR ALL
  const clearAll = useCallback(() => {
    if (isClearAll) {
      onChange([]);
      setSelected([]);
    }
  }, [isClearAll]);

  const createButtonHandling = useCallback(
    (value) => {
      value = value.trim();
      options = options.filter((val) => val[labelKey].toLocaleLowerCase() === value.toLocaleLowerCase());
      if (isEmpty(options) && get(action, "create", false) && !optionsDisabled && !isEmpty(value)) {
        actionOptions({
          attributes: {
            name: value,
            method: "CREATE",
            colorCode: colors[Math.floor(Math.random() * colors.length)],
            ...otherDataForAction,
          },
          formMethods: {},
          url: action.url,
          cb: {
            success: (normalizeData, res) => {
              let options = get(res, "data", []);
              getActionValue({ options, name });
              if (!isEmpty(options)) {
                options = getSelectOptionsListFromData(options, "id", "name");
                setOptionsState(options);
              }
            },
            fail: (res) => {},
          },
        });
        setSearchValue("");
        setOptionsDisabled(false);
      }
      if (get(action, "edit", false) && optionsDisabled && !isEmpty(value)) {
        actionOptions({
          attributes: {
            name: value,
            id: optionsDisabled,
            method: "EDIT",
            ...otherDataForAction,
          },
          formMethods: {},
          url: action.url,
          cb: {
            success: (normalizeData, res) => {
              let options = get(res, "data", []);
              getActionValue({ options, name });
              if (!isEmpty(options)) {
                options = getSelectOptionsListFromData(options, "id", "name");
                setOptionsState(options);
              }
            },
            fail: (res) => {},
          },
        });
        setSearchValue("");
        setOptionsDisabled(false);
      }
    },
    [options, labelKey, action, optionsDisabled, colors, otherDataForAction, name]
  );

  let clickDelete = useCallback(
    ({ optionsIndex, selectedIndex }) => {
      if (isNumber(optionsIndex)) {
        let value = options[optionsIndex];
        if (value) {
          actionOptions({
            attributes: {
              ...value,
              id: value[valueKey],
              name: value[labelKey],
              method: "DELETE",
              ...otherDataForAction,
            },
            formMethods: {},
            url: action.url,
            cb: {
              success: (normalizeData, res) => {
                let options = get(res, "data", []);
                getActionValue({ options, name });
                if (!isEmpty(options)) {
                  options = getSelectOptionsListFromData(options, "id", "name");
                  setOptionsState(options);
                }
              },
              fail: (res) => {},
            },
          });
        }
      } else if (isNumber(selectedIndex)) {
        //  this place for multi select
      }
    },
    [options, valueKey, labelKey, action]
  );

  let clickRename = useCallback(
    ({ optionsIndex, selectedIndex }) => {
      if (isNumber(optionsIndex)) {
        let value = options[optionsIndex];
        setOptionsDisabled(value[valueKey]);
        setSearchValue(value[labelKey]);
      } else if (isNumber(selectedIndex)) {
        //  this place for multi select
      }
    },
    [options, valueKey, labelKey]
  );

  let clickChangeColor = useCallback(({ optionsIndex, selectedIndex }) => {
    setColorPicker((s) => !s);
  }, []);

  // END API

  const clickHeader = useCallback(
    (e) => {
      if (!disabled) {
        setViewSelectOption((e) => !e);
        handleSubmit(e);
      }
    },
    [disabled]
  );

  const handleSubmit = (e) => {
    const data = {
      action,
      position: selectHeaderRef.current && selectHeaderRef.current.getBoundingClientRect(),
      optionTitle,
      ignoreOption,
      viewSelectOption: true,

      options,
      defaultValue,
      disabledSomeOptions,
      searchPlaceholder,
      onChangeKey,
      valueKey,
      labelKey,
      optionsDisabled,
      editable,
      isSearchable,
      isMulti,
      nullable,
      isFixed,
      MultiLabel,
      CustomOption,
      name,
      actionOptions,

      onChange,
      setSelected,
      setSearchValue,
      setOptionsState,
      getActionValue,
      inputOnChange,

      setViewSelectOption,
      onClose,
      ...props,
    };
    setTemp(data, "selectGlobalData");
  };

  useEffect(() => {
    if (viewSelectOption) {
      setTemp(
        {
          optionsState,
          optionsDisabled,
          searchValue,
          selected,

          clickDelete,
          clickRename,
          clickChangeColor,
          createButtonHandling,
          undoSelected,
        },
        "selectGlobalStateData"
      );
    }
  }, [optionsState, options, optionsDisabled, viewSelectOption, selected, searchValue]);

  return (
    <SelectStyled
      {...{
        ...props,
        action: action.create || action.edit || action.delete ? "true" : null,
        optionsDisabled: optionsDisabled ? "true" : "",
        active: viewSelectOption ? "active" : "",
        checked: checked ? checked : "",
        error: error ? "error" : "",
        className,
        defaultHideAnimation,
        isFixed,
      }}
    >
      <div className={`select ${viewSelectOption && "active"} ${isMulti && "multi"}`}>
        <div ref={selectHeaderRef} className={`select__header ${!isMulti && !isEmpty(selected) && "optionSelected"}`}>
          <CustomHeader
            {...{
              value,
              isMulti,
              undo: undoSelected,
              maxShowSelected,
              selected,
              defaultValue,
              placeholder,
              CustomIcon,
              options,
              headerTitle,

              action,
              editable,
              isClearAll,
              clearAll,
              clickHeader,
              hideRemoveIcon,
              isFixed,
              clickDelete,
              clickRename,
              clickChangeColor,
              valueKey,
              labelKey,
            }}
          />
        </div>
      </div>
    </SelectStyled>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    actionOptions: ({ attributes, formMethods, cb, url }) => {
      dispatch({
        type: ApiActions.OPERATION_ADD.SUCCESS,
        payload: {
          attributes,
          formMethods,
          cb,
          url,
          isChangeListState: false,
        },
      });
    },
    setTemp: (data, storeName) => {
      dispatch({
        type: ApiActionsGlobal.SET_DATA_IN_GLOBAL_CONTEXT.REQUEST,
        payload: {
          data: data,
          storeName: storeName,
        },
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(memo(SelectForGlobal));
