import styled from "styled-components";

export const Styled = styled.div`
  .lesson__table__row {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .opaque {
    opacity: 0.5;
  }

  &.first {
    width: 260px;
    align-items: start;
  }

  .col-user-info {
    display: flex;
    flex-direction: column;
    padding: 10px;
    text-overflow: ellipsis;
  }

  .col-user-name {
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #353945;
    margin-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 180px;
  }

  .col-user-number {
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #777e91;
    text-overflow: ellipsis;
  }

  .lesson__table__col {
    width: 260px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0 10px;
    border-radius: 4px;

    &.date {
      width: 80px;
      background: rgba(244, 248, 255, 1);

      .lesson__table__col_date {
        color: #777e91 !important;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #777e91;
      }

      .lesson__table__col__number {
        color: #b1b5c4;

        &.user {
          color: #3772ff;
        }
      }
    }

    &.green {
      background: #5cca81;
      width: 80px;
    }

    &.red {
      background: rgba(233, 96, 129, 1);
      width: 80px;
    }

    &.grey {
      background: #e6e8ec;
      width: 80px;
    }

    &.disabled {
      background: #f9fafb;
      width: 80px;
    }
  }

  .col-user {
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: #f9fafb;
    border-radius: 4px;
    height: 70px;
    min-width: 260px !important;
    max-width: 260px !important;
    cursor: pointer;

    &.leftStudent {
      background: #fff1f5;
      border: 1px solid #ef466f;
    }

    &.colActiveUser {
      background-color: #5cca81;

      .col-user-index {
        color: #fcfcfd;
        text-overflow: ellipsis;
      }

      .col-user-name {
        color: #fcfcfd;
        text-overflow: ellipsis;
      }

      .col-user-number {
        color: #fcfcfd;
        text-overflow: ellipsis;
      }

      .btn {
        button {
          .ui__icon__wrapper {
            .icon-more-dots {
              background-color: #fcfcfd !important;
            }
          }
        }
      }
    }

    .btn {
      button {
        padding-left: 0;
      }
    }
    .d-flex {
      display: flex;
    }

    .col-user-index {
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      display: flex;
      align-items: start;
      text-align: center;
      color: #353945;
      border-right: 1px solid #e6e8ec;
      padding: 10px;
    }

    .btn {
      button {
        background-color: transparent;
        margin-top: 4px;

        :hover {
          background-color: transparent;
        }

        .ui__icon__wrapper {
          width: 20px;
          height: 20px;

          .icon-more-dots {
            width: 20px;
            height: 20px;
            background-color: #323232;
          }
        }
      }
    }

    .dropDown__body {
      right: 1063px;
    }

    .dropdown {
      width: 155px;
      padding: 10px 8px;

      .dropdown-card {
        width: 100%;
        height: 26px;
        background-color: #fcfcfd;
        padding: 4px 8px;
        border-radius: 4px;
        color: #353945;
        font-weight: normal;
        font-size: 12px;
        line-height: 18px;
        margin-bottom: 4px;
      }
    }
  }

  .lesson__table__parent,
  .lesson__table__parentfalse {
    border-left: 1px solid #f4f5f6;
    padding: 5px 0;
    position: relative;

    &.parantDisabled {
      background-color: rgba(53, 57, 69, 0.2);
      border-left: 1px solid #d0d0d0;
      z-index: 1;

      .lesson__table__col {
        opacity: 0.7;
      }
    }
  }

  .lessonModal {
    .modal__body {
      padding: 20px;

      .form-input-container {
        margin-top: 20px;
        margin-bottom: 15px;
        border-radius: 6px;

        .form-input {
          padding: 5px 12px;
        }
      }

      .cancelBtn,
      .addBtn {
        button {
          border-radius: 6px;
        }
      }

      .addBtn {
        margin-left: 10px;
      }
    }
  }
  .select__header {
    min-width: 160px;
    &__content {
      &__placeholder {
        color: #777e91 !important;
      }
    }
  }
  .react-contextmenu {
    min-width: 155px;
    background: #fcfcfd;
    border: 1px solid #e6e8ec;
    border-radius: 4px;
    padding: 9px 6px;
    z-index: 99999;

    &-item {
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      color: #353945;
      padding: 5px 8px;
      transition: 0.5s ease;
      border-radius: 2px;
      cursor: pointer;
      &:hover {
        background: #f4f5f6;
      }
    }
  }
  .not-allowed {
    cursor: not-allowed;
  }

  .invoiceBtn {
    width: 170px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: auto;
    margin-top: 30px;

    button {
      border-radius: 4px;
      width: 80px;
      border: 0;
      font-size: 13px;
      height: 30px;
      padding: 0;
      display: grid;
      place-items: center center;
    }
  }

  .modal__body {
    width: 500px;
    height: fit-content;
  }
`;
