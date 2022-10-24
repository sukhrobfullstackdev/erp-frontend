import React, { useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { checkTab } from "utils";
import styled from "styled-components";
import ListContainer from "../../containers/admission-one/ListContainer";

const ListPageStyle = styled.div`
  .headPanel {
    padding: 10px 50px;
  }

  .head {
    display: flex;
    background-color: #f9f9f9;
    padding: 20px 50px;
    align-items: flex-start;
    /* gap: 40px; */

    .card-box {
      /* width: 240px; */
      margin: 20px 0;
      padding: 0 40px;
      font-family: Poppins;
      border-right: 1px solid #e6e8ec;
      height: 100%;

      &:first-child {
        padding-left: 0px;
      }

      &:last-child {
        flex: 1;
        width: auto;
        border-right: none;
      }

      .title {
        font-weight: 600;
        font-size: 13px;
      }

      .description {
        font-size: 15px;
        color: #777e91;
      }
    }
  }

  .table {
    padding: 20px 50px;
    div[role="rowgroup"] {
      .tr {
        &:hover {
          background-color: #e2f5e9;
        }
      }
    }
  }
`;

const ListPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Admission one");
  }, []);
  return (
    <ListPageStyle>
      <ListContainer {...rest} />
    </ListPageStyle>
  );
};

export default withRouter(memo(ListPage));
