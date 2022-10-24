import React, { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkTab } from "utils";
import InvoiceStatusContainer from "modules/sales/containers/invoice-status/InvoiceStatusContainer";

const InvoiceStatus = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Invoice Status");
  }, []);

  return (
    <>
      <InvoiceStatusContainer {...rest} />
    </>
  );
};

export default InvoiceStatus;
