import styled, { css } from "styled-components";

export const CardStyled = styled.div`
  .cardContainer {
    width: 404px;
    background: #ffffff;
    border-radius: 6px;
    padding: 5px 0;
    margin: 0 15px 0 0;
    cursor: pointer;
    /* margin-left: auto; */
    &.pile {
      opacity: 0.7;
    }
    .card__headerNo {
      width: 95%;
      display: flex;
      margin: 5px auto;
      height: 6px;
      background: #9757d7;
      border-radius: 2px;
    }
    .card__header {
      width: 95%;
      display: flex;
      height: 6px;
      background: #3772ff;
      border-radius: 2px;
      margin: 5px auto;
    }
    .card__img {
      display: block;
      margin: 10px 0px 10px 30px;
      width: 104px;
      height: 104px;
      background: #f4f5f6;
      border-radius: 100px;

      .icon-userImg {
        width: 40px;
        height: 40px;
      }
    }
    .card__firstName {
      /* margin-bottom: 10px; */
      display: block;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      color: #353945;
    }
    .card__phone {
      padding: 15px 0px;
      display: block;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 24px;
      color: #777e91;
    }
    .card__notRegis {
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;
      color: #9757d7;
      padding: 10px 0;
    }
    .card__ourClient {
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      padding: 10px 0;
      line-height: 24px;
      color: #3772ff;
    }
    .border__button {
    }
    .card__footer {
      padding: 14.5px 22px 13px 22px;
      border-top: 0.5px solid #e6e8ec;
      margin-top: 5px;
      justify-content: space-between;
      display: flex;
      align-items: center;
      .btnstyle {
        button {
          font-weight: 600;
          font-size: 14px;
          line-height: 21px;
          border-radius: 5px;
        }
      }
      .card_fot {
        button {
          border-radius: 5px;
          padding: 2px 7px;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 18px;
        }
      }
      .card_fot_but {
        width: 66px;
        height: 22px;
        background: rgba(69, 179, 107, 0.1);
        border-radius: 5px;
        padding: 2px 7px;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
        color: #45b36b;
      }
      .card_fot_count {
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: #777e91;
        padding-right: 8px;
        margin-left: auto;
      }
    }
  }
`;
