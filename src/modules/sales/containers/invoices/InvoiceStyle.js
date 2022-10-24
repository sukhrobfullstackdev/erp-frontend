import styled from "styled-components";

const InvoiceStyle = styled.div`
  .card {
    padding: 30px;
    width: 100%;
    border-radius: 16px;
    box-sizing: border-box;
    margin: 0;
    box-shadow: 0px 3.46875px 7.80469px -2.60156px rgba(24, 39, 75, 0.12),
      0px 5.20312px 18.2109px -1.73438px rgba(24, 39, 75, 0.12);
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
      div:first-child {
        display: flex;
        justify-content: space-between;
        align-content: center;
        background-color: #353945;
        .user-card_content-select {
        }
      }
      .user-card_content-progressbar {
        margin: 20px 0;
        width: 100%;
        height: 10px;
        overflow: hidden;
        border-radius: 12px;
        .progressbar-content {
          background: linear-gradient(90deg, #0ba360 0%, #3cba92 100%);
          height: 10px;
          width: 70%;
        }
      }
    }
  }
  .tabs__list {
    width: 100%;
    margin: 40px 0;
    .active {
      background-color: var(--brand--color);
    }
  }
  .info_list {
    padding: 0;
    hr {
      margin: 30px 0;
    }
    .info_list-item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 30px;
      &:first-child {
        padding-top: 30px;
      }
    }
    .key {
      color: #777e91;
    }
  }
`;
export default InvoiceStyle;
