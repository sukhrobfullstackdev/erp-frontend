import React, { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { checkTab } from "utils";
import PayRollContainer from "../../containers/payRoll/payRollContainer";

const Styled = styled.div`
  .makeFilter {
    button {
      width: 79px;
      height: 34px;
      background-color: #e6e8ec;
      border-radius: 8px;
      color: #777e91;
      font-size: 12px;
      line-height: 18px;
      display: grid;
      place-items: center center;
      grid-template-columns: 39px 20px;
      .ui__icon__wrapper.md .icon {
        width: 15px;
        height: 15px;
      }
    }
  }

  .makeStatement {
    button {
      height: 34px;
      text-transform: uppercase;
      font-weight: 600;
      font-size: 12px;
      line-height: 14px;
      margin-right: 10px;
    }
  }

  .ebWaQF .table .tr .th:first-child,
  .ebWaQF .table .tr .td:first-child {
    padding-left: 14px;
    justify-content: center;
  }
`;

const PayRollPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Payroll view");
  }, []);

  return (
    <Styled>
      <PayRollContainer {...rest} />
    </Styled>
  );
};

export default memo(PayRollPage);
