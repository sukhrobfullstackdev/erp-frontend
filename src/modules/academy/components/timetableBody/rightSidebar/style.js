import styled, { css } from "styled-components";

export const Styled = styled.div`
  .main__body {
    background: #f4f5f6;

    .groups {
      background: #ffffff;
      box-shadow: 0 0 16px -8px rgba(15, 15, 15, 0.2);
      border-radius: 4px;
      padding: 10px;

      &__search {
        margin-bottom: 10px;
        border-bottom: 1px solid #f4f5f6;
        padding: 10px;

        .search {
          background-color: #f9fafb;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 4px;
          padding: 11px 12px;

          .ui__icon__wrapper {
            width: 18px;
            height: 18px;

            .icon-search {
              width: 18px;
              height: 18px;
            }

            .icon-filter {
              width: 15px;
              height: 15px;
            }
          }
        }
      }

      .tabs__list__tab {
        min-width: 80px;
        justify-content: center;
        margin: 0;
        font-weight: 600;
      }

      .active {
        background-color: #45b26b;
      }
    }

    .colStyle {
      padding-left: 0 !important;
    }

    .rightSide {
      background: #ffffff;
      box-shadow: 0 0 16px -8px rgba(15, 15, 15, 0.2);
      border-radius: 4px;
      width: 100%;
      height: 100%;

      .rightSideBar {
        margin-left: auto;
        width: 298px;
        border-left: 1px solid #e6e8ec;
        height: 100%;

        .upperInfo {
          height: 390px !important;
          border-bottom: 1px solid #e6e8ec;
          background: #fcfcfd;
          border-top-right-radius: 4px;

          .aboutUser {
            height: 220px;
            border-bottom: 1px solid #e6e8ec;
            padding: 40px 0 0 31px;

            .userName {
              display: flex;
              color: #353945;
              font-weight: 500;
              font-size: 14px;
              line-height: 24px;
              margin-bottom: 24px;

              .type {
                font-size: 12px !important;
              }

              .type-time {
                font-size: 14px !important;
                letter-spacing: 2px !important;
              }

              .userIcon {
                width: 25px;
              }

              p {
                margin-left: 15px;
              }
            }
          }

          .userLessons {
            padding: 30px 0 0 30px;

            .allLesson {
              display: flex;
              align-items: center;
              margin-bottom: 20px;

              div {
                font-weight: 500;
                font-size: 16px;
                line-height: 24px;
                color: #777e91;
                width: 28px;
              }

              p {
                font-weight: 500;
                font-size: 14px;
                line-height: 24px;
                color: #353945;
                margin-left: 11px;
              }
            }
          }
        }

        .lessonStatus {
          padding: 10px;

          .lessonStatusCard {
            background-color: #fcfcfd;
            display: flex;
            border: 1px solid #f4f5f6;
            box-sizing: border-box;
            border-radius: 4px;
            width: 100%;
            height: 70px;
            margin-bottom: 8px;
            cursor: pointer;

            .numberOfLessons {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 75px;
              height: 70px;
              border-right: 1px solid #f4f5f6;
              font-weight: 500;
              font-size: 42px;
              line-height: 63px;
              color: #b1b5c4;
            }

            .statusPart {
              padding: 8px 0 0 17px;

              .timetable {
                display: flex;
                align-items: center;
                font-weight: normal;
                font-size: 14px;
                line-height: 24px;
                color: #777e91;
                padding-bottom: 6px;

                .iconTimetable {
                  width: 22px;
                  margin-right: 12px;
                }
              }
            }
          }
        }
        ${({ id }) =>
          id &&
          css`
            .lessonStatus {
              background-color: #fcfcfd;
            }
          `}
      }
    }
  }

  .active {
    background-color: #f1fdf5 !important;
    border: 1px solid #45b36b !important;

    .numberOfLessons {
      color: #45b26b !important;
    }

    .timetable {
      p {
        color: #353945 !important;
        font-weight: 500;
      }

      .icon {
        background-color: #353945;
      }
    }
  }
`;
