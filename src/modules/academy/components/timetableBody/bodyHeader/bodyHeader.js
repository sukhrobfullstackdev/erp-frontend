import classNames from "classnames";
import { get, isEqual, isNull, findIndex } from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Field from "../../../../../containers/Form/field";
import FormDemo from "../../../../../containers/Form/form-demo";
import { formatDate } from "../../../../../utils";

export const Styled = styled.div`
  display: flex;
  .lesson__table__parent {
    border-left: 1px solid #f4f5f6;
    padding: 5px 0;
    position: relative;
    &.parantDisabled {
      background-color: #dddddd;
      border-left: 1px solid #d0d0d0;
      .lesson__table__col {
        opacity: 0.7;
      }
    }
  }
  .lesson__table__col__number {
    font-size: 16px;
    color: #b1b5c4;
  }
  .switcher .rc-checkbox-inner {
    width: 33px;
    height: 13px;
    border-color: #b1b5c4;
    &::after {
      width: 9px;
      height: 9px;
    }
  }
  .form-switch-container {
    display: flex;
    justify-content: center;
  }

  .idNmCh .rc-checkbox {
    height: 11px;
    width: 33px;
  }

  .lesson__table__col {
    width: 80px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0 10px;
    border-radius: 4px;

    &_date {
      font-weight: 600;
      font-size: 10px;
      color: #777e91;
      font-size: 10px;
      line-height: 15px;
    }
  }
`;

const BodyHeader = ({
  studentsData,
  setActiveStudent,
  changeLessonParticipated,
  setParticipatedLessonWithIndexAndBoolean,
                      selectedLessonContentId,
                      setSelectedLessonContentId,
}) => {


  const onHeadData = (lesson, index) => {
    setActiveStudent(null);
    setSelectedLessonContentId(get(lesson,"lessonContentId", ""));
  };

  const changeParticipated = (checked, lessonId, index) => {
    if (lessonId) {
      setParticipatedLessonWithIndexAndBoolean({ index, checked });
      changeLessonParticipated(checked, lessonId);
    }
  };

  return (
    <Styled>
      {get(studentsData, "result.data.lessons.options", []).map((lesson, index) => (
        <div key={get(lesson, "lessonContentId", )} className={"lesson__table__parent"}>
          <div
            // className="lesson__table__col"
            onClick={() => onHeadData(lesson, index)}
            className={classNames(
              "lesson__table__col",
              {
                date: index === 0,
              },
              {
                yashil: !isNull(selectedLessonContentId) && selectedLessonContentId === get(lesson, "lessonContentId")
              }
            )}
          >
            <span className="lesson__table__col__number">{lesson.orderIndex}</span>
            {selectedLessonContentId === get(lesson, "lessonContentId", "") && isEqual(get(lesson, "status", ""), "STARTED") ? (
              <FormDemo>
                <Field
                  type={"switch"}
                  name={"switch"}
                  className="switcher"
                  label={""}
                  onChange={(val) => changeParticipated(val, get(lesson, "id", ""), index)}
                />
              </FormDemo>
            ) : (
              <span className="lesson__table__col_date">
                {formatDate(new Date(get(lesson, "lessonDate", 0)), "MM / dd / yyyy")}
              </span>
            )}
          </div>
        </div>
      ))}
    </Styled>
  );
};

export default BodyHeader;
