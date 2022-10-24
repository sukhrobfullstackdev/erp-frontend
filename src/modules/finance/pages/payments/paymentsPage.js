import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { checkTab } from "utils";
import PaymentsContainer from "modules/finance/containers/payments/paymentsContainer";

const Styled = styled.div``;

const PaymentsPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Payments");
  }, []);

  return (
    <Styled>
      <PaymentsContainer {...rest} />
    </Styled>
  );
};

export default PaymentsPage;
