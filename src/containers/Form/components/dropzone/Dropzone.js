import React, { useEffect, useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { get, head, last } from "lodash";
import { Col, Row } from "react-grid-system";
import { getDroppedOrSelectedFiles } from "html5-file-selector";
import Dropzone from "react-dropzone-uploader";
import Label from "../../../../components/elements/label";
import styled, { css } from "styled-components";
import errorImg from "../../../../assets/icons/error2.svg";
import "react-dropzone-uploader/dist/styles.css";

const Styled = styled.div`
  .form-dropzone-container {
    .dzu-dropzone {
      min-height: 40px;
      overflow: hidden;
      border: none;
    }

    .dzu-submitButtonContainer {
      display: none;
    }
  }
`;

const ImgContainer = styled.div`
  ${({ src }) =>
    src &&
    css`
      width: 200px;
      height: 230px;
      background: url(${src});
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    `}
`;

const CustomInput = ({ accept, onFiles, files, getFilesFromEvent, children = "", ...otherProps }) => {
  return (
    <label className="main__upload__label">
      <input
        style={{ display: "none" }}
        type="file"
        accept={accept}
        multiple
        onChange={(e) => {
          getFilesFromEvent(e).then((chosenFiles) => {
            onFiles(chosenFiles);
          });
        }}
      />
      {children}
    </label>
  );
};

const PreviewComponent = ({ meta = {}, ...otherProps }) => {
  // console.log(otherProps)
  return (
    <>
      <label className="main__upload__label">
        {get(meta, "type", "") === "image/jpeg" ||
        get(meta, "type", "") === "image/png" ||
        get(meta, "type", "") === "image/jpg" ? (
          <ImgContainer src={get(meta, "previewUrl", "")} />
        ) : (
          get(meta, "name", "")
        )}
      </label>
    </>
  );
};

export default function DropzoneComponent({
  register,
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
  maxLength = 524288,
  onChange = () => {},
  className = "",
  afterUploadViewFile = true,
  AfterUploadViewChild = (props) => <PreviewComponent {...props} extraProp={10} />,
  ...rest
}) {
  useEffect(() => {
    getValueFromField(getValues(name), name);
  }, [watch(name)]);

  const getFilesFromEvent = (e) => {
    return new Promise((resolve) => {
      getDroppedOrSelectedFiles(e).then((chosenFiles) => {
        resolve(chosenFiles.map((f) => f.fileObject));
      });
    });
  };

  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    if (status === "done") {
      setValue(name, file);
      onChange(file);
    }
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    // allFiles.forEach(f => f.remove())
  };

  let temp = { PreviewComponent: () => "" };
  if (afterUploadViewFile) {
    temp.PreviewComponent = (props) => <AfterUploadViewChild {...props} extraProp={10} />;
  }

  return (
    <Styled className={className}>
      <Row className={rowClassName}>
        {!hideLabel && (
          <Col xs={head(cols)}>
            <Label htmlFor={name} className="form-label">
              {label} {labelRequired && <span style={{ color: "red" }}>*</span>}
            </Label>
          </Col>
        )}
        <Col className={colClassName} xs={last(cols)}>
          <div className={`form-dropzone-container `}>
            <Dropzone
              {...register(name, params)}
              // LayoutComponent={Layout}
              // inputContent={get(rest, "children", "")}
              // "image/*,audio/*,video/*"
              {...{
                className: "form-dropzone",
                name,
                getUploadParams,
                onChangeStatus: handleChangeStatus,
                onSubmit: handleSubmit,
                InputComponent: (props) => <CustomInput {...props} children={get(rest, "children", "")} />,
                accept: get(property, "accept", "image/*"),
                maxFiles: get(property, "maxFiles", 1),
                getFilesFromEvent,
                ...temp,
              }}
            />
          </div>
          {!hideError && (
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ messages = `${label} is required` }) => {
                if ((errors[name].type = "required")) {
                  messages = `${label} is required`;
                }
                if ((errors[name].type = "pattern")) {
                  messages = `${label} is not valid`;
                }
                if ((errors[name].type = "manual")) {
                  messages = `${label} ${errors[name].message}`;
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
    </Styled>
  );
}
