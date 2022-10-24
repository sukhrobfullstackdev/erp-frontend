import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { checkTab } from "utils";
import ExpensePropositionItemContainer from "../../containers/expensePropositionItem/ExpensePropositionItemContainer";
import { includes } from "lodash";

const Styled = styled.div`
  width: 100%;
  background-color: #f7f7fa;
  padding: 30px 38px 70px;

  .container {
    width: 100%;
    background: #ffffff;
    border: 1px solid #e6e8ec;
    border-radius: 12px;
    padding: 20px !important;
  }

  .row {
    margin: 0 !important;
  }

  .chat_col {
    padding-left: 0px !important;
    padding-right: 10px !important;
  }

  .info_col {
    padding-left: 10px !important;
    padding-right: 0px !important;
  }

  .description {
    background-color: #fcfcfd;
    border: 1px solid #e6e8ec;
    border-radius: 6px;
    padding: 20px 8px 5px 20px;
    margin-bottom: 20px;
    height: 204px;

    .simplebar {
      height: 104px;
      margin-top: 20px;
    }

    textarea {
      width: 100%;
      min-height: 120px;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: #353945;
      background-color: transparent;
      padding: 0px 12px 15px 0px;
      margin-top: 20px;
      resize: inherit;
      overflow: auto;
      overflow-x: hidden;
      border: none;
      outline: none;

      ::placeholder {
        color: #b1b5c4;
      }

      &::-webkit-scrollbar-track {
        background-color: transparent;
      }

      &::-webkit-scrollbar {
        width: 5px;
        background-color: transparent;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 100px;
        background-color: rgba(30, 30, 30, 0.5);
      }
    }
  }
  .form_footer {
    height: 60px;
    background: #fff;
    width: 100%;
    position: fixed;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 38px;
    border-top: 1px solid #e6e8ec;
    .cancel,
    .save {
      button {
        border-radius: 6px;
        font-size: 12px;
        line-height: 18px;
        height: 34px;
        width: 66px;
      }
    }
    .cancel {
      button {
        background: #f4f5f6;
        border: 1px solid #e6e8ec;
        color: #777e91;
        margin-right: 10px;
        width: 79px;
      }
    }
  }

  .cost_info {
    outline: 1px solid #e6e8ec;
    border-radius: 6px;
    background-color: #fcfcfd;

    &_header {
      padding: 0px 15px 0px 20px;
      height: 63px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &_btns {
        display: flex;

        button {
          width: 100px;
          height: 34px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 4px;
          line-height: 12px;
        }
        .editBtn {
          margin: 0 5px;
        }
      }
    }

    &_body {
      min-height: 560px;
      width: 100%;

      .list_row {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left_row {
          padding: 15px 0px 15px 20px;
          width: 50%;
          height: 51px;
          border-top: 1px solid #f4f5f6;
          border-right: 1px solid #f4f5f6;
        }

        .right_row {
          padding: 15px 0px 15px 20px;
          width: 50%;
          height: 51px;
          border-top: 1px solid #f4f5f6;

          .form-input-container,
          .select__header,
          .datepicker__input {
            background-color: #f4f5f6;
            border-radius: 4px;

            .form-input,
            &__content {
              font-weight: 500;
              font-size: 14px;
              line-height: 21px;
              color: #353945;
              padding: 10px 15px;

              ::placeholder,
              .select__header__content__placeholder {
                color: #b1b5c4;
                font-weight: 400;
                font-size: 14px;
                line-height: 21px;
              }
            }
          }

          .select__header,
          .datepicker__input {
            border: none;
          }

          .datepicker__input {
            padding: 10px 15px;
            height: 100%;
            line-height: 21px;
          }

          .datepicker__container {
            top: 50px;
            right: 0px;
          }

          .status_btn {
            display: inline-block;
            font-weight: 600;
            font-size: 10px;
            line-height: 12px;
            color: #fcfcfd;
            padding: 7px 10px;
            border-radius: 4px;
          }
        }
      }
    }

    &.editStyle {
      .cost_info {
        &_body {
          .list_row {
            .right_row {
              padding: 5px;
            }
          }
        }
      }
    }
  }

  .accept-modal {
    .modal {
      &__body {
        padding: 0;
        min-height: 15px;
        border: none;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;

        .Container {
          position: relative;
          width: 620px;
          height: 557px;
          box-shadow: 0 40px 32px -24px rgba(15, 15, 15, 0.12);
          border-radius: 12px;
          border: 1px solid #e6e8ec;

          &__text {
            margin-top: 20px;
            margin-left: 20px;
          }
        }

        .tabs__content {
          padding: 0 !important;
        }

        .tabs__list {
          height: 40px;
          border-radius: 6px;
          width: 260px !important;
          margin-top: 25px;
          margin-left: 20px;
          padding: 4px;
        }

        .left__date {
          position: relative;
          width: 250px;

          &:before {
            position: absolute;
            content: "";
            height: 20px;
            width: 0.5px;
            background: #b1b5c4;
            right: 45px;
            top: 11px;
            border-radius: 2px;
          }
        }

        .right__date {
          position: relative;
          width: 250px;

          &:before {
            position: absolute;
            content: "";
            height: 20px;
            width: 0.5px;
            background: #b1b5c4;
            right: 45px;
            top: 11px;
            border-radius: 2px;
          }
        }

        .tabs__list__tab.active {
          background: #5cca81;
          font-weight: 400;
          font-size: 12px;
          line-height: 18px;
        }

        .tabs__list__tab {
          font-size: 12px;
          font-weight: 400;
          padding: 11px 25px;
          width: 126px;
          height: 32px;
          margin: 0 1px;
        }

        .Tabs__text {
          margin-bottom: 6px;
        }

        .left__date-text {
          margin-bottom: 6px;
        }

        .right__date-text {
          margin-bottom: 6px;
        }

        .datepicker__input {
          height: 40px;
        }

        .custom__date {
          width: 250px;
          position: relative;

          &:before {
            position: absolute;
            content: "";
            height: 20px;
            width: 0.5px;
            background: #b1b5c4;
            right: 45px;
            top: 11px;
            border-radius: 2px;
            z-index: 2;
          }
        }

        .Check {
          font-size: 12px;
          line-height: 19px;
          font-weight: 500;
          color: #353945;
        }

        .rc-checkbox {
          margin-right: 12px;
        }

        .rc-checkbox .rc-checkbox-inner {
          width: 13.5px;
          height: 13.5px;
          border-color: #002930;
        }

        .rc-checkbox .rc-checkbox-inner:after {
          top: 2px;
          left: 4px;
        }

        .custom__line {
          width: 100%;
          border-bottom: 1px solid red;
        }

        .first {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #f4f5f6;
          padding: 30px 20px 20px 20px;

          label {
            font-weight: 600;
            font-size: 10px;
            line-height: 12px;
            margin-bottom: 6px;
            color: #a7adbf;
          }
        }

        .body {
          padding: 20px 13px 0 20px;
          min-height: 270px;
          border-bottom: 1px solid #f4f5f6;
          max-height: 270px;

          &__header {
            margin-bottom: 20px;
          }

          &__footer {
            display: flex;
            align-items: center;
            margin-bottom: 9px;

            &__img {
              margin-left: 6px;
            }
          }
        }

        .form-select {
          width: 250px;
        }

        .form-input-container {
          width: 250px;
          height: 40px;
          margin-left: 30px;
        }

        .form-input {
          ::placeholder {
            font-size: 12px;
            line-height: 18px;
            color: #b1b5c4;
          }

          .giuAtc .ui__icon__wrapper.md .icon {
            width: 16px !important;
            height: 16px !important;
          }

          .form-input-container .form-input {
            padding: 7px 12px !important;
          }
        }

        .plus__img {
          width: 24px;
          height: 24px;
          opacity: 0.1;

          &.active {
            opacity: 1;
            cursor: pointer;
          }

          &.new-active {
            opacity: 1;
            cursor: pointer;
          }
        }

        .minus__img {
          opacity: 0.1;

          &.active {
            opacity: 1;
            cursor: pointer;
          }

          &.new-active {
            opacity: 1;
            cursor: pointer;
          }
        }

        .select__header {
          width: 250px;
          height: 40px;
        }

        .select__active {
          .select__header__content__placeholder {
            font-weight: 400;
            font-size: 12px;
            line-height: 18px;
            color: #b1b5c4;
          }

          &.active {
            .select__header__content__placeholder {
              color: #353945;
            }

            .ui__icon__wrapper .icon {
              background-color: #353945;
            }
          }

          &.new-active {
            .select__header__content__placeholder {
              color: #353945;
            }

            .ui__icon__wrapper .icon {
              background-color: #353945;
            }
          }
        }

        .ui__icon__wrapper .icon {
          background-color: #b1b5c4;
        }

        .ui__icon__wrapper.md .icon {
          width: 16px;
          height: 16px;
        }

        .footer {
          padding: 20px 20px 20px 0;
          display: flex;
          justify-content: right;

          &__first-button {
            button {
              cursor: pointer;
              font-weight: 400;
              font-size: 12px;
              line-height: 18px;
              width: 67px;
              height: 34px;
              margin-right: 10px;
              background: #f4f5f6;
              padding: 8px 12px;
              color: #777e91;
              border-radius: 8px;
            }
          }

          &__second-button {
            button {
              cursor: pointer;
              padding: 8px 18px;
              font-weight: 400;
              font-size: 12px;
              line-height: 18px;
              width: 66px;
              height: 34px;
              color: #fcfcfd;
              border-radius: 8px;
            }
          }
        }

        .select__header__content {
          font-size: 12px;
          font-weight: 400;
          line-height: 18px;
        }

        .form-input-container .form-input {
          font-weight: 400;
          font-size: 12px;
          line-height: 18px;
          color: #002930;
        }

        .Right__icon {
          margin-top: 18px;
        }

        .Simple__text {
          text-align: right;
          margin-right: 131px;
          margin-bottom: 5px;
          opacity: 0;

          &.active {
            opacity: 1;
          }

          &.new-active {
            opacity: 1;
          }
        }
      }
    }
  }
`;

const ExpensePropositionItemPage = ({ location: { pathname }, match, ...rest }) => {
  let isCreatePage = includes(match.url, "create");
  let isEditPage = includes(match.url, "edit");

  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, `${isCreatePage
              ? "Create expense proposition"
              : isEditPage
              ? "Edit expense proposition"
              : "Expense proposition item"}`);
  }, []);


  return (
    <Styled>
      <div className={"container"}>
        <ExpensePropositionItemContainer {...{ match, ...rest }} />
      </div>
    </Styled>
  );
};

export default memo(ExpensePropositionItemPage);
