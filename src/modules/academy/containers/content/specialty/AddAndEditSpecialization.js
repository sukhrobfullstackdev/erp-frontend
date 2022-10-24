import React, { useEffect, useMemo, useState } from "react";
import { get, includes, isArray, isEmpty, isNil } from "lodash";
import { connect } from "react-redux";
import { Col, Row } from "react-grid-system";
import { Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { withTranslation } from "react-i18next";

import Form from "../../../../../containers/Form/form-demo";
import Box from "../../../../../components/elements/box";
import Normalizer from "../../../../../services/normalizer";
import CardOfSpecialization from "../../../../../components/elements/cardOfSpecialization";
import ApiActions from "../../../../../services/api/actions";
import CourseScheme from "../../../../../schema/CourseScheme";
import Field from "../../../../../containers/Form/field";
import Button from "../../../../../components/elements/button";
import Icon from "../../../../../components/elements/icon";
import TrashIcon from "../../../../../assets/icons/recycle.svg";
import DragAndDrop from "../../../../../components/darg-and-drop/drag-and-drop";
import { Draggable } from "react-beautiful-dnd";

const EditStyle = styled.div`
  .box {
    padding: 31px 28px 0;
    min-height: 100vh;
    .col-box {
      padding-left: 10px !important;
      padding-right: 10px !important;
    }

    .content__box {
      background: #ffffff;
      box-shadow: 0px 8px 16px -8px rgba(15, 15, 15, 0.2);
      border-radius: 10px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .top__content {
        padding: 24px 24px 30px 24px;
        border-bottom: 1px solid #f4f5f6;

        .form-textarea-label {
          margin-top: 20px;
          font-size: 12px;
          line-height: 12px;
          text-transform: uppercase;
          color: #777e91;
          margin-bottom: 8px;
        }

        .form-label {
          font-size: 12px;
          line-height: 12px;
          text-transform: uppercase;
          color: #777e91;
          margin-bottom: 10px;
        }

        .form-input-container {
          height: 50px;
          .form-input {
            height: 45px;
            position: absolute;
            top: 0;
            left: 0;
          }
        }

        .form-textarea {
          min-height: 100px;
          font-size: 16px;
          line-height: 24px;
          padding: 14px;
          resize: inherit;
        }
      }

      .middle__content {
        margin-top: 30px;
        padding: 30px 24px;
        min-height: 30vh;
        position: relative;

        .empty {
          font-weight: normal;
          font-size: 18px;
          line-height: 27px;
          color: #b1b5c4;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .course {
          display: flex;
          align-items: center;
          background: #fcfcfd;
          border-radius: 8px;
          height: 50px;
          padding: 14px;
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
          color: #353945;
          margin-bottom: 8px;
          position: relative;

          .draggin-icon {
            margin-right: 15px;

            .ui__icon__wrapper {
              cursor: grab !important;
              border-radius: 0;

              .icon {
                width: 12px !important;
                height: 18px;
              }
            }
          }

          .trashIcon {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            background: rgba(239, 70, 111, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            right: 9px;
            cursor: pointer;
            img {
              width: 20px;
              height: 20px;
            }
          }
        }

        [role="button"] {
          cursor: default;
        }
      }

      .footer__content {
        display: flex;
        justify-content: flex-end;
        padding: 10px 24px;
        background: #fcfcfd;
        border-radius: 0px 0px 10px 10px;
        border-top: 1px solid #f4f5f6 !important;
        border-top: none;

        .clear-button {
          button {
            height: 40px;
            border-radius: 8px;
            font-weight: 500;
            font-size: 14px;
            line-height: 21px;
            padding: 10px 16px;
          }
        }
      }

      &.right {
        padding: 20px;
        .roww {
          margin-right: 0px !important;
        }
        .coll {
          padding-right: 0px !important;
        }
        .card {
          margin-bottom: 15px;
        }
      }
    }

    .form-footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      position: fixed;
      width: 100vw;
      right: 0;
      bottom: 0;
      padding: 20px 38px;
      z-index: 1;
      background: #fafbfc;

      .checkbox-with-button {
        button {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fcfcfd;
          border: 1px solid #e6e8ec;
          box-sizing: border-box;
          border-radius: 8px;
          height: 40px;
          padding: 12px;
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;
          color: #353945;

          .rc-checkbox {
            margin-right: 11px;
          }

          .ui__icon__wrapper {
            .icon {
              width: 12px !important;
              height: 12px !important;
            }
          }
        }
      }

      .checkbox-degree {
        display: flex;
        align-items: center;
      }

      form {
        display: flex;
      }

      .cancel,
      .add {
        button {
          font-size: 14px;
          line-height: 21px;
          border-radius: 8px;
          height: 40px;
          min-width: 67px;
        }
      }

      .cancel {
        margin: 0 10px;
      }

      .activeBtn {
        margin-left: 10px;
      }
    }
  }
`;

const ItemBody = ({ item, addOrRemoveFromSelectedCourses }) => {
  return (
    <Draggable draggableId={item.id}>
      {(provided, snapshot) => (
        <div className="course" {...provided.dragHandleProps} {...provided.draggableProps}>
          <Icon icon="icon-dots" ref={provided.innerRef} color={"#B1B5C4"} mainClassName={"draggin-icon"} />
          {get(item, "name")}
          <div className="trashIcon" onClick={() => addOrRemoveFromSelectedCourses(get(item, "id"))}>
            <img src={TrashIcon} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

const AddAndEditSpecialization = ({
  entities,
  getCourses,
  courses,
  t,
  getSpecialization,
  specialization,
  addItemRequest,
  editData,
}) => {
  const match = useRouteMatch();

  const id = get(match, "params.id", "");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [editable, setEditable] = useState(null);
  const [checkboxes, setCheckboxes] = useState({
    noDegree: false,
    active: false,
  });
  const [color, setColor] = useState("");

  useEffect(() => getCourses(), [editable]);

  useEffect(() => editable && getSpecialization(id), [editable]);

  useEffect(() => setEditable(includes(match.url, "edit")), [match]);
  useEffect(() => {
    setSelectedCourses(get(specialization, "result.data.courses", []));
  }, [specialization]);

  courses = useMemo(() => Normalizer.Denormalize(courses, { result: { data: [CourseScheme] } }, entities), [courses]);
  courses = get(courses, "result.data", []);

  const submitHandling = ({ data, setError }) => {
    data.active = checkboxes.active;
    data.noDegree = checkboxes.noDegree;
    data.courses = selectedCourses;
    data.color = color;
    if (editable) {
      editData(
        {
          attributes: data,
          formMethods: {
            setError,
          },
          cb: {
            success: (res) => {
              // history.push(`/academic/academic-content/specialization`);
              window.location.replace("/academic/academic-content/specialization");
            },
            fail: (res) => {},
          },
        },
        id
      );
    } else
      addItemRequest({
        attributes: data,
        formMethods: {
          setError,
        },
        cb: {
          success: (res) => {
            // history.push(`/academic/academic-content/specialization`);
            window.location.replace("/academic/academic-content/specialization");
          },
          fail: (res) => {},
        },
      });
  };

  const addOrRemoveFromSelectedCourses = (id) => {
    if (selectedCourses.some((item) => item.id === id)) setSelectedCourses(selectedCourses.filter((item) => item.id !== id));
    else {
      let selectedCourse = courses.find((i) => i.id === id);
      setSelectedCourses([...selectedCourses, selectedCourse]);
    }
  };

  return (
    <EditStyle>
      <Box sm gray className={"box"}>
        <Form
          formRequest={submitHandling}
          footer={
            <div className={"form-footer"}>
              <Form>
                <Field
                  type={"checkbox"}
                  name={"noDegree"}
                  sm
                  inBtn
                  onChange={(e) =>
                    setCheckboxes((item) => ({
                      ...item,
                      noDegree: e,
                    }))
                  }
                  defaultValue={get(specialization, "result.data.noDegree", false)}
                  label={
                    <div className={"checkbox-degree"}>
                      {t("specialization-checkbox-degree-label") ?? "No Degree"}
                      <Icon icon={"icon-question"} />
                    </div>
                  }
                />
                <Field
                  className={"activeBtn"}
                  type={"checkbox"}
                  name={"active"}
                  sm
                  onChange={(e) =>
                    setCheckboxes((item) => ({
                      ...item,
                      active: e,
                    }))
                  }
                  inBtn
                  defaultValue={get(specialization, "result.data.active", false)}
                  label={
                    <div className={"checkbox-degree"}>
                      {t("specialization-checkbox-active-label") ?? "Active"}
                      <Icon icon={"icon-question"} />
                    </div>
                  }
                />
              </Form>
              <Link to={"/academic/academic-content/specialization"}>
                <Button className={"cancel"} outlineDanger>
                  {t("cancel") ?? "Cancel"}
                </Button>
              </Link>
              <Button type={"submit"} className={"add"} success>
                {editable ? "Save" : "Add"}
              </Button>
            </div>
          }
        >
          <Row>
            <Col xs={6} className={"col-box"}>
              <div className="content__box left">
                <div className={"top__content"}>
                  <Field
                    getColor={(color) => setColor(color)}
                    addColor
                    type={"input"}
                    name={"name"}
                    params={{ required: true }}
                    labelRequired
                    label={t("specialization-name-label") ?? "Specialization"}
                    defaultValue={get(specialization, "result.data.name", "")}
                  />
                  <Field
                    type={"textarea"}
                    name={"description"}
                    label={t("specialization-description-label") ?? "Description"}
                    defaultValue={get(specialization, "result.data.description", "")}
                  />
                </div>
                <div className="middle__content">
                  <div className="selectedCourses">
                    {isEmpty(selectedCourses) && <div className={"empty"}>{t("specialization-empty") ?? "INFO NO FOUND"}</div>}
                    <DragAndDrop
                      data={selectedCourses}
                      ItemBody={ItemBody}
                      addOrRemoveFromSelectedCourses={addOrRemoveFromSelectedCourses}
                      getDataFromDragContext={setSelectedCourses}
                    />
                  </div>
                </div>
                <div className="footer__content">
                  <Button className={"clear-button"} primary onCLick={() => setSelectedCourses([])}>
                    {t("clear-all") ?? "Clear all"}
                  </Button>
                </div>
              </div>
            </Col>
            <Col xs={6} className={"col-box"}>
              <div className="content__box right">
                <Row className={"roww"}>
                  {isArray(courses) &&
                    courses.map((item) => (
                      <Col key={get(item, "id")} className={"coll"} xs={4}>
                        <CardOfSpecialization
                          className={"card"}
                          id={get(item, "id")}
                          selected={selectedCourses.some((selectedCourse) => selectedCourse.id === item.id)}
                          textActive={get(item, "active", false)}
                          name={get(item, "name", "")}
                          onChange={(id) => addOrRemoveFromSelectedCourses(id)}
                        />
                      </Col>
                    ))}
                </Row>
              </div>
            </Col>
          </Row>
        </Form>
      </Box>
    </EditStyle>
  );
};

const mapStateToProps = (state) => ({
  departmentList: get(state, "normalizer.data.department-list", []),
  entities: get(state, "normalizer.entities", {}),
  courses: get(state, "normalizer.data.courses", []),
  specialization: get(state, "api.specialization.data", []),
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCourses: () => {
      const storeName = "courses";
      const entityName = "courses";
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "academic-content/v1/course/all-courses",
          config: {
            params: {},
          },
          scheme: { data: [CourseScheme] },
          storeName: storeName,
          entityName: entityName,
        },
      });
    },
    getSpecialization: (id) => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: `academic-content/v1/specialization/get-one-specialization/${id}`,
          method: "get",
          storeName: "specialization",
        },
      });
    },

    addItemRequest: ({ attributes, formMethods, cb }) => {
      dispatch({
        type: ApiActions.OPERATION_ADD.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          url: "academic-content/v1/specialization/add-specialization",
        },
      });
    },
    editData: ({ attributes, formMethods, cb }, id) => {
      dispatch({
        type: ApiActions.OPERATION_UPDATE.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          url: `academic-content/v1/specialization/edit-specialization/${id}`,
        },
      });
    },
  };
};

export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(AddAndEditSpecialization));
