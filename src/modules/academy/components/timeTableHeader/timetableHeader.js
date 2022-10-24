import React, { memo, useEffect, useState } from "react";
import { get, isArray, isEmpty, isEqual, isNull } from "lodash";
import { toast } from "react-toastify";
import { withTranslation } from "react-i18next";
import Icon from "../../../../components/elements/icon";
import Modal from "../../../../components/elements/modal/index";
import AskingModalForLessonAction from "../dialog/askingModalForLessonAction";
import Play from "../../../../assets/icons/play.svg";
import Clear from "../../../../assets/icons/clear.svg";
import Button from "../../../../components/elements/button";
import { Styled } from "./style";
import Field from "../../../../containers/Form/field";
import FormDemo from "../../../../containers/Form/form-demo";
import { useHistory, useRouteMatch } from "react-router-dom";
import tooltip from "../../../../assets/images/tooltip.png";
import { changeUrlWithoutRefresh, formatDate } from "../../../../utils";
import { connect } from "react-redux";
import ApiActions from "../../../../services/api/actions";

const TimeTableHeader = ({
  selectedTimeTable,
  lessons,
  confirmStartLesson,
  changeStateAfterUpdateData,
  cancelLesson,
  finishLesson,
  type,
  lessonData,
  clearFiles = () => "",
  t,
  setTempData,
  getData,
  selectedLessonContentId,
  mentors,
  lesson,
}) => {
  const [state, setState] = useState({
    startLessonModal: false,
    cancelLessonModal: false,
    finishLessonModal: false,
    currentLesson: null,
    lessonDate: null,
    notClosedLesson: null,
    contentId: null,
    isFail: false,
  });

  const currentLesson = getData("time-table-current-lesson");
  const match = useRouteMatch();
  const history = useHistory();

  const onChangeHandling = (id, item) => {
    changeUrlWithoutRefresh(
      `/academic/academic-content/time-table/${get(match, "params.id", "")}/${get(match, "params.timeTableId", "")}/${get(
        match,
        "params.tabIndex",
        0
      )}/${id}`
    );
    setState((s) => ({ ...s, contentId: item.lessonContentId }));
  };

  useEffect(() => {
    if (selectedLessonContentId || lessonData) {
      let lesson = isNull(state.contentId)
        ? lessons?.options?.find(
            (lesson) =>
              get(lesson, "lessonContentId", "") === selectedLessonContentId || get(lessonData, "lessonContentId", lessonData)
          )
        : lessons?.options?.find((lesson) => get(lesson, "lessonContentId", "") === state.contentId);

      let getNotClose = lessons?.options?.find((lesson) => isEqual(get(lesson, "status", ""), "STARTED"));

      setState((s) => ({ ...s, lessonDate: get(lesson, "lessonDate", ""), notClosedLesson: getNotClose }));
      // setState(s => ({...s, notClosedLesson: getNotClose}));
      setTempData({ data: lesson, storeName: "time-table-current-lesson" });
    }
  }, [selectedLessonContentId, lessonData, state.contentId, lessons]);

  useEffect(() => {
    if (type) {
      let arrow = document.querySelector(".header__number__back");
      setTimeout(() => {
        arrow?.remove();
      }, 4000);
    }
  }, []);

  const startLesson = () => {
    setState((s) => ({ ...s, startLessonModal: true }));
    if (!state.lessonDate) {
      alert("Dars o'tish sanasini tanlang");
    }
  };

  const acceptConfirmStartLesson = () => {
    setState((s) => ({ ...s, startLessonModal: false, lessonDate: null }));
    confirmStartLesson(
      {
        lessonContentId: selectedLessonContentId,
        lessonDate: new Date(state.lessonDate).getTime(),
        timeTableId: get(selectedTimeTable, "id", ""),
      },
      {
        success: (res) => {
          toast.success(get(res, "message", "Success"));
          changeStateAfterUpdateData(
            {
              data: {
                result: {
                  data: get(res, "data", {}),
                },
              },
            },
            "timeTableData"
          );
        },
        fail: (err) => {
          setState((s) => ({ ...s, isFail: true }));
        },
      }
    );
  };

  const cancelLessonHandling = () => {
    if (state.notClosedLesson) {
      setState((s) => ({ ...s, cancelLessonModal: false }));
      cancelLesson(get(state, "notClosedLesson.id", ""), {
        success: (res) => {
          toast.success(get(res, "message", "Success"));
          changeStateAfterUpdateData(
            {
              data: {
                result: {
                  data: get(res, "data", {}),
                },
              },
            },
            "timeTableData"
          );
        },
        fail: (err) => {
          toast.error(get(err, "message", "Error"));
        },
      });
    }
  };

  const finishLessonHandling = () => {
    if (state.notClosedLesson) {
      setState((s) => ({ ...s, finishLessonModal: false }));
      finishLesson(get(state.notClosedLesson, "id", ""), {
        success: (res) => {
          toast.success(get(res, "message", "Success"));
          changeStateAfterUpdateData(
            {
              data: {
                result: {
                  data: get(res, "data", {}),
                },
              },
            },
            "timeTableData"
          );
        },
        fail: (err) => {
          toast.error(get(err, "message", "Error"));
        },
      });
    }
  };

  const CustomOption = ({ options, selectHandling }) => {
    return (
      <div>
        {isArray(options) &&
          options.map((val, ind) => (
            <div className="optionsWrapper" key={ind}>
              <div
                className="content"
                onClick={() => selectHandling(val)}
                style={{
                  color: val.status === "COMPLETED" ? "#777E91" : val.status === "STARTED" || "NOT_LEARNED" ? "#353945" : "",
                  fontWeight: val.status === "STARTED" ? "500" : "",
                }}
              >
                {ind + 1}. {val.name}
              </div>
              <div
                className="checked"
                style={{
                  backgroundColor:
                    val.status === "COMPLETED"
                      ? "#45b36b"
                      : val.status === "STARTED"
                      ? "#B1B5C4"
                      : val.status === "NOT_LEARNED"
                      ? "#E6E8EC"
                      : "",
                }}
              >
                <Icon icon="icon-check2" color="#fff" />
              </div>
            </div>
          ))}
      </div>
    );
  };

  const backToLessons = () => {
    if (type === "clear") {
      history.push(
        `/academic/academic-content/time-table/${get(match, "params.id", "")}/${get(selectedTimeTable, "id", "")}/${get(
          match,
          "params.tabIndex",
          ""
        )}`
      );
    }
  };

  return (
    <Styled status={state.startLessonModal && !state.lessonDate ? "danger" : ""}>
      <div className="header">
        <span className="header__number" onClick={backToLessons}>
          {get(currentLesson, "orderIndex", get(lesson, "orderIndex", ""))}
        </span>
        {type === "clear" && (
          <span className="header__number__back">
            <img src={tooltip} className={"header__number__back__img"} alt="tooltip" />
            <p>Click here back to lessons</p>
            <span className="backIcon">
              <Icon icon="icon-back-arrow" color="#fff" />
            </span>
          </span>
        )}
        <div className="header__row">
          <div className="header__row__top">
            <span className="header__row__top__lesson">{get(currentLesson, "type", get(lesson, "type", ""))}</span>
            <span className="header__row__top__name">
              <Icon icon="icon-glasses" />
              {get(
                mentors,
                isEmpty(get(currentLesson, "mentor.id", ""))
                  ? get(selectedTimeTable, "mentorId", "")
                  : get(currentLesson, "mentor.id", ""),
                get(selectedTimeTable, "mentor.fullName", "")
              )}
            </span>
            {type !== "clear" && (
              <span className="header__row__top__time">
                <Icon icon="icon-clock" />
                {formatDate(new Date(get(selectedTimeTable, "lessonStartTime", [])), "HH:mm")}
                {" / "}
                {formatDate(new Date(get(selectedTimeTable, "lessonEndTime", [])), "HH:mm")}
              </span>
            )}
            <span className="header__row__top__date">
              <FormDemo>
                <Field
                  type="custom-datepicker"
                  name="datepicker"
                  hideLabel
                  disabled={type === "clear"}
                  onChange={(val) => setState((s) => ({ ...s, startLessonModal: false, lessonDate: val }))}
                  // defaultValue={state.isFail === false ? (get(currentLesson, "lessonDate", 0)) : '' }
                  defaultValue={get(currentLesson, "lessonDate", get(lesson, "lessonDate", ""))}
                  placeholder="Create date"
                />
              </FormDemo>
            </span>
          </div>

          <div className="header__row__bottom">
            <span>
              <FormDemo>
                <Field
                  type="custom-select"
                  options={get(lessons, "options", [])}
                  CustomOption={CustomOption}
                  isChangeDefaultValue={false}
                  onChange={onChangeHandling}
                  name={"lessonName"}
                  hideLabel
                  valueKey={"lessonContentId"}
                  labelKey={"name"}
                  nullable={false}
                  defaultValue={get(currentLesson, "lessonContentId", get(lesson, "lessonContentId", ""))}
                />
              </FormDemo>
            </span>
          </div>
        </div>

        {state.notClosedLesson ? (
          type ? (
            <div
              className={`header__play header__clear ${get(lesson, "status") === "NOT_LEARNED" && "isDisabled"}`}
              //   disabled={get(currentLesson, "status") === "NOT_LEARNED"}
              onClick={clearFiles}
            >
              <img src={Clear} alt={"clear"} />
              <span className="start clear">CLEAR ALL</span>
            </div>
          ) : (
            <div
              className={`header__lesson ${
                !isEqual(
                  get(state, "notClosedLesson.lessonContentId", ""),
                  get(currentLesson, "lessonContentId", get(lesson, "lessonContentId", ""))
                ) && "disabled"
              }`}
            >
              <Button
                disabled={
                  !isEqual(
                    get(state, "notClosedLesson.lessonContentId", ""),
                    get(currentLesson, "lessonContentId", get(lesson, "lessonContentId", ""))
                  )
                }
                className={`cancel__btn`}
                onClick={() => setState((s) => ({ ...s, cancelLessonModal: true }))}
              >
                <Icon icon="icon-exit" />
                {t("lesson_cancellation") ?? "LESSON CANCELLATION"}
              </Button>

              <Button
                disabled={
                  !isEqual(
                    get(state, "notClosedLesson.lessonContentId", ""),
                    get(currentLesson, "lessonContentId", get(lesson, "lessonContentId", ""))
                  )
                }
                className="over__btn"
                onClick={() => setState((s) => ({ ...s, finishLessonModal: true }))}
              >
                <Icon icon="icon-logout" />
                {t("lesson_are_over") ?? "LESSON ARE OVER"}
              </Button>
            </div>
          )
        ) : (
          !state.notClosedLesson &&
          (type ? (
            <div className="header__play header__clear" onClick={clearFiles}>
              <img src={Clear} alt={"clear"} />
              <span className="start clear">CLEAR ALL</span>
            </div>
          ) : selectedTimeTable.status === "COMPLETED" ? (
            ""
          ) : (
            <div className="header__play" onClick={startLesson}>
              <img src={Play} alt={"play"} />
              <span className="start">START LESSON</span>
            </div>
          ))
        )}

        <Modal
          active={state.startLessonModal && state.lessonDate}
          className="modal"
        >
          <AskingModalForLessonAction
            startModal
            cancel={() => setState((s) => ({ ...s, startLessonModal: false }))}
            confirm={acceptConfirmStartLesson}
          />
        </Modal>

        <Modal
          active={state.cancelLessonModal}
          className="modal"
        >
          <AskingModalForLessonAction
            cancelModal
            cancel={() => setState((s) => ({ ...s, cancelLessonModal: false }))}
            confirm={cancelLessonHandling}
          />
        </Modal>

        <Modal
          active={state.finishLessonModal}
          className="modal"
        >
          <AskingModalForLessonAction
            completeModal
            cancel={() => setState((s) => ({ ...s, finishLessonModal: false }))}
            confirm={finishLessonHandling}
          />
        </Modal>
      </div>
    </Styled>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    getData: (storeName) => get(state, `api.${storeName}`, {}),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setTempData: ({ data, storeName }) => {
      dispatch({
        type: ApiActions.TEMP_DATA.SUCCESS,
        payload: {
          item: data,
          storeName,
        },
      });
    },
  };
};
export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(memo(TimeTableHeader)));
