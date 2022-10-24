import React, { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkTab } from "utils";
import CallContainer from "../../containers/call/callContainer";

const ListPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Calls list page");
  }, []);

  return (
    <>
      <CallContainer {...rest} />
    </>
  );
};

export default memo(ListPage);
