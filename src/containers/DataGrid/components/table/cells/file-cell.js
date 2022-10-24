import React, { memo, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { toast } from "react-toastify";
import { withTranslation } from "react-i18next";
import { get, head, isArray, isEmpty, isNull, isString } from "lodash";
import { connect } from "react-redux";
import Icon from "../../../../../components/elements/icon";
import Dropdown from "../../../../../components/elements/dropDown/dropdown";
import plusImg from "../../../../../assets/icons/plus.svg";
import SettingsActions from "../../../../../modules/settings/actions";
import ApiActions from "../../../../../services/api/actions";
import CustomPlayer from "../../../../../components/customPlayer/customPlayer";

import playImg from "../../../../../assets/icons/play.svg";

const Styled = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px;

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

  .row {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    cursor: pointer;

    .ui__icon__wrapper {
      margin-right: 5px;
    }
  }

  .audio-container {
    overflow: hidden;

    .audio {
      height: 25px;
      background-color: rgba(240, 240, 240, 1);
      border-radius: 4px;

      &::-webkit-media-controls-panel {
        background-color: rgba(240, 240, 240, 1);
      }
    }
  }
`;

const Img = styled.div`
  ${({ src }) =>
    src &&
    css`
      width: 30px;
      height: 22px;
      border-radius: 4px;
      margin: 0 3px;
      background: url("${src}") no-repeat center;
      background-size: cover;
      cursor: pointer;
    `}
`;

const FileCell = ({
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
  fileUpload,
  setTemp,
  customField,
  ...rest
}) => {
  const [data, setData] = useState({
    value: [],
    isEditable: false,
    valid: true,
    focus: false,
    showFile: false,
    file: { value: "", type: "" },
    ids: [],
  });

  let format = get(typeConfig, "attachmentConfig.format", null);
  let url = get(typeConfig, "attachmentConfig.url", null);

  const ref = useRef();

  const clickFile = (item, type) => {
    let url = `${get(typeConfig, "attachmentConfig.url", "")}?id=${item}`;
    let values = [...(isNull(initialValue) ? [] : initialValue), ...data.ids].filter((i) => i !== item);

    if (isString(item) && type === "img") {
      let ModalBody = ({ type, value }) => type === "url" && <img src={value} alt={value} className={"img"} />;

      setTemp({
        item: {
          active: true,
          Children: ModalBody,
          props: {
            value: item.startsWith("blob:http") ? item : url,
            type: "url",
          },
          deleteItem: () => {
            setLoading(true);
            updateItemRequest({
              id: rowId,
              viewId,
              attributes: {
                [id]: isEmpty(values) ? null : values,
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
          },
        },
        storeName: "modalData",
      });
    } else if ((isString(item), item.includes("pdf"))) {
      let ModalBody = ({ type, value }) =>
        type === "url" && (
          <object data={`${value}&view=open`} type="application/pdf" width="100%" height="720px">
            <p>
              Alternative text - include a link <a href={`${value}&view=open`}>to the PDF!</a>
            </p>
          </object>
        );
      //    height: 710px;
      setTemp({
        item: {
          active: true,
          Children: ModalBody,
          props: {
            value: item.startsWith("blob:http") ? item : url,
            type: "url",
          },
          deleteItem: () => {
            setLoading(true);
            updateItemRequest({
              id: rowId,
              viewId,
              attributes: {
                [id]: isEmpty(values) ? null : values,
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
          },
        },
        storeName: "modalData",
      });
    } else {
      console.log("this is not string", item);
    }
  };

  const onChange = (e) => {
    let file = head(e.target.files);
    let temp = "";

    if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/svg+xml")
      temp = URL.createObjectURL(file);
    else temp = file;

    setData((s) => ({ ...s, focus: false, value: [...s.value, temp] }));

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    fileUpload({
      attributes: formData,
      formMethods: {
        setLoading: () => {},
      },
      cb: {
        success: (res) => {
          let getId = isArray(initialValue)
            ? [...initialValue, ...data.ids, res.id]
            : isString(initialValue)
            ? [initialValue, ...data.ids, res.id]
            : [...data.ids, res.id];
          let temp = {
            id: rowId,
            // viewId,
            attributes: { [id]: getId },
            isChangeListState: false,
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
          updateItemRequest(temp);
          setData((s) => ({ ...s, ids: [...s.ids, res.id] }));
        },
      },
    });
  };

  const getDefaultValue = () => {
    let value = [initialValue];
    if (!isNull(initialValue) && isArray(initialValue)) value = initialValue;

    return value.map((item) => {
      if (!isNull(format)) {
        if (format === "audio") {
          return <CustomPlayer key={item} url={`${url}?id=${initialValue}`} />;
        }
      } else {
        if (!isNull(item)) {
          let arr = item.split(".");
          if (arr.length === 2 && get(arr, "[1]", "").startsWith("image"))
            return (
              <Img
                key={item}
                src={`${get(typeConfig, "attachmentConfig.url", "")}?id=${item}`}
                onClick={() => clickFile(item, "img")}
              />
            );
          else return <Icon icon={"icon-file2"} key={item} onClick={() => clickFile(item, "file")} />;
        }
      }
    });
  };

  return (
    <Styled {...{ valid: data.valid, ...rest }}>
      {isArray(data.value) &&
        data.value.map((item, index) =>
          // <Icon icon={"icon-file2"} key={index} onClick={() => clickFile(item)}/>
          isString(item) ? (
            <Img src={item} key={item + index} />
          ) : (
            <Icon icon={"icon-file2"} key={index} onClick={() => clickFile(item, "file")} />
          )
        )}

      {/* DEFAULT VALUE */}
      {getDefaultValue()}
      {/*{(!isNull(initialValue)*/}
      {/*    && (isString(initialValue)*/}
      {/*        ? [initialValue]*/}
      {/*        : initialValue).map(item => {*/}
      {/*        let arr = item.split(".");*/}
      {/*        return (*/}
      {/*            ((arr.length === 2) && get(arr, "[1]", "").startsWith("image"))*/}
      {/*                ? <Img key={item} src={`${get(typeConfig, "attachmentConfig.url", "")}?id=${item}`}*/}
      {/*                       onClick={() => clickFile(item, "img")}/>*/}
      {/*                : <Icon icon={"icon-file2"} key={item} onClick={() => clickFile(item, "file")}/>*/}
      {/*        )*/}
      {/*    }))}*/}

      <Dropdown
        isClose={!data.focus}
        button={
          (data.value.length || (!isNull(initialValue) && !!initialValue)) && editable ? (
            <img className={"plusBtn"} src={plusImg} alt={"plus"} width={"22px"} />
          ) : (
            editable && <Icon icon={"icon-upload2"} color={"#45B36B"} />
          )
        }
      >
        <div
          className="row"
          onClick={() => {
            setData((s) => ({ ...s, focus: true }));
            ref.current?.click();
          }}
        >
          <Icon icon={"icon-link2"} />
          Upload file
        </div>
      </Dropdown>

      <input
        type={"file"}
        readOnly={!data.isEditable}
        onChange={onChange}
        className="custom-file-input"
        placeholder={""}
        ref={ref}
      />
    </Styled>
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

export default withTranslation("pdp")(connect(null, mapDispatchToProps)(memo(FileCell)));
