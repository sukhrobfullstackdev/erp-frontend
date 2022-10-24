import React, { memo, useEffect } from "react";
import styled from "styled-components";
import { Col, Row } from "react-grid-system";
import Sortable from "../../../../../../components/sortable";
import CardComponent from "../../../../components/CardComponent";
import Box from "../../../../../../components/elements/box";
import Label from "../../../../../../components/elements/label";
import Select from "../../../../../../components/elements/select/Select";
import { get } from "lodash";
import CourseScheme from "../../../../../../schema/CourseScheme";
import ApiActions from "../../../../../../services/api/actions";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import Normalizer from "../../../../../../services/normalizer";
import { getSelectOptionsListFromData } from "../../../../../../utils";
import { InitialLoader } from "../../../../../../components/loader";

const Styled = styled.div``;

const ComponentBody = ({ t, getCoursesList, data = [], coursesList, entities, getSelectValue = () => {}, ...rest }) => {
  useEffect(() => {
    getCoursesList({});
  }, []);

  coursesList = Normalizer.Denormalize(coursesList, { result: { data: [CourseScheme] } }, entities);
  const courseSelectData = getSelectOptionsListFromData(get(coursesList, "result.data", []), "id", "name");

  if (!get(coursesList, "isFetched", false)) {
    return <InitialLoader />;
  }

  return (
    <Styled {...rest}>
      <Box gray>
        <Row className={"mb-30"}>
          <Col xs={3}>
            <Label>{t("Select course") ?? "Select course"}</Label>
            <Select
              isSearchable={true}
              options={courseSelectData}
              onChange={(value) => {
                getSelectValue(value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Sortable Item={CardComponent} data={data} colSize={3} />
          </Col>
        </Row>
      </Box>
    </Styled>
  );
};

const mapStateToProps = (state, props) => {
  return {
    entities: get(state, "normalizer.entities", {}),
    coursesList: get(state, `normalizer.data.courses-list`, {}),
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
  };
};
export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(memo(ComponentBody)));
