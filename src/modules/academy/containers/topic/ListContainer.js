import React, { memo, useEffect, useMemo, useState } from "react";
import { get, isEmpty, isNil } from "lodash";
import GridView from "../../../../containers/GridView/GridView";
import FormDemo from "../../../../containers/Form/form-demo";
import { Col, Row } from "react-grid-system";
import Field from "../../../../containers/Form/field";
import Flex from "../../../../components/elements/flex";
import Button from "../../../../components/elements/button";
import Icon from "../../../../components/elements/icon";
import TopicScheme from "../../../../schema/TopicScheme";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import CourseScheme from "../../../../schema/CourseScheme";
import ApiActions from "../../../../services/api/actions";
import CoursePartScheme from "../../../../schema/CoursePartScheme";
import Normalizer from "../../../../services/normalizer";
import { getSelectOptionsListFromData } from "../../../../utils";
import ComponentBody from "./components/ComponentBody";

const ModalBody = ({ addOrEdit, cancel, item, btnText = "Add", coursePartId, openModal }) => {
  let temp = {};
  if (isEmpty(item) && openModal) temp = { resetData: { name: "", active: false } };

  return (
    <FormDemo
      {...temp}
      formRequest={(data) => {
        data.data.coursePartId = coursePartId;
        addOrEdit(get(item, "id", null), data);
      }}
    >
      <Row>
        <Col xs={12} className={"mb-15"}>
          <Field type={"input"} defaultValue={get(item, "name", "")} name={"name"} label={"name"} params={{ required: true }} />
          <Field
            type={"textarea"}
            name={"description"}
            defaultValue={get(item, "description", "")}
            label={"description"}
            params={{ required: true }}
          />
        </Col>
        <Col xs={12}>
          <Flex justify={"flex-end"} align={"center"}>
            <Field
              defaultValue={get(item, "active")}
              type={"checkbox"}
              inBtn
              name={"active"}
              label={
                <>
                  {" "}
                  Active <Icon icon="icon-question" className="questionIcon" />
                </>
              }
            />
            <Button outlineDanger className="cancelBtn" onCLick={cancel}>
              Cancel
            </Button>
            <Button success className="addBtn" type={"submit"}>
              {btnText}
            </Button>
          </Flex>
        </Col>
      </Row>
    </FormDemo>
  );
};

const ListContainer = ({ t, entities, getCoursesList, coursesList, getCoursePartListByCourse, modulesList, ...rest }) => {
  const [courseId, setCourseId] = useState(null);
  const [coursePartId, setCoursePartId] = useState(null);

  useEffect(() => {
    getCoursesList({});
  }, []);

  useEffect(() => {
    if (!isNil(courseId)) {
      getCoursePartListByCourse({ id: courseId });
    }
  }, [courseId]);

  coursesList = useMemo(() => Normalizer.Denormalize(coursesList, { result: { data: [CourseScheme] } }, entities), [coursesList]);
  const coursesListData = get(coursesList, "isFetched", false)
    ? getSelectOptionsListFromData(get(coursesList, "result.data", []), "id", "name")
    : [];

  modulesList = useMemo(
    () => Normalizer.Denormalize(modulesList, { result: { data: [CoursePartScheme] } }, entities),
    [modulesList]
  );
  const modulesListData = get(modulesList, "isFetched", false)
    ? getSelectOptionsListFromData(get(modulesList, "result.data", []), "id", "name")
    : [];

  return (
    <>
      <GridView
        url={{
          list: `academic-content/v1/lesson-template/all-lesson-template-by-course-part-id?coursePartId=${coursePartId}`,
          one: "academic-content/v1/lesson-template/get-one-lesson-template/",
          add: "academic-content/v1/lesson-template/add-lesson-template",
          update: "academic-content/v1/lesson-template/edit-lesson-template",
          delete: "academic-content/v1/lesson-template/delete-lesson-template",
        }}
        storeName="topic-list"
        entityName="topic"
        scheme={TopicScheme}
        params={{}}
        hasModal={{ create: true, update: true, delete: true }}
        ModalBody={ModalBody}
        dataForModal={{
          coursePartId,
        }}
        ComponentBody={ComponentBody}
        dataForBody={{
          courseId,
          coursePartId,
        }}
        columns={[
          {
            Header: "Name",
            columns: [
              {
                Header: "#",
                accessor: "number",
                width: 100,
              },
              {
                Header: "Title",
                accessor: "name",
              },
              {
                Header: "Description",
                accessor: "description",
              },
              {
                Header: "Status",
                accessor: "active",
                status: "true",
                width: 30,
              },
              {
                Header: "Action",
                accessor: "action",
                width: 30,
              },
            ],
          },
        ]}
        row={["id", "number", "name"]}
        modalTitle={"Topic"}
        filterSelects={[
          {
            id: 1,
            options: coursesListData,
            defaultValue: courseId,
            onChange: (e) => {
              setCourseId(e);
              setCoursePartId(null);
            },
            label: "SELECT COURSE",
          },
          {
            id: 2,
            options: modulesListData,
            defaultValue: coursePartId,
            onChange: setCoursePartId,
            label: "SELECT MODULE",
          },
        ]}
        selectedId={coursePartId}
      />
    </>
  );
};
const mapStateToProps = (state, props) => {
  return {
    entities: get(state, "normalizer.entities", {}),
    coursesList: get(state, `normalizer.data.courses-list`, {}),
    modulesList: get(state, `normalizer.data.courses-part-list`, {}),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getCoursesList: ({ params = {} }) => {
      const storeName = `courses-list`;
      const entityName = "course";
      const scheme = { data: [CourseScheme] };
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: `academic-content/v1/course/all-courses`,
          config: params,
          scheme,
          storeName,
          entityName,
        },
      });
    },
    getCoursePartListByCourse: ({ id = null, params = {} }) => {
      const storeName = `courses-part-list`;
      const entityName = "course-part";
      const scheme = { data: [CoursePartScheme] };
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: `academic-content/v1/course-part/get-course-parts-by-course-id/${id}`,
          config: params,
          scheme,
          storeName,
          entityName,
        },
      });
    },
  };
};

export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(memo(ListContainer)));
