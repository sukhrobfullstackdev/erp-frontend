import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { checkTab } from "utils";
import ListContainer from "modules/sales/containers/marketing/event/ListContainer";

const StyledListPage = styled.div``;

const ListPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
      checkTab(dispatch, pathname, "Events");
  }, []);
  return (
    <StyledListPage>
      <ListContainer {...rest} />
    </StyledListPage>
  );
};

export default withRouter(ListPage);