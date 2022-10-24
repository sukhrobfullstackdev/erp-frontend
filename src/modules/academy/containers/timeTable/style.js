import styled, { css } from "styled-components";

export const Styled = styled.div`
  padding: 0 15px;
  box-sizing: border-box;
  height: 82vh;

  .mainContainer {
    height: 76vh;
  }

  .tabs {
    &__list {
      width: 294px;
      background-color: #f4f5f6;
      border: 1px solid #e6e8ec;
      margin: 2px 0 0 17px;
      border-radius: 6px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;

      &__tab {
        width: 92px;
        height: 28px;
        border-radius: 4px;
        font-weight: 500;
        font-size: 12px;
        padding: 0;
        margin: 0 5px 0 0;
        color: #353945;
        justify-content: center;
        &.active {
          background-color: #45b36b;
          color: #fff;
        }
        &:last-child {
          margin: 0;
        }
      }
    }
  }

  .lessonsPage {
    display: flex;
    height: 76vh;
    background-color: #fff;
    box-shadow: 0 0 16px -8px rgba(15, 15, 15, 0.2);
    border-radius: 4px;
    width: 100%;
    .simplebar-content {
      padding: 0;
      width: 99.6% !important;
    }
    .cardContainer {
      padding: 20px;
      width: 100%;
    }
  }

  ${({ id }) =>
    id &&
    css`
      .lessonsPage {
        background-color: #fcfcfd;
      }
    `}

  .tabs__content {
    border-radius: 8px;
    padding: 15px;
    background: #f4f5f6;
    border: 1px solid #e6e8ec;
    margin: 0 auto;
    width: 98%;
    margin-top: 30px;
    overflow: hidden;
  }
  .lesson {
    &__table {
      margin-top: 15px;
      background: #ffffff;
      box-shadow: 0px 0px 16px -8px rgb(15 15 15 / 20%);
      border-radius: 4px;
      padding: 0px 10px 8px 10px;
      height: 57.4vh;
      position: relative;

      .table__header {
        padding-top: 8px;
        border-bottom: 1px solid #f4f5f6;
        width: fit-content;

        .lesson__table__col {
          &.yashil {
            background-color: #f0faf4;
            border-radius: 4px;
          }

          border-radius: 0;
          height: 50px;
          cursor: pointer;

          &__number {
            font-size: 16px;
            color: #b1b5c4;
          }
          &_date {
            font-size: 10px;
            color: #777e91;
            font-weight: 500;
            line-height: 15px;
          }
          .form-select-container {
            width: 260px;
            height: 44px;
          }
          form {
            width: 100%;
            height: 100%;

            .select__header {
              background-color: #f9fafb;
              border: 1px solid #f9fafb;
              border-radius: 4px;
              width: 260px;
              height: 50px;
              margin-left: 10px;

              &__content {
                font-size: 14px;
                font-weight: 600;
                min-width: 260px !important;
                max-width: 260px !important;
              }
            }

            .active {
              .select__header {
                border: 1px solid #45b36b;
                background: #f4fdf7;
              }
            }

            .select__body {
              .simplebar-content {
                padding: 14px 12px !important;
                padding-bottom: 0 !important;
              }

              .select__body__options__option {
                .content {
                  color: #777e91;
                  font-size: 14px;
                  font-weight: 500;
                }
              }
            }
          }
        }

        .date {
          background-color: #fff;

          .lesson__table__col_date {
            font-weight: 600;
          }

          .lesson__table__col_number {
            font-weight: 600;
          }
        }
      }

      &__row {
        display: flex;
        align-items: center;
        width: 100%;

        &.table__header {
          position: sticky;
          top: 0;
          background: white;
          z-index: 19;
        }

        .fullLessons {
          height: 60px;
          width: 101px;
          padding: 10px 26px;
          border-left: 1px solid #f4f5f6;
          font-weight: 600;
          font-size: 16px;
          line-height: 24px;
          display: flex;
          align-items: center;
          color: #3772ff;
          flex-direction: column;
          margin-left: 20px;

          span {
            font-weight: 600;
            font-size: 10px;
            line-height: 15px;
          }
        }
      }
    }

    &__footer {
      width: 100%;
      height: 60px;
      background: #ffffff;
      box-shadow: 0px -4px 20px rgba(0, 0, 0, 0.05);
      border-radius: 0px 0px 4px 4px;
      padding: 14px 20px;
      display: flex;
      align-items: center;
      justify-content: right;

      .btn-footer {
        button {
          border-radius: 4px;
          width: 79px;
          height: 32px;
          font-weight: 500;
          font-size: 14px;
          line-height: 21px;
          color: #fcfcfd;
          &[disabled] {
            color: #b1b5c4;
          }
        }
      }
    }
  }

  .nextItemTable {
    .modal__body {
      padding: 0;
      max-height: 95vh;
    }
  }

  .simplebar {
    .simplebar-content-wrapper {
      height: 100% !important;
    }
  }

  .dropDown__body {
    z-index: 111 !important;
  }

  .noLesson {
    display: grid;
    place-items: center center;
    color: #777e91;
  }
`;
