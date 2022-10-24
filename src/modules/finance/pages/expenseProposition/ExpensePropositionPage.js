import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { checkTab } from "utils";
import ExpensePropositionContainer from "../../containers/expenseProposition/ExpensePropositionContainer";

const Styled = styled.div`
  .colorViewer {
    width: 97px;
    display: grid;
    place-items: center center;
    border-radius: 4px;
    color: #fff;
  }

  .hasMessage {
    width: 28px;
    height: 28px;
    background: #e6e8ec;
    border-radius: 6px;
    display: grid;
    place-items: center center;
    margin-left: 37px;
  }

  .falsyMessage {
    background: #ffd166;
    position: relative;
  }

  .circle {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #45b36b;
    border: 1px solid #fcfcfd;
    position: absolute;
    top: -2px;
    right: -3px;
  }

  .table .tr .td:last-child {
    justify-content: center;
  }

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

  .searchAndAddStyledContainer {
    justify-content: flex-end !important;
  }

  .ui__icon__wrapper.md .icon {
    width: 12px !important;
    height: 11px !important;
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
`;

const ExpensePropositionPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Expense proposition view");
  }, []);

  return (
    <Styled>
      <ExpensePropositionContainer {...rest} />
    </Styled>
  );
};

export default memo(ExpensePropositionPage);
