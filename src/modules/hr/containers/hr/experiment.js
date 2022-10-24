import React, { useState, useEffect, memo, useCallback } from "react";
import { Col, Row } from "react-grid-system";
import { isArray, get, isNil, head, isNull } from "lodash";

import styled from "styled-components";
import Collapse from "../../../../components/elements/collapse";
import Field from "../../../../containers/Form/field";
import AddButton from "../../components/addButton";
import { withTranslation } from "react-i18next";
import TrashIcon from "./../../../../assets/icons/trash-icon.svg";
import Button from "../../../../components/elements/button";

const StyledExperimentCollapse = styled(Collapse)`
  &.fifthCollapse {
    &.active {
      margin-bottom: 50px;
      .collapse__body {
        padding: 40px 30px;
        .exprement-item {
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
  .firstCollapse {
    &.active {
      margin-bottom: 40px;
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
      font-size: 18px;
      width: 100%;
      display: flex;
      align-items: center;
      background-color: #fcfcfd;
      border-radius: 10px;
      padding: 13px 16px;
      color: #777e90;
      .rc-checkbox {
        margin-right: 15px;
      }
    }
  }
`;

const Experiment = ({
  experiment,
  clickAdd,
  active = "1",
  isRequire = false,
  editable,
  t,
  deleteExperiment = () => "",
  ...props
}) => {
  const [experiments, setExperiment] = useState([]);
  const [state, setState] = useState({});

  useEffect(() => {
    if (!isNull(get(head(experiment), "id", null)))
      setExperiment(
        isArray(experiment)
          ? experiment?.map((item) => {
              if (isNull(item.id)) item.id = Math.floor(Math.random() * 987654321);
              return item;
            })
          : []
      );
  }, [experiment]);

  const onChangeHandling = useCallback((value, name, index) => {
    // setExperiment((s) => {
    //   s[index][name] = value;
    //   return [...s];
    // });
    setState((s) => ({ ...s, [name]: value }));
  }, []);

  const getDefaultValue = (value, name) => {
    if (value && get(state, name)) return get(state, name);
    else if (value) return value;
    if (get(state, name)) return get(state, name);
  };

  return (
    <StyledExperimentCollapse title={t("tajriba") ?? "TAJRIBA"} active={active} className="fifthCollapse">
      {isArray(experiments) &&
        experiments.map(({ id, organisationName, position, startedWorkDate, finishedWorkDate, notFinished }, index) => {
          let name = `experiences.${id}`;
          return (
            <div key={index + `${id}`} className="exprement-item">
              {editable && experiments && experiments.length >= 1 && (
                <div className="deleteBtn">
                  <Button
                    outlineDanger
                    onClick={() => {
                      setExperiment((s) => s.filter((item, ind) => ind !== index));
                      deleteExperiment(index, String(id));
                    }}
                  >
                    <img src={TrashIcon} alt="trash" />
                    {t("delete") ?? "Delete"}
                  </Button>
                </div>
              )}
              <Row>
                <Col xs={2}>
                  <div className="formWrapper">
                    <Field
                      name={`${name}.organisationName`}
                      type={"input"}
                      className="inputStyle"
                      defaultValue={getDefaultValue(organisationName, `${name}.organisationName`)}
                      label={t("employee-experiences-organisationName-label") ?? "NAME OF THE ORGANIZATION"}
                      labelRequired
                      params={{ required: editable }}
                      property={{
                        placeholder: "PDP Academy",
                      }}
                      disabled={!editable}
                      onChange={(value) => onChangeHandling(value, `${name}.organisationName`)}
                    />
                  </div>
                </Col>
                <Col xs={2}>
                  <div className="formWrapper">
                    <Field
                      name={`${name}.position`}
                      type={"input"}
                      className="inputStyle"
                      label={t("employee-experiences-position-label") ?? "POSITION"}
                      labelRequired
                      params={{ required: editable }}
                      placeholder={t("product_designer_placeholder") ?? "Product Designer"}
                      disabled={!editable}
                      defaultValue={getDefaultValue(position, `${name}.position`)}
                      onChange={(value) => onChangeHandling(value, `${name}.position`)}
                    />
                  </div>
                </Col>
                <Col xs={2}>
                  <div className="formWrapper">
                    <Field
                      name={`${name}.startedWorkDate`}
                      type={"datepicker2"}
                      className="inputStyle"
                      label={t("employee-experiences-startedWorkDate-label") ?? "work_started_date"}
                      labelRequired
                      property={{
                        format: "MM / yyyy",
                        placeholder: "mm / yyyy",
                      }}
                      params={{ required: editable }}
                      disabled={!editable}
                      defaultValue={getDefaultValue(startedWorkDate, `${name}.startedWorkDate`)}
                      onChange={(value) => onChangeHandling(value, `${name}.startedWorkDate`)}
                    />
                  </div>
                </Col>
                <Col xs={2}>
                  <div className="formWrapper">
                    <Field
                      type={"datepicker2"}
                      name={`${name}.finishedWorkDate`}
                      label={t("employee-experiences-finishedWorkDate-label") ?? "Dismissal Time"}
                      property={{
                        format: "MM / yyyy",
                        placeholder: "mm / yyyy",
                      }}
                      year
                      disabled={!editable}
                      defaultValue={getDefaultValue(finishedWorkDate, `${name}.finishedWorkDate`)}
                      onChange={(value) => onChangeHandling(value, `${name}.finishedWorkDate`)}
                    />
                  </div>
                </Col>
                <Col xs={2}>
                  <div className="formWrapper checkWrapper">
                    <Field
                      type={"checkbox"}
                      className="check_btn"
                      name={`${name}.notFinished`}
                      inBtn={true}
                      label={t("employee-experiences-notFinished-label") ?? "still_works"}
                      disabled={!editable}
                      defaultValue={getDefaultValue(notFinished, `${name}.notFinished`)}
                      onChange={(value) => onChangeHandling(value, `${name}.notFinished`)}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          );
        })}
      {editable && (
        <AddButton
          className=""
          onClick={() =>
            isNil(clickAdd)
              ? setExperiment((s) => [
                  ...s,
                  {
                    finishedWorkDate: null,
                    id: Math.floor(Math.random() * 987654321),
                    notFinished: false,
                    organisationName: null,
                    position: null,
                    startedWorkDate: null,
                  },
                ])
              : clickAdd()
          }
        />
      )}
    </StyledExperimentCollapse>
  );
};

export default withTranslation("pdp")(memo(Experiment));
