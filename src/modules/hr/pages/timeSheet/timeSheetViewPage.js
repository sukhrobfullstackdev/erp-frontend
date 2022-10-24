import React, { useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { checkTab } from "utils";
import TimeSheetViewContainer from "../../containers/timeSheet/timeSheetViewContainer";

const ListPageStyle = styled.div``;

const TimeSheetViewPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Time Sheet View page");
  }, []);

  return (
    <ListPageStyle>
      <TimeSheetViewContainer {...rest} />
    </ListPageStyle>
  );
};

export default withRouter(memo(TimeSheetViewPage));
