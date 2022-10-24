import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { checkTab } from "utils";
import styled from "styled-components";
import KeysContainer from "../../containers/language/KeysContainer";

const PageStyle = styled.div``;

const ListPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Language keys  page");
  }, []);

  return (
    <PageStyle {...rest}>
      <KeysContainer {...rest} />
    </PageStyle>
  );
};

export default withRouter(ListPage);
