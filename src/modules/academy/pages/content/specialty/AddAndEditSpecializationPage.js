import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkTab } from "utils";
import AddAndEditSpecialization from "../../../containers/content/specialty/AddAndEditSpecialization";
import { includes } from "lodash";

const AddAndEditSpecializationPage = ({ location: { pathname }, match, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, `Specialty ${includes(match.path, "add") ? "add" : "edit"} page`);
  }, []);

  return <AddAndEditSpecialization />;
};

export default AddAndEditSpecializationPage;
