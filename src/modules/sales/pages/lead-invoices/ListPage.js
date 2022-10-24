import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkTab } from "utils";
import LeadInvoiceContainer from "../../containers/lead-invoice/leadInvoiceContainer";

const ListPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Invoices list page");
  }, []);

  return (
    <>
      <LeadInvoiceContainer />
    </>
  );
};

export default ListPage;
