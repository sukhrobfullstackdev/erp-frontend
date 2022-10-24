import styled, { css } from "styled-components";

export const Styled = styled.div`
  .header {
    background: #ffffff;
    box-shadow: 0 0 16px -8px rgba(15, 15, 15, 0.25);
    border-radius: 4px;
    display: flex;

    &__row {
      width: 100%;
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px 26px;
      border-left: 1px solid rgba(230, 232, 236, 1);

      &__top {
        display: flex;
        align-items: center;

        &__lesson {
          font-weight: 600;
          font-size: 16px;
          line-height: 24px;
          display: flex;
          align-items: center;
          text-align: center;
          color: #ef466f;
          padding-right: 20px;
          border-right: 1px solid rgba(230, 232, 236, 1);
        }

        &__name {
          font-size: 14px;
          line-height: 24px;
          display: flex;
          align-items: center;
          text-align: center;
          color: #777e91;
          padding: 0 20px;
          border-right: 1px solid rgba(230, 232, 236, 1);
          .ui__icon__wrapper {
            width: 20px;
            height: 20px;
            margin-right: 10px;

            .icon-glasses {
              width: 20px;
              height: 20px;
              background-color: #323232;
            }
          }
        }

        &__time {
          width: 185px;
          font-size: 16px;
          line-height: 24px;
          display: flex;
          align-items: center;
          text-align: center;
          color: #777e91;
          padding: 0 20px;
          border-right: 1px solid rgba(230, 232, 236, 1);
          letter-spacing: 0.5px;

          .ui__icon__wrapper {
            width: 20px;
            height: 20px;
            margin-right: 10px;

            .icon-clock {
              width: 20px;
              height: 20px;
              background-color: #323232;
            }
          }
        }

        &__date {
          width: 130px;
          border-radius: 8px;
          margin-left: 20px;
          color: #b1b5c4;
          font-weight: 400;
          font-size: 14px;
          line-height: 21px;

          .datepicker__input {
            cursor: pointer;
            height: 32px;
            padding-left: 34px;
            min-width: 130px;
            background: #f4f5f6;
            ${({ status }) =>
              status === "danger" &&
              css`
                border: 1px solid #ef466f;
                background-color: #fff8f9;
              `}
          }

          img {
            left: 5px;
            top: 17%;
            color: black;
            cursor: pointer;
          }
        }
      }

      &__bottom {
        display: flex;
        align-items: center;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        text-align: center;
        color: #353945;
        margin-top: 7px;
      }
    }

    &__play {
      min-width: 133px;
      background: #f0faf4;
      border-radius: 4px;
      padding: 12px 14px 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #353945;
      cursor: pointer;
      flex-direction: column;
      margin: 10px;

      .ui__icon__wrapper {
        width: 34px;
        height: 34px;
        .icon-play {
          width: 34px;
          height: 34px;
        }
      }

      .start {
        font-weight: 600;
        font-size: 12px;
        line-height: 18px;
        color: #353945;
        margin-top: 8px;
      }
      .clear {
        color: #3772ff;
        letter-spacing: 0.5px;
      }
    }

    &__clear {
      background: #edf3ff;
      &:hover {
        background: #3772ff;
        .clear {
          color: #fcfcfd;
        }
      }
    }

    &__lesson {
      display: flex;
      align-items: center;
      .cancel__btn {
        button {
          background-color: #fff1f5;
          border-radius: 8px;
          min-width: 165px;
          font-size: 12px;
          font-weight: 500;
          line-height: 18px;
          color: #353945;
          padding: 12px 10px 8px;
          margin-right: 10px;

          .ui__icon__wrapper {
            height: 34px;
            width: 100%;
            text-align: center;
            margin-bottom: 8px;

            .icon-exit {
              height: 34px;
              width: 34px;
              background-color: #ef466f;
            }
          }

          :hover {
            background-color: #ef466f;
            color: #fcfcfd;
            .icon-exit {
              background-color: #fcfcfd;
            }
          }
        }
      }

      .over__btn {
        button {
          background-color: #f0faf4;
          border-radius: 4px;
          min-width: 153px;
          font-size: 12px;
          font-weight: 500;
          line-height: 18px;
          color: #353945;
          padding: 12px 14px 8px;
          margin-right: 10px;

          .ui__icon__wrapper {
            height: 34px;
            width: 100%;
            text-align: center;
            margin-bottom: 8px;

            .icon-logout {
              height: 34px;
              width: 34px;
              background-color: #45b36b;
            }
          }

          :hover {
            background-color: #45b36b;
            color: #fcfcfd;

            .icon-logout {
              background-color: #fcfcfd;
            }
          }
        }
      }
      &.disabled {
        .cancel__btn,
        .over__btn {
          button {
            cursor: not-allowed;
            .ui__icon__wrapper {
              cursor: not-allowed;
            }
          }
        }
      }
    }

    &__number {
      width: 83px;
      font-weight: 500;
      font-size: 64px;
      line-height: 96px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2px 45px;
      color: #777e91;
      cursor: pointer;
      position: relative;
      &:hover {
        color: #23262f;
      }
      &__back {
        position: absolute;
        top: 160px;
        left: 36px;
        z-index: 1;
        transition: all 0.5s;
        &__img {
          position: absolute;
          top: 0;
          left: 0;
        }
        p {
          position: absolute;
          top: 37px;
          left: 30px;
          color: #fff;
          z-index: 3;
          width: 222px;
          font-weight: 500;
          font-size: 14px;
          line-height: 21px;
        }
        .backIcon {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 27px;
          left: 252px;
          z-index: 3;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #353945;
          .ui__icon__wrapper.md .icon {
            width: 15px;
            height: 14px;
          }
        }
      }
    }
    .select__header {
      border: 0;
      background: none;
      &__content {
        display: flex !important;
        flex-direction: row-reverse !important;
        margin-left: 15px;
      }
      &__iconContainer {
        right: 0;
        left: -4px;
      }
    }

    .select__body {
      min-width: 700px;
      text-align: start;
    }
    .optionsWrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .content {
        font-weight: 400;
        font-size: 14px;
        line-height: 21px;
        margin: 10px 0;
        cursor: pointer;
      }
      .checked {
        width: 19px;
        height: 19px;
        border-radius: 50%;
        background: #45b36b;
        display: grid;
        place-items: center center;
        .ui__icon__wrapper.md {
          width: 12px;
          height: 12px;
        }
        .ui__icon__wrapper.md .icon {
          width: 8px;
          height: 7px;
        }
      }
    }

    .select__body__options__search {
      display: none;
    }

    .select.active .select__header {
      border: 0;
    }
  }

  .isDisabled {
    background-color: red !important;
    cursor: not-allowed !important;
  }

  @media (max-width: 1500px) {
    .header__lesson {
      .cancel__btn,
      .over__btn {
        button {
          min-width: auto;
          width: 100px;
          max-height: 80px;
          span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: inline-block;
            width: 100%;
          }
          .ui__icon__wrapper {
            height: 15px;
            .icon-logout {
              height: 17px;
              width: 17px;
            }
          }
        }
        &[data-title] {
          position: relative;
        }
        &[data-title]:hover::after {
          content: attr(data-title);
          position: absolute;
          width: 180px;
          min-height: 35px;
          font-size: 12px;
          /* bottom: -50%; */
          bottom: -69%;
          right: 0;
          background-color: #222;
          color: #fff;
          border-radius: 5px;
          padding: 10px;
          z-index: 3;
        }
        &[data-title]:hover::before {
          content: "";
          border-top: 10px solid transparent;
          border-bottom: 10px solid #222;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          position: absolute;
          bottom: -11%;
          right: calc((180px / 2) - 10px);
          z-index: 1;
        }
      }
    }
  }
`;
