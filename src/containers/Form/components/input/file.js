import React, { memo, useEffect, useRef, useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { get, head, last, includes } from "lodash";
import { Col, Row } from "react-grid-system";
import Label from "../../../../components/elements/label";
import styled from "styled-components";
import errorImg from "../../../../assets/icons/error2.svg";
import { connect } from "react-redux";
import SettingsActions from "../../../../modules/settings/actions";
const StyledInput = styled.div`
  .custom-file-input {
    width: 0 !important;

    &::-webkit-file-upload-button {
      visibility: hidden;
    }

    &::before {
      content: " ";
      display: inline-block;
      background: none;
      outline: none;
      white-space: nowrap;
      -webkit-user-select: none;
      cursor: pointer;
      font-size: 0pt;
    }
  }
  .children {
    cursor: pointer;
  }
  .disabled .children {
    background-color: #fcfcfd !important;
    .uploadText {
      color: #b1b5c4 !important;
    }
  }
`;

const File = ({
  register,
  disabled = false,
  name,
  errors,
  params,
  property,
  defaultValue,
  getValues,
  watch,
  hideLabel,
  label,
  setValue,
  getValueFromField = () => {},
  colClassName = "",
  rowClassName = "",
  hideError = false,
  cols = [12, 12],
  labelRequired,
  defaultColor,
  placeholder,
  onChange = () => "",
  children,
  ...rest
}) => {
  const [data, setData] = useState({
    value: undefined,
    isEditable: false,
  });

  const ref = useRef();

  useEffect(() => {
    getValueFromField(getValues(name), name);
    if (getValues(name) == undefined) setValue(name, defaultValue);
  }, [watch(name)]);

  // useEffect(() => {
  //     if (getValues(name) === '' || getValues(name) !== defaultValue) setValue(name, defaultValue);
  // }, [defaultValue]);
  //
  // useEffect(() => {
  //     if (defaultColor === undefined || color === undefined || color !== defaultColor) setColor(defaultColor);
  // }, [defaultColor]);

  const onChangeHandling = (e) => {
    let file = head(e.target.files);
    onChange(file);
    setValue(name, file);
    setData((s) => ({ ...s, focus: false, value: file }));

    // const formData = new FormData();
    // formData.append('file', file);

    // fileUpload({
    //     attributes: formData, formMethods: {
    //         setLoading: () => {
    //         }
    //     }, cb: {
    //         success: (res) => {
    //             let getId = isArray(initialValue) ? [...initialValue, ...data.ids, res.id] : isString(initialValue) ? [initialValue, ...data.ids, res.id] : [...data.ids, res.id];
    //             let temp = {
    //                 id: rowId,
    //                 viewId,
    //                 attributes: {[id]: getId},
    //                 isChangeListState: false,
    //                 cb: {
    //                     success: () => {
    //                         setLoading(false);
    //                         toast.success('SUCCESSFULLY UPDATED')
    //                     }, fail: () => {
    //                         setLoading(false);
    //                     }
    //                 }
    //             };
    //             updateItemRequest(temp);
    //             setData(s => ({...s, ids: [...s.ids, res.id]}));
    //         }
    //     }
    // })
  };

  return (
    <StyledInput
      {...{
        ...rest,
      }}
    >
      <Row className={rowClassName}>
        {!hideLabel && (
          <Col xs={head(cols)}>
            <Label htmlFor={name} className="form-label">
              {label} {labelRequired && <span style={{ color: "red" }}>*</span>}
            </Label>
          </Col>
        )}
        <Col className={colClassName} xs={last(cols)}>
          <div className={`form-input-file-container ${disabled && "disabled"}`}>
            <input
              type={"file"}
              onChange={onChangeHandling}
              className="custom-file-input"
              placeholder={""}
              ref={ref}
              value={""}
            />
            <div
              className={"children"}
              onClick={() => {
                if (!disabled) {
                  ref.current?.click();
                  setData((s) => ({ ...s, focus: true }));
                }
              }}
            >
              {children}
            </div>
          </div>
          {!hideError && (
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ messages = `${label} is required` }) => {
                let isThereDot = includes(name, ".");
                if (isThereDot) {
                  if (get(errors, `${name}.type`) == "required") {
                    messages = `${label} is required`;
                  }
                  if (get(errors, `${name}.type`) == "pattern") {
                    messages = `${label} is not valid`;
                  }
                  if (get(errors, `${name}.type`) == "manual") {
                    messages = `${label} ${errors[name].message}`;
                  }
                } else {
                  if (errors[name].type == "required") {
                    messages = `${label} is required`;
                  }
                  if (errors[name].type == "pattern") {
                    messages = `${label} is not valid`;
                  }
                  if (errors[name].type == "manual") {
                    messages = `${label} ${errors[name].message}`;
                  }
                }
                return (
                  <small className="form-error-message">
                    <img src={errorImg} alt="" /> {messages}
                  </small>
                );
              }}
            />
          )}
        </Col>
      </Row>
    </StyledInput>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fileUpload: ({ attributes, formMethods = {}, cb }) => {
      dispatch({
        type: SettingsActions.FILE_UPLOAD.REQUEST,
        payload: { attributes, formMethods, cb },
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(memo(File));
