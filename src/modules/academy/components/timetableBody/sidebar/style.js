import styled, { css } from "styled-components";

export const Styled = styled.div`
  .groups {
    border: 1px solid #e6e8ec;
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: 0px 0px 16px -8px rgba(15, 15, 15, 0.2);
    border-radius: 4px;
    padding-bottom: 1px;
    width: 100%;
    height: 76.1vh;
    transition: 0.3s;

    &__search {
      margin-bottom: 10px;
      border-bottom: 1px solid #f4f5f6;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .search {
        background-color: #f9fafb;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 4px;
        padding: 11px 12px;
        /* width: 80%; */
        height: 40px;

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

        .customInput {
          border: 0;
          outline: none;
          width: 130px;
          background-color: transparent;

          ::placeholder {
            color: #b1b5c4;
          }
        }
      }

      .closeSidebar {
        width: 40px;
        height: 40px;
        background: #f3fdf7;
        border: 1px solid #e2f5e9;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 224px;
        transition: 0.3s;

        .iconArrow {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(180deg);

          .icon.icon-double-arrow {
            width: 15px;
            height: 15px;
          }
        }
      }
    }

    &__status {
      padding-left: 10px;
      padding-right: 10px;

      .tabsContainer {
        .tabs {
          &__list {
            width: 239px;
            height: 40px;
            border-radius: 4px;
            background-color: #f9fafb;
            margin: 0;
            border: 0;
            margin-bottom: 10px;
            border-radius: 0;
            &__left {
              height: 40px;
              align-items: center;
              padding: 0 5px;
            }

            &__tab {
              width: 73px;
              height: 30px;
              border-radius: 4px;
              font-weight: 500;
              font-size: 12px;
              padding: 0;
              margin: 0 5px 0 0;
              justify-content: center;
              color: #777e91;

              &:last-child {
                margin: 0;
              }
            }
          }
        }
      }
    }

    .active {
      background-color: #45b26b;
      color: #ffffff !important;
    }
  }

  .colStyle {
    padding-left: 0 !important;
  }

  @media (max-width: 1600px) {
    .groups__search {
      .search {
        width: 78%;

        height: 35px;
        .customInput {
          width: 100%;
        }
      }
      .closeSidebar {
        width: 35px;
        height: 35px;
        left: auto;
        right: 10px;
      }
    }
    .groups__status {
      .tabsContainer {
        .tabs {
          &__list {
            width: 100%;
            &__left {
              width: 100%;
              &_tab {
                width: 33%;
              }
            }
          }
        }
      }
    }
  }
  ${({ close }) =>
    close &&
    css`
      .groups {
        width: 0px;
        overflow: hidden;
        border: none;

        .closeSidebar {
          left: -25px;
          transform: rotate(180deg);
          width: 48px;
          height: 48px;
          background: #45b36b;
          border-radius: 50%;
          justify-content: flex-start;

          .ui__icon__wrapper {
            &.iconArrow {
              width: 25px;
            }

            .icon {
              background-color: #fcfcfd;

              &.icon-double-arrow {
                width: 12px;
                height: 12px;
              }
            }
          }
        }
      }
    `}
  .groups .tabs__content {
    margin-top: 0;
    padding: 0;
    border: none;
  }
`;
