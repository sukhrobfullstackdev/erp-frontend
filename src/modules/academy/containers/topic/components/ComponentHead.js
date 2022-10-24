import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import SearchAndAdd from "../../../../hr/components/searchAndAdd";
import Box from "../../../../../components/elements/box";
import { Col, Row } from "react-grid-system";
import Label from "../../../../../components/elements/label";
import Select from "../../../../../components/elements/select/Select";
import Normalizer from "../../../../../services/normalizer";
import CourseScheme from "../../../../../schema/CourseScheme";
import { getSelectOptionsListFromData } from "../../../../../utils";
import { get, isNil } from "lodash";
import CoursePartScheme from "../../../../../schema/CoursePartScheme";
import ApiActions from "../../../../../services/api/actions";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

const StyledComponentHead = styled.div``;

const ComponentHead = ({
  t,
  children,
  buttonText = "Add",
  openModalOrLink = () => {},
  search = () => {},
  getCoursesList,
  coursesList,
  entities,
  getCoursePartListByCourse,
  getSelectValue = () => {},
  modulesList,
  ...rest
}) => {
  const [courseId, setCourseId] = useState(null);

  useEffect(() => {
    getCoursesList({});
  }, []);
  useEffect(() => {
    if (!isNil(courseId)) {
      getCoursePartListByCourse({ id: courseId });
    }
  }, [courseId]);

  coursesList = Normalizer.Denormalize(coursesList, { result: { data: [CourseScheme] } }, entities);
  coursesList = getSelectOptionsListFromData(get(coursesList, "result.data", []), "id", "name");

  modulesList = Normalizer.Denormalize(modulesList, { result: { data: [CoursePartScheme] } }, entities);
  modulesList = getSelectOptionsListFromData(get(modulesList, "result.data", []), "id", "name");
  return (
    <StyledComponentHead {...rest}>
      <SearchAndAdd search={search} buttonText={buttonText} openModalOrLink={openModalOrLink} />
      {children}
      <Box sm gray>
        <Row>
          <Col xs={3}>
            <Label>{t("Select course") ?? "Select course"}</Label>
            <Select
              isSearchable={true}
              options={coursesList}
              onChange={(value) => {
                setCourseId(value);
              }}
            />
          </Col>
          <Col xs={3}>
            <Label>{t("Select MODULE ") ?? "Select MODULE"}</Label>
            <Select
              isSearchable={true}
              options={modulesList}
              onChange={(value) => {
                getSelectValue(value);
              }}
            />
          </Col>
        </Row>
      </Box>
    </StyledComponentHead>
  );
};

const mapStateToProps = (state, props) => {
  return {
    entities: get(state, "normalizer.entities", {}),
    coursesList: get(state, `normalizer.data.courses-list`, {}),
    modulesList: get(state, `normalizer.data.courses-part-list`, {}),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
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

export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(memo(ComponentHead)));
