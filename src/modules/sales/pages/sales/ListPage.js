import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkTab } from "utils";
import ListContainer from "../../containers/sales/ListContainer";

const ListPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Sales list page");
  }, []);

  return (
    <>
      <ListContainer {...rest} />
    </>
  );
};

export default ListPage;
