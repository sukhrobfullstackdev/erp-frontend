import React from "react";
import styled from "styled-components";

const Style = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 38px 0 18px;

  .dropDown {
    &__button {
      margin: 0 5px;

      button {
        display: flex;
        border-radius: 6px;
        height: 32px;
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        align-items: center;
      }

      .icon-add-plus {
        width: 13px !important;
        height: 13px !important;
      }

      .filterBtn {
        button {
          padding: 0 14px;

          .ui__icon__wrapper {
            margin-left: 12px;
          }

          .icon-filter {
            width: 14px;
            height: 14px;
          }
        }
      }
    }

    &__body {
      overflow: inherit;
    }
  }

  .view_drop {
    .dropDown__body {
      z-index: 999;
      overflow: inherit;
      left: auto !important;
      right: 0px !important;
      top: 77px;

      .view {
        min-width: 720px;
        min-height: 400px;
        padding: 0 15px;

        &__left {
          padding: 20px 15px;
          border-right: 1px solid #e6e8ec;

          &__content {
            font-size: 12px;
            line-height: 18px;

            .ui__icon__wrapper {
              height: 24px;
              width: 24px;

              .icon-more-dots {
                height: 24px;
                width: 24px;
              }
            }
          }

          &__form {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-top: 20px;

            .personalPublic {
              color: #353945;
              font-size: 12px;
              font-weight: 400;

              .rc-checkbox-inner {
                border: 1px solid #002930;

                ::after {
                  top: 1px;
                  left: 4px;
                }
              }

              .rc-checkbox-checked {
                .rc-checkbox-inner {
                  border: 1px solid #45b26b;
                }
              }
            }

            .addNewList {
              margin-left: 30px;

              button {
                border-radius: 4px;
                font-size: 12px !important;
                font-weight: 500;
              }
            }
          }
        }

        &__right {
          padding-left: 8px !important;

          &__container {
            &__top__label {
              padding: 5px 14px;
              background-color: #fcfcfd;
              display: flex;
              align-items: center;
              margin-top: -36px;
              margin-bottom: 10px;
              min-width: 165px;
              border-bottom: none;
              border-radius: 7px 7px 0 0px;
              position: relative;
              box-shadow: 1px -6px 10px rgb(40 40 40 / 15%);

              ::after {
                content: "";
                position: absolute;
                border-radius: 100% 0 0;
                bottom: 1px;
                left: -3px;
                height: 10px;
                width: 10px;
                background-color: #fcfcfd;
              }

              &__input {
                .form-input-container {
                  border: none;
                  margin-left: 7px;

                  input {
                    padding: 5px;
                    outline: none;
                    font-size: 14px;
                    font-weight: 400;
                  }
                }
              }
            }

            &__body {
              padding: 15px 0 0 7px !important;

              &__title {
                margin-bottom: 10px;
                font-size: 14px;
                font-weight: 500;
                color: #b1b5c3;
              }

              &__button {
                button {
                  background-color: #fcfcfd;
                  display: flex;
                  align-items: center;
                  border-radius: 4px;
                  width: 100%;
                  font-size: 14px;
                  font-weight: 400;
                  padding: 8px 10px;
                  margin-bottom: 4px;
                  transition: 0.5s ease;

                  :hover {
                    color: #353945;
                    background-color: #fcfcfd;
                  }

                  .ui__icon__wrapper {
                    margin-right: 12px;

                    .icon {
                      background-color: #323232;
                    }
                  }
                }
              }
            }
          }

          .selected {
            button {
              background-color: #141416;
              color: #fcfcfd;

              .icon {
                background-color: #fcfcfd;
              }
            }
          }
        }
      }
    }
  }
`;
const ViewHeaderBox = ({ children, ...rest }) => {
  return <Style {...rest}>{children}</Style>;
};

export default ViewHeaderBox;
