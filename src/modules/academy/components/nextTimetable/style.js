import styled, { css } from "styled-components";

export const Container = styled.div`
  //width: 100vw;
  /* height: 100vh; */
  //background-color: #ddd;
  //padding: 40px;
  box-sizing: border-box;
  .userScroll {
    max-height: 66vh;
    width: 275px;
  }
`;

export const TimeTable = styled.div`
  width: 640px;
  //height: 900px;
  background-color: #fff;

  .title {
    color: #353945;
    font-weight: normal;
    margin: 0;
    padding: 0;
    font-size: 18px;
    line-height: 27px;
    padding: 20px 0 20px 30px;
  }

  .line {
    height: 1px;
    background-color: #e6e8ec;
  }
`;

export const TableBody = styled.div`
  padding: 20px 20px 0 20px;

  .rowStyle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2px;
  }

  .arrowIcon .icon-arrow-right-stick {
    width: 16px !important;
    height: 16px !important;
  }

  .arrowIcon {
    width: 30px;
    height: 30px;
  }

  .headBox {
    width: 275px;
    background: #e2f5e9;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;

    .order {
      display: flex;
    }

    .lineDown {
      height: 50px;
      width: 0.7px;
      background-color: #e6e8ec;
    }

    .orderNum {
      color: #45b36b;
      font-weight: 600;
      font-size: 14px;
      line-height: 21px;
      padding: 15px 9px 14px 0;
      &.disabled {
        &:hover {
          background: #f4f5f6;
          .ui__icon__wrapper {
            .icon {
              background: #45b36b;
            }
          }
        }
      }
    }

    .headBoxTitle {
      color: #45b36b;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
    }
    .headBoxBtn {
      width: 26px;
      height: 26px;
      background: #45b36b;
      border-radius: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .doubleArrow .icon-double-arrow {
      width: 9.3px;
      height: 8.6px;
    }
    .doubleArrow {
      width: 10.3px;
      height: 20px;
    }
  }

  .userData {
    display: flex;
    justify-content: space-between;
  }
  ${({ headType }) =>
    headType &&
    css`
      .headBox {
        &.second {
          background-color: #45b36b;

          .orderNum {
            color: #fff;
          }

          .headBoxTitle {
            color: #fff;
          }

          .headBoxBtn {
            background-color: #5cca81;
            border: 1px solid #fff;
            &.disabled {
              &:hover {
                background: #f4f5f6;
                .ui__icon__wrapper {
                  .icon {
                    background: #45b36b;
                  }
                }
              }
            }
          }

          .doubleArrow {
            transform: rotate(180deg) !important;
          }
        }
      }
    `}
`;

export const TableFooter = styled.div`
  padding: 0 6px 6px 6px;

  .cardFooter {
    width: 100%;
    height: 80px;
    background: #353945;
    border-radius: 4px;
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .btns {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .cancelBtn {
        button {
          margin-right: 8px;
          background: #23262f;
          border-radius: 6px;
          width: 83px;
          height: 34px;
          color: #fcfcfd;
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;
        }
      }

      .saveBtn {
        button {
          width: 70px;
          height: 34px;
          //background: #23262f;
          border-radius: 6px;
          //color: #353945;
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;
        }
      }
    }
  }
`;
