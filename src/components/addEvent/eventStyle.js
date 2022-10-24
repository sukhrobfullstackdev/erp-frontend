import styled from "styled-components";
import bold from "../../assets/icons/desc-bold.svg";
import italic from "../../assets/icons/desc-italic.svg";
import underlined from "../../assets/icons/desc-underlined.svg";
import left from "../../assets/icons/desc-text-left.svg";
import center from "../../assets/icons/desc-text-center.svg";
import orderedList from "../../assets/icons/desc-list.svg";
import link from "../../assets/icons/desc-link.svg";
import image from "../../assets/icons/desc-upload-image.svg";
import undo from "../../assets/icons/desc-undo.svg";
import redo from "../../assets/icons/desc-redo.svg";

export const Container = styled.div`
  display: flex;
  align-items: top;
  justify-content: center;

  .allWrapper {
    width: 750px;
  }

  .titleInput {
    input {
      font-weight: 400;
      font-size: 12px !important;
      line-height: 24px;
      color: #353945;
    }
  }

  .url {
    input {
      font-weight: 400;
      font-size: 12px !important;
      line-height: 24px;
      color: #353945;
    }
  }

  .date {
    width: 100%;
    height: 40px;
    /* margin-bottom: 55px; */
    padding: none !important;
    input {
      font-weight: 400;
      font-size: 12px !important;
      line-height: 24px;
      color: #353945;
    }

    .select__header__content__placeholder {
      color: #b1b5c3;
      font-weight: 400;
      font-size: 12px;
      line-height: 24px;
    }

    ::placeholder {
      color: #b1b5c3;
    }
  }

  .speaker_select{
    border: 1px solid #e6e8ec;
    border-radius: 6px;
    .select__header {
      border: none;
    }
  }
.dropDown__body{
  cursor: auto;
}
  .secondSelect {
    .select__header__content {
      font-weight: 400;
      font-size: 12px !important;
      line-height: 24px;
    }
  }

  .form-select-label {
    font-size: 10px;
  }

  .datePicker div {
    height: 42px;
  }

  .select__header {
    height: 42px;
    /* margin-top: 24px; */
  }

  .canSaveBtn {
    margin-top: 30px;
  }

  .lowestInputs {
    margin-top: -12px;
  }

  .form-input {
    height: 40px;
    padding: 8px !important;
    border-radius: 6px;
    &::placeholder {
      font-size: 12px;
      line-height: 24px;
    }
  }

  .fieldDrop {
    width: 100%;
  }

  .main__upload__label {
    width: 100%;
  }

  .dropzone {
    width: 100%;
    min-height: 230px;
    max-height: 240px;
    border: 1px solid #45b36b;
    box-sizing: border-box;
    border-radius: 8px;
    background: #e2f5e9;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .uploadIcon .icon-upload {
      width: 43.59px !important;
    }
    .uploadIcon {
      width: 65px !important;
    }

    .dropzone-title {
      color: #45b36b;
      margin-top: 15px;
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
    }

    .dropzone-desc {
      color: #777e91;
      font-weight: normal;
      font-size: 10px;
      line-height: 15px;
    }
  }

  .dropzoneUrlWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .urlInput {
    width: 100%;
    margin-top: 15px;
  }

  .urlInput .form-input-container {
    width: 100%;
    height: 40px;
    margin: 0 !important;
  }

  .allForm {
    /* width: 740px; */
    display: flex;
    justify-content: space-between;
    /* align-items: stretch; */

    .titleDesc {
      /* width: 485px; */
      height: 40px;
      margin-top: 12px;

      .desc {
        margin-top: 20px;

        .desc-pattern {
          .rdw-editor-wrapper {
            min-height: 70%;
          }
          .rdw-editor-toolbar {
            /* justify-content: space-between; */
          }
          .rdw-editor-main {
            ::-webkit-scrollbar-track,
            ::-webkit-scrollbar,
            ::-webkit-scrollbar-thumb {
              display: none;
            }
          }

          .rdw-option-wrapper {
            border: none;
            min-width: 13px !important;
            padding: 0 2px;
            min-height: 15px;
            &:hover {
              box-shadow: none;
            }
            img {
              display: none;
            }
            &[title="Bold"] {
              background: url(${bold});
              background-repeat: no-repeat;
              background-position: center center;
              background-size: 80%;
            }
            &[title="Italic"] {
              background: url(${italic});
              background-repeat: no-repeat;
              background-position: center center;
              background-size: 48%;
            }
            &[title="Underline"] {
              background: url(${underlined});
              background-repeat: no-repeat;
              background-position: center center;
              background-size: 85%;
            }
            &[title="Left"] {
              background: url(${left});
              background-repeat: no-repeat;
              background-position: center center;
              background-size: 100%;
            }
            &[title="Center"] {
              background: url(${center});
              background-repeat: no-repeat;
              background-position: center center;
              background-size: 100%;
            }
            &[title="Ordered"] {
              background: url(${orderedList});
              background-repeat: no-repeat;
              background-position: center center;
              background-size: 100%;
            }
            &[title="Ordered"] {
              background: url(${orderedList});
              background-repeat: no-repeat;
              background-position: center center;
              background-size: 100%;
            }
            &[title="Link"] {
              background: url(${link});
              background-repeat: no-repeat;
              background-position: center center;
              background-size: 100%;
            }
            &[title="Image"] {
              background: url(${image});
              background-repeat: no-repeat;
              background-position: center center;
              background-size: 100%;
            }
            &[title="Undo"] {
              background: url(${undo});
              background-repeat: no-repeat;
              background-position: center center;
              background-size: 100%;
            }
            &[title="Redo"] {
              background: url(${redo});
              background-repeat: no-repeat;
              background-position: center center;
              background-size: 100%;
            }
          }

          .rdw-emoji-wrapper {
            &[title="Emoji"] {
              img {
                display: block;
                width: 12px !important;
              }
            }
          }

          .rdw-history-wrapper {
            justify-content: end !important;
          }
        }
      }

      .desc label {
        font-style: normal;
        font-weight: 600;
        font-size: 10px;
        line-height: 12px;
        text-transform: uppercase;
        color: #777e91;
        margin: 0 0 8px 7px;
      }

      .desc-pattern {
        /* width: 485px; */
        height: 210px;

        background: #fcfcfd;
        border: 1px solid #e6e8ec;
        box-sizing: border-box;
        border-radius: 8px;
      }

      .rdw-editor-toolbar.toolbarClassName {
        border-top-right-radius: 8px;
        border-top-left-radius: 8px;
      }
    }

    .form-label {
      font-size: 10px;
    }
  }

  .downInputForms {
    .upperInputs {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      margin-top: 15px;
      .rs-picker-toggle.rs-btn.rs-btn-default {
        height: 42px !important;
      }

      .form-input-container {
        height: 40px;
        border-radius: 6px;
      }

      .form-input {
        width: 100%;
        height: 100%;
        padding: 8px !important;
        font-size: 16px;
        display: flex;
        align-items: center;
        border-radius: 6px;
        &::placeholder {
          font-size: 12px;
          line-height: 24px;
        }
      }
      .rs-picker-toggle::before {
        color: #777e91;
      }
    }

    .downInputs {
      display: flex;
      align-items: center;
      margin-top: 42px;
      justify-content: space-evenly;
        .plusBtn {
          width: 20px;
          height: 20px;
          background-color: #5cca81;
          border-radius: 50%;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2px 0 0;
        }
      .date {
        width: 100%;
        height: 40px;
        margin-bottom: 55px;
        padding: none !important;
      }
    }

    .cancelBtn {
      button {
        width: 110px;
        height: 34px;
        background: #f4f5f6;
        border-radius: 6px;
        color: #353945;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        margin-left: 15px;
      }
    }
    .saveBtn {
      button {
        background: #45b36b;
        color: #fff;
        margin-left: 6px !important;
      }
    }
    .saveCancelBtns {
      /* margin-top: 55px; */
      & div {
        padding: 0 !important;
      }
    }
  }

  .form-label {
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    margin-bottom: 8px;
  }
  .datepicker__input {
    width: 100%;
    height: 40px;
    height: fit-content !important;
    padding: 8px;
    font-weight: 400;
    font-size: 12px;
    line-height: 24px;
    border-radius: 6px;
  }
  .form-input-container,
  .select__header {
    border-radius: 6px;
  }

  .DraftEditor-root {
    padding: 0 8px;
  }

  .speaker_modal {
    .modal__body{
      display: none;
    } 
    .active{
      display: block;
      width: 680px;
    }
  }
  .multiValue, .public-DraftStyleDefault-block{
    font-size: 12px;
    line-height: 18px;
  }
`;
