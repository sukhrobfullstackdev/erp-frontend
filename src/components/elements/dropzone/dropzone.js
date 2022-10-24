import React, { useState } from "react";
import { getDroppedOrSelectedFiles } from "html5-file-selector";
import { DropzoneStyled } from "./dropzoneStyles";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import styled from "styled-components";
import { get } from "lodash";
import Button from "./../button";
import Icon from "../icon";
import Text from "../text";
import checkImg from "./../../../assets/icons/Check.svg";
import classNames from "classnames";
import { financial } from "../../../utils";

const UploadContentStyled = styled.div`
  .main__upload__icon {
    margin: auto;
  }

  .main__upload__label {
    flex-direction: column;
    display: flex;
    align-items: center;
    cursor: "pointer";
    border-radius: 3;
  }
  .ui__icon__wrapper {
    width: 60px !important;
    height: 50px !important;
    .icon {
      width: 60px !important;
      height: 50px !important;
    }
  }
  span {
    margin-top: 10px;
    margin-bottom: 8px;
    font-size: 22px;
  }
  p {
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #777e91;
    a {
      font-size: 16px;
      color: #3772ff;
      font-weight: 500;
      padding: 0 5px;
      cursor: pointer;
    }
  }
`;

const CustomInput = ({ accept, onFiles, files, getFilesFromEvent }) => {
  return (
    <label className="main__upload__label">
      <Icon icon="icon-upload" className="main__upload__icon" color="green" />
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
      <span>Upload files</span>
      <p>
        Drag and drop files here or <a> Browse</a>
      </p>
    </label>
  );
};
const DropZone = ({ saveData = () => {}, cancel = () => {}, fileUpload, ...props }) => {
  const [myFiles, setFiles] = useState([]);
  const [collapse, isCollapse] = useState(false);
  const [uploadedFileData, setUploadedFileData] = useState([]);
  const getFilesFromEvent = (e) => {
    return new Promise((resolve) => {
      getDroppedOrSelectedFiles(e).then((chosenFiles) => {
        resolve(chosenFiles.map((f) => f.fileObject));
      });
    });
  };

  const getUploadParams = ({ file, meta }) => {
    return { url: "https://httpbin.org/post" };
  };
  // url: config.API_ROOT + "api/auth/v1/user/me",
  // 		headers: {
  // }
  const handleChangeStatus = (files, status) => {
    if (status == "preparing") {
      const formData = new FormData();
      formData.append("file", files.file);
      fileUpload({
        attributes: formData,
        formMethods: { setLoading: () => {} },
        cb: {
          success: ({ id, url }) => {
            setUploadedFileData((s) => [{ fileId: id, description: "", url }, ...s]);
          },
        },
      });
      setFiles((state) => [files, ...state]);
    }
  };

  const descriptionHandling = (index, value = "") => {
    setUploadedFileData((s) => {
      s[index].description = value;
      return s;
    });
  };

  const handleSubmit = (files, allFiles) => {
    allFiles.forEach((f) => f.remove());
  };
  const Layout = ({ input, previews, submitButton, dropzoneProps, files, extra: { maxFiles } }) => {
    return (
      <DropzoneStyled>
        <UploadContentStyled className="main__upload" {...dropzoneProps}>
          <div>{input}</div>
        </UploadContentStyled>
        <div className={classNames({ collapse: collapse }, { upload__row__wrapper: files.length > 0 })}>
          {files.length > 0 && (
            <div className="dzu-dropzone__upload__counter">
              <div>
                <Text xlg medium>
                  Uploaded {files.length} files
                </Text>
                {collapse && <div>on collaps progress</div>}
              </div>
              <div>
                {collapse ? (
                  <Icon
                    onClick={() => isCollapse(!collapse)}
                    className="icon__exit__full_screen"
                    icon="icon-magnifier"
                    color="#777E91"
                  />
                ) : (
                  <Icon
                    onClick={() => isCollapse(!collapse)}
                    className="icon__exit__full_screen"
                    icon="icon-exit-full-screen"
                    color="#777E91"
                  />
                )}
              </div>
            </div>
          )}
          <div className="onprogress__row__option__wrapper">
            {myFiles.map((e, index) => {
              const { name, percent, type, size } = e.meta;
              let startedTime = new Date(e.meta.uploadedDate);
              let durationTime = 0;
              const calculateDuration = () => {
                let uploadedBytes = size / (size / (Math.round(percent) + 1));
                let totalBytes = size;
                let timeElapsed = 0;
                let uploadSpeed = 0;
                function getDuration() {
                  if (percent !== 100) {
                    timeElapsed = new Date() - startedTime; // Assuming that timeStarted is a Date Object
                    uploadSpeed = uploadedBytes / (timeElapsed / 1000); // Upload speed in second
                    durationTime = (totalBytes - uploadedBytes) / uploadSpeed;
                  } else {
                  }
                }
                var timeController = setInterval(getDuration(), 1000);
                clearInterval(timeController);
              };
              const deleteHandling = (id) => {
                files.forEach((i) => i.meta.id == e.meta.id && i.remove());
                const newFiles = myFiles.filter((i) => i.meta.id != e.meta.id);
                setFiles(newFiles);
              };
              calculateDuration();
              const calculateTime = () => {
                let timeOnSecond = Math.round(durationTime / 1000);
                if (timeOnSecond > 60) {
                  return Math.round(timeOnSecond / 60) + " minut";
                }
                if (timeOnSecond / 60 > 1) {
                  return Math.round(timeOnSecond / 3600) + " hour";
                }

                if (timeOnSecond < 60) {
                  return Math.round(timeOnSecond) + " second";
                }
              };
              return (
                <div key={index}>
                  {percent == 100 ? (
                    <div className="tr">
                      <div className="td" style={{}}>
                        <div className="align__center">
                          <img className="checkImg" src={checkImg} />{" "}
                          <div className="align__center__column">
                            <Text className={"dropzone-name"}>{` ${name}`}</Text>
                            <input
                              type="text"
                              onChange={({ target: { value } }) => descriptionHandling(index, value)}
                              defaultValue={get(uploadedFileData[index], "description", "")}
                              className="img__description__input"
                              style={{
                                marginTop: "10px",
                                background: "transparent",
                              }}
                              placeholder="Description"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="td">
                        <Text>{type}</Text>
                      </div>
                      <div className="td">
                        <Text>
                          {size >= 1024
                            ? size / 1024 >= 1024
                              ? `${financial(size / 1024 / 1024)} MB`
                              : `${financial(size / 1024)} KB`
                            : `${size} Bytes`}
                        </Text>
                      </div>
                      <div className="td">
                        <Icon icon="icon-exit" className="icon__exit" color="#777E90" onClick={() => deleteHandling()} />
                      </div>
                    </div>
                  ) : (
                    <div className="onprogress__row">
                      <div className="onprogress__row__option__wrapper">
                        <Text medium>{name}</Text>
                        <div
                          className="onprogress"
                          style={{
                            display: "flex",
                            height: "25px",
                            alignItems: "center",
                          }}
                        >
                          <Text className="onprogress__date__text" medium>
                            {calculateTime()} left · {Math.round(percent)} %
                          </Text>
                          <Icon
                            icon="icon-exit"
                            className="icon__exit__onprogress"
                            color="#777E90"
                            onClick={() => deleteHandling()}
                          />
                        </div>
                      </div>
                      <div>
                        <progress id="file" value={percent} max="100">
                          {" "}
                          dfs{" "}
                        </progress>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="buttons">
          <Button
            outlineDanger="1"
            onClick={() => {
              // setFiles([]);
              cancel();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              let temp = [];
              myFiles.forEach((val) => temp.push(val.file));
              saveData(uploadedFileData, temp);
              setUploadedFileData([]);
              setFiles([]);
            }}
            success="1"
            pl={12}
            pr={13}
          >
            Save
          </Button>
        </div>
      </DropzoneStyled>
    );
  };
  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="*"
      InputComponent={CustomInput}
      PreviewComponent={null}
      LayoutComponent={Layout}
      inputLabel="test"
      getFilesFromEvent={getFilesFromEvent}
    />
  );
};

export default DropZone;
