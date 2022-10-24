import React, { useState, memo, useEffect } from "react";
import styled, { css } from "styled-components";
import Collapse from "./../../../../components/elements/collapse/index";
import Button from "./../../../../components/elements/button/index";
import Modal from "../../../../components/elements/modal";
import DropZone from "./../../../../components/elements/dropzone/index";
import Flex from "../../../../components/elements/flex";
import Icon from "../../../../components/elements/icon";
import { isEmpty, isArray, get, union, isBoolean } from "lodash";
import { connect } from "react-redux";
import SettingsActions from "../../../settings/actions";
import { financial } from "../../../../utils";
import trashBin from "../../../../assets/icons/trash-icon.svg";
import { withTranslation } from "react-i18next";
import Message from "../../../../components/elements/message";

const AttachmentsStyle = styled.div`
  .collapse__title {
    font-size: 18px;
    line-height: 24px;
    color: #23262f;
    background: #fcfcfd;
    box-sizing: border-box;
    border-radius: 10px;
  }
  &.active {
    .collapse__body {
      padding: 40px;
    }
    .form-label {
      width: 100%;
      line-height: 12px;
      color: #353945;
      margin-bottom: 8px !important;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .body {
    background: #ffffff;
    box-shadow: 0px 8px 16px -8px rgba(15, 15, 15, 0.2);
    border-radius: 10px;
    position: relative;
    min-height: 465px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .table_section {
      padding: 20px;
    }
    table {
      width: 100%;
      border-spacing: 0px;
      position: relative;
      border-collapse: separate;
      border-spacing: 0 4px;
      thead {
        tr {
          background: #353945;
          th {
            font-style: normal;
            font-weight: 500;
            font-size: 18px;
            line-height: 24px;
            text-transform: uppercase;
            color: #fcfcfd;
            padding: 13px 20px;
            &:first-child {
              border-radius: 8px 0 0 8px;
            }
            &:last-child {
              border-radius: 0 8px 8px 0;
              padding: 13px 0;
              width: 110px;
            }
          }
          .action {
            text-align: center;
          }
        }
      }
      tbody {
        tr {
          td {
            text-align: left;
            padding: 13px 0 0 20px;
            background: #fcfcfd;
            font-weight: normal;
            font-size: 18px;
            font-weight: 500;
            line-height: 24px;
            color: #353945;
            .trash {
              width: 100%;
              text-align: center;
            }
            .recycleIcon {
              margin: 0 auto;
              cursor: pointer;
            }
            &:first-child {
              border-radius: 6px 0 0 6px;
            }
            &:last-child {
              border-radius: 0 6px 6px 0;
              padding: 0 20px 0 20px;
            }
          }
        }
      }
    }
    thead,
    tbody {
      tr {
        th {
          text-align: left;
        }
        td,
        th {
          &:first-child {
            width: 38px;
          }
        }
      }
    }
    .uploadBtn {
      button {
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        line-height: 21px;
        padding: 13px;
        display: flex;
        text-transform: none;
        align-items: center;
        text-align: center;
        background: #f4f5f6;
        color: #b1b5c4;
        cursor: not-allowed;
        .ui__icon__wrapper {
          margin-right: 12px;
          .icon {
            background: #b1b5c4;
            width: 24px;
            height: 24px;
          }
        }
      }
      &.edit {
        button {
          color: #fcfcfd;
          background: #45b36b;
          cursor: pointer;
          .ui__icon__wrapper {
            .icon {
              background: #fcfcfd;
            }
          }
        }
      }
    }
    .modal {
      background: rgba(53, 57, 69, 0.6);
    }
    .modal__body {
      width: 800px;
      min-height: 250px;
      padding: 0;
      .dzu-dropzone {
        padding: 0;
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        &__upload__counter {
          height: 100px;
          p {
            font-size: 20px;
          }
        }
        .onprogress__row__option__wrapper {
          .tr {
            padding: 0px 10px;
            .td {
            }
          }
        }
      }
      .buttons {
        margin-top: 30px;
        button {
          border-radius: 6px;
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;
          height: 30px;
          padding: 5px 10px;
          min-width: 63px;
        }
      }
    }
    .icon__exit {
      border-radius: 6px;
    }
    .empty {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-top: 80px;
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 36px;
      color: #777e91;
      margin: 120px 0 100px;
      .ui__icon__wrapper {
        margin-right: 22px;
        width: 27px;
        height: 27px;
        .icon {
          width: 26px;
          height: 26px;
        }
      }
    }
    .footer {
      border-top: 1px solid #e6e8ec;
      display: flex;
      justify-content: flex-end;
      padding: 20px;
      margin-top: 15px;
    }
  }
  .messageModal {
    .modal__body {
      padding: 0;
      min-height: 5vh;
      border-radius: 12px;
      border: none;
    }
  }
`;

const Attachments = ({ setFiles = () => {}, fileUpload, active = "1", attachments, editable = false, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [description, setDescratption] = useState([]);
  const [modalMessage, setModalMessage] = useState(false);
  useEffect(() => {
    if (isEmpty(tableData)) {
      setTableData(attachments);
    }

    // if (!isEmpty(attachments))
    //     setFiles(attachments.map(({ id,fileId,description }) => ({id,fileId,description})));
  }, [attachments]);

  return (
    <AttachmentsStyle {...{ tableData: attachments }}>
      <Modal className={"messageModal"} active={!isBoolean(modalMessage)} onClose={() => setModalMessage(false)}>
        <Message
          message={"This is a error message!"}
          status="error"
          yes={() => {
            setFiles((s) => {
              let temp = [...s];
              temp.splice(modalMessage, 1);
              return temp;
            });
            setTableData((s) => {
              let temp = [...s];
              temp.splice(modalMessage, 1);
              return temp;
            });
            setDescratption((s) => {
              let temp = [...s];
              temp.splice(modalMessage, 1);
              return temp;
            });
            setModalMessage(false);
          }}
          no={() => setModalMessage(false)}
          confirm
        />
      </Modal>
      <Collapse title={t("attachments") ?? "Attachments"} active={!!active} className="seventhCollapse">
        <div className="body">
          <div className="table_section">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{t("employee-attachments-name-label") ?? "name"}</th>
                  <th>{t("employee-attachments-description-label") ?? "DESCRIPTION"}</th>
                  <th>{t("employee-attachments-file-type-label") ?? "file type"}</th>
                  <th>{t("employee-attachments-file-size-label") ?? "file size"}</th>
                  <th>{t("employee-attachments-created-date-label") ?? "created date"}</th>
                  {editable && <th className="action">{t("employee-attachments-action-label") ?? "action"}</th>}
                </tr>
              </thead>
              <tbody>
                {isArray(tableData) &&
                  tableData.map((val, index) => (
                    <tr key={index + new Date().getTime()}>
                      <td>{index + 1}</td>
                      <td>
                        <a href={attachments ? get(attachments[index], "url", "") : get(val, "url", "")}>
                          {get(val, "name", "")}
                        </a>
                      </td>
                      <td>
                        {attachments
                          ? get(attachments[index], "description", get(val, "description", ""))
                          : get(val, "description", get(description, `[${index}].description`, ""))}
                      </td>
                      <td>{get(val, "type", get(val, "contentType", ""))}</td>
                      <td>{financial(get(val, "size", 0) / 1024)}</td>
                      <td>
                        {new Date(get(val, "lastModified", get(val, "createdAt", "")))
                          .toLocaleString("en-US")
                          .substring(0, new Date(get(val, "lastModified", "")).toLocaleString("en-US").length - 6)}
                      </td>
                      {editable && (
                        <td>
                          {" "}
                          <div className="trash">
                            <img src={trashBin} alt="recycle" className="recycleIcon" onClick={() => setModalMessage(index)} />
                          </div>{" "}
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
            {isEmpty(tableData) && (
              <div className="empty">
                {" "}
                <Icon icon="icon-strong-info" /> {t("not_content") ?? "Not content"}{" "}
              </div>
            )}
          </div>
          <div className="footer">
            <Button
              className={`uploadBtn ${editable && "edit"}`}
              success
              onClick={() => editable && setIsOpen((state) => !state)}
            >
              <Icon icon="icon-upload" color="#FCFCFD" />
              {t("upload_file") ?? "Upload file"}
            </Button>
          </div>
          <Modal active={isOpen}>
            <DropZone
              fileUpload={fileUpload}
              saveData={(data, fileData) => {
                setFiles((s) => [...s, ...data]);
                setTableData((s) => [...s, ...fileData]);
                setIsOpen((state) => !state);
                setDescratption((s) => [...s, ...data]);
              }}
              cancel={() => setIsOpen((state) => !state)}
            />
          </Modal>
        </div>
      </Collapse>
    </AttachmentsStyle>
  );
};
const mapStateToProps = (state) => {
  return {
    entities: get(state, "normalizer.entities", {}),
    skillsList: get(state, "normalizer.data.skills-list", []),
    employeeData: get(state, "api.data.hr-employee", []),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fileUpload: ({ attributes, formMethods = {}, cb }) => {
      dispatch({
        type: SettingsActions.FILE_UPLOAD.REQUEST,
        payload: { attributes, formMethods, cb },
      });
    },
  };
};
export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(memo(Attachments)));
