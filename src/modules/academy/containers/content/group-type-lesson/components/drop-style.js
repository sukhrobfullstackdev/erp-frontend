import styled from "styled-components";

export const Container = styled.div`
  border: 2px dashed #b1b5c4;
  border-radius: 10px;
  min-height: 225px;
  background-color: #f4f5f6;
  padding: 20px;

  &.empty {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .empty__text {
    color: #777e91;
    font-weight: 500;
    font-size: 24px;
  }

  .clear__btn {
    margin-top: 20px;
  }
`;

export const DragableContainer = styled.div`
  background-color: #fcfcfd;
  width: 100%;
  min-height: ${({ lessonItemCount }) => lessonItemCount * 37}px;
  border-radius: 8px;
  margin-bottom: 8px;
  padding: 3px 18px;

  &.dragging {
    min-height: ${({ lessonItemCount }) => lessonItemCount * 45}px;
    height: ${({ lessonItemCount }) => lessonItemCount * 45}px;
  }

  .lesson__item {
    display: flex;
    align-items: center;
  }

  .dotsIcon {
    .ui__icon__wrapper {
      &.md {
        border-radius: 0;
        cursor: inherit;
        .icon {
          -webkit-mask-size: 15px;
          mask-size: 15px;
        }
      }
    }
  }

  .number {
    font-size: 14px;
    font-weight: 500;
    position: relative;
    line-height: 21px;
    margin-right: 29px;

    ::after {
      content: " ";
      min-height: 22px;
      width: 1px;
      position: absolute;
      right: -10px;
      top: 0;
      background-color: #e6e8ec;
    }
  }

  .text {
    font-size: 18px;
    font-weight: 400;
    line-height: 27px;
  }

  .action {
    height: 100%;
    padding-left: 8px;
    border-left: 1px solid #f4f5f6;
    display: flex;
    align-items: center;

    button {
      width: 108px;
      height: 34px;
      font-size: 12px;
      font-weight: 500;
      padding: 0;
      border-radius: 6px;
    }

    .purple {
      button {
        background-color: #9757d7;
        color: #fcfcfd;

        :hover {
          background-color: #8040d0;
        }
      }
    }

    .ui__icon__wrapper {
      transform-origin: center;
      transform: rotate(90deg);
      margin-left: 16px;

      .icon {
        background-color: #323232;
      }
    }

    .dropDown__body {
      width: 150px;
      border: 1px solid #e6e8ec;
      border-radius: 6px;
      box-shadow: 0px 8px 16px -8px rgba(15, 15, 15, 0.2);

      .option {
        height: 38px;
        width: 100%;
        padding: 10px;
        font-size: 12px;
        font-weight: 500;
        line-height: 18px;
        transition: 0.5s ease;
        color: #353945;
        cursor: pointer;

        :hover {
          background-color: #f4f5f6;
        }
      }
    }
  }

  .modal__body {
    padding: 0;
    border-radius: 12px;
  }
`;

export const Style = styled.div`
  .lesson__item__container {
    &.dragging {
      width: 85% !important;
      //min-height: 60px !important;
    }
  }
  .groupTypeLessonItemContainer {
    width: 100%;
    .groupTypeLessonItem {
      display: flex;
      align-items: center;
      margin: 5px 0;
      &.dragging {
        width: 81% !important;
      }
      .text {
        width: 100%;
      }
    }
  }
  .modal__body {
    padding: 0;
    border-radius: 12px;
    border: none;
  }

  .addDoc {
    width: 34px;
    min-width: 34px;
    height: 34px;
    background: #f4f5f6;
    border: 1px solid var(--green-back);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    .ui__icon__wrapper {
      margin: 0;
      transform: rotate(0deg);
    }
  }
  .infoExam {
    .dropDown__body {
      min-width: 150px;
      width: auto;
    }
    .dropDown__button {
      margin-left: 16px;
    }
  }
`;
