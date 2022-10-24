import React, { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkTab } from "utils";
import OperatorsContainer from "../../containers/operators/operatorsContainer";

const OperatorsPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Operators page");
  }, []);


  return (
    <>
      <OperatorsContainer {...rest} />
    </>
  );
};

export default memo(OperatorsPage);
