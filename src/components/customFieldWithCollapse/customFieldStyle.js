import styled from "styled-components";

export const Styled = styled.div`
  .field {
    border: 1px solid #ccc;
    border-radius: 10px;
    .field__row:last-child {
      border-bottom: none;
    }
    &__row {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      &__name {
        min-width: 300px;
        display: flex;
        min-height: 67px;
        padding: 10px 15px;
        align-items: center;
        span {
          margin-left: 15px;
          font-size: 20px;
        }
        .icon {
          width: 30px;
          height: 30px;
        }
      }
      &__option {
        min-height: 67px;
        padding: 10px 15px;
        border-left: 1px solid #ccc;
        display: flex;
        align-items: center;
        .form-select-container {
          min-width: 300px;
        }
        .emoji .select__header {
          border: 1px solid #e6e8ec;
          border-radius: 10px;

          min-height: 40px;
        }
        input {
          border: 1px solid #e6e8ec;
          border-radius: 10px;
          min-height: 40px;
          overflow: hidden;
          width: 400px !important;

          outline: none;
          /* min-width: 340px; */
          min-width: 300px;
          padding: 0 10px;
        }
        .multi-file-img {
          height: 30px;
          width: 45px;
          /* margin: 0 7px; */
        }
        .rc-checkbox-input {
          min-height: 0px;
          padding: 0px;
          border: none;
          /* min-width: 340px; */
          min-width: 0px;
        }
        .rc-checkbox-inner {
          height: 20px;
          width: 20px;
        }
        .datepicker__input {
          font-size: 17px !important;
        }
        .form-textarea {
          min-height: 52px !important;
          padding: 6px 12px;
          width: 400px;
        }
        .select__body__options__search__input {
          width: 100% !important;
        }

        .select {
          width: 400px;
        }
        .rc-checkbox .rc-checkbox-inner:after {
          top: 3px;
          left: 6.3px;
          width: 7px;
          height: 11px;
        }
      }
    }
  }
  .file-main {
    padding: 0;
    .row {
      width: max-content;
    }
  }
`;
