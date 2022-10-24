import styled from "styled-components";
import clock from "../../../../assets/icons/clock2.svg";

export const Style = styled.div`
  .modal__body {
    max-width: 700px;
    padding: 0;
    position: relative;
    background: #ffffff;
    border-radius: 10px;
    transition: 0.1s;
    &.active {
      transition: 0.2s;
    }

    .title {
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      color: #777e91;
      padding: 20px;
    }

    .body {
      padding: 20px;
      .form-select-container-select,
      .form-checkbox-controler,
      .datePicker,
      .form-input-container,
      .form-date-container {
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

      .form-date-container {
        .datepicker__input {
          border-radius: 6px;
          height: 40px;
          font-weight: normal;
          font-size: 12px;
          line-height: 18px;

          &::placeholder {
            font-size: 12px;
            line-height: 18px;
          }
        }
      }
    }

    .footer {
      width: 100%;
      //height: 60px;
      //position: absolute;
      bottom: 0;
      left: 0;
      border-top: 1px solid #f4f5f6;
      border-radius: 0 0 10px 10px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 13px 20px;

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

  .create-new {
    button {
      border-radius: 6px;
      height: 32px;
      margin-right: 5px;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
    }
  }
`;
