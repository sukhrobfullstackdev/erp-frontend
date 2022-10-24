import React, { useState, useEffect, memo, useMemo, useCallback } from "react";
import { Col, Row } from "react-grid-system";
import styled from "styled-components";
import Collapse from "../../../../components/elements/collapse";
import { isArray, get, isNil, head, isNull } from "lodash";
import Field from "../../../../containers/Form/field";
import AddButton from "../../components/addButton";
import { withTranslation } from "react-i18next";
import TrashIcon from "./../../../../assets/icons/trash-icon.svg";
import Button from "../../../../components/elements/button";
import { generateId } from "utils";

const StyledEducationCollapse = styled(Collapse)`
  &.fourthCollapse {
    &.active {
      margin-bottom: 50px;
      .collapse__body {
        padding: 40px 30px;
        .education-item {
          .deleteBtn {
            margin-top: 30px;
            margin-bottom: 20px;
            border-top: 2px dashed #b1b5c4;
            display: flex;
            justify-content: flex-end;
            padding-top: 30px;
            button {
              display: flex;
              align-items: center;
              color: #20262f;
              font-size: 16px;
              font-weight: 500;
              border-radius: 12px;
              height: 50px;
              padding: 0 13px;
              border: 1px solid rgba(239, 70, 111, 0.7);
              img {
                width: 23px;
                height: 23px;
                margin-right: 14px;
              }
            }
          }
          &:first-child {
            .deleteBtn {
              border: none;
              margin-top: 0px;
              padding-top: 0px;
            }
          }
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
  .task_list {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .task {
      button {
        position: absolute;
        bottom: -70px;
        background-color: #45b26b;
        border-radius: 50%;
        height: 60px;
        width: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        .ui__icon__wrapper {
          width: 36px;
          height: 36px;
          .icon {
            width: 36px;
            height: 36px;
          }
        }
      }
    }
  }
  .select__text {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 14px !important;
    padding: 10px 0 4px !important;
    color: #777e91;
  }
  .form-input-container {
    width: 100% !important;
    height: 50px !important;
    input {
      color: #777e91;
      font-size: 16px !important;
      line-height: 24px !important;
    }
  }
  .imgContainer {
    width: 100% !important;
  }
  .first-row {
    margin-bottom: 30px;
  }
  .dateInputContainer {
    height: 50px;
    input {
      color: #777e91;
      font-size: 16px !important;
      line-height: 24px !important;
    }
  }
  .Select__controller {
    height: 50px;
    input {
      font-size: 16px !important;
      line-height: 24px !important;
    }
  }
  .label {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 12px;
    text-transform: uppercase;
    color: #353945;
    margin-bottom: 40px;
    span {
      display: inline-block;
      margin-bottom: 10px;
    }
  }
  .form-label {
    width: 100%;
    line-height: 12px;
    color: #353945;
    margin-bottom: 8px !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .check_btn {
    width: 100%;
    margin-top: 26px;
  }
  .formWrapper {
    width: 100%;
  }
  .checkbox-with-button {
    button {
      height: 50px;
      font-weight: 400;
      font-size: 18px;
      width: 100%;
      display: flex;
      align-items: center;
      background-color: #fcfcfd;
      border-radius: 10px;
      padding: 13px 15px;
      color: #777e90;
      .rc-checkbox {
        margin-right: 15px;
      }
    }
  }
`;

let lengthOfId = 36;
const Education = ({ educations, clickAdd, active = "1", editable = false, t, deleteEducation = () => "", ...props }) => {
  const [education, setEducation] = useState([]);
  const [state, setState] = useState({});

  useEffect(() => {
    if (!isNull(get(head(educations), "id", null)))
      setEducation(
        isArray(educations)
          ? educations?.map((item) => {
              if (isNull(item.id)) item.id = generateId(11);
              return item;
            })
          : []
      );
  }, [educations]);

  const onChangeHandling = useCallback((value, name) => {
    setState((s) => ({ ...s, [name]: value }));
  }, []);
  let studyDegreeOptions = useMemo(() => get(head(educations), "studyDegree.options", []), [educations]);

  return (
    <StyledEducationCollapse title={t("ta’lim") ?? "Ta’lim"} active={active} className="fourthCollapse">
      {isArray(education) &&
        education.map(
          ({ id, studyDegree, organisationName, studyType, startedStudyDate, finishedStudyDate, notFinished }, index) => {
            let isUUIT = id.length === lengthOfId;
            let name = `educations.${id}`;
            return (
              <div key={index + `${id}`} className="education-item">
                {editable && education.length >= 1 && (
                  <div className="deleteBtn">
                    <Button
                      outlineDanger
                      onClick={() => {
                        setEducation((s) => s.filter((item, ind) => ind !== index));
                        deleteEducation(index, String(id));
                      }}
                    >
                      <img src={TrashIcon} alt="trash" />
                      {t("delete") ?? "Delete"}
                    </Button>
                  </div>
                )}
                <Row>
                  <Col>
                    <div className="formWrapper">
                      <Field
                        type={"custom-select"}
                        options={studyDegreeOptions}
                        name={`${name}.studyDegree`}
                        className="inputStyle"
                        {...(!isUUIT
                          ? { defaultValue: get(state, `${name}.studyDegree`) }
                          : { defaultValue: get(studyDegree, "values", []) })}
                        label={t("empoyee-education-study-degree-label") ?? "Level of education"}
                        labelRequired
                        params={{ required: editable }}
                        editable={editable}
                        placeholder="-"
                        isSearchable={editable}
                        valueKey="id"
                        labelKey="name"
                        onChange={(id) => onChangeHandling(id, `${name}.studyDegree`)}
                        isChangeDefaultValue={false}
                      />
                    </div>
                  </Col>
                  <Col>
                    <div className="formWrapper">
                      <Field
                        type={"input"}
                        name={`${name}.organisationName`}
                        className="inputStyle"
                        {...(!isUUIT
                          ? { defaultValue: get(state, `${name}.organisationName`) }
                          : { defaultValue: organisationName })}
                        label={t("empoyee-education-organisation-name-label") ?? "Name of organization"}
                        labelRequired
                        params={{ required: editable }}
                        property={{
                          placeholder: "TATU",
                        }}
                        disabled={!editable}
                        onChange={(value) => onChangeHandling(value, `${name}.organisationName`)}
                      />
                    </div>
                  </Col>
                  <Col>
                    <div className="formWrapper">
                      <Field
                        type={"input"}
                        name={`${name}.studyType`}
                        className="inputStyle"
                        {...(!isUUIT ? { defaultValue: get(state, `${name}.studyType`) } : { defaultValue: studyType })}
                        label={t("employee-education-studyType") ?? "The direction of education"}
                        labelRequired
                        params={{ required: editable }}
                        placeholder={t("dasturiy_injiner_placeholder") ?? "Dasturiy injiner"}
                        disabled={!editable}
                        onChange={(value) => onChangeHandling(value, `${name}.studyType`)}
                      />
                    </div>
                  </Col>
                  <Col>
                    <div className="formWrapper">
                      <Field
                        type={"datepicker2"}
                        name={`${name}.startedStudyDate`}
                        label={t("employee-educations-startedStudyDate") ?? "Reading start time"}
                        {...(!isUUIT
                          ? { defaultValue: get(state, `${name}.startedStudyDate`) }
                          : { defaultValue: startedStudyDate })}
                        labelRequired
                        property={{
                          format: "MM / yyyy",
                          placeholder: "mm / yyyy",
                        }}
                        year
                        params={{ required: editable }}
                        onChange={(value) => onChangeHandling(value, `${name}.startedStudyDate`)}
                      />
                    </div>
                  </Col>
                  <Col>
                    <div className="formWrapper">
                      <Field
                        type={"datepicker2"}
                        name={`${name}.finishedStudyDate`}
                        label={t("employee-education-finishedStudyDate") ?? "Graduation time"}
                        {...(!isUUIT
                          ? { defaultValue: get(state, `${name}.finishedStudyDate`) }
                          : { defaultValue: finishedStudyDate })}
                        property={{
                          format: "MM / yyyy",
                          placeholder: "mm / yyyy",
                        }}
                        year
                        onChange={(value) => onChangeHandling(value, `${name}.finishedStudyDate`)}
                      />
                    </div>
                  </Col>
                  <Col>
                    <div className="formWrapper">
                      <Field
                        type={"checkbox"}
                        name={`${name}.notFinished`}
                        className="check check_btn"
                        inBtn={true}
                        label={t("employee-education-notFinished") ?? "Hozir ham o’qiydi"}
                        {...(!isUUIT ? { defaultValue: get(state, `${name}.notFinished`) } : { defaultValue: notFinished })}
                        disabled={!editable}
                        onChange={(value) => onChangeHandling(value, `${name}.notFinished`)}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            );
          }
        )}
      {editable && (
        <AddButton
          className=""
          onClick={() =>
            isNil(clickAdd)
              ? setEducation((s) => [
                  ...s,
                  {
                    id: generateId(11),
                    studyDegree: {},
                    organisationName: "",
                    studyType: "",
                    startedStudyDate: null,
                    finishedStudyDate: null,
                    notFinished: null,
                  },
                ])
              : clickAdd()
          }
        />
      )}
    </StyledEducationCollapse>
  );
};

export default withTranslation("pdp")(memo(Education));
