import styled, { css } from "styled-components";
export const DropzoneStyled = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 12px;
  overflow: hidden;
  /* border-radius: 12px; */
  .dzu-dropzone {
    overflow: auto !important;
  }
  .upload__row__wrapper {
    border: 1px solid #e6e8ec;
    margin-top: 20px;
    border-radius: 16px;
    overflow: hidden;
    transition: 0.3s;
  }
  .collapse {
    height: 100px;
  }
  .dzu-dropzone {
    background: rgba(69, 179, 107, 0.1);
    border: 1px dashed #45b36b;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 45px 0 33px;
    transition: 0.1s;

    &__upload__counter {
      display: flex;
      height: 50px;
      padding: 0 40px;
      justify-content: space-between;
      border-bottom: 1px solid #e6e8ec;
      height: 99px;
      align-items: center;
    }
    &__upload {
      display: flex;
      align-items: center;
      flex-direction: column;
      font-weight: normal;
      font-size: 10px;
      line-height: 15px;
      text-align: center;
      color: #353945;
      span {
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
      }
    }
    ${({ isActive }) =>
      isActive &&
      css`
        background: rgba(69, 179, 107, 0.2);
      `}
  }
  .icon__exit__full_screen {
    width: 32px !important;
    height: 32px !important;
  }
  .onprogress__row {
    .icon__exit__onprogress {
      display: none;
      background: #f4f5f6;
    }
    .onprogress__row__option__wrapper .onprogress__date__text {
      color: #777e91;
    }
    :hover {
      .icon__exit__onprogress {
        display: block;
      }
      .onprogress__row__option__wrapper .onprogress__date__text {
        margin-right: 30px;
      }
    }
    .onprogress__row__option__wrapper {
      display: flex;
      justify-content: space-between;
      /* height: 99px; */
      padding: 25px 0 20px;
    }
  }
  .onprogress__row__option__wrapper {
    width: 100%;
    border-collapse: collapse;
    /* margin-top: 20px; */
    font-weight: 500;
    font-size: 8px;
    line-height: 12px;
    color: #353945;

    .onprogress__row {
      border-bottom: 1px solid #e6e8ec;
      height: 99px;
      padding: 0 40px;

      .onprogress__row__option__wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* height: 99px; */
        padding: 25px 0 24px;
      }
      progress {
        width: 100%;
        height: 4px;
      }
    }
    .tr {
      border-radius: 2px;
      border-bottom: 1px solid #e6e8ec;
      padding: 0 30px;
      height: 99px;
      display: flex;
      justify-content: space-between;
      display: flex;
      align-items: center;
      &:last-child {
        border-bottom: none;
      }
      .td {
        height: 60px;
        /* background: #f4f5f6; */
        /* vertical-align: top; */
        padding: 5px;
        &:first-child {
          border-top-left-radius: 2px;
          border-bottom-left-radius: 2px;
        }
        &:last-child {
          border-top-right-radius: 2px;
          border-bottom-right-radius: 2px;
        }
        .number {
          margin-right: 5px;
        }
        input {
          background: #fcfcfd;
          box-sizing: border-box;
          border-radius: 2px;
          outline: none;
          border: 0.5px solid transparent;
          padding: 4px;
          font-weight: 500;
          font-size: 6px;
          line-height: 9px;
          color: #353945;
          &::placeholder {
            color: #b1b5c4;
          }
          &:focus {
            border: 0.5px solid #b1b5c4;
          }
        }
      }
      .align__center {
        display: flex;
        align-items: center;
      }
      .align__center__column {
        display: flex;
        flex-direction: column;
        width: 260px;
      }

      .checkImg {
        width: 30px;
        margin-right: 20px;
      }
      .img__description__input {
        margin-top: 10px;
        padding: 0;
        padding-top: 5px;
        background: transparent;
        outline: none;
        font-size: 16px !important;
        border: none !important;
      }
      .icon__exit {
        height: 40px;
        width: 40px;
        background: #f4f5f6;
        &:hover {
          .icon {
            background: red;
          }
        }
      }
    }
  }
  .buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 60px;
    button {
      font-weight: 500;
      font-size: 8px;
      line-height: 12px;
      border-radius: 4px;
      width: 45px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      &:first-child {
        margin-right: 5px;
      }
    }
  }
  ${({ theme: { mode } }) =>
    mode == "dark" &&
    css`
      .main {
        background: rgba(69, 179, 107, 0.05);
        &__upload {
          color: #fcfcfd;
        }
      }
      .table {
        color: #fcfcfd;
        .row {
          td {
            background: #23262f;
            span {
              color: #b1b5c4;
            }
            input {
              background: #141416;
              color: #fcfcfd;
              &::placeholder {
                color: #b1b5c4;
              }
              &:focus {
                border: 0.5px solid #777e91;
              }
            }
          }
        }
      }
    `}
  .dropzone-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 16px;
  }
  ${({ theme: { mode }, isActive }) =>
    mode == "dark" &&
    isActive &&
    css`
      .main {
        background: rgba(69, 179, 107, 0.08);
      }
    `}
`;
