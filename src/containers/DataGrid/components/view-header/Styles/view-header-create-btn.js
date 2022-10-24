import styled from "styled-components";
import clock from "../../../../../assets/icons/clock2.svg";

export const Style = styled.div`
  .create-new {
    button {
      border-radius: 6px;
      height: 32px;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      margin-right: 5px;
    }
  }
  .modal__body {
    max-width: 700px;
    position: relative;
    background: #ffffff;
    border-radius: 10px;
    padding: 20px 20px 70px;
    transition: 0.1s;
    &.active {
      transition: 0.2s;
    }

    .title {
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      color: #777e91;
      margin-bottom: 40px;
    }

    .form-select-container-select,
    .form-checkbox-controler,
    .datePicker,
    .form-input-container {
      margin-bottom: 30px;
    }

    .form-label {
      font-weight: 500;
      font-size: 10px;
      line-height: 15px;
      color: #777e91;
      margin-bottom: 6px;
    }

    .select {
      &__header {
        background: #fcfcfd;
        border: 1px solid #f4f5f6;
        border-radius: 8px;
        height: 40px;

        &__content {
          font-weight: normal;
          font-size: 12px;
          line-height: 18px;

          &__placeholder {
            color: #b1b5c4;
          }
        }
      }
    }

    .form-input-container {
      background: #fcfcfd;
      border: 1px solid #f4f5f6;
      border-radius: 6px;
      height: 40px;

      .form-input {
        font-weight: normal;
        font-size: 12px;
        line-height: 18px;
      }
    }

    .form-checkbox-controler {
      label {
        font-weight: 500;
        font-size: 12px;
        line-height: 22px;
        color: #353945;

        .rc-checkbox {
          margin-right: 10px;
        }
      }
    }

    .datePicker {
      width: 100%;

      .rs-picker-toggle {
        background: #fcfcfd !important;
        border: 1px solid #f4f5f6;
        border-radius: 6px;
        font-weight: normal;
        font-size: 12px;
        line-height: 18px;
        color: #b1b5c4;

        &:after {
          content: none;
        }

        &::before {
          top: 5px;
        }
      }

      &.clock {
        .rs-picker-toggle {
          &::before {
            background-image: url(${clock});
          }
        }
      }
    }

    .form-date-container {
      .datepicker__input {
        height: 38px;
        border-radius: 8px;
      }
    }

    .footer {
      width: 100%;
      height: 60px;
      position: absolute;
      bottom: 0;
      left: 0;
      border-top: 1px solid #f4f5f6;
      border-radius: 0 0 10px 10px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 20px;

      button {
        width: 120px;
        height: 34px;
        border-radius: 6px;
        font-size: 12px;
        line-height: 18px;
      }

      .save {
        margin-left: 10px;
      }
    }
  }
  .mt-30 {
    margin-top: 30px;
  }

  @media (max-height: 821px) {
    .modal__body {
      padding: 15px 15px 60px;
      max-width: 600px;
      .title {
        margin-bottom: 20px;
      }
      .form-select-container-select {
        margin-bottom: 10px;
      }
      .form-input-container {
        margin-bottom: 15px;
      }
      .footer {
        padding-right: 10px;
        height: 50px;
      }
      .select__header,
      .clockPicker__header,
      .datePicker__header {
        height: 30px;
        min-height: 30px;
        border-radius: 6px;
      }
      .clockPicker__header {
        padding: 2px 8px;
      }
      .form-date-container {
        .datepicker__input {
          height: 30px;
          border-radius: 6px;
        }
      }
      .date__icon {
        top: 14%;
        right: 7px;
      }
      .clockPicker__header__icon {
        right: 4px;
      }
      .form-input-container {
        height: 30px;
        margin-bottom: 10px;
      }
    }
    .form-error-message {
      margin-top: 0;
      font-size: 10px;
    }
  }
`;
