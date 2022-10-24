import React from "react";
import styled, { css } from "styled-components";
import Button from "../../../../components/elements/button";
import Icon from "../../../../components/elements/icon";
const Styled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .icon-close {
    margin-top: 45px;
  }
  .ui__icon__wrapper.md {
    width: 120px;
    height: 120px;
    background: #f7fef9;
    border: 1px solid #e2f5e9;
    box-sizing: border-box;
    .icon {
      width: 64px;
      height: 64px;
      background: #45b26b;
    }
  }
  ${({ cancelModal }) =>
    cancelModal &&
    css`
      .ui__icon__wrapper.md {
        background: #fff7f9;
        border: 1px solid #ffe9ee;
        .icon {
          background: rgba(239, 70, 111, 1);
        }
      }
    `}
  .info {
    font-weight: 500;
    font-size: 18px;
    line-height: 27px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #353945;
    margin: 24px 0 40px;
  }
  button {
    min-width: 320px;
    margin: 5px;
    min-height: 50px;
    transition: 0.5s ease;
    font-size: 14px;
    font-weight: 500;
    text-transform: initial;
  }
  .yes__btn {
    button {
      background-color: #f6fef9;
      border: 1px solid #e2f5e9;
      color: #45b26b;
      :hover {
        background: #eaf9ef;
        border: 1px solid #5cca81;
        color: #45b26b;
      }
    }
  }
  .no__btn {
    button {
      background: #fcfcfd;
      color: #ef466f;
      :hover {
        background: #fff1f5;
        color: #ef466f;
      }
    }
  }
`;
const AskingModalForLessonAction = ({
  startModal = false,
  cancelModal = false,
  completeModal = false,
  confirm = () => {},
  cancel = () => {},
}) => {
  return (
    <Styled cancelModal={cancelModal}>
      <div className="icon-close">
        {startModal && <Icon icon="icon-lesson-date" />}
        {cancelModal && <Icon icon="icon-x-close" />}
        {completeModal && <Icon icon="icon-logout" />}
      </div>
      <span className="info">
        Do you {startModal && "want to start"} {cancelModal && "want to cancel"} {completeModal && "agree to complete"} the
        lesson?
      </span>
      <Button className="yes__btn" outline_success onCLick={() => confirm()}>
        {startModal && "Yes, start"} {cancelModal && "Yes, cancel"} {completeModal && "Completion of the"} lesson
      </Button>
      <Button className="no__btn" outlineDanger onCLick={() => cancel()}>
        No, cencel
      </Button>
    </Styled>
  );
};

export default AskingModalForLessonAction;
