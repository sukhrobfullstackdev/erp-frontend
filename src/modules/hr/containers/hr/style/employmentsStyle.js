import styled from "styled-components";

export const StyledEmploymentInformation = styled.div`
  .secondCollapse {
    &.active {
      .collapse__body {
        padding: 40px;
        margin-bottom: 50px;
        .box {
          width: 100%;
          .boxInsideFlex {
            justify-content: space-between;
          }
        }
        form {
          margin: 0;
          width: 100%;
        }
        .form-label {
          font-size: 14px;
          line-height: 12px;
          color: #353945;
          font-weight: 600;
          text-transform: uppercase;
          display: inline-block;
          margin-bottom: 8px;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .form-select-container {
          .select {
            &__header {
              height: 50px;
            }
          }
        }
        .input {
          .form-input-container {
            width: 100%;
            height: 50px;
            margin-bottom: 30px;
            input {
              padding-left: 13px;
              font-size: 16px;
              font-weight: 500;
              color: #777e90;
            }
          }
        }
        .dateInputContainer {
          width: 100%;
          height: 50px;
          input {
            padding: 10px;
            padding-left: 13px;
            font-size: 16px;
            font-weight: 500;
            color: #777e90;
          }
        }
        margin-bottom: 40px;
        .dropdown {
          .Select__controller {
            width: 100%;
            height: 50px;
            font-weight: 500;
            font-size: 16px;
            padding: 10px;
            padding-left: 13px;
          }
        }
        .check_btn {
          height: 101px;
          position: relative;
          button {
            position: absolute;
            bottom: 24px;
            display: flex;
            align-items: center;
            justify-content: start;
            width: 100%;
            height: 50px;
            background-color: #fcfcfd;
            border-radius: 10px;
            padding: 13px 16px;
            color: #777e90;
            .rc-checkbox {
              .rc-checkbox-inner {
                ::after {
                  top: 1px;
                  left: 3px;
                }
                border: 2px solid #777e91;
              }
            }
            .rc-checkbox-checked {
              .rc-checkbox-inner {
                border: 2px solid #45b36b;
              }
            }
            form {
              margin: 0 19px 0 0;
              width: 15px;
              height: 28px;
            }
            .rc-checkbox-inner {
              margin-right: 19px;
            }
          }
        }
        .dashed {
          padding-top: 30px;
          margin-top: 10px;
          position: relative;
          margin-bottom: 15px;
          ::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23E6E8ECFF' stroke-width='2' stroke-dasharray='15%2c 40' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
            z-index: 9;
            width: 100%;
            height: 1px;
          }
        }

        .timetable {
          padding: 30px;
          background-color: #fff;
          border-radius: 10px;
          width: 100%;
          .title {
            color: #777e90;
            font-size: 16px;
            font-weight: 500;
            text-transform: uppercase;
            margin-bottom: 20px;
            line-height: 14px;
          }
          .work_day {
            .days {
              width: 100%;
              height: 80px;
              background: #fcfcfd;
              border-radius: 10px;
              padding: 18px 30px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 7px;
              border: 1px solid #e6e8ec;
              transition: 0.4s ease;
              box-sizing: border-box;
              .title {
                font-size: 20px;
              }
              :hover {
                background-color: #f4f5f6;
              }
              .rc-checkbox-inner {
                background: #f4f5f6;
              }
              .rc-checkbox-checked {
                .rc-checkbox-inner {
                  background: #45b26b;
                }
              }
              :last-child {
                margin-bottom: 0;
              }
              label {
                margin: 0;
              }
              .title {
                margin: 0;
              }
              form {
                width: 40px;
              }
              .bwLPty .box form {
                width: 40px;
              }
            }
            .checkon {
              border: none;
              background: #f2fbf5;
              .title {
                color: #45b26b;
              }
            }
          }
        }
        .content {
          .deleteBtn {
            margin-top: 30px;
            margin-bottom: 30px;
            border-top: 2px dashed #b1b5c4;
            display: flex;
            justify-content: flex-end;
            padding-top: 30px;
            button {
              display: flex;
              align-items: center;
              color: #20262f;
              font-size: 16px;
              font-weight: 500;
              border-radius: 12px;
              height: 50px;
              padding: 0 13px;
              border: 1px solid rgba(239, 70, 111, 0.7);
              img {
                width: 23px;
                height: 23px;
                margin-right: 14px;
              }
            }
          }
          &:first-child {
            .deleteBtn {
              border: none;
              margin-top: 0px;
              padding-top: 0px;
            }
          }
        }
        //.select__header__content {
        //  padding: 0;
        //}
        .select__body__options {
          .simplebar-track.simplebar-vertical {
            width: 7px;
          }
        }
      }
    }
  }
`;
