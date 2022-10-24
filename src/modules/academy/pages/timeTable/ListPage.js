import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { checkTab } from "utils";
import ListContainer from "../../containers/timeTable/ListContainer";

const Styled = styled.div`
  /* margin-bottom: 30px; */

  /* .tabs {
      border-bottom: 1px solid #E2E7ED;
      padding-bottom: 6px;
      &__list {
          background: #f2f3f5;
          height: 34px;
          width: 294px;
          border: 1px solid #E6E8EC;
          border-radius: 6px;
          &__left {
            align-items: center;
            margin-left: -2px;
          }
          &__tab {
            width: 92px;
            height: 28px;
            border-radius: 4px;
            font-weight: 500;
            font-size: 12px;
            line-height: 18px;
            padding: 0;
            color: #353945;
            justify-content: center;

            &:last-child {
              margin: 0;
            }
            &.active{
              background: #45B36B;
            }
          }
        }
        &__content{
          height: 0;
          width: 0;
          padding: 0;
        }
      } */
`;

const ListPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "TimeTable list page");
  }, []);

  return (
    <>
      <Styled>
        <ListContainer {...rest} />
      </Styled>
    </>
  );
};

export default ListPage;
