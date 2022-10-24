import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { checkTab } from "utils";
import styled from "styled-components";
import ListContainer from "../../containers/hr-table/ListContainer";
import check2Img from "../../../../assets/icons/check2.svg";

const PageStyle = styled.div`
  .searchAndAdd__right {
    .plus {
      button {
        display: flex;
        align-items: center;
        border-radius: 6px;
        font-size: 14px;
        line-height: 16px;

        .ui__icon__wrapper {
          margin-right: 3px;

          .icon {
            width: 12px;
            height: 12px;
          }
        }
      }
    }

    .dropDown {
      width: auto;
      height: auto;

      &__button {
        .plus,
        .viewIcon,
        .filterBtn {
          button {
            display: flex;
            align-items: center;
            border-radius: 6px;
            font-size: 14px;
            line-height: 16px;
          }
        }

        .viewIcon {
          margin: 0 10px;

          button {
            width: 37px;
            background: #f4f5f6;
            border: 1px solid #e6e8ec;
            padding: 6px;

            .ui__icon__wrapper {
              width: 25px;
              height: 20px;
              border-radius: 0;

              .icon {
                width: 104%;
                height: 100%;
              }
            }
          }
        }

        .filterBtn {
          .ui__icon__wrapper {
            margin-left: 10px;
            width: 15px;
            height: 15px;
            border-radius: 0;

            .icon {
              width: 104%;
              height: 100%;
            }
          }
        }
      }

      &__body {
        top: 41px;
        left: -25px;
        right: auto;

        .options {
          margin: 4px 10px 0;
          min-width: 154px;
          min-height: 35px;
          border-radius: 6px;
          background: #fcfcfd;
          font-weight: normal;
          font-size: 14px;
          line-height: 21px;
          color: #353945;
          padding: 7px 10px;
          transition: 0.2s;

          position: relative;
          cursor: pointer;

          &:after {
            content: "";
            mask-image: url(${check2Img});
            -webkit-mask-image: url(${check2Img});
            mask-repeat: no-repeat;
            -webkit-mask-repeat: no-repeat;
            mask-position: center;
            -webkit-mask-position: center;
            background: #45b36b;
            width: 20px;
            height: 20px;
            position: absolute;
            right: 10px;
            opacity: 0;
          }

          &.check {
            &:after {
              opacity: 1;
            }
          }

          &:hover {
            background: #f4f5f6;
          }

          &:first-child {
            margin-top: 10px;
          }

          &:last-child {
            margin-bottom: 10px;
          }
        }
      }

      &.dropDown__filter {
        .dropDown__body {
          left: auto;
          right: 5px;
          overflow: unset;
          z-index: 99;
        }

        .filter {
          position: static;
        }
      }
    }
    .view_drop {
      .dropDown__body {
        top: 77px;
      }
    }

    .modal__body {
      min-width: 720px;
      min-height: 500px;
      background: #fcfcfd;
      border-radius: 7px 0 7px 7px;
      border: none;
      border: 1px solid #e6e8ec;
      box-sizing: border-box;
      box-shadow: 0px 8px 16px rgba(15, 15, 15, 0.2);

      .view__left {
        &__content {
          height: 415px;
          overflow-y: auto;
        }

        &__form {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-top: 16px;

          .personalPublic {
            margin-right: 30px;

            label {
              font-weight: normal;
              font-size: 12px;
              line-height: 18px;
              color: #353945;

              .rc-checkbox {
                margin-right: 10px;
              }
            }
          }

          .addNewList {
            button {
              height: 34px;
              font-weight: 500;
              font-size: 12px;
              line-height: 18px;
              color: #ffffff;
              border-radius: 4px;
              padding: 6px 15px;
            }
          }
        }
      }

      .view__right {
        &__container {
          background: #ffffff;
          min-height: 500px;
          position: absolute;
          top: -15px;
          left: 0;
          width: 100%;
          border-radius: 0 7px 7px 0;
          border-left: 1px solid #e6e8ec;
          box-shadow: 0px 8px 16px rgba(15, 15, 15, 0.2);

          &__top {
            position: relative;
            top: -50px;
            right: 0;
            height: 50px;
            border-radius: 8px 8px 0 0px;
            display: flex;
            align-items: center;
            /* background: linear-gradient(to right, transparent 10px, #fff 0%); */
            background: #fff;
            width: 90%;
            margin-left: 10%;
            padding: 0 0 0 15px;

            &__label {
              padding: 0;
              display: flex;
              align-items: center;

              .ui__icon__wrapper {
                width: 20px;
                height: 20px;

                .icon {
                  width: 100%;
                  height: 100%;
                }
              }

              &__input {
                .form-input-container {
                  background: none;
                  border: none;
                  border-radius: 0;

                  .form-input {
                    padding: 2px 12px;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 14px;
                    line-height: 21px;
                    background: none;
                    border: none;

                    &::placeholder {
                      color: #b1b5c4;
                    }
                  }
                }
              }
            }

            &:after,
            &::before {
              content: "";
              width: 10px;
              height: 10px;
              background: #fff;
              position: absolute;
              bottom: -0.4px;
              left: -6%;
              clip-path: polygon(59% 64%, 100% 0%, 100% 100%, 0% 100%);
            }

            &::before {
              border-radius: 0 0 50px;
              background: #fff;
              z-index: 2;
              clip-path: polygon(59% 64%, 100% 0%, 100% 100%, 0% 100%);
              transform: rotate(1deg);
            }
          }

          &__body {
            margin-top: -35px;

            &__title {
              font-style: normal;
              font-weight: 500;
              font-size: 14px;
              line-height: 21px;
              color: #b1b5c4;
              margin-left: 24px;
              margin-bottom: 10px;
            }

            &__button {
              padding: 0 12px;
              margin: 5px;

              button {
                width: 100%;
                border-radius: 4px;
                font-style: normal;
                font-weight: normal;
                font-size: 14px;
                line-height: 21px;
                display: flex;
                align-items: center;

                .ui__icon__wrapper {
                  margin-right: 5px;

                  .icon {
                    background: #323232;
                  }
                }

                &:hover {
                  background: rgba(20, 20, 22, 0.8);

                  .ui__icon__wrapper {
                    .icon {
                      background: #fcfcfd;
                    }
                  }
                }

                &:after {
                  background: rgba(255, 255, 255, 0.2);
                  border-radius: 4px;
                }
              }

              &.selected {
                button {
                  color: #fcfcfd;
                  background: #141416;

                  .ui__icon__wrapper {
                    .icon {
                      background: #fcfcfd;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .addBtn {
    button {
      border-radius: 6px;
      height: 32px;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      margin: 0 5px;
    }
  }
`;

const ListPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "HR table  page");
  }, []);

  return (
    <PageStyle {...rest}>
      <ListContainer {...rest} />
    </PageStyle>
  );
};

export default withRouter(ListPage);
