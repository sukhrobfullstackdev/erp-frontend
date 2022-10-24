import React, { useState, useEffect } from "react";
import TimetableHeader from "../../timeTableHeader/timetableHeader";
import { get, head, isArray, isEmpty, isEqual, isNil, isNull, set } from "lodash";
import File from "../../file/file";
import FormDemo from "../../../../../containers/Form/form-demo";
import Field from "../../../../../containers/Form/field";
import Icon from "../../../../../components/elements/icon";
import { connect } from "react-redux";
import ApiActions from "../../../../../services/api/actions";
import SettingsActions from "../../../../settings/actions";
import { toast } from "react-toastify";
import { useRouteMatch } from "react-router-dom";
import { Styled } from "./style";
import SimpleBar from "simplebar-react";
import Button from "../../../../../components/elements/button";

let currentLesson = "";
let addLinkData = [];
let deleteIds = [];
let temp = {};

const HomeWorkData = ({
  selectedTimeTable,
  lessons,
  confirmStartLesson,
  sendTaskIds = () => "",
  changeStateAfterUpdateData,
  timeTableData,
  cancelLesson,
  finishLesson,
  description = [],
  fileUpload,
  addFileId,
  addTaskId,
  taskUpload,
  sendFileIds = () => "",
  clearAllFiles,
  setData,
  addUsefulLinks,
}) => {
  const [state, setState] = useState({
    howeWorkData: [],
    fileData: [],
    file: [],
    task: [],
    lesson: [],
    uploadedTask: [],
    uploadedFile: [],
    linkData: [],
  });
  const match = useRouteMatch();

  const lesson = get(timeTableData, "result.data.lessons.options", []).find(
    (val) => val.lessonContentId == get(match, "params.cardId", [])
  );

  const usefulLinks = get(lesson, "usefulLinks", []);

  useEffect(() => {
    !isEmpty(get(lesson, "tasks", [])) &&
      sendTaskIds({
        attributes: get(lesson, "tasks", []),
        cb: {
          success: (res) => {
            setState((state) => ({ ...state, uploadedTask: res.data }));
          },
          fail: (err) => "",
        },
      });
    !isEmpty(get(lesson, "files", [])) &&
      sendFileIds({
        attributes: get(lesson, "files", []),
        cb: {
          success: (res) => {
            setState((state) => ({ ...state, uploadedFile: res.data }));
          },
          fail: (err) => "",
        },
      });
  }, [lesson]);

  const deleteTask = (val, ind, type) => {
    addFileId({
      formMethods: {},
      method: "delete",
      url:
        type === "task"
          ? `education/v1/lesson/task?lessonId=${lesson.lessonContentId}&fileId=${state.uploadedTask[ind].id}`
          : `education/v1/lesson/file?lessonId=${lesson.lessonContentId}&fileId=${state.uploadedFile[ind].id}`,
      cb: {
        success: (res) => {
          if (type === "task") {
            state.uploadedTask.splice(ind, 1);
            setState((state) => ({
              ...state,
              uploadedTask: [...state.uploadedTask],
            }));
          } else state.uploadedFile.splice(ind, 1);
          setState((state) => ({
            ...state,
            uploadedFile: [...state.uploadedFile],
          }));
        },
        fail: (e) => "",
      },
    });
  };

  const onFileChange = (e) => {
    const formData = new FormData();
    formData.append("file", e);
    fileUpload({
      attributes: formData,
      formMethods: {
        setLoading: () => {},
      },
      cb: {
        success: (res) => {
          setState((state) => ({
            ...state,
            file: [...state.file, res],
          }));
          addFileId({
            attributes: {
              lessonId: lesson.lessonContentId,
              fileId: res.id,
            },
            formMethods: {},
            cb: {
              success: (r) => {
                setState((state) => ({
                  ...state,
                  uploadedFile: [...state.uploadedFile, res],
                }));
              },
              fail: (e) => "",
            },
          });
        },
        fail: (e) => "",
      },
    });
  };
  const onTaskChange = (e) => {
    const formData = new FormData();
    formData.append("task", e);
    taskUpload({
      attributes: formData,
      formMethods: {
        setLoading: () => {},
      },
      cb: {
        success: (res) => {
          setState((state) => ({
            ...state,
            task: [...state.task, res],
          }));
          addTaskId({
            attributes: {
              lessonId: lesson.id,
              fileId: res.id,
            },
            formMethods: {},
            cb: {
              success: (r) => {
                setState((state) => ({
                  ...state,
                  uploadedTask: [...state.uploadedTask, res],
                }));
              },
              fail: (e) => "",
            },
          });
        },
        fail: (e) => "",
      },
    });
  };

  const clearFileData = () => {
    get(lesson, "id", "")
      ? clearAllFiles({
          id: get(lesson, "id", ""),
          cb: {
            success: (res) => toast.info(res.message),
            fail: (e) => "",
          },
        })
      : toast.warning("Bu dars boshlanmagan!");
    setState((state) => ({ ...state, uploadedTask: [] }));
    setState((state) => ({ ...state, uploadedFile: [] }));
  };

  useEffect(() => {
    currentLesson = get(timeTableData, "result.data.lessons.options", []).find((item) =>
      isEqual(item.lessonContentId + "", get(timeTableData, "result.data.lessons.value", ""))
    );
  }, [timeTableData]);

  useEffect(() => {
    isEmpty(usefulLinks) && !isEmpty(lesson) && addLink();
  }, [timeTableData, get(match, "params.cardId", "")]);

  let data = get(timeTableData, "result.data.lessons.options", []);
  let dataIndex = data?.findIndex((val) => val.lessonContentId == get(match, "params.cardId", ""));

  console.log(usefulLinks);

  const addLink = () => {
    if (get(data[dataIndex], "usefulLinks", "")) {
      data[dataIndex].usefulLinks = [
        ...get(data[dataIndex], "usefulLinks", []),
        {
          description: "",
          customId: "null" + Math.floor(Math.random() * 100000),
          link: "",
        },
      ];
      addLinkData = get(data[dataIndex], "usefulLinks", []);
      setData({
        storeName: "timeTableData",
        data: {
          data: {
            ...timeTableData,
            result: {
              ...timeTableData.result,
              data: {
                ...timeTableData.result.data,
                lessons: {
                  ...timeTableData.result.data.lessons,
                  options: data,
                },
              },
            },
          },
        },
      });
    }
  };

  const deleteLink = (index, val) => {
    deleteIds = [...deleteIds, get(val, "customId", val.id)];
    let data = [...get(timeTableData, "result.data.lessons.options", [])];

    if (usefulLinks.length === 1) {
      temp = {
        resetData: {},
      };

      usefulLinks?.forEach((item) => {
        temp.resetData[`${get(item, "lessonContentId", "customId")}.description`] = "";
        temp.resetData[`${get(item, "lessonContentId", "customId")}.link`] = "";
      });
    } else {
      let dataIndex = data?.findIndex((val) => val.lessonContentId == get(match, "params.cardId", ""));
      usefulLinks.length > 1 && get(data[dataIndex], "usefulLinks", []).splice(index, 1);
    }

    setData({
      storeName: "timeTableData",
      data: {
        data: {
          ...timeTableData,
          result: {
            ...timeTableData.result,
            data: {
              ...timeTableData.result.data,
              lessons: {
                ...timeTableData.result.data.lessons,
                options: data,
              },
            },
          },
        },
      },
    });
  };

  const duplicateLink = (name) => {
    let elem = document.getElementsByName(name);
    navigator.clipboard.writeText(head(elem).value);
  };

  const submitHandling = ({ data }) => {
    deleteIds.forEach((id) => {
      if (data[String(id)]) delete data[String(id)];
    });
    let attributes = [];

    let linkKeys = Object.keys(data);

    for (let i = linkKeys.length - 1; i >= 0; i--) {
      let linkId = {
        ...(linkKeys[i].startsWith("null") ? {} : { id: linkKeys[i] }),
        link: data[linkKeys[i]].link,
        description: data[linkKeys[i]].description,
      };
      if (!isEmpty(data[linkKeys[i]].link && data[linkKeys[i]].description)) attributes.push(linkId);
    }

    let chosenLesson = get(timeTableData, "result.data.lessons.options", []).find((val) => val.lessonContentId);
    addUsefulLinks({
      lessonId: get(chosenLesson, "id", ""),
      attributes,
      cb: {
        success: (res) => toast.info(res),
        fail: (e) => "",
      },
    });
  };

  return (
    <Styled>
      <TimetableHeader
        changeStateAfterUpdateData={changeStateAfterUpdateData}
        cancelLesson={cancelLesson}
        lessons={lessons}
        confirmStartLesson={confirmStartLesson}
        finishLesson={finishLesson}
        selectedTimeTable={selectedTimeTable}
        type={"clear"}
        clearFiles={clearFileData}
        lesson={lesson}
      />

      <SimpleBar style={{ maxHeight: "550px" }}>
        <div className="aboutLesson">
          <FormDemo>
            <div className="topic">
              <h2>TOPICS</h2>
              <div className="desc">
                {lesson &&
                  get(lesson, "subjects", []).map((item, index) => (
                    <div className="desc__options" key={item + index}>
                      {index + 1}. {item.name}
                    </div>
                  ))}
              </div>
            </div>
            <div className="homework">
              <h2>HOMEWORK</h2>
              {state.uploadedTask.length === 0 ? (
                <div className={"noHomeWork"}>No homework</div>
              ) : (
                <File onDelete={deleteTask} className={"file"} initialState={get(state, "uploadedTask", [])} type={"task"} />
              )}
              <Field
                type={"file"}
                name={"dropzone"}
                disabled={get(lesson, "status") === "NOT_LEARNED"}
                hideLabel
                onChange={onTaskChange}
                className={"uploadWrapper"}
              >
                <Icon icon={"icon-upload"} color={"#FCFCFD"} />
                <p className={"uploadText"}>Upload</p>
              </Field>
            </div>
            <div className="homework">
              <h2>FILES</h2>
              {state.uploadedFile.length === 0 ? (
                <div className={"noHomeWork"}>No files</div>
              ) : (
                <File fileIds={[]} onDelete={deleteTask} className={"file"} initialState={get(state, "uploadedFile", [])} />
              )}
              <Field
                type={"file"}
                name={"dropzone"}
                disabled={get(lesson, "status") === "NOT_LEARNED"}
                hideLabel
                onChange={onFileChange}
                className={"uploadWrapper"}
              >
                <Icon icon={"icon-upload"} color={"#FCFCFD"} />
                <p className={"uploadText"}>Upload</p>
              </Field>
            </div>
          </FormDemo>
          <div className="links" style={{ paddingBottom: "1px" }}>
            <FormDemo {...temp} formRequest={submitHandling}>
              <h2>USEFUL LINKS</h2>
              {usefulLinks?.map((val, index) => (
                <div className="inputs" key={index}>
                  <Field
                    type="input"
                    name={`${get(val, "id", get(val, "customId"))}.description`}
                    property={{ placeholder: "Description" }}
                    hideLabel
                    defaultValue={val.description}
                  />
                  <div className="functionalInput">
                    <Field
                      type="input"
                      name={`${get(val, "id", get(val, "customId", String(index)))}.link`}
                      property={{ placeholder: "Useful links" }}
                      className="linkInput"
                      hideLabel
                      defaultValue={val.link}
                    />
                    <div className="addDelInput">
                      <div className="verticalLine"></div>
                      <Icon
                        icon="icon-duplicate"
                        mainClassName="copyIcon"
                        color="#353945"
                        onClick={() => duplicateLink(get(val, "id", get(val, "customId", String(index))))}
                      />
                      <div className="verticalLine"></div>
                      <Button outlineDanger className="addLink" onCLick={() => deleteLink(index, val)}>
                        <div className="minus"></div>
                      </Button>
                      <div className="verticalLine"></div>
                      <Button outline_success className="addLink deleteLink" onCLick={addLink}>
                        <Icon icon="icon-add-plus" mainClassName="plus" color="#45B36B" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="submit"
                disabled={get(lesson, "status") === "NOT_LEARNED"}
                className="submitLink"
                success
                style={{ marginRight: "20px" }}
              >
                Save
              </Button>
            </FormDemo>
          </div>
        </div>
      </SimpleBar>
    </Styled>
  );
};

const mapStateToProps = (state) => {
  return {
    timeTableData: get(state, "api.timeTableData.data"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fileUpload: ({ attributes, formMethods = {}, cb }) => {
      dispatch({
        type: SettingsActions.FILE_UPLOAD.REQUEST,
        payload: { attributes, formMethods, cb },
      });
    },
    sendTaskIds: ({ attributes, cb, formMethods = [], method = "post", url }) => {
      dispatch({
        type: ApiActions.REQUEST.REQUEST,
        payload: {
          method,
          cb,
          formMethods,
          attributes,
          url: `attachment/v1/attachment/get-file-info-by-id-list`,
        },
      });
    },
    sendFileIds: ({ attributes, cb, formMethods = [], method = "post", url }) => {
      dispatch({
        type: ApiActions.REQUEST.REQUEST,
        payload: {
          method,
          cb,
          formMethods,
          attributes,
          url: `attachment/v1/attachment/get-file-info-by-id-list`,
        },
      });
    },
    addFileId: ({ attributes, formMethods, cb, method = "post", url = `education/v1/lesson/file` }) => {
      dispatch({
        type: ApiActions.REQUEST.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          method,
          url,
        },
      });
    },
    addTaskId: ({ attributes, formMethods, cb, method = "post", url = `education/v1/lesson/task` }) => {
      dispatch({
        type: ApiActions.REQUEST.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          method,
          url,
        },
      });
    },
    taskUpload: ({ attributes, formMethods = {}, cb }) => {
      dispatch({
        type: SettingsActions.FILE_UPLOAD.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          url: `attachment/v1/attachment/upload-task`,
        },
      });
    },
    clearAllFiles: ({ cb, method = "delete", id }) => {
      dispatch({
        type: ApiActions.REQUEST.REQUEST,
        payload: {
          method,
          cb,
          url: `education/v1/lesson/clear?lessonId=${id}`,
        },
      });
    },
    setData: ({ data, storeName }) => {
      dispatch({
        type: ApiActions.TEMP_DATA.REQUEST,
        payload: {
          item: data,
          storeName,
        },
      });
    },
    addUsefulLinks: ({ attributes, formMethods, cb, lessonId }) => {
      dispatch({
        type: ApiActions.REQUEST.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          method: "post",
          url: `education/v1/useful-link/${lessonId}`,
        },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeWorkData);
