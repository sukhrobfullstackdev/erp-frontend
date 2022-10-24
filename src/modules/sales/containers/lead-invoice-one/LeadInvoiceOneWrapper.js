import styled from "styled-components";

const InvoiceStyle = styled.div`
  .btn-color-dark button {
    color: var(--dark);
    min-height: 45px;
    width: 100%;
  }
  .fw-bold {
    font-weight: bold;
  }
  .txt-align-right {
    text-align: end;
  }
  .value {
    font-weight: bold;
  }

  .p-0 {
    padding: 0 !important;
  }
  .btn-w-100 {
    button {
      width: 100%;
    }
  }
  .p-15-30 {
    padding: 15px 30px;
  }
  .input-text {
    background: none;
    border: none;
    outline: none;
  }
  .input-right {
    direction: rtl;
  }
  .card {
    padding: 30px;
    width: 100%;
    border-radius: 16px;
    margin: 0;
    box-shadow: 0px 3.46875px 7.80469px -2.60156px rgba(24, 39, 75, 0.12),
      0px 5.20312px 18.2109px -1.73438px rgba(24, 39, 75, 0.12);
  }
  button {
    color: var(--white);
  }
  .user-card {
    background-color: var(--dark);
    color: #fff;
    .user-card_head {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .user-card_name {
        color: #fff !important;
      }

      .dropDown {
        color: #000;
        &__body {
          .drop-down-item {
            display: block;
            padding: 10px 14px;
            font-size: 14px;
            cursor: pointer;
          }

          .drop-down-item.first {
            display: block;
            padding: 10px 14px;
            border-bottom: 1px solid #f4f5f6;
          }
        }
      }

      .icon {
        width: 14px !important;
        height: 14px !important;
      }

      .icon-more-dots {
        width: 26px !important;
      }

      .card-name {
        display: flex;
        font-family: Poppins;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
        text-align: center;
        color: #353945;
        align-items: center;

        .ui__icon__wrapper {
          margin-left: 12px;
        }
      }
    }
    .user-card_content {
      padding: 20px;
      background-color: #353945;

      .select-control {
        display: flex;
        justify-content: space-between;
        align-content: center;
        margin: 20px 0;
        .user-card_content-select {
          width: 100%;
          .select {
            &__header {
              background: #9757d7 !important;
              border-color: #9757d7 !important;
              color: #fff !important;
              &__content {
                color: #fff;
              }
              .icon {
                background-color: #fff !important;
              }
            }
          }
        }
      }
      .progressbar {
        width: 100%;
        height: 10px;
        border-radius: 12px;
        overflow: hidden;
        background-color: #fff;
        .progressbar-content {
          width: 70%;
          height: 10px;
          background: linear-gradient(90deg, #0ba360 0%, #3cba92 100%);
        }
      }
    }
  }
  .checkboxes {
    button {
      color: #000;
      width: 100%;
      padding: 20px;
      margin: 10px 0;
      text-align: left;
      span {
        margin-right: 10px;
      }
    }
  }
  .mx-height {
    max-height: 85vh;
    overflow: auto;
    position: relative;
  }
  .h-100 {
    height: 100%;
  }
  .tabs__list {
    width: 100%;
    margin: 30px 0;
    .active {
      background-color: var(--brand--color);
    }
  }
  .info-card {
    width: 100%;
    border-radius: 16px;
    box-shadow: 0px 3.46875px 7.80469px -2.60156px rgba(24, 39, 75, 0.12),
      0px 5.20312px 18.2109px -1.73438px rgba(24, 39, 75, 0.12);
  }
  .info_list {
    padding: 0;
    align-items: center;
    hr {
      margin: 15px 0;
    }
    &-item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 30px;
      &:first-child {
        padding-top: 30px;
      }
      &:last-child {
        padding-bottom: 30px;
      }
      form {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    .key {
      color: #777e91;
    }
  }
  .filter__box {
    width: 100%;
    display: flex;
    /* justify-content: space-between; */
    padding: 20px 0;
    align-items: center;
    .filter__fild__item {
      height: 100%;
      flex: 1;
      padding-right: 12px;
      /* width: 300px; */
    }
  }
  .modal__body {
    height: 80vh;
    overflow: auto;
    /* ----------invoicessss----------- */
    .modal-invoice {
      padding: 30px;

      .invoice-cards {
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 20px;
        .card {
          cursor: pointer;
          width: 32%;
          &.active {
            background-color: var(--light-green);
          }

          .gr-name {
            color: var(--info);
          }
          .price {
            color: var(--green);
          }
        }
      }
    }
    .tabs__list {
      width: 100%;
      &__left {
        width: 100% !important;
      }
      &__tab {
        width: 50% !important;
        justify-content: center;
      }
    }
  }
  .chat-wrapper {
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0px 3.46875px 7.80469px -2.60156px rgba(24, 39, 75, 0.12),
      0px 5.20312px 18.2109px -1.73438px rgba(24, 39, 75, 0.12);
    max-height: 90vh;
    .chat {
      flex: 1;
      position: static;
      max-height: 70vh;
      overflow: auto;
    }

    .filter__box {
      width: 100%;
      display: flex;
      /* justify-content: space-between; */
      padding: 20px 0;
      align-items: center;

      .filter__fild__item {
        flex: 1;
        padding-right: 12px;
        /* width: 300px; */

        .select__header,
        .clockPicker__header {
          border: none;
          background: #f4f5f6;
          padding: 6px 12px;

          .select__header__content__placeholder {
            color: #b1b5c4;
          }
        }
      }
    }

    .chat {
      flex: 1;
      position: static;
      max-height: 70vh;
      height: 100%;
      overflow: auto;
    }

    .msg {
      margin: 20px 0;
      overflow-x: hidden;

      &-time {
        margin-top: 20px;
        color: var(--text--disable);
      }
      &-content {
        max-width: 50%;
        border-radius: 4px;
        position: relative;
        margin: 0 20px;
        background-color: var(--light-green);
        padding: 20px 40px;
      }
      .sent::after {
        content: "";
        position: absolute;
        border-left: 10px solid var(--light-green);
        border-right: 10px solid transparent;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        top: 20px;
        z-index: 99;
        right: -20px;
      }
      .got {
        background-color: var(--default);
        &::after {
          content: "";
          position: absolute;
          border-left: 10px solid transparent;
          border-right: 10px solid var(--default);
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          top: 20px;
          z-index: 99;
          left: -20px;
        }
      }

      &-avatar {
        margin-top: 0.5%;
        width: 50px;
        border-radius: 50%;
        img {
          width: 100%;
        }
      }
    }
    .chat-input {
      padding-top: 20px;
      min-height: 70px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;

      & .inputContainer {
        width: 100%;
        background-color: var(--default);
        height: auto;
        position: relative;

        input {
          height: 100%;
          font-size: 16px;
        }
      }
      .send-btn {
        width: 10%;
        height: 100%;
      }
      button {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
      }
    }
  }
`;
export default InvoiceStyle;
