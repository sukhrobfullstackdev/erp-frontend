import styled, { css } from "styled-components";

export const StatusStyled = styled.div`
  background: #ffffff;
  padding: 1px 30px 30px;
  .list {
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #777e91;
    &__head {
      width: 100%;
      display: flex;
      margin: 22px 0;
      &__status {
        width: 33%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        span {
          margin: 0 20px;
          font-weight: 600;
          font-size: 12px;
          line-height: 24px;
          color: #777e91;
        }
        .ui__icon__wrapper {
          margin-right: 14px;
          .icon-shape {
            -webkit-mask-size: inherit;
            mask-size: inherit;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }
        &__toggle {
          border-radius: 8px;
          button {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 162px;
            height: 32px;
            position: relative;
            font-weight: 600;
            font-size: 12px;
            line-height: 24px;
            color: #ffffff;
            padding-left: 8px;
            &:hover {
              opacity: 0.8;
            }
            .bottomArrow {
              position: absolute;
              right: 12px;
              top: 3px;
            }
          }
          &.black {
            button {
              color: #353945;
            }
          }
          .ui__icon__wrapper {
            margin-right: 0px;
          }
          &.active {
            .ui__icon__wrapper {
              transform: rotate(180deg);
            }
          }
        }
      }
      &__dragDrop {
        display: flex;
        align-items: center;
        width: 67%;
        div[data-rbd-droppable-id] {
          width: 100%;
          display: flex;
          justify-content: center;
        }
      }
      &__phone,
      &__priority,
      &__action,
      &__call,
      &__message {
        display: flex;
        justify-content: center;
        align-items: center;
        text-transform: capitalize;
      }
      &__phone {
        /* width: 30%; */
        justify-content: space-between;
        width: 172px;
        transition: 0.3s;
        padding: 4px;
        border: 1px solid transparent;
        overflow: hidden;
        .icon {
          -webkit-mask-size: inherit;
          mask-size: inherit;
        }
        .upAndDown {
          /* margin: 0 6px 0 7px; */
          margin: 0 -10px;
          background: rgba(69, 179, 107, 0.2);
          padding: 2px 5px;
          border-radius: 40%;
          transition: 0.3s;
          transform: translateY(50px);
          div {
            div {
              width: 7px;
              height: 7px;
              .icon-bottom {
                width: 100%;
                height: 100%;
              }
            }
            &:first-child {
              div {
                .icon-bottom {
                  transform: translate(-50%, -50%) rotate(180deg);
                  background: rgba(69, 178, 107, 1);
                  &:hover {
                    background: rgba(69, 178, 107, 0.8);
                  }
                }
              }
            }
            .grey {
              .icon-bottom {
                background: rgba(177, 181, 195, 1);
                &:hover {
                  background: rgba(177, 181, 195, 0.8);
                }
              }
            }
          }
          .icon {
            -webkit-mask-size: 100%;
            mask-size: 100%;
          }
        }
        .xClose {
          width: 16px;
          height: 16px;
          background: rgba(119, 126, 144, 1);
          margin-right: 20px;
          transition: 0.3s;
          transform: translateX(50px);
          &:hover {
            background: rgba(119, 126, 144, 0.8);
          }
        }
        .dots {
          transition: 0.3s;
          transform: translateX(-50px);
        }
        &:hover {
          background: #fcfcfd;
          border: 1px solid #e6e8ec;
          box-sizing: border-box;
          border-radius: 6px;
          .xClose,
          .upAndDown,
          .dots {
            transform: translate(0px, 0px);
          }
        }
      }
      &__priority {
        /* width: 19%; */
      }
      &__action {
        /* width: 20%; */
      }
    }
    &__body {
      width: 100%;
      &__row {
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        margin: 10px 0;
        background: #ffffff;
        border: 1px solid #f4f5f6;
        box-sizing: border-box;
        border-radius: 4px;
        padding: 3px;
        &__border {
          /* width: 1%; */
          height: 24px;
          /* margin-right: 15px; */
        }
        &__name,
        &__phone,
        &__priority,
        &__action,
        &__call,
        &__message {
          display: flex;
          justify-content: center;
        }
        &__name {
          width: 36%;
          justify-content: flex-start;
          color: #353945;
          padding-left: 15px;
          font-size: 14px;
          line-height: 24px;
        }
        &__content {
          width: 67%;
          display: flex;
          align-items: center;
        }
        &__phone {
          width: 40%;
        }
        &__call {
          width: 40%;
          span {
            background: green;
            border-radius: 5px;
            padding: 2px;
          }
          .ui__icon__wrapper.md {
            width: 22px;
            height: 22px;
          }
          .icon {
            width: 19px;
            height: 19px;
          }
        }
        &__message {
          width: 40%;
          span {
            padding: 2px;
            background: #ffc107;
            border-radius: 5px;
          }
          .ui__icon__wrapper.md {
            width: 22px;
            height: 22px;
          }
          .icon {
            width: 19px;
            height: 19px;
          }
        }
        &__priority {
          width: 40%;

          .purple {
            .icon {
              background-color: #9757d7;
            }
          }
          .pink {
            .icon {
              background-color: #ef466f;
            }
          }
        }
        &__action {
          width: 40%;
          span {
            padding: 4px;
            border-radius: 5px;
            display: inline-block;
            transform: scale(0.7);
            cursor: pointer;
            // &:nth-child(1) {
            //     background: #45B36B;
            // }
            // &:nth-child(2) {
            //     background: #FFD166;
            //     img {
            //         height: 100%;
            //         width: 100%;
            //         transform: scale(1.3);
            //     }
            // }
          }
        }
      }
    }
  }
  ${({ theme: mode }) => mode == "dark" && css``}
`;

export const BorderStyled = styled.div`
  background: ${({ color }) => color};
  border-radius: 1px;
  width: 4px;
  height: 100%;
  display: inline-block;
`;
