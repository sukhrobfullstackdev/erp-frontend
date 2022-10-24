import React from "react";
import ListView from "../../../../../containers/ListView/ListView";
import ComponentHead from "../../../components/ComponentHead";
import ComponentBody from "../../../components/ComponentBody";
import CoursePartScheme from "../../../../../schema/CoursePartScheme";
import { withTranslation } from "react-i18next";

const ListContainer = ({ t, ...rest }) => {
  return (
    <>
      <ListView
        storeName="course-part-list"
        entityName="course-part"
        storeNameForSelect="courses"
        url={`academic-content/v1/course-part/all-course-part`}
        addUrl={`academic-content/v1/course-part/add-course-part`}
        editUrl={`academic-content/v1/course-part/edit-course-part`}
        getDataWithSelectUrl={"academic-content/v1/course-part/get-course-parts-by-course-id"}
        getDataSelectOptionsUrl={"academic-content/v1/course/all-select-courses"}
        deleteUrl={"academic-content/v1/course-part/delete-course-part"}
        changeOrderUrl={"academic-content/v1/course-part/change-course-part-order-index"}
        scheme={CoursePartScheme}
        ComponentBody={ComponentBody}
        ComponentHead={ComponentHead}
        params={{}}
        addTitle={t("add_module") ?? "ADD MODULE"}
        buttonHoverText={t("module-hover-add-button-text") ?? "Please select module"}
      />
    </>
  );
};

export default withTranslation("pdp")(ListContainer);
