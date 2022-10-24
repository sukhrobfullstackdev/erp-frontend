import styled, { css } from "styled-components";

export const NewCardStyle = styled.div`
  width: 620px;
  min-height: 425px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 12px;
  border: 1px solid #e6e8ec;
  background: #ffffff;
  box-shadow: 0px 40px 32px -24px rgba(15, 15, 15, 0.12);
  .card__Container {
    box-sizing: border-box;
    padding: 20px;
    .title {
      font-size: 14px;
      font-weight: 600;
      line-height: 21px;
      margin-bottom: 20px;
      color: #777e90;
    }
    .card__row {
      width: 100%;
      height: 40px;
      background: #fcfcfd;
      box-sizing: border-box;
      border-radius: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 10px 6px 14px;
      margin-bottom: 6px;
      transition: 0.3s ease;
      :hover {
        background: #f4f5f6;
        box-sizing: border-box;
        border-radius: 6px;
        .card__inp {
          .inputContainer {
            border: 1px solid #45b36b;
            box-sizing: border-box;
            border-radius: 6px;
          }
        }
      }
      .text__name {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 21px;
        color: #353945;
      }
      .card__inp {
        .form-input-container {
          width: 80px;
          height: 28px;
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;
          color: #353945;
          border-radius: 6px;
          border: 1px solid #e6e8ec;
          padding: 1px;
          &.focused {
            border: 1px solid #e6e8ec;
          }
          input {
            text-align: center;
            padding: 5px 3px;
          }
        }
      }
    }
  }
  .card__footer {
    height: 74px;
    width: 100%;
    border-top: 1px solid #e6e8ec;
    border-radius: 0px 0px 12px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 18px;
    background-color: #fff;
    .card__footer_text {
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 18px;
      color: #353945;
    }
    .card__footer_button {
      display: flex;
      .card__footer_button_sty {
        button {
          width: 73px;
          height: 34px;
          border-radius: 8px;
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;
          color: #f15d82;
          padding: 6px 15px;
          margin-right: 5px;
        }
      }
      .card__footer_button__sty {
        button {
          width: 60px;
          height: 34px;
          border-radius: 8px;
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;
          text-align: center;
          color: #b1b5c4;
          background-color: #f4f5f6;
        }
      }
    }
  }

  ${({ theme: { mode } }) =>
    mode === "dark" &&
    css`
      background: #141416;
      border-color: rgba(35, 38, 47, 1);
      .title {
        color: rgba(208, 212, 220, 1);
      }
      .card__row {
        background: #141416 !important;
        .text__name {
          color: rgba(177, 181, 195, 1) !important;
        }
        &:hover {
          background: #23262f !important;
          .text__name {
            color: #fcfcfd !important;
          }
          color: #fcfcfd !important;
        }
      }
      .card__footer {
        border-top: 1px solid #353945;
        background: #141416;
        color: #fff;
        .card__footer_text {
          color: rgba(177, 181, 195, 1);
        }
      }
    `}
`;
