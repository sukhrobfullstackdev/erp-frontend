import React, { memo, useState } from "react";
import { get, isArray } from "lodash";
import { Col, Row } from "react-grid-system";
import Title from "../../../components/elements/title";
import WorkingDay from "./wokingDay";
import Workhour from "./work_hour";
import { withTranslation } from "react-i18next";

const EmploymentsTimeTable = ({ employeeWorkDayList, index, editable, t }) => {
  const [state, setState] = useState({});
  return (
    <div className="timetable">
      {isArray(employeeWorkDayList) &&
        employeeWorkDayList.map((val, ind) => (
          <Row key={`${ind}${index}`}>
            <Col className="ColDay" md={4}>
              <div className="work_day">
                {ind === 0 && <Title className="title">{t("working_days") ?? "Working days"}</Title>}
                <WorkingDay
                  {...{
                    active: get(val, "working", false),
                    title: get(val, "weekDay", ""),
                    name: `employments[${index}].employeeWorkDayList[${ind}].week${val.weekDay}`,
                    checked: get(val, "working", false),
                    editable,
                    id: ind,
                    changeWorkDayActive: (index, check) =>
                      setState((s) => ({
                        ...s,
                        [ind]: check,
                      })),
                    id: ind,
                  }}
                />
              </div>
            </Col>
            <Col className="ColHours" md={4}>
              <div className="work_hour">
                {ind === 0 && <Title className="title">{t("working_hours") ?? "Working hours"}</Title>}
                <Workhour
                  editable={editable ? get(state, ind, false) : false}
                  name={`employments[${index}].employeeWorkDayList[${ind}]`}
                  lunch={get(val, "lunch", false)}
                  startTime={get(val, "startTime", {})}
                  endTime={get(val, "endTime", {})}
                  index={ind}
                  dataLastIndex={ind === employeeWorkDayList.length - 1}
                />
                {/* {isArray(get(working_hours, "values", workingHours)) && get(working_hours, "values", workingHours).map((val, ind) => (
                              ))} */}
              </div>
            </Col>
            <Col className="ColDinner" md={4}>
              <div className="dinner">
                {ind === 0 && <Title className="title">{t("dinner") ?? "Dinner"}</Title>}
                <Workhour
                  editable={editable ? get(state, ind, false) : false}
                  lunch={get(val, "lunch", false)}
                  name={`employments[${index}].employeeWorkDayList[${ind}]`}
                  index={ind}
                  dataLastIndex={ind === employeeWorkDayList.length - 1}
                  startTime={get(val, "lunchStartTime", [])}
                  endTime={get(val, "lunchEndTime", [])}
                  dinner
                />
              </div>
            </Col>
          </Row>
        ))}
    </div>
  );
};
export default withTranslation("pdp")(memo(EmploymentsTimeTable));
