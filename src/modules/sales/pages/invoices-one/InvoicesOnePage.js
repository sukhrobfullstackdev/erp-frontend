import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkTab } from "utils";
import LeadInvoiceOneContainer from "modules/sales/containers/lead-invoice-one/leadInvoiceOneContainer";

const LeadInvoiceOnePage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Invoices One page");
  }, []);

  return (
    <>
      <LeadInvoiceOneContainer {...rest}/>
    </>
  );
};

export default LeadInvoiceOnePage;
