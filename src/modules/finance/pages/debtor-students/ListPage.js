import DebtorStudentsContainer from "modules/finance/containers/debtor-students/debtorStudentsContainer";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkTab } from "utils";

const ListPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Debtor Students");
  }, []);

  return (
    <>
      <DebtorStudentsContainer />
    </>
  );
};

export default ListPage;
