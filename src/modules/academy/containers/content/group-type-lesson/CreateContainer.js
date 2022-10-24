import React, { memo, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { Col, Row } from "react-grid-system";
import { get, isEmpty, isNil, isNull, last, split } from "lodash";
import { withTranslation } from "react-i18next";
import DropBox from "./components/Dropbox";
import { getSelectOptionsListFromData } from "../../../../../utils";
import Normalizer from "../../../../../services/normalizer";
import SpecializationScheme from "../../../../../schema/SpecializationScheme";
import GroupTypeScheme from "../../../../../schema/GroupTypeScheme";
import Box from "../../../../../components/elements/box";
import Flex from "../../../../../components/elements/flex";
import Button from "../../../../../components/elements/button";
import Label from "../../../../../components/elements/label";
import Select from "../../../../../components/elements/select/Select";
import Tabs from "../../../../../components/tabs";
import LessonItem from "../../../components/LessonItem";
import ApiActions from "../../../../../services/api/actions";
import { InitialLoader } from "../../../../../components/loader";
import Modal from "../../../../../components/elements/modal";
import Field from "../../../../../containers/Form/field";
import FormDemo from "../../../../../containers/Form/form-demo";
import Icon from "../../../../../components/elements/icon";
import DeleteModule from "../../../../../components/elements/deleteModule";
import ContainerStyle from "./ContainerStyle";

const CreateContainer = ({
  t,
  getSpecializationList,
  specializationList,
  getGroupTypeList,
  entities,
  groupTypeList,
  getModuleLessons,
  moduleLessons,
  addTabRequest,
  addLessonRequest,
  deleteLessonRequest,
  addPracticeOrExamRequest,
  request,
  ...rest
}) => {
  const [groupTypeId, setGroupTypeId] = useState(null);
  const [specializationId, setSpecializationId] = useState(null);
  const [state, setState] = useState({
    modal: false,
    deleteModal: false,
    deleteModalTemp: {},
    courseParts: [],
    groupTypeSpecializations: [],
    activeTab: 0,
    canImport: false,
  });

  useEffect(() => {
    if (isNil(groupTypeId) && isNil(specializationId)) {
      getSpecializationList({});
      getGroupTypeList({});
    }
  }, []);

  useEffect(() => {
    if (!isNil(specializationId) && !isNil(groupTypeId)) {
      getModuleLessons({ params: { specializationId, groupTypeId } });
    }
  }, [groupTypeId, specializationId]);

  useEffect(() => {
    let temp = {};
    if (get(moduleLessons, "result.data.groupTypeSpecializations"))
      temp = {
        ...temp,
        groupTypeSpecializations: get(moduleLessons, "result.data.groupTypeSpecializations", []),
      };

    if (get(moduleLessons, "result.data.courseParts"))
      temp = {
        ...temp,
        courseParts: get(moduleLessons, "result.data.courseParts"),
      };

    setState((s) => ({
      ...s,
      ...temp,
      canImport: get(moduleLessons, "result.data.canImport", false),
    }));
  }, [moduleLessons]);

  if (!isEmpty(state.groupTypeSpecializations) || !isEmpty(state.courseParts)) {
    if (isNil(specializationId) && isNil(groupTypeId))
      setState((s) => ({
        ...s,
        groupTypeSpecializations: [],
        courseParts: [],
      }));
  }

  specializationList = useMemo(
    () => Normalizer.Denormalize(specializationList, { result: { data: [SpecializationScheme] } }, entities),
    [specializationList]
  );

  const specializationDataList = get(specializationList, "isFetched") ? get(specializationList, "result.data", []) : [];

  groupTypeList = useMemo(
    () => Normalizer.Denormalize(groupTypeList, { result: { data: [GroupTypeScheme] } }, entities),
    [groupTypeList]
  );
  const groupTypeDataList = get(groupTypeList, "isFetched", false) ? get(groupTypeList, "result.data", []) : [];

  const addTopicTab = () => {
    addTabRequest({
      attributes: { groupTypeId, specializationId },
      formMethods: {},
      cb: {
        success: (nData = {}, { data: { groupTypeSpecializations, courseParts, canImport } }) => {
          setState((s) => ({
            ...s,
            groupTypeSpecializations,
            canImport,
          }));
        },
        fail: (e) => "",
      },
    });
  };

  const addLesson = (item, index) => {
    addLessonRequest({
      attributes: {
        groupTypeSpecializationId: get(state, `groupTypeSpecializations[${state.activeTab}].id`, null),
        indexOfGroupTypeSpecialization: state.activeTab + 1,
        lessonTemplateId: get(item, "id"),
      },
      formMethods: {},
      cb: {
        success: (nData = {}, data = {}) => {
          setState((s) => ({
            ...s,
            courseParts: get(data, "data.courseParts", []),
            groupTypeSpecializations: get(data, "data.groupTypeSpecializations", []),
          }));
        },
        fail: (e) => "",
      },
    });
  };

  const deleteLesson = (lessonItemId, lessonId) => {
    deleteLessonRequest({
      id: lessonItemId,
      formMethods: {},
      cb: {
        success: ({ data: { groupTypeSpecializations, courseParts, canImport } }) => {
          setState((s) => ({
            ...s,
            courseParts,
            groupTypeSpecializations,
            canImport,
          }));
        },
        fail: (e) => "",
      },
    });
  };

  const getLessonOrderIndex = (index, type) => {
    const activeLessons = get(state, `groupTypeSpecializations[${state.activeTab}].groupTypeLessons`, []);
    let lesson = get(activeLessons, `[${index}]`, null);
    if (type === "bottom") lesson = get(activeLessons, `[${index + 1}]`, null);

    return get(lesson, "orderIndex", null);
  };

  const addPracticeOrExam = ({ attributes = {}, lessonId = null, currentIndex = null }) => {
    addPracticeOrExamRequest({
      attributes: {
        ...attributes,
        groupTypeSpecializationId: get(state, `groupTypeSpecializations[${state.activeTab}].id`, null),
        top: getLessonOrderIndex(currentIndex),
        bottom: getLessonOrderIndex(currentIndex, "bottom"),
      },
      formMethods: {},
      cb: {
        success: (d, { data: { groupTypeSpecializations, courseParts, canImport } }) => {
          setState((s) => ({
            ...s,
            courseParts,
            groupTypeSpecializations,
            canImport,
          }));
        },
        fail: (e) => "",
      },
    });
  };

  const changeOrder = (arr, data, type = "") => {
    let url = "academic-content/v1/group-type-specialization/change-order-index";
    if (type === "move")
      url = "academic-content/v1/group-type-specialization/move-group-type-lesson-item-in-group-type-specialization";
    request({
      attributes: data,
      cb: {
        success: ({ data: { groupTypeSpecializations, canImport } }) => {
          setState((s) => ({
            ...s,
            groupTypeSpecializations,
            canImport,
          }));
        },
        fail: (e) => "",
      },
      method: "put",
      url,
    });
  };

  const changeOrderTab = (list, position) => {
    position.groupTypeSpecializationId = get(position, `id`, null);
    position.groupTypeLessonId = null;
    position.groupTypeLessonItemId = null;
    changeOrder([], position, "tab");
  };

  const moveLessonItemToLesson = (id) => {
    request({
      attributes: {
        groupTypeLessonItemId: id,
        groupTypeSpecializationId: get(state, `groupTypeSpecializations[${state.activeTab}].id`, null),
      },
      cb: {
        success: ({ data: { groupTypeSpecializations, courseParts, canImport } }) => {
          setState((s) => ({
            ...s,
            groupTypeSpecializations,
            canImport,
          }));
        },
        fail: (e) => "",
      },
      url: "academic-content/v1/group-type-specialization/create-lesson-from-item",
      method: "post",
    });
  };

  const duplicateLessonPlane = ({ data }) => {
    request({
      attributes: {
        ...data,
        specializationId,
        currentGroupTypeId: groupTypeId,
      },
      cb: {
        success: ({ data: { courseParts, groupTypeSpecializations, canImport } }) => {
          setState((s) => ({
            ...s,
            courseParts,
            groupTypeSpecializations,
            canImport,
          }));
        },
        fail: (e) => "",
      },
      url: "academic-content/v1/group-type-specialization/duplicate-lesson-plan",
      method: "post",
    });
  };

  const deleteTab = (id, index) => {
    state.groupTypeSpecializations.splice(index, 1);
    setState({ ...state, deleteModal: false, deleteModalTemp: {} });

    request({
      attributes: {},
      cb: {
        success: ({ data: { courseParts, groupTypeSpecializations, canImport } }) => {
          setState({
            ...state,
            courseParts,
            groupTypeSpecializations,
            canImport,
            activeTab: isNil(state.activeTab) ? 0 : state.activeTab,
            deleteModal: false,
            deleteModalTemp: {},
          });
        },
        fail: (e) => "",
      },
      url: `academic-content/v1/group-type-specialization/remove-group-type-specialization/${id}`,
      method: "delete",
    });
  };

  if (!get(moduleLessons, "isFetched", true)) return <InitialLoader />;

  return (
    <ContainerStyle>
      <Box sm>
        <Row>
          <Col xs={12} className={"text-right"}>
            <Flex justify={"flex-end"}>
              <Button
                className={"mr-5"}
                disabled={isNil(specializationId) || isNil(groupTypeId) || !state.canImport}
                onCLick={() => setState((s) => ({ ...s, modal: true }))}
              >
                {t("Import") ?? "Import"}
              </Button>
              <Button disabled={isNil(specializationId) || isNil(groupTypeId)} onCLick={addTopicTab} success>
                {t("Add temp module") ?? "Add temp module"}
              </Button>
            </Flex>
          </Col>
        </Row>
      </Box>
      <Box gray>
        <Row className={"mb-15"}>
          {get(specializationList, "isFetched", false) && (
            <Col xs={3}>
              <Label>{t("Select SPECIALIZATION") ?? "Select SPECIALIZATION"}</Label>
              <Select
                isSearchable={true}
                defaultValue={specializationId}
                options={specializationDataList}
                onChange={(value) => setSpecializationId(value)}
                valueKey={"id"}
                labelKey={"name"}
              />
            </Col>
          )}
          {get(groupTypeList, "isFetched") && (
            <Col xs={3}>
              <Label>{t("Select GROUP") ?? "Select GROUP"}</Label>
              <Select
                isSearchable={true}
                defaultValue={groupTypeId}
                options={groupTypeDataList}
                onChange={(value) => setGroupTypeId(value)}
                valueKey={"id"}
                labelKey={"name"}
              />
            </Col>
          )}
        </Row>
        {!isEmpty(state.groupTypeSpecializations) && (
          <Box xs className="tab-container">
            <Tabs
              drag
              index={state.activeTab}
              setActiveTab={(e) =>
                state.activeTab !== e &&
                setState((s) => ({
                  ...s,
                  activeTab: e,
                }))
              }
              leftList={state?.groupTypeSpecializations?.map(({ name = null, id = null, groupTypeLessons = [] }, index) => {
                let tabName = last(split(name, "-"));
                return {
                  name: (
                    <div>
                      {`${index + 1} | ${tabName}`}
                      <Icon
                        icon={"icon-exit"}
                        mainClassName={"exit"}
                        color={"var(--white)"}
                        mainOnClick={() =>
                          setState((s) => ({
                            ...s,
                            deleteModal: true,
                            deleteModalTemp: {
                              id,
                              index,
                              name,
                            },
                          }))
                        }
                      />
                      <div className="lessonsCount">{groupTypeLessons.length}</div>
                    </div>
                  ),
                  id,
                };
              })}
              rightList={[]}
              changeOrder={changeOrderTab}
              leftContent={state?.groupTypeSpecializations?.map((item, index) => (
                <DropBox
                  key={index}
                  {...{
                    moveLessonItemToLesson,
                    changeOrder,
                    addPracticeOrExam,
                    item,
                    deleteLesson,
                  }}
                />
              ))}
              rightContent={[]}
            />
          </Box>
        )}
        {!isEmpty(get(moduleLessons, "result.data.courseParts", [])) && (
          <Box>
            <Row>
              {state?.courseParts?.map((coursePart, index) => (
                <Col xs={12} key={index}>
                  <hr />
                  <Flex>
                    <Button color={"#fff"} bg={get(coursePart, "colorCode", "#9757D7")} className={"mb-20 mr-8"}>
                      {get(coursePart, "name", "-")}
                    </Button>
                    <Button color={"#fff"} bg={get(coursePart, "colorCode", "#9757D7")}>
                      {get(coursePart, "courseName", "-")}
                    </Button>
                  </Flex>
                  {get(coursePart, "lessonTemplates", []).map((lessonTemplate, index) => (
                    <LessonItem
                      key={get(lessonTemplate, "id", index)}
                      addLesson={addLesson}
                      index={index}
                      item={lessonTemplate}
                    />
                  ))}
                </Col>
              ))}
            </Row>
          </Box>
        )}
      </Box>

      {/* MODAL */}
      <Modal active={state?.modal} onClose={() => setState((s) => ({ ...s }))}>
        <FormDemo formRequest={duplicateLessonPlane}>
          <Row>
            <Col xs={12} className={"mb-26"}>
              <Field
                type={"custom-select"}
                defaultValue={groupTypeId}
                name={"copyGroupTypeId"}
                label={t("select_group_type") ?? "Select Group Type"}
                options={groupTypeDataList}
                params={{ required: true }}
                defaultHideAnimation={false}
                valueKey={"id"}
                labelKey={"name"}
              />
            </Col>
            <Col xs={12}>
              <Flex justify={"flex-end"} align={"center"}>
                <Button
                  className="cancelBtn"
                  outlineDanger
                  onCLick={() =>
                    setState((s) => ({
                      ...s,
                      modal: false,
                    }))
                  }
                >
                  {t("cancel") ?? "Cancel"}
                </Button>
                <Button className="addBtn" success type={"submit"}>
                  {t("save") ?? "Save"}
                </Button>
              </Flex>
            </Col>
          </Row>
        </FormDemo>
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        className={"deleteModal"}
        active={state.deleteModal}
      >
        <DeleteModule
          value={state.deleteModal ? "" : " "}
          moduleName={get(state, "deleteModalTemp.name", "aslamjon")}
          cancel={() =>
            setState((s) => ({
              ...s,
              deleteModal: false,
              deleteModalTemp: {},
            }))
          }
          yes={() => deleteTab(get(state, "deleteModalTemp.id", ""), get(state, "deleteModalTemp.index", ""))}
        />
      </Modal>
    </ContainerStyle>
  );
};

const mapStateToProps = (state, props) => {
  return {
    entities: get(state, "normalizer.entities", {}),
    specializationList: get(state, `normalizer.data.specialization-data-list`, {}),
    groupTypeList: get(state, `normalizer.data.group-type-data-list`, {}),
    moduleLessons: get(state, `api.module-lessons.data`, {}),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getSpecializationList: ({ params = {} }) => {
      const storeName = `specialization-data-list`;
      const entityName = "specialization";
      const scheme = { data: [SpecializationScheme] };
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: `academic-content/v1/specialization/all-specialization`,
          config: params,
          scheme,
          storeName,
          entityName,
        },
      });
    },
    getGroupTypeList: ({ params = {} }) => {
      const storeName = `group-type-data-list`;
      const entityName = "group-type";
      const scheme = { data: [GroupTypeScheme] };
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: `education/v1/group-type`,
          config: params,
          scheme,
          storeName,
          entityName,
        },
      });
    },

    getModuleLessons: ({ params = {} }) => {
      const storeName = `module-lessons`;
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: `academic-content/v1/group-type-specialization/get-group-type-specialization`,
          config: params,
          storeName,
        },
      });
    },
    addTabRequest: ({ attributes, formMethods = {}, cb = {} }) => {
      dispatch({
        type: ApiActions.OPERATION_ADD.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          url: "academic-content/v1/group-type-specialization/add-group-type-specialization",
        },
      });
    },
    addLessonRequest: ({ attributes, formMethods = {}, cb = {} }) => {
      dispatch({
        type: ApiActions.OPERATION_ADD.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          url: "academic-content/v1/group-type-specialization/add-lesson-to-group-type-specialization",
        },
      });
    },
    deleteLessonRequest: ({ id, formMethods = {}, cb }) => {
      dispatch({
        type: ApiActions.OPERATION_DELETE.REQUEST,
        payload: {
          id,
          formMethods,
          cb,
          url: `academic-content/v1/group-type-specialization/remove-lesson-item-from-group-type-lesson/${id}`,
        },
      });
    },
    addPracticeOrExamRequest: ({ attributes, formMethods = {}, cb = {} }) => {
      dispatch({
        type: ApiActions.OPERATION_ADD.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          url: "academic-content/v1/group-type-specialization/add-exam-or-practice",
        },
      });
    },
    request: ({ attributes, formMethods = {}, cb = {}, method = "get", url }) => {
      dispatch({
        type: ApiActions.REQUEST.REQUEST,
        payload: {
          attributes,
          cb,
          url,
          method,
        },
      });
    },
  };
};

export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(memo(CreateContainer)));
