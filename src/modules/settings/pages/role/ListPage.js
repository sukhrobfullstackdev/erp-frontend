import React, { useEffect } from "react";
import ListContainer from "../../containers/role/ListContainer";
import { useDispatch } from "react-redux";
import { checkTab } from "utils";

const ListPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Role list page");
  }, []);

  return <ListContainer {...rest} />;
};

export default ListPage;
