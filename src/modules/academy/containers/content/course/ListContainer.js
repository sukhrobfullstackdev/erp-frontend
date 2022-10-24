import React from "react";
import ListView from "../../../../../containers/ListView/ListView";
import ComponentHead from "../../../components/ComponentHead";
import ComponentBody from "../../../components/ComponentBody";
import CourseScheme from "../../../../../schema/CourseScheme";

const ListContainer = ({ ...rest }) => {
  return (
    <ListView
      storeName="course-list"
      entityName="course"
      url={`academic-content/v1/course/all-courses`}
      addUrl={`academic-content/v1/course/add-course`}
      editUrl={`academic-content/v1/course/edit-course`}
      deleteUrl={"academic-content/v1/course/delete-course"}
      changeOrderUrl={`academic-content/v1/course/change-course-order-index`}
      scheme={CourseScheme}
      ComponentBody={ComponentBody}
      ComponentHead={ComponentHead}
      params={{}}
      addTitle={"ADD COURSE"}
    />
  );
};

export default ListContainer;
