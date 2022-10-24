import styled, { css } from "styled-components";

export const Style = styled.div`
  .modal__body {
    width: 970px;
    min-height: 300px;
    padding: 0;

    .form-input {
      font-size: 13px;
      font-weight: 400;
      height: 25px;
    }

    .datepicker__input {
      height: 28px;
      border-radius: 6px;
    }

    .form-textarea {
      height: 28px !important;
      width: 585px !important;
      min-height: 28px;
      font-size: 12px !important;
      padding: 0 0 0 7px !important;
      margin-top: 5px;
    }

    .date__icon {
      top: 12%;
    }

    .form-input-container {
      border-radius: 6px;
    }

    .select__header {
      height: 28px;
      min-height: 28px !important;
      min-width: 180px;
      width: fit-content;
    }

    .footerButtons {
      display: grid;
      gap: 10px;
      grid-template-columns: 78px 78px;
      padding: 15px 20px;
      margin-top: 100px;
      justify-content: flex-end;
      border-top: 1px solid #f4f5f6;
      button {
        width: 78px;
        height: 34px;
        border-radius: 6px;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
      }
    }

    .wrapper {
      border: 1.8px solid #e6e8ec;
      border-radius: 6px !important;
      margin: 20px;
      .firstRow {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #f4f5f6;
        div {
          font-weight: 500;
          font-size: 12px;
          color: #353945;

          .ui__icon__wrapper.md {
            width: 16px;
            height: 16px;
          }
        }
        .iconTd {
          height: 34px;
          display: flex;
          align-items: center;
          border-right: 1px solid #f4f5f6;
          width: 35%;
          padding-left: 11px;
          padding-right: 10px;
        }
        .desc {
          height: 34px;
          width: 65%;
          padding-left: 11px;
          display: flex;
          align-items: center;
          button {
            width: fit-content;
            height: 22px;
            border-radius: 4px;
            font-weight: 500;
            font-size: 10px;
            line-height: 11px;
            color: #45b36b;
            border: none;
          }
        }

        .ui__icon__wrapper.md .icon.icon-enum-dropdown {
          width: 15px !important;
          height: 15px !important;
        }
        .ui__icon__wrapper.md .icon.icon-number {
          width: 15px !important;
          height: 15px !important;
        }
        .ui__icon__wrapper.md .icon.icon-labels {
          width: 15px !important;
          height: 15px !important;
        }
        .ui__icon__wrapper.md .icon {
          width: 15px;
          height: 15px;
        }
      }
      .footer {
        height: 33px;
        width: 100%;
        background: #fafbfc;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;

        .hideField {
          display: flex;
          align-items: center;
          font-weight: 500;
          font-size: 12px;
          line-height: 120px;
          color: #777e91;
          cursor: pointer;
          .arrowIcon {
            transform: rotate(90deg);
          }
        }

        .addField {
          border-bottom: 1px dashed;
          line-height: 20px;
        }
      }
      ${({ hideField }) =>
        hideField &&
        css`
          .rows {
            height: 0;
            overflow: hidden;
          }
          .arrowIcon {
            transform: rotate(270deg) !important;
          }
        `}
    }
  }

  .columnDropDown {
    width: 500px;
    height: 0px;
    z-index: 99;
    position: fixed;
    left: 25%;
    .dropDown__body {
      position: absolute;
      top: -250px;
      overflow: inherit;
    }
  }
`;
