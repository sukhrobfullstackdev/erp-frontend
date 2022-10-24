import React, { useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { checkTab } from "utils";
import styled from "styled-components";
import ListContainer from "../../containers/group-one/ListContainer";

const ListPageStyle = styled.div`
  .searchAndAddStyledContainer {
    padding: 0 50px;
    .searchAndAdd__right {
      margin-bottom: 4px;
    }
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
  .select {
    min-width: 200px;
    &__header {
      border: 1px solid transparent;
      background: none;
    }
  }
  .form-input-file-container {
    display: flex;
    margin-right: 10px;
  }
  button {
    border-radius: 6px;
    &.control {
      border-radius: 40px;
      .ui__icon__wrapper {
        border-radius: 0;
        &.md {
          .icon {
            width: 20px;
            height: 24px;
          }
        }
      }
    }
  }
  .select__header {
    min-height: 22px;
    &__content {
      padding: 0px;
    }
  }
`;

const ListPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Group One page");
}, []);

  return (
    <ListPageStyle>
      <ListContainer {...rest} />
    </ListPageStyle>
  );
};

export default withRouter(memo(ListPage));
