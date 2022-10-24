import DebtorStudentsOneContainer from "modules/finance/containers/debtor-students-one/DebtorStudentsOneContainer";
import React, { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { checkTab } from "utils";
import DebtorStudentsOnePageWrapper from "./DebtorStudentsOnePageWrapper";

const DebtorStudentsOnePage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Debtor Students One Page");
  }, []);

  return (
    <DebtorStudentsOnePageWrapper>
      <DebtorStudentsOneContainer {...rest} />
    </DebtorStudentsOnePageWrapper>
  );
};

export default withRouter(memo(DebtorStudentsOnePage));
