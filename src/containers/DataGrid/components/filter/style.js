import styled from "styled-components";

export const Style = styled.div`
  input {
    flex: 1;
  }

  input,
  span,
  div {
    font-size: 12px !important;
  }

  .select__header__content {
    padding: 0 10px !important ;
  }

  .rating-input {
    background: #fcfcfd;
    border: 1px solid #e6e8ec;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 10px;
    overflow: hidden;
    outline: none;
    max-width: 160px;
    margin-right: 8px;
    height: 40px;

    .ui__icon__wrapper.md {
      width: 22px !important;
      height: 17px !important;

      .icon {
        width: 17px !important;
        height: 17px !important;
      }
    }
  }

  .select__body {
    min-width: 200px !important;
  }

  .filter {
    padding: 20px;
    max-width: 1000px;

    &.long {
      min-width: 720px;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;

      &__title {
        font-family: Poppins;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        color: #b1b5c4;
      }

      &__clear {
        display: flex;
        align-items: center;

        button {
          background: rgba(55, 114, 255, 0.05);
          border-radius: 6px;
          font-family: Poppins;
          font-style: normal;
          font-weight: 600;
          font-size: 12px;
          line-height: 18px;
          text-align: center;
          color: #3772ff;
          margin-right: 10px;
        }
      }
    }

    &__body {
      min-width: 380px;

      .multi-select-wrapper {
        .select__header .multiValueList .multiValue .exitBtn {
          height: 16px !important;
          width: 16px !important;
        }

        .select__header {
          height: 38px;
        }
      }

      .select__header__bottomArrow {
        .icon {
          background-color: rgba(119, 126, 144, 1);
          left: 78% !important;
        }
      }

      .input-wrapper {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 10px;

        & > *:nth-last-child(2) {
          flex: 1;
        }

        & :nth-child(5) input {
          width: 120px;
        }

        .select__body {
          .multiValue {
            font-size: 12px;
          }

          .select__body__options__search__input {
            font-size: 12px;
          }

          .content {
            font-size: 12px;
          }
        }

        .dropDown__body {
          .dropdawn {
            padding: 10px 0;
          }

          .drop_btn {
            padding: 0 30px 0 10px;
          }

          button {
            font-family: Poppins;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 18px;
            text-align: center;
            color: #353945;
          }
        }

        .dropDown__button {
          display: flex;
          align-items: center;
          justify-content: center;

          button {
            /* background: transparent; */

            span {
              font-weight: 400;
              font-size: 12px;
            }

            &:hover {
              color: #fff;
            }
          }
        }

        .drop_btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px 20px;

          button {
            background: transparent;

            span {
              font-weight: 400;
              font-size: 12px;
            }

            &:hover {
              color: #000;
            }
          }
        }

        .oneInput {
          background: #fcfcfd;
          border: 1px solid #e6e8ec;
          box-sizing: border-box;
          border-radius: 8px;
          padding: 10px;
          overflow: hidden;
          outline: none;
          /* max-width: 160px; */
          margin-right: 8px;
          height: 40px;

          &.one {
            /* min-width: 310px; */
          }
        }

        .noInput {
          margin-right: 10px;
          font-size: 12px;
          font-weight: 400;
          line-height: 12px;
        }

        .first-child {
          max-width: 78px;

          .select__header {
            max-width: 68px;
            height: 40px;
          }

          .select__header__content {
            display: inline-block;
            font-size: 12px;
            font-weight: 400;
            text-align: start;
            line-height: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 120px;
            color: #292d34;
            height: min-content;
          }
        }

        .second-child {
          width: 150px;

          .select__header {
            width: 140px;
            height: 40px;
          }

          .select__header__content {
            display: inline-block;
            font-size: 12px;
            font-weight: 400;
            text-align: start;
            line-height: 35px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 120px;
            color: #292d34;
            height: min-content;
          }
        }

        .third-child {
          /* width: 100%; */
          /* max-width: 105px; */

          .select__header {
            height: 40px;
          }

          .select__header__content {
            display: inline-block;
            margin-right: 24px;
            align-items: start;
            text-align: start;
            padding: 0 10px;
            font-size: 12px;
            font-weight: 400;
            line-height: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 75px;
            color: #292d34;
            height: min-content;
          }
        }

        .multi-select-wrapper {
          display: flex;
          border: 1px solid #ccc;
          border-radius: 8px;
          display: flex;
          align-items: center;
          margin-right: 8px;

          .select__header {
            border: none !important;
          }

          .select__header__content {
            display: inline-block;
            margin-right: 24px;
            align-items: start;
            text-align: start;
            padding: 0 10px;
            font-size: 12px;
            font-weight: 400;
            line-height: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 120px;
            color: #292d34;
            height: min-content;
          }
        }

        .last-input {
          min-width: 180px;
        }

        .close-fild {
          height: 34px;
          width: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(249, 250, 252, 1);
          border-radius: 50%;
        }

        .select {
          margin-right: 8px;

          &__header {
            font-family: Poppins;
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 24px;
            text-align: center;
            color: #353945;
          }
        }
      }
    }

    &__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .dropDown__body {
        top: 64px;
        right: -11px;

        .template__body {
          min-width: 280px;
        }
      }

      .select {
        border-radius: 8px;
        min-width: 80px !important ;

        &__header {
          background: rgb(69 178 107 / 7%);
          min-height: 34px !important;
          height: 34px;

          &__content {
            height: 34px;
            font-family: Poppins;
            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            line-height: 24px;
            text-align: center;
            color: #45b36b;
          }
        }
      }

      &__templates {
        max-height: 34px;
        padding: 10px 15px;
        background: #f4f5f6;
        border: 1px solid #e6e8ec;
        box-sizing: border-box;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: Poppins;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 14px;
        text-align: center;
        color: #353945;

        .ui__icon__wrapper.md {
          margin-right: 8px;

          .icon {
            width: 18px;
            height: 18px;
          }
        }
      }
    }
  }
`;
