import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkTab } from "utils";
import LeadsContainer from "../../containers/lead/leadsContainer";

const ListPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Leads view");
  }, []);


  return (
    <>
      <LeadsContainer />
    </>
  );
};

export default ListPage;
