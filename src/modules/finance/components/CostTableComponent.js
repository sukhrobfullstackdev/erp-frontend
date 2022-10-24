import React, { memo, useState } from "react";
import styled from "styled-components";
import { Col, Row } from "react-grid-system";
import { get, isArray, isEmpty } from "lodash";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import Title from "../../../components/elements/title";
import SettingsActions from "../../settings/actions";
import DropZone from "../../../components/elements/dropzone";
import Modal from "../../../components/elements/modal";
import Button from "../../../components/elements/button";
import CustomTable from "../../../components/customTable";

import DownloadImg from "../../../assets/icons/download2.svg";

const CostTableStyle = styled.div`
  table {
    width: 100%;

    thead {
      .th {
        width: 100%;
        font-weight: 400;
        font-size: 10px;
        line-height: 15px;
        text-transform: uppercase;
        height: 30px;
        padding: 8px 0px 7px 0px;
        background-color: #353945;
        color: #fff;
      }

      .first-child {
        border-radius: 6px 0 0 6px;
        padding-left: 10px;
      }

      .last-child {
        border-radius: 0 6px 6px 0;
        padding-right: 12px;
      }

      th {
        padding-bottom: 6px !important;

        &:last-child {
          width: 0%;
        }
      }
    }

    tbody {
      td {
        background-color: #f4f5f6;
        color: #353945;
        font-weight: 500;
        font-size: 10px;
        line-height: 15px;
        height: 30px;
        padding: 8px 0px 7px 0px;

        &:first-child {
          padding-left: 10px;
          padding-right: 10px;
        }

        &:last-child {
          padding-right: 12px;
        }
      }
    }
  }

  .left {
    padding-left: 0px !important;
    padding-right: 10px !important;

    thead {
      th {
        &:first-child {
          width: 0%;
        }

        .first-child {
          padding-right: 10px;
        }
      }
    }

    tbody {
      td {
        &:first-child {
          width: 0%;
        }

        &:last-child {
          text-align: center;
        }
      }
    }
  }

  .right {
    padding-left: 10px !important;
    padding-right: 0px !important;

    thead {
      th {
        &:last-child {
          width: 98px;
        }
      }
    }
  }

  .left_table,
  .right_table {
    width: 100%;
    min-height: 246px;
    background-color: #fcfcfd;
    border: 1px solid #e6e8ec;
    border-radius: 6px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .table_container {
      padding: 6px 10px 0px;
      min-height: 180px;
    }

    .noInfo {
      height: 132px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    .table_footer {
      width: 100%;
      border-top: 1px solid #e6e8ec;
      padding: 10px;
      justify-content: right;
      display: flex;

      .upload_btn {
        button {
          border-radius: 6px;
          padding: 8px 15px;
          h2 {
            text-transform: initial;
            color: #fcfcfd;
          }
        }
      }

      .content {
        width: 100%;
        background: #f3fcf6;
        border: 1px solid #45b36b;
        border-radius: 4px;
        padding: 10px 0px;
        display: flex;
        align-items: center;

        .span {
          width: 1px;
          height: 15px;
          background-color: #e2f5e9;
        }

        .total_price {
          width: 50%;
          padding-left: 16px;
          text-transform: uppercase;

          span {
            color: #45b26b;
            font-weight: 500;
            font-size: 12px;
            line-height: 18px;
          }
        }

        .remaining_price {
          padding-left: 16px;
          width: 50%;
          text-transform: uppercase;

          span {
            color: #ef466f;
            font-weight: 500;
            font-size: 12px;
            line-height: 18px;
          }
        }
      }
    }
  }

  .modal {
    &__body {
      width: 900px;
    }
  }
`;

const CostTableComponent = ({ data, isCreatePage, isEditPage, fileUpload, setAttachments, t }) => {
  const [tempData, setTempData] = useState({
    files: [],
    idsOfFiles: [],
    isModalOpen: false,
    ids: [],
    groupOpen: false,
  });
  let createOrEdit = isCreatePage || isEditPage;

  const table_right_columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "AMOUNT PAID",
            accessor: "amount",
          },
          {
            Header: "CASH REGISTER",
            accessor: "cash",
          },
          {
            Header: "DATE OF PAYMENT",
            accessor: "date",
            date: true,
            format: "dd/mm/yyyy",
          },
          {
            Header: "WHO PAID FOR IT",
            accessor: "accountantName",
          },
        ],
      },
    ],
    []
  );

  const table_left_columns = React.useMemo(
    () =>
      createOrEdit
        ? [
            {
              Header: "Name",
              columns: [
                {
                  Header: "#",
                  accessor: "number",
                  width: 40,
                },
                {
                  Header: "Name",
                  accessor: "name",
                },
                {
                  Header: "DESCRIPTION",
                  accessor: "description",
                },
                {
                  Header: "FILE TYPE",
                  accessor: "type",
                },
                {
                  Header: "FILE SIZE",
                  accessor: "size",
                },
                {
                  Header: "CREATED DATE",
                  accessor: "lastModified",
                },
                {
                  Header: "DOWNLOAD",
                  accessor: "url",
                  customColumn: (url) => {
                    return (
                      <a href={url}>
                        <img className={"downloadIcon"} src={DownloadImg} alt={"download"} />
                      </a>
                    );
                  },
                },
              ],
            },
          ]
        : [
            {
              Header: "Name",
              columns: [
                {
                  Header: "#",
                  accessor: "number",
                  width: 40,
                },
                {
                  Header: "Name",
                  accessor: "name",
                },
                {
                  Header: "DESCRIPTION",
                  accessor: "description",
                },
                {
                  Header: "FILE TYPE",
                  accessor: "contentType",
                },
                {
                  Header: "FILE SIZE",
                  accessor: "size",
                },
                {
                  Header: "CREATED DATE",
                  accessor: "createdAt",
                  date: true,
                  format: "dd/mm/yyyy",
                },
                {
                  Header: "DOWNLOAD",
                  accessor: "url",
                  customColumn: ({ cell }) => {
                    return (
                      <a href={get(cell, "value", "")}>
                        <img className={"downloadIcon"} src={DownloadImg} alt={"download"} />
                      </a>
                    );
                  },
                },
              ],
            },
          ],
    [data]
  );

  let items = get(tempData, "files", []);

  if (isArray(get(tempData, "files", null)) && isArray(get(tempData, "idsOfFiles", null))) {
    items = get(tempData, "files", []).map((i, index) => {
      let temp = {};
      for (let k in i) {
        temp[k] = i[k];
      }
      if (get(tempData, "files", []).length == get(tempData, "idsOfFiles", []).length) {
        temp = {
          ...temp,
          ...get(tempData, `idsOfFiles[${index}]`, null),
        };
      }
      return temp;
    });
  }

  if (createOrEdit) {
    get(tempData, "data", []);
  } else {
    items = get(data, "attachments", []);
  }

  return (
    <CostTableStyle>
      <Row>
        <Col xs={6} className={"left"}>
          <div className="left_table">
            <div className="table_container">
              <CustomTable data={items} columns={table_left_columns} />
              {isEmpty(createOrEdit ? get(tempData, "files", []) : items) && (
                <Title className={"noInfo"} medium sm lHeight={21} cl={"#777E91"}>
                  {" "}
                  No Info{" "}
                </Title>
              )}
            </div>
            {createOrEdit && (
              <div className="table_footer">
                <Button
                  className={"upload_btn"}
                  success
                  onCLick={() =>
                    setTempData((s) => ({
                      ...s,
                      isModalOpen: !s.isModalOpen,
                    }))
                  }
                >
                  <Title fs={12} regular lHeight={18}>
                    Upload file
                  </Title>
                </Button>
              </div>
            )}
          </div>
        </Col>

        <Col xs={6} className={"right"}>
          <div className="right_table">
            <div className={"table_container"}>
              <CustomTable data={get(data, "expensePropositionPaymentHistory", [])} columns={table_right_columns} />
              {isEmpty(get(data, "expensePropositionPaymentHistory", [])) && (
                <Title className={"noInfo"} medium sm lHeight={21} cl={"#777E91"}>
                  {" "}
                  No Info{" "}
                </Title>
              )}
            </div>
            <div className="table_footer">
              <div className="content">
                <div className="total_price">
                  <Title medium xs lHeight={18}>
                    {t("total_amount_paid") ?? "TOTAL AMOUNT PAID"} :{!createOrEdit && <span>{get(data, "paidAmount", "")}</span>}
                  </Title>
                </div>
                <span className={"span"} />
                <div className="remaining_price">
                  <Title medium xs lHeight={18}>
                    {t("the_remaining_amount") ?? "THE REMAINING AMOUNT"} :
                    {!createOrEdit && <span>{get(data, "residualAmount", "")}</span>}
                  </Title>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Modal
        active={tempData.isModalOpen}
      >
        <DropZone
          fileUpload={fileUpload}
          saveData={(data, fileData) => {
            setTempData((s) => ({
              ...s,
              files: [...s.files, ...fileData],
              isModalOpen: !s.isModalOpen,
              idsOfFiles: [...s.idsOfFiles, ...data],
            }));
            setAttachments([...tempData.idsOfFiles, ...data]);
          }}
          cancel={() =>
            setTempData((s) => ({
              ...s,
              isModalOpen: !s.isModalOpen,
            }))
          }
        />
      </Modal>
    </CostTableStyle>
  );
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

export default withTranslation("pdp")(connect(null, mapDispatchToProps)(memo(CostTableComponent)));
