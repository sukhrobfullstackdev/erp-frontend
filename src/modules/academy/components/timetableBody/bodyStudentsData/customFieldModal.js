import React, { useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import AddColumn from "../../../../../components/addColumn";
import { TYPES } from "../../../../../containers/DataGrid/types";
import { connect } from "react-redux";
import ApiActions from "../../../../../services/api/actions";
import Icon from "../../../../../components/elements/icon";
import FormDemo from "containers/Form/form-demo";
import Field from "../../../../../containers/Form/field";
import { get, head, isArray, isBoolean, isEmpty, isNull, isNumber, isString, toLower } from "lodash";
import Dropdown from "../../../../../components/elements/dropDown";
import { getSelectOptionsListFromData } from "utils";
import Button from "components/elements/button";
import { toast } from "react-toastify";

const modalRoot = document.getElementById("modal-root");

const Styled = styled.div`
  ${({ hideField }) =>
    hideField &&
    css`
      .rows {
        height: 0;
        overflow: hidden;
      }
      .arrowIcon {
        transform: rotate(270deg) !important;
      }
    `}
`;

const CustomFieldModal = ({
  onClose,
  addCustomFieldColumn,
  ids,
  getCustomField,
  addAllCustomField,
  url,
  getUrl,
  customFieldUrl,
}) => {
  const [state, setState] = useState({
    hideField: false,
    addField: false,
    insideModal: false,
    updated: false,
    customFields: {},
    addedField: [],
  });

  useEffect(() => {
    !isNull(ids) &&
      getCustomField({
        ids,
        getUrl,
        cb: {
          success: (res) => {
            setState((state) => ({
              ...state,
              customFields: get(res, "data", []),
            }));
          },
          fail: (res) => "",
        },
      });
  }, [ids]);

  const addCustomField = ({ data, name }) => {
    addCustomFieldColumn({
      customFieldUrl,
      attributes: data,
      formMethods: {},
      cb: {
        success: (res) => {
          console.log(res);
          setState((state) => ({
            ...state,
            customFields: [...state.customFields, res.data],
            addedField: [get(res, "data.dropDowns")],
          }));
        },
        fail: (e) => "",
      },
    });
  };

  const hideFieldClick = () => {
    setState((s) => ({ ...s, hideField: !s.hideField }));
  };

  const addField = () => {
    setState((s) => ({ ...s, insideModal: !state.insideModal }));
  };

  const cancelColumn = () => {
    setState((state) => ({ ...state, insideModal: false }));
  };

  const submitHandling = ({ data }) => {
    console.log(data);
    let customFieldIds = Object.keys(data);
    customFieldIds = customFieldIds.map((item) => ({
      value: isBoolean(data[item])
        ? data[item]
        : isNumber(data[item])
        ? data[item]
        : !isEmpty(data[item])
        ? data[item].replaceAll(",", "")
        : null,
      customFieldId: item,
      needless: false,
      ownerId: ids,
    }));

    addAllCustomField({
      ids,
      attributes: customFieldIds,
      url,
      cb: {
        success: (res) => {
          toast.success(res.message);
          setState((s) => ({ ...s, customFields: res.data }));
          onClose();
        },
        fail: (e) => "",
      },
    });
  };

  return (
    <Styled hideField={state.hideField}>
      <FormDemo formRequest={submitHandling}>
        <div className="wrapper">
          <div className="rows">
            {isArray(state.customFields) &&
              state.customFields.map((val, ind) => {
                if (val.type === "DROPDOWN") {
                  return (
                    <div className="firstRow" key={val.id}>
                      <div className="iconTd">
                        <Icon
                          icon={`icon-${toLower(val.type)}`}
                          style={{
                            marginTop: "0px",
                            paddingRight: "8px",
                          }}
                          color="#777E91"
                        />{" "}
                        {val.name}
                      </div>
                      <div className="desc">
                        <Field
                          hideLabel
                          placeholder={"Interested Course"}
                          multi
                          defaultValue={head(get(state.customFields[ind], "value"))}
                          type="custom-select"
                          options={get(state.customFields[ind].typeConfig, "options", [])}
                          name={`${state.customFields[ind].id}`}
                          valueKey={"id"}
                          labelKey={"name"}
                          nullable={false}
                        />
                      </div>
                    </div>
                  );
                }
                if (val.type === "CHECKBOX") {
                  return (
                    <div className="firstRow" key={val.id}>
                      <div className="iconTd">
                        <Icon
                          icon={`icon-${toLower(val.type)}`}
                          style={{
                            marginTop: "0px",
                            paddingRight: "8px",
                          }}
                          color="#777E91"
                        />
                        {val.name}
                      </div>
                      <div className="desc">
                        <Field
                          hideLabel
                          name={`${state.customFields[ind].id}`}
                          type={"checkbox"}
                          defaultValue={state.customFields[ind].value}
                        />
                      </div>
                    </div>
                  );
                }
                if (val.type === "RATING") {
                  return (
                    <div className="firstRow" key={val.id}>
                      <div className="iconTd">
                        <Icon
                          icon={`icon-${toLower(val.type)}`}
                          style={{
                            marginTop: "0px",
                            paddingRight: "8px",
                          }}
                          color="#777E91"
                        />{" "}
                        {val.name}
                      </div>
                      <div className="desc">
                        <Field
                          hideLabel
                          type={"rating-input"}
                          isEditable={true}
                          defaultValue={state.customFields[ind].value}
                          name={`${state.customFields[ind].id}`}
                          typeConfig={get(state.customFields[ind], "typeConfig")}
                        />
                      </div>
                    </div>
                  );
                }
                if (val.type === "LONG_TEXT") {
                  return (
                    <div className="firstRow" key={val.id}>
                      <div className="iconTd">
                        <Icon
                          icon={`icon-${toLower(val.type)}`}
                          style={{
                            marginTop: "0px",
                            paddingRight: "8px",
                          }}
                          color="#777E91"
                        />{" "}
                        {val.name}
                      </div>
                      <div className="desc">
                        <Field
                          hideLabel
                          resposive
                          type={"textarea"}
                          name={`${state.customFields[ind].id}`}
                          defaultValue={state.customFields[ind].value}
                        />
                      </div>
                    </div>
                  );
                }
                if (val.type === "SHORT_TEXT")
                  return (
                    <div className="firstRow" key={val.id}>
                      <div className="iconTd">
                        <Icon
                          icon={`icon-${toLower(val.type)}`}
                          style={{
                            marginTop: "0px",
                            paddingRight: "8px",
                          }}
                          color="#777E91"
                        />{" "}
                        {val.name}
                      </div>
                      <div className="desc">
                        <Field
                          hideLabel
                          type={"input"}
                          name={`${state.customFields[ind].id}`}
                          defaultValue={state.customFields[ind].value}
                        />
                      </div>
                    </div>
                  );

                if (val.type === "DATE") {
                  return (
                    <div className="firstRow" key={val.id}>
                      <div className="iconTd">
                        <Icon
                          icon={`icon-${toLower(val.type)}`}
                          style={{
                            marginTop: "0px",
                            paddingRight: "8px",
                          }}
                          color="#777E91"
                        />{" "}
                        {val.name}
                      </div>
                      <div className="desc">
                        <Field
                          hideLabel
                          name={`${state.customFields[ind].id}`}
                          type={"custom-datepicker"}
                          defaultValue={state.customFields[ind].value ? new Date(state.customFields[ind].value).getTime() : ""}
                        />
                      </div>
                    </div>
                  );
                }
                if (val.type === "LABELS") {
                  return (
                    <div className="firstRow" key={val.id}>
                      <div className="iconTd">
                        <Icon
                          icon={`icon-${toLower(val.type)}`}
                          style={{
                            marginTop: "0px",
                            paddingRight: "8px",
                          }}
                          color="#777E91"
                        />{" "}
                        {val.name}
                      </div>
                      <div className="desc">
                        <Field
                          hideLabel
                          defaultValue={get(state.customFields[ind], "value")}
                          isMulti
                          placeholder={"Interested Course"}
                          type="custom-select"
                          options={getSelectOptionsListFromData(
                            get(state.customFields[ind].typeConfig, "options", []),
                            "id",
                            "name",
                            "other"
                          )}
                          name={`${state.customFields[ind].id}`}
                        />
                      </div>
                    </div>
                  );
                }
                if (val.type === "EMAIL") {
                  return (
                    <div className="firstRow" key={val.id}>
                      <div className="iconTd">
                        <Icon
                          icon={`icon-${toLower(val.type)}`}
                          style={{
                            marginTop: "0px",
                            paddingRight: "8px",
                          }}
                          color="#777E91"
                        />{" "}
                        {val.name}
                      </div>
                      <div className="desc">
                        <Field
                          hideLabel
                          type={"input"}
                          property={{ type: "email" }}
                          name={`${state.customFields[ind].id}`}
                          defaultValue={state.customFields[ind].value}
                        />
                      </div>
                    </div>
                  );
                }
                if (val.type === "MONEY") {
                  return (
                    <div className="firstRow" key={val.id}>
                      <div className="iconTd">
                        <Icon
                          icon={`icon-${toLower(val.type)}`}
                          style={{
                            marginTop: "0px",
                            paddingRight: "8px",
                          }}
                          color="#777E91"
                        />{" "}
                        {val.name}
                      </div>
                      <div className="desc">
                        <Field
                          hideLabel
                          type={"input"}
                          name={`${state.customFields[ind].id}`}
                          property={{ type: "money" }}
                          defaultValue={state.customFields[ind].value}
                        />
                      </div>
                    </div>
                  );
                }
                if (val.type === "NUMBER") {
                  return (
                    <div className="firstRow" key={val.id}>
                      <div className="iconTd">
                        <Icon
                          icon={`icon-${toLower(val.type)}`}
                          style={{
                            marginTop: "0px",
                            paddingRight: "8px",
                          }}
                          color="#777E91"
                        />{" "}
                        {val.name}
                      </div>
                      <div className="desc">
                        <Field
                          hideLabel
                          maxLength={15}
                          type={"input"}
                          name={`${state.customFields[ind].id}`}
                          property={{ type: "money" }}
                          defaultValue={state.customFields[ind].value}
                          onKeyDown={(e) => {
                            e.preverDefault();
                          }}
                          onKeyUp={(e) => {
                            e.preverDefault();
                          }}
                          onKeyPress={(e) => {
                            e.preverDefault();
                          }}
                        />
                      </div>
                    </div>
                  );
                }
                if (val.type === "PHONE") {
                  return (
                    <div className="firstRow" key={val.id}>
                      <div className="iconTd">
                        <Icon
                          icon={`icon-${toLower(val.type)}`}
                          style={{
                            marginTop: "0px",
                            paddingRight: "8px",
                          }}
                          color="#777E91"
                        />{" "}
                        {val.name}
                      </div>
                      <div className="desc">
                        <Field
                          hideLabel
                          type={"input"}
                          name={`${state.customFields[ind].id}`}
                          property={{ type: "tel" }}
                          defaultValue={state.customFields[ind].value}
                        />
                      </div>
                    </div>
                  );
                }
                if (val.type === "FILES") {
                  return (
                    <div className="firstRow" key={val.id}>
                      <div className="iconTd">
                        <Icon
                          icon={`icon-${toLower(val.type)}`}
                          style={{
                            marginTop: "0px",
                            paddingRight: "8px",
                          }}
                          color="#777E91"
                        />{" "}
                        {val.name}{" "}
                      </div>
                      <div className="desc">
                        <Field
                          type={"multi-file"}
                          initialValue={state.customFields[ind].value}
                          fieldId={state.customFields[ind].id}
                          editable={true}
                          typeConfig={get(state.customFields[ind], "typeConfig")}
                        />
                      </div>
                    </div>
                  );
                }
                if (val.type === "TREE") {
                  return (
                    <div className="firstRow" key={val.id}>
                      <div className="iconTd">
                        <Icon
                          icon={`icon-${toLower(val.type)}`}
                          style={{
                            marginTop: "0px",
                            paddingRight: "8px",
                          }}
                          color="#777E91"
                        />{" "}
                        {val.name}{" "}
                      </div>
                      <div className="desc">
                        <Field
                          type={"tree"}
                          defaultValue={get(state.customFields[ind], "value")}
                          // initialValue={state.customFields[ind].value}
                          options={getSelectOptionsListFromData(
                            get(state.customFields[ind].typeConfig, "options", []),
                            "id",
                            "name",
                            "other"
                          )}
                          fieldId={state.customFields[ind].id}
                          editable={true}
                          name={`${state.customFields[ind].id}`}
                          typeConfig={get(state.customFields[ind], "typeConfig")}
                        />
                      </div>
                    </div>
                  );
                } else return <span>undefined {val.type} type</span>;
              })}
          </div>
          <div className="footer">
            <div className="hideField" onClick={hideFieldClick}>
              <Icon className="arrowIcon" icon="icon-left-arrow" /> Hide empty fields
            </div>
            <div className="addField hideField" onClick={addField}>
              + Add or edit fields
            </div>
          </div>
        </div>

        <div className="footerButtons">
          <Button outlineDanger onCLick={onClose}>
            Cancel
          </Button>
          <Button type={"submit"} success>
            Save
          </Button>
        </div>
      </FormDemo>
      <Dropdown
        className="columnDropDown"
        active={state.insideModal}
        onClose={() => setState((state) => ({ ...state, insideModal: false }))}
      >
        <AddColumn TYPES={TYPES} addCustomField={addCustomField} cancel={cancelColumn} />
      </Dropdown>
    </Styled>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCustomFieldColumn: ({ attributes, formMethods, cb, customFieldUrl }) => {
      dispatch({
        type: ApiActions.REQUEST.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          method: "post",
          url: `${customFieldUrl}`,
        },
      });
    },
    getCustomField: ({ cb, ids, getUrl }) => {
      dispatch({
        type: ApiActions.REQUEST.REQUEST,
        payload: {
          method: "get",
          cb,
          url: `${getUrl}${ids}`,
        },
      });
    },
    addAllCustomField: ({ attributes, formMethods, cb, ids, url }) => {
      dispatch({
        type: ApiActions.REQUEST.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          method: "post",
          url: `${url}${ids}`,
        },
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(CustomFieldModal);
