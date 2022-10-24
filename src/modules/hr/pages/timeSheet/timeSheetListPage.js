import React, { useEffect, memo } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { checkTab } from "utils";
import TimeSheetListContainer from "../../containers/timeSheet/timeSheetListContainer";

const ListPageStyle = styled.div``;

const TimeSheetListPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Time Sheet List page");
  }, []);


  return (
    <ListPageStyle>
      <TimeSheetListContainer {...rest} />
    </ListPageStyle>
  );
};

export default withRouter(memo(TimeSheetListPage));
