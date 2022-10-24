import React, { useEffect, useState, useCallback } from "react";
import SimpleBar from "simplebar-react";
import { connect } from "react-redux";
import { get, isEmpty, isEqual } from "lodash";
import { Col, Row } from "react-grid-system";
import { withTranslation } from "react-i18next";
import TimeTableHeader from "../../components/timeTableHeader/timetableHeader";
import Button from "../../../../components/elements/button";
import ApiActions from "../../../../services/api/actions";
import TimetableSelect from "../../components/timetableBody/timeTableSelect/timetableSelect";
import BodyHeader from "../../components/timetableBody/bodyHeader/bodyHeader";
import BodyStudentsData from "../../components/timetableBody/bodyStudentsData/bodyStudentsData";
import TimeTableSidebar from "../../components/timetableBody/sidebar/timeTableSidebar";
import NextTimeTable from "../../components/nextTimetable";
import Modal from "../../../../components/elements/modal/index";
import Tabs from "../../../../components/tabs";
import Card from "../../components/card/Card";
import RightSidebar from "../../components/timetableBody/rightSidebar/rightSidebar";
import { formatDate } from "../../../../utils";
import { Styled } from "./style";
import HomeWorkData from "../../components/timetableBody/homeWork/homeWorkData";

const LessonsTable = ({
  getStudentData,
  timeTableData,
  mentorGroupsData,
  getGroups,
  getTimeTable,
  groups,
  changeCellParticipated,
  changeLessonParticipated,
  t,
  match,
  confirmStartLesson,
  changeStateAfterUpdateData,
  cancelLesson,
  finishLesson,
  changeStudentStatus,
  moveStudentNextTimeTable,
  history,
  location,
  editTimeTable,
  postCardId,
  sendInvoice,
  setDatToRedux,
  ...rest
}) => {
  const [activeStudent, setActiveStudent] = useState(null);
  const [selectedLessonContentId, setSelectedLessonContentId] = useState(null);
  const [selectedTimeTable, setSelectedTimeTable] = useState({});
  const [sidebarActive, setSidebarActive] = useState("");
  const [headerActive, setHeaderActive] = useState(null);
  const [lessons, setLessons] = useState(null);
  const [finished, setFinished] = useState(false);
  const [participatedLessonWithIndexAndBoolean, setParticipatedLessonWithIndexAndBoolean] = useState(null);
  const [close, setClose] = useState(false);
  const [changeBg, setChangeBg] = useState(false);

  // const [state, setState] = useState({
  //   activeStudent: null,
  //   selectedLesson: [],
  //   selectedTimeTable: {},
  //   sidebarActive: '',
  // });

  useEffect(() => {
    getGroups();
    if (match?.params?.id) {
      getTimeTable({
        groupId: get(match, "params.id", ""),
      });
      setSidebarActive(match.params.id);
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(timeTableData) && get(timeTableData, "result", "")) {
      let startedLesson = get(timeTableData, "result.data.lessons.options", []).find(
        (lesson) => get(lesson, "lessonContentId", "") == get(timeTableData, "result.data.lessons.value", "")
      );

      setSelectedLessonContentId(get(startedLesson, "lessonContentId", null));
      setLessons(get(timeTableData, "result.data.lessons"));

      setSelectedTimeTable(
        get(timeTableData, "result.data.timeTable.options", []).find((item) =>
          isEqual(get(item, "id", ""), get(timeTableData, "result.data.timeTable.value", ""))
        )
      );
    }
  }, [timeTableData]);

  const selectTimeTable = (selectedTimeTableId) => {
    if (selectedTimeTableId) {
      let timeTable = get(timeTableData, "result.data.timeTable.options", []).find((item) =>
        isEqual(get(item, "id", ""), selectedTimeTableId)
      );
      setSelectedTimeTable(timeTable);
      // let splitUrl = get(match, "url", "").split("/");
      // history.push(`${splitUrl.slice(0, splitUrl.length - 1).join("/")}/${get(timeTable, "id", "")}`);
      getTimeTable({ groupId: get(timeTableData, "result.data.groupId"), timeTableId: get(timeTable, "id", "") });
      history.push(`/academic/academic-content/time-table/${get(match, "params.id", "null")}/${get(timeTable, "id", "")}`);
    }
  };
  const setActiveTab = (ind) => {
    history.push(
      `/academic/academic-content/time-table/${get(match, "params.id", "")}/${get(match, "params.timeTableId", "")}/${ind}/`
    );
  };

  const cardClick = (val) => {
    history.push(
      `/academic/academic-content/time-table/${get(match, "params.id", "")}/${get(match, "params.timeTableId", "")}/${get(
        match,
        "params.tabIndex",
        0
      )}/${val.lessonContentId}`
    );
    setChangeBg(true);
  };

  const rightSidebarClick = useCallback(() => {
    history.push(
      `/academic/academic-content/time-table/${get(match, "params.id", "")}/${get(match, "params.timeTableId", "")}/${get(
        match,
        "params.tabIndex",
        0
      )}`
    );
  }, [match]);

  const timeTableTrigger = () => setDatToRedux({ data: {}, storeName: "timeTableData" });

  const timeTable = () => (
    <Row className="mainContainer mainBox">
      <Col xs={close ? 0.1 : 1.9} style={{ paddingRight: "0" }}>
        <TimeTableSidebar
          setSidebarActive={setSidebarActive}
          sidebarActive={sidebarActive}
          groups={groups}
          getGroups={getGroups}
          getTimeTable={getTimeTable}
          match={match}
          close={close}
          setClose={setClose}
          history={history}
          {...{
            timeTableTrigger,
          }}
        />
      </Col>
      {sidebarActive && (
        <Col xs={close ? 11.8 : 10.1}>
          <div className="lesson">
            <TimeTableHeader
              {...{
                selectedLessonContentId,
                setSelectedLessonContentId,
              }}
              selectedTimeTable={selectedTimeTable}
              lessons={lessons}
              confirmStartLesson={confirmStartLesson}
              changeStateAfterUpdateData={changeStateAfterUpdateData}
              cancelLesson={cancelLesson}
              finishLesson={finishLesson}
              type={""}
              mentors={get(timeTableData, "result.data.mentors", {})}
            />

            <div className="lesson__table">
              <SimpleBar style={{ maxHeight: "541px", minHeight: "541px" }} className="simplebar">
                <div className="lesson__table__row table__header">
                  <div className="lesson__table__col first">
                    <TimetableSelect
                      selectTimeTable={selectTimeTable}
                      timeTableData={timeTableData}
                      match={match}
                      selectedTimeTable={selectedTimeTable}
                      history={history}
                      t={t}
                      editTimeTable={editTimeTable}
                      sendInvoice={sendInvoice}
                      mentors={get(timeTableData, "result.data.mentors", {})}
                    />
                  </div>
                  <div className="fullLessons">
                    {get(timeTableData, "result.data.numberOfParticipated", [])}/
                    {get(timeTableData, "result.data.totalNumberOfAttendance", [])} <br />
                    <span>{t("lesson") ?? "LESSON"}</span>
                  </div>
                  <BodyHeader
                    {...{
                      selectedLessonContentId,
                      setSelectedLessonContentId,
                    }}
                    studentsData={timeTableData}
                    setHeaderActive={setHeaderActive}
                    setActiveStudent={setActiveStudent}
                    changeLessonParticipated={changeLessonParticipated}
                    setParticipatedLessonWithIndexAndBoolean={setParticipatedLessonWithIndexAndBoolean}
                  />
                </div>
                <BodyStudentsData
                  {...{
                    selectedLessonContentId,
                    setSelectedLessonContentId,
                  }}
                  setHeaderActive={setHeaderActive}
                  lessons={lessons}
                  headerActive={headerActive}
                  studentsData={timeTableData}
                  activeStudent={activeStudent}
                  setActiveStudent={setActiveStudent}
                  changeCellParticipated={changeCellParticipated}
                  participatedLessonWithIndexAndBoolean={participatedLessonWithIndexAndBoolean}
                  changeStudentStatus={changeStudentStatus}
                  match={match}
                  changeStateAfterUpdateData={changeStateAfterUpdateData}
                />
              </SimpleBar>
            </div>
            <div className="lesson__footer">
              <Button
                disabled={!isEqual(get(selectedTimeTable, "status", ""), "STARTED")}
                success
                onCLick={() => setFinished(true)}
                className="btn-footer"
              >
                FINISH
              </Button>
            </div>

            <Modal active={finished} onClose={() => setFinished(false)} className={"nextItemTable"}>
              <NextTimeTable
                students={get(timeTableData, "result.data.students", [])}
                closeModal={() => setFinished(false)}
                // fromTimeTable={getFinishingTimeTable()}
                // toTimeTable={getNextStartingTimeTable()}
                selectedTimeTable={selectedTimeTable}
                moveStudentNextTimeTable={moveStudentNextTimeTable}
                changeStateAfterUpdateData={changeStateAfterUpdateData}
              />
            </Modal>
          </div>
        </Col>
      )}
    </Row>
  );

  const lesson = () => (
    <Row className="mainContainer mainBox">
      <Col xs={close ? 0.1 : 1.9} style={{ paddingRight: "0" }}>
        <TimeTableSidebar
          setSidebarActive={setSidebarActive}
          sidebarActive={sidebarActive}
          groups={groups}
          getGroups={getGroups}
          getTimeTable={getTimeTable}
          match={match}
          close={close}
          xs={10.1}
          setClose={setClose}
          history={history}
        />
      </Col>
      <Col xs={close ? 11.8 : 10.1} style={{ display: "flex" }}>
        <div className="lessonsPage">
          {!isEmpty(get(match, "params.cardId", "")) ? (
            <HomeWorkData
              selectedTimeTable={selectedTimeTable}
              lessons={lessons}
              confirmStartLesson={confirmStartLesson}
              changeStateAfterUpdateData={changeStateAfterUpdateData}
              cancelLesson={cancelLesson}
              finishLesson={finishLesson}
            />
          ) : (
            <SimpleBar style={{ maxHeight: "704px", maxWidth: "100%", width: "100%" }}>
              <div className={`cardContainer ${isEmpty(get(timeTableData, "result.data.lessons.options", [])) && "noLesson"}`}>
                <Row>
                  {!isEmpty(get(timeTableData, "result.data.lessons.options", [])) ? (
                    get(timeTableData, "result.data.lessons.options", []).map((val) => (
                      <Col xs={4} key={val.lessonContentId} style={{ padding: "5px" }}>
                        <Card
                          title={val.name}
                          date={formatDate(new Date(val.lessonDate), "mm / dd / yyyy")}
                          description={get(val, "subjects", [])}
                          status={val.status}
                          onClick={() => cardClick(val)}
                        />
                      </Col>
                    ))
                  ) : (
                    <div className="noLessonCard">Darslar mavjud emas!</div>
                  )}
                </Row>
              </div>
            </SimpleBar>
          )}
          <div className="rightSidebar">
            <RightSidebar sidebarActive={sidebarActive} rightSidebarClick={rightSidebarClick} />{" "}
          </div>
        </div>
      </Col>
    </Row>
  );

  const list = ["TIMETABLE", "LESSON", "EXAM"];

  return (
    <Styled id={match.params.cardId}>
      <Tabs
        className="tabsContainer"
        leftContent={[timeTable(), lesson(), ""]}
        setActiveTab={setActiveTab}
        index={get(match, "params.tabIndex", 0)}
        leftList={list}
        rightContent={[]}
        rightList={[]}
      />
    </Styled>
  );
};

const mapStateToProps = (state) => {
  return {
    groups: get(state, "api.groups.data"),
    timeTableData: get(state, "api.timeTableData.data"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGroups: (params = "") => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          method: "get",
          storeName: "groups",
          url: `education/v1/group/mentor${params}`,
        },
      });
    },

    getTimeTable: ({ groupId, timeTableId, cb }) => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          method: "get",
          cb,
          storeName: "timeTableData",
          url: `education/v1/time-table/dashboard?groupId=${groupId}${timeTableId ? `&timeTableId=${timeTableId}` : ``}`,
        },
      });
    },
    changeCellParticipated: (cellId) => {
      if (cellId) {
        dispatch({
          type: ApiActions.REQUEST.REQUEST,
          payload: {
            method: "put",
            url: `education/v1/student-attendance/${cellId}`,
          },
        });
      }
    },
    changeLessonParticipated: (participated, lessonId) => {
      if (lessonId) {
        dispatch({
          type: ApiActions.REQUEST.REQUEST,
          payload: {
            method: "put",
            url: `education/v1/student-attendance/lesson/${lessonId}?participated=${participated}`,
          },
        });
      }
    },
    confirmStartLesson: (attributes, cb) => {
      if (attributes) {
        dispatch({
          type: ApiActions.REQUEST.REQUEST,
          payload: {
            method: "post",
            url: `education/v1/lesson/play`,
            attributes,
            cb,
          },
        });
      }
    },
    cancelLesson: (lessonId, cb) => {
      if (lessonId) {
        dispatch({
          type: ApiActions.REQUEST.REQUEST,
          payload: {
            method: "patch",
            url: `education/v1/lesson/cancel?lessonId=${lessonId}`,
            cb,
          },
        });
      }
    },
    finishLesson: (lessonId, cb) => {
      if (lessonId) {
        dispatch({
          type: ApiActions.REQUEST.REQUEST,
          payload: {
            method: "patch",
            url: `education/v1/lesson/finish?lessonId=${lessonId}`,
            cb,
          },
        });
      }
    },
    changeStudentStatus: (attributes, cb) => {
      if (attributes) {
        dispatch({
          type: ApiActions.REQUEST.REQUEST,
          payload: {
            method: "patch",
            url: `education/v1/time-table/student/status`,
            attributes,
            cb,
          },
        });
      }
    },
    moveStudentNextTimeTable: (attributes, currentTimeTableId, cb) => {
      if (attributes) {
        dispatch({
          type: ApiActions.REQUEST.REQUEST,
          payload: {
            method: "post",
            url: `education/v1/time-table/finish/${currentTimeTableId}`,
            attributes,
            cb,
          },
        });
      }
    },
    editTimeTable: (attributes, url, cb) => {
      if (attributes) {
        dispatch({
          type: ApiActions.REQUEST.REQUEST,
          payload: {
            method: "patch",
            url: `education/v1/time-table/${url}`,
            attributes,
            cb,
          },
        });
      }
    },
    changeStateAfterUpdateData: (data, storeName) => {
      if (data) {
        dispatch({
          type: ApiActions.TEMP_DATA.REQUEST,
          payload: {
            item: data,
            storeName,
          },
        });
      }
    },
    sendInvoice: (timeTableId, cb) => {
      dispatch({
        type: ApiActions.REQUEST.REQUEST,
        payload: {
          method: "post",
          url: `education/v1/time-table/invoice/${timeTableId}`,
          cb,
        },
      });
    },
    setDatToRedux: ({ data, storeName }) => {
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
export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(LessonsTable));
