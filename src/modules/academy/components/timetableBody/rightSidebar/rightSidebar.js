import Icon from "../../../../../components/elements/icon";
import { useState } from "react";
import { get } from "lodash";
import { connect } from "react-redux";
import { formatDate } from "../../../../../utils";
import ApiActions from "../../../../../services/api/actions";
import SimpleBar from "simplebar-react";
import { Styled } from "./style";
import { useRouteMatch } from "react-router-dom";

const RightSidebar = ({ timeTableData, getTimeTable = () => "", sidebarActive, rightSidebarClick = () => "" }) => {
  const [active, setActive] = useState("");

  const match = useRouteMatch();

  const onCardClick = (id) => {
    setActive(id);
    getTimeTable({ groupId: sidebarActive, timeTableId: id });
    rightSidebarClick(id);
  };

  let timeTableValue = get(timeTableData, "result.data.timeTable.value", "");

  return (
    <Styled id={get(match, "params.cardId", "")}>
      <div className="main__body">
        <SimpleBar style={{ width: "300px" }}>
          <div>
            <div className="rightSide">
              <div className="rightSideBar">
                <div className="upperInfo">
                  <div className="aboutUser">
                    <div className="userName">
                      <Icon icon="icon-glasses" color="#777E90" className="userIcon" />
                      <p>
                        {/* {get(
                          get(timeTableData, "result.data.timeTable.options", []).find((val) => val.id === timeTableValue),
                          "mentor.fullName",
                          ""
                        )} */}
                        {Object.values(get(timeTableData, "result.data.mentors", {}))}
                      </p>
                    </div>
                    <div className="userName">
                      <Icon icon="icon-clock" color="#777E90" className="userIcon" />
                      <p className="type-time">
                        {" "}
                        {formatDate(
                          new Date(
                            get(
                              get(timeTableData, "result.data.timeTable.options", [""]).find((val) => val.id === timeTableValue),
                              "lessonStartTime",
                              ""
                            )
                          ),
                          "hh:mm"
                        )}{" "}
                        /{" "}
                        {formatDate(
                          new Date(
                            get(
                              get(timeTableData, "result.data.timeTable.options", []).find((val) => val.id === timeTableValue),
                              "lessonEndTime",
                              ""
                            )
                          ),
                          "hh:mm"
                        )}
                      </p>
                    </div>
                    <div className="userName">
                      <Icon icon="icon-date" color="#777E90" className="userIcon" />
                      <p className="type">
                        {get(
                          get(timeTableData, "result.data.timeTable.options", []).find((val) => val.id === timeTableValue),
                          "weekdays.value",
                          []
                        ).join(" , ")}
                      </p>
                    </div>
                  </div>
                  <div className="userLessons">
                    <div className="allLesson">
                      <div>{get(timeTableData, "result.data.totalNumberOfLessons", null)}</div>
                      <p>Total number of lessons</p>
                    </div>
                    <div className="allLesson">
                      <div>{get(timeTableData, "result.data.numberOfLearnedLessons", null)}</div>
                      <p>Lessons learned</p>
                    </div>
                    <div className="allLesson">
                      <div>{get(timeTableData, "result.data.numberOfRemainingLessons", null)}</div>
                      <p>The remaining lessons</p>
                    </div>
                  </div>
                </div>
                <div className="lessonStatus prop">
                  {get(timeTableData, "result.data.timeTable.options", []).map((value, index) => (
                    <div
                      key={value.id}
                      className={`lessonStatusCard ${
                        (active === value.id || get(timeTableData, "result.data.timeTable.value") === value.id) && "active"
                      }`}
                      onClick={() => onCardClick(value.id)}
                    >
                      <div className="numberOfLessons">{value.orderIndex}</div>
                      <div className="statusPart">
                        <div className="timetable">
                          <Icon icon="icon-timetable-date" className="iconTimetable" color="#777E90" />
                          <p>{value.name}</p>
                        </div>
                        <div className="timetable">
                          <Icon icon="icon-glasses" className="iconTimetable" color="#777E90" />
                          <p>{get(value, "mentor.fullName")}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SimpleBar>
      </div>
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
    getTimeTable: ({ groupId, timeTableId }) => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          method: "get",
          storeName: "timeTableData",
          url: `education/v1/time-table/dashboard?groupId=${groupId}${timeTableId ? `&timeTableId=${timeTableId}` : ``}`,
        },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RightSidebar);
