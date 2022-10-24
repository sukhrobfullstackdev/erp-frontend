import styled from "styled-components";

export const Styled = styled.div`
  width: 100%;
  .header {
    background-color: #fcfcfd;
    margin: 20px;
  }
  .aboutLesson {
    width: eval(100%-40px);
    //height: 58vh;
    min-height: 58vh;
    margin: 0 20px 20px 20px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 16px -8px rgba(15, 15, 15, 0.25);
    h2 {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #777e91;
      margin-bottom: 10px;
      padding: 20px 20px 0 20px;
    }
    .desc {
      border-bottom: 1px solid #f4f5f6;
      padding: 0 20px 20px 20px;
      &__options {
        padding: 10px;
        background-color: #fcfcfd;
        margin-top: 10px;
        border-radius: 6px;
      }
    }
    .uploadWrapper {
      border-bottom: 1px solid #f4f5f6;
    }
    .noHomeWork {
      font-weight: 400;
      font-size: 14px;
      line-height: 21px;
      color: #b1b5c4;
      text-align: center;
    }
    .children {
      width: 109px;
      height: 40px;
      border-radius: 6px;
      background: #45b36b;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      margin-left: auto;
      margin-right: 20px;
      margin-bottom: 15px;
      .uploadText {
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
        color: #ffffff;
      }
    }
    .inputs {
      display: grid;
      grid-template-columns: 49% 49%;
      gap: 20px;
      margin: 0 20px;
      padding-bottom: 20px;
      .form-input-container {
        border-radius: 6px !important;
        height: 40px;
        .form-input {
          font-weight: 400;
          font-size: 14px;
          line-height: 21px;
          color: #353945;
          &::placeholder {
            font-weight: 400;
            font-size: 14px;
            line-height: 21px;
            color: #b1b5c4;
          }
        }
      }
      .addLink button {
        border: none !important;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: grid;
        place-items: center center;
        padding: 0;
        margin-left: 6px;
        .ui__icon__wrapper {
          height: 17px;
          width: 15px;
        }
        .ui__icon__wrapper.md .icon {
          width: 10px;
          height: 10px;
        }
        .minus {
          width: 8px;
          height: 1.3px;
          background-color: #ef466f;
        }
        &:hover {
          background-color: #ef466f;
          .minus {
            background-color: #fcfcfd;
          }
        }
      }
      .deleteLink button:hover {
        background-color: #45b36b;
        .plus .ui__icon__wrapper .icon {
          background-color: #fcfcfd;
        }
      }
    }

    .functionalInput {
      position: relative;

      .linkInput .form-input {
        color: #3772ff !important;
      }
      .addDelInput {
        display: flex;
        align-items: center;
        position: absolute;
        top: 8px;
        right: 8px;
        .ui__icon__wrapper.md .icon {
          width: 18px;
          height: 18px;
        }
        .verticalLine {
          width: 1.4px;
          height: 16px;
          background-color: #e6e8ec;
          margin: 0 3px;
        }
        .copyIcon .ui__icon__wrapper .icon:hover {
          background-color: #777e91;
        }
      }
    }
    .submitLink {
      button {
        width: 59px;
        height: 30px;
        padding: 0;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        border-radius: 6px;
      }
      width: 59px;
      height: 30px;
      margin-left: auto;
      padding: 0 20px 20px 0;
    }
  }
`;
