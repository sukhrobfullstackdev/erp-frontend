import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { checkTab } from "utils";
import { withTranslation } from "react-i18next";
import CreateContainer from "../../../containers/content/group-type-lesson/CreateContainer";

const CreatePage = ({ t, location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Group type lesson page");
  }, []);

  return (
    <>
      <CreateContainer />
    </>
  );
};

export default withTranslation("pdp")(withRouter(CreatePage));
