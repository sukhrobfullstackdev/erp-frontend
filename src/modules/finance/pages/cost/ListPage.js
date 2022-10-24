import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkTab } from "utils";
import ListContainer from "../../containers/cost/ListContainer";

const ListPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Cost view");
  }, []);

  return (
    <>
      <ListContainer />
    </>
  );
};

export default ListPage;
