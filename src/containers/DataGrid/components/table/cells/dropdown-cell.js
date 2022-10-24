import React, { memo, useEffect, useState } from "react";
import { get, isArray, isEmpty, isNull } from "lodash";
import styled from "styled-components";
import Select from "../../../../../components/elements/select/Select";
import { getSelectOptionsListFromData } from "../../../../../utils";
import { toast } from "react-toastify";
import ApiActions from "../../../../../services/api/actions";
import { connect } from "react-redux";
import SelectForGlobal from "components/elements/select/SelectForGlobal";

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

        .multiValueList {
          flex-wrap: nowrap;

          .multiValue {
          }
        }
      }
    }
  }
`;

const DropdownCell = ({
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
  setTemp,
  tempData,
  ...rest
}) => {
  const [options, setOptions] = useState();

  useEffect(() => {
    setOptions([...getSelectOptionsListFromData(get(typeConfig, "options", []), "id", "name", "other")]);
  }, [typeConfig]);

  const getActionValue = (values) => {
    let options = getSelectOptionsListFromData(get(values, "options", []), "id", "name", "other");
    setTemp({ item: options, storeName: id });
  };
  let boardHeader = get(typeConfig, "boardHeader", false);

  const handleEnter = (value) => {
    let isHaveIn = false;
    if (isMulti) {
      if (isArray(initialValue) && isArray(value)) {
        if (value.length === initialValue.length) {
          isHaveIn = initialValue.every((item) => value.some((item2) => item2 === item));
        }

        if (isMulti ? !isHaveIn : value != initialValue) {
          setLoading(true);
          let requestData = boardHeader
            ? {
                id: rowId,
                // viewId,
                url: "sales/v1/lead-view/change-status",
                attributes: { [id]: isEmpty(value) ? null : value },
                cb: {
                  success: () => {
                    setLoading(false);
                    toast.success("SUCCESSFULLY UPDATED");
                  },
                  fail: () => {
                    setLoading(false);
                  },
                },
              }
            : {
                id: rowId,
                // viewId,
                attributes: { [id]: isEmpty(value) ? null : value },
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
      }
    }
  };

  const getOptions = () => (!tempData[id] ? options : tempData[id]);
  return (
    <Style>
      <Select
        {...{
          className: "h-100",
          onChange: handleEnter,
          onClose: handleEnter,
          defaultValue: initialValue,
          action: get(typeConfig, "action", {}),
          // options: get(tempData, id, []),
          options: getOptions(),
          isMulti,
          isChangeDefaultValue: false,
          CustomIcon: () => "",
          placeholder: "",
          maxShowSelected: 9999,
          otherDataForAction: { customFieldId: id },
          getActionValue,
          hideRemoveIcon: true,
          defaultHideAnimation: false,
          editable,
          isFixed: true,
        }}
      />
    </Style>
  );
};

const mapStateToProps = (state) => {
  return {
    tempData: get(state, "api", {}),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTemp: ({ item, storeName }) => {
      dispatch({
        type: ApiActions.TEMP_DATA.REQUEST,
        payload: {
          item,
          storeName,
        },
      });
    },
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(memo(DropdownCell));
export default connect(mapStateToProps, mapDispatchToProps)(memo(DropdownCell));
