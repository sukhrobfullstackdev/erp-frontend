import React, { memo, useEffect, useState } from "react";
import Icon from "../../../../components/elements/icon";
import { get, isEqual } from "lodash";
import { Container, TableBody, TableFooter, TimeTable } from "./style";
import TableCard from "./tableCard";
import Button from "../../../../components/elements/button";
import SimpleBar from "simplebar-react";
import { toast } from "react-toastify";
import { withTranslation } from "react-i18next";

function NextTimeTable({
  headType = true,
  students = [],
  // fromTimeTable = {},
  // toTimeTable = {},
  closeModal = () => {},
  moveStudentNextTimeTable = () => {},
  changeStateAfterUpdateData = () => {},
                         selectedTimeTable,
  t,
}) {
  const [nextTimeTableStudents, setNextTimeTableStudents] = useState([]);

  useEffect(() => {
    if (students.length) setNextTimeTableStudents([]);
  },[students]);

  const addStudentNextTimeTable = (student) => {
    setNextTimeTableStudents((students) => [...students, student]);
  };

  const removeStudentNextTimeTable = (student) => {
    setNextTimeTableStudents((students) => [...students.filter((item) => !isEqual(get(item, "id", ""), get(student, "id", "")))]);
  };

  const hasInNextTimeTableStudents = (student) => {
    return nextTimeTableStudents.some((item) => isEqual(get(item, "id", ""), get(student, "id", "")));
  };

  const moveStudentNextTimeTableHandling = () => {
    if (nextTimeTableStudents.length) {
      moveStudentNextTimeTable(
        nextTimeTableStudents.map((item) => get(item, "id", "")),
        get(selectedTimeTable, "id", ""),
        {
          success: (res) => {
            toast.success(get(res, "message", ""));
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
            setNextTimeTableStudents([]);
            closeModal();
          },
          fail: (e) => ""
        },
      );
    } else toast.error("Please select a student");
  };

  return (
    <Container>
      <TimeTable>
        <h1 className="title">Next Timetable</h1>
        <div className="line" />
        <TableBody headType={headType}>
          <div className="rowStyle">
            <div className="headBox">
              <div className="order">
                <p className="orderNum">{students.length}</p>
                <div className="lineDown" />
              </div>
              <div className="headBoxTitle">{`${t("time_table") ?? "Time table"} ${get(selectedTimeTable, "orderIndex","")}`}</div>
              <button
                className={`headBoxBtn ${nextTimeTableStudents.length === students.length && "disabled"}`}
                onClick={() =>
                  nextTimeTableStudents.length !== students.length &&
                  setNextTimeTableStudents([
                    ...nextTimeTableStudents.filter((item) => !isEqual(get(item, "timeTableStatus", ""), "ACTIVE")),
                    ...students.filter((item) => isEqual(get(item, "timeTableStatus", ""), "ACTIVE")),
                  ])
                }
              >
                <Icon icon="icon-double-arrow" color="#fff" size="sm" className="doubleArrow" />
              </button>
            </div>
            <div className="arrow">
              <Icon icon="icon-arrow-right-stick" color="#777E91" className="arrowIcon" />
            </div>
            <div className="headBox second">
              <div className="order">
                <p className={`orderNum`}>{nextTimeTableStudents.length}</p>
                <div className="lineDown" />
              </div>
              <div className="headBoxTitle">{`${t("time_table") ?? "Time table"} ${get(selectedTimeTable, "orderIndex","") + 1}`}</div>
              <button
                className={`headBoxBtn ${nextTimeTableStudents.length === 0 && "disabled"}`}
                onClick={() => nextTimeTableStudents.length !== 0 && setNextTimeTableStudents([])}
              >
                <Icon icon="icon-double-arrow" color="#fff" size="sm" className="doubleArrow" />
              </button>
            </div>
          </div>
          <div className="userData">
            {/*<div>*/}
            <SimpleBar className={"userScroll"}>
              {students.map((student, index) => (
                <TableCard
                  key={index}
                  student={student}
                  index={index}
                  type={hasInNextTimeTableStudents(student) ? "disabled" : "info"}
                  onBtnClick={() => addStudentNextTimeTable(student)}
                />
              ))}{" "}
            </SimpleBar>

            {/*</div>*/}
            {/*<div>*/}
            <SimpleBar className={"userScroll"}>
              {nextTimeTableStudents.map((student, index) => (
                <TableCard
                  key={index}
                  student={student}
                  index={index}
                  // type={!false ? "disabled" : "info"}
                  onBtnClick={() => removeStudentNextTimeTable(student)}
                  rotate={"curved"}
                />
              ))}
            </SimpleBar>
            {/*</div>*/}
          </div>
        </TableBody>
        <TableFooter>
          <div className="cardFooter">
            <div className="freeSpace" />
            <div className="btns">
              <Button className="cancelBtn" onCLick={() => {
                closeModal();
                setNextTimeTableStudents([]);
              }}>
                Cancel
              </Button>
              <Button className="saveBtn" success={"1"} onCLick={moveStudentNextTimeTableHandling}>
                Save
              </Button>
            </div>
          </div>
        </TableFooter>
      </TimeTable>
    </Container>
  );
}

export default withTranslation("pdp")(memo(NextTimeTable));
