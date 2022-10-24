import styled, { css } from "styled-components";

export const SelectStyled = styled.div`
  .select {
    min-width: 100px;
    position: relative;

    &__header {
      min-height: 38px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fcfcfd;
      border: 1px solid #e6e8ec;
      box-sizing: border-box;
      border-radius: 8px;
      cursor: pointer;
      transition: 0.2s;
      position: relative;

      &__content {
        width: 100%;
        height: 100%;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        color: #353945;
        padding: 10px;
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        &__text {
          width: 85%;
          line-height: 35px;
          display: inline-block;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }

      .multiValueList {
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;

        .multiValue {
          display: flex;
          margin: 0 5px 0 0px;
          border-radius: 2px 10px 10px 2px;
          padding: 2px 8px 2px 6px;
          position: relative;

          .drop-down-dots {
            height: 27px;
            animation: hideAnim 0ms forwards;
            position: absolute;
            top: -2px;
            right: 2px;
          }

          .exitBtn {
            animation: hideAnim 0ms forwards;
            /* overflow: hidden; */
            margin-left: 4px;
            border-radius: 2px 10px 10px 2px;
            position: absolute;
            right: 0;
            top: 0px;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 27px;

            .ui__icon__wrapper {
              width: 15px;
              border-radius: 2px 10px 10px 2px;
              margin-bottom: 1px;

              .icon {
                background: #fcfcfd;
                width: 17px !important;
                height: 17px !important;
              }
            }

            &:after {
              content: "";
              width: 10px;
              height: 100%;
              position: absolute;
              top: 0;
              left: -10px;
              background: linear-gradient(to right, transparent, rgba(255, 255, 255, 1));
            }
          }

          &:hover {
            border-radius: 2px 10px 10px 2px;
            /* padding: 2px 23px 2px 6px; */

            .drop-down-dots {
              animation: showAnim 0ms forwards;
            }

            .exitBtn {
              animation: showAnim 0ms forwards;
              padding: 0 1px;
              padding-right: 3px;
            }
          }
        }
      }

      &__selectedNumber {
        min-width: 25px;
        min-height: 25px;
        background: #d8dde8;
        font-weight: bold;
        font-size: 12px;
        line-height: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        border-radius: 50%;
        position: absolute;
        right: 10px;
      }

      &__iconContainer {
        position: absolute;
        right: 10px;
        height: 100%;
        display: flex;
        align-items: center;
      }

      &__clearAll {
        height: 40px;
        background: #3772ff;
        border-radius: 6px;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        text-align: center;
        text-transform: uppercase;
        color: #ffffff;
        padding: 8px 16px;
        display: flex;
        align-items: center;
        position: absolute;
        right: 5px;
        cursor: pointer;
        transition: 0.2s;

        &:hover {
          opacity: 0.9;
        }
      }
    }

    &__body {
      width: 100%;
      min-width: 50px;
      margin: 12px 0 0 0;
      z-index: 20;
      background: #ffffff;
      border: 1px solid #e6e8ec;
      box-sizing: border-box;
      box-shadow: 0 8px 16px rgba(145, 158, 171, 0.24);
      border-radius: 8px;
      padding-bottom: 10px;
      opacity: 0;
      overflow: ${({ isFixed }) => (isFixed ? "unset" : "hidden")};
      ${({ defaultHideAnimation }) =>
        defaultHideAnimation ? "animation: hideAnim 0.1s forwards;" : "transform: scale(0);"} //animation: hideAnim 0.1s forwards;
      position: absolute;

      &__options {
        box-sizing: border-box;
        border-radius: 8px;
        background: #fff;
        border: none;
        overflow-y: auto;
        min-height: ${({ action }) => (action ? "160px" : "76px")};
        padding-right: 8px;
        max-height: 250px;

        &::-webkit-scrollbar {
          width: 0 !important;
        }

        //&::-webkit-scrollbar {
        //  width: 3px;
        //  height: 3px;
        //  /* border: none; */
        //  background: transparent;
        //
        //  &-track, &-thumb {
        //    border: none;
        //    background: transparent;
        //  }
        //
        //  &-button, &-track-piece, &-corner {
        //    display: none;
        //  }
        //
        //  &-button {
        //    /* padding: 5px; */
        //  }
        //
        //  &-track {
        //    background: #EFF1F3;
        //  }
        //
        //  &-thumb {
        //    background: #777E91;
        //    border-radius: 3px;
        //    /* border-left: 3px solid transparent;
        //    border-right: 3px solid transparent; */
        //    background-clip: padding-box;
        //
        //    &:vertical {
        //      /* border-left: 5px solid #EFF1F3;
        //      border-right: 5px solid #EFF1F3;
        //      box-sizing: border-box;
        //      border-radius: 8px; */
        //    }
        //
        //    &:hover {
        //      background: rgba(129, 136, 154, 1);
        //    }
        //  }
        //}

        &__selected {
          min-height: 0;
          /* overflow: hidden; */
        }

        &__title {
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;
          color: #777e91;
          padding: 6px 7px;
          border-radius: 8px 8px 0px 0px;
        }

        &__search {
          background: #f4f5f6;
          border-radius: 6px;
          box-sizing: border-box;
          margin-bottom: 10px;
          margin-top: 5px;

          input {
            background: none;
            border: none;
            outline: none;
            width: 100%;
            padding: 10px 6px 9px 6px;
            padding-left: 10px;
            font-weight: normal;
            font-size: 14px;
            line-height: 21px;
            color: #353945;

            &::placeholder {
              color: #b1b5c4;
            }
          }
        }

        &__option {
          display: flex;
          justify-content: space-between;
          font-weight: normal;
          font-size: 14px;
          line-height: 21px;
          color: #353945;
          margin-bottom: 5px;
          padding: 7px 0 7px 10px;
          border-radius: 8px;

          .content {
            cursor: pointer;
            width: 100%;
            background: none;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          &.disabled {
            color: #9e9e9e;
            cursor: not-allowed;

            .content {
              cursor: not-allowed;
            }
          }

          ${({ optionsDisabled }) =>
            optionsDisabled &&
            css`
              background: #777e9129;
              cursor: not-allowed;

              .content {
                cursor: not-allowed;
              }
            `}
        }

        &__empty {
          width: 100%;
          height: 100%;
          text-align: center;
          font-size: 14px;
          padding: 40px 0 45px;
        }

        &__footer {
          position: absolute;
          bottom: 10px;
          left: 10px;

          &__button {
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            line-height: 1;
            color: #7c828d;
          }
        }
      }

      .colorPicker-container {
        position: fixed;
        top: 105px;
        right: 30px;
        width: 224px;
        height: 145px;
        background: #fcfcfd;
        box-shadow: 0 8px 16px rgba(145, 158, 171, 0.24);
        border-radius: 8px;
        .circle-picker {
          position: absolute;
          //top: 60px;
          //right: 30px;
          top: 33px;
          right: 16px;
        }

        .styled-chrome-picker {
        }
      }
    }

    .dropDown {
      &__button {
        position: absolute;
        top: -17px;
        right: 8px;
        z-index: 2;
      }

      &__body {
        padding: 8px 12px;
        z-index: 10;
        min-width: 140px;
        z-index: 10 !important;
        //position: fixed;
        //top: auto;
        //right: -20px;

        .dropdown__option {
          display: flex;
          align-items: center;
          padding: 4px 0;
          font-weight: 500;
          font-size: 12px;
          line-height: 12px;
          letter-spacing: -0.01em;
          color: #353945;
          cursor: pointer;

          .notClose {
            margin-right: 6px;

            .icon {
              width: 18px !important;
              height: 18px !important;
            }
          }
        }
      }

      &.active {
        .dropDown__body {
          //position: inherit;
          //margin-right: 15px;
          //margin-top: 25px;
        }
      }
    }

    .simplebar-content {
      padding: 10px !important;
      padding-bottom: 0px !important;
    }

    .simplebar-track.simplebar-vertical {
      width: 8px;
    }

    .simplebar-content-wrapper {
      height: 100% !important;
    }

    &.active.multi {
      .select__header {
        .multiValueList {
          .multiValue {
          }
        }
      }

      .select__body {
        &__options__selected {
          .multiValueList {
            display: flex;
            flex-wrap: wrap;
            /* overflow: hidden; */

            .multiValue {
              display: flex;
              margin: 0 5px 5px 5px;
              border-radius: 2px 10px 10px 2px;
              padding: 2px 8px 2px 6px;
              position: relative;

              .drop-down-dots {
                animation: hideAnim 0ms forwards;
              }

              .exitBtn {
                animation: hideAnim 0ms forwards;
                /* overflow: hidden; */
                margin-left: 4px;
                border-radius: 2px 10px 10px 2px;
                position: absolute;
                right: 0;
                top: 2px;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 24px;

                .ui__icon__wrapper {
                  width: 15px;
                  border-radius: 2px 10px 10px 2px;
                  margin-bottom: 1px;

                  .icon {
                    background: #fcfcfd;
                    width: 17px !important;
                    height: 17px !important;
                  }
                }

                &:after {
                  content: "";
                  width: 10px;
                  height: 100%;
                  position: absolute;
                  top: 0;
                  left: -10px;
                  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 1));
                }
              }

              &:hover {
                border-radius: 2px 10px 10px 2px;

                .exitBtn {
                  animation: showAnim 0ms forwards;
                  padding: 0 1px;
                  padding-right: 3px;
                }

                .drop-down-dots {
                  animation: showAnim 0ms forwards;
                }
              }
            }
          }
        }
      }
    }

    &.active {
      .select__header {
        border: 1px solid #45b36b;
      }

      .select__body {
        animation: showAnim 0.1s forwards;
      }
    }
  }

  ${({ theme: { mode } }) =>
    mode === "dark" &&
    css`
      .select {
        &__header {
          border: 1px solid #353945;
          background: #141416;
          color: #777e91;
        }

        &__body {
          box-shadow: 0px 16px 64px -48px #454f5b;

          &__options {
            background: #141416;
            border-radius: 12px;
            border: none;

            &__title {
              color: #777e91;
              border: 0.5px solid #353945;
            }

            &__search {
              background: #23262f;
              border: 0.5px solid #353945;

              input {
                color: #fff;
              }
            }

            &__option {
              border: 0.5px solid #353945;
              color: #f4f5f6;
            }
          }
        }
      }
    `}
  ${({ theme: { mode }, active }) =>
    active &&
    mode === "dark" &&
    css`
      .select {
        &__header {
          border: 1px solid #777e91;
          color: #b1b5c4;
        }
      }
    `}
`;
