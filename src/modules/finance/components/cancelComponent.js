import React, { memo, useState } from "react";
import { withTranslation } from "react-i18next";
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../components/elements/button";
import Modal from "../../../components/elements/modal";
import Icon from "../../../components/elements/icon";
import Textarea from "../../../components/elements/textarea";
import { get, isNull } from "lodash";

const Style = styled.div`
  .modal {
    &__body {
      padding: 18px 20px;
      min-height: 15px;
      border: none;
      border-radius: 12px;

      .main_title {
        font-weight: 600;
        font-size: 14px;
        line-height: 21px;
        color: #777e91;
        text-transform: capitalize;
      }

      .body__section {
        background: #fcfcfd;
        box-sizing: border-box;
        margin-bottom: 20px;
        padding: 12px;
        border: 0.5px solid #f4f5f6;
        border-radius: 6px;
        width: 580px;
        margin-top: 20px;
        max-height: 268px;

        .title {
          display: flex;
          align-items: center;
          background: rgba(239, 70, 111, 0.1);
          border-radius: 6px;
          padding: 8.5px 10.5px;
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;
          color: #353945;
          height: 34px;
          width: 544px;

          .strongInfo {
            margin-right: 12px;

            .ui__icon__wrapper {
              width: 18.5px;
              height: 21px;

              .icon {
                width: 100%;
                height: 100%;
              }
            }
          }
        }

        .des {
          font-weight: normal;
          font-size: 13px;
          line-height: 20px;
          color: #353945;
          margin-top: 18px;
        }

        textarea {
          background: #f4f5f6;
          border-radius: 6px;
          padding: 10px;
          font-weight: 400;
          font-size: 12px;
          line-height: 18px;
          color: #353945;
          width: 100%;
          margin-top: 30px;
          height: 125px;

          &::placeholder {
            color: #b1b5c4;
          }
        }
      }

      .del-label {
        width: 580px;
        padding: 0;
        padding-top: 1px;

        .moduleName {
          padding-left: 6px;
          font-weight: 600;
          font-size: 10px;
          line-height: 12px;
          color: #a7adbf;
        }

        .input {
          margin-top: 5px;
          width: 100%;

          .inputContainer {
            width: 100%;
            height: 38px;
            padding: 10px;
            border-radius: 6px;
            padding-bottom: 2px;
            padding-top: 2px;
            background: #fafafb;
            border: 0.5px solid #e6e8ec;

            input {
              font-weight: 500;
              font-size: 12px;
              line-height: 18px;
              color: #353945;
            }
          }
        }
      }

      .buttons {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 15px;
        margin-right: -3px;

        button {
          font-weight: 500;
          font-size: 10px;
          line-height: 15px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          height: 34px;
          /* padding: 9px 17px 10px 17px; */
          justify-content: center;
        }

        &__cancel {
          margin-right: 10px;

          button {
            width: 70px;
            background: rgba(239, 70, 111, 0.05);

            &:hover {
              background: rgba(239, 70, 111, 0.1);
            }
          }
        }

        &__yes {
          button {
            width: 89px;
          }
        }
      }
    }
  }
  .danger_btn {
    button {
      margin: 0 5px;
    }
  }
`;

const CancelComponent = ({ t, request, hasAccess }) => {
  const [data, setData] = useState({
    modal: false,
    description: "",
  });
  const match = useRouteMatch();
  return (
    <Style>
      {!isNull(hasAccess) && (
        <Button
          className={"danger_btn"}
          xs
          semiBold
          danger
          disabled={!hasAccess}
          onCLick={() => setData((s) => ({ ...s, modal: true }))}
        >
          {t("cancel") ?? "Cancel"}
        </Button>
      )}
      <Modal active={data.modal}>
        <div className="main_title">{t("cancel") ?? "Cancel"}</div>
        <div className="body__section">
          <div className="title">
            <Icon icon="icon-strong-info" color="#EF466F" mainClassName="strongInfo" />
            {t("you_are_about_to_permanently_delete_this_project") ?? "You are about to permanently delete this project"}
          </div>
          <p className="des">
            {" "}
            {t(
              `i_have_a_unity_package_with_my_folder_structure_pre-setup,_but_meant_to_be_empty,_in_order_to_export_the_folders_I_put_a_file_"Delete_This_File.txt"_into_every.`
            ) ??
              'I have a unity package with my folder structure pre-setup, but meant to be empty, in order to export the folders I put a file "Delete This File.txt" into every.'}{" "}
          </p>
          <Textarea
            placeholder={"Description..."}
            onChange={(e) =>
              setData((s) => ({
                ...s,
                description: e.target.value,
              }))
            }
          />
        </div>
        <div className="buttons">
          <Button
            className="buttons__cancel"
            outlineDanger
            onCLick={() =>
              setData((s) => ({
                ...s,
                modal: false,
                description: "",
              }))
            }
          >
            {t("cancel") ?? "Cancel"}
          </Button>
          <Button
            className="buttons__yes"
            danger={"1"}
            onCLick={() => {
              request({
                attributes: {
                  id: get(match, "params.id", ""),
                  description: get(data, "description", ""),
                },
                url: `finance/v1/expense-proposition/reject`,
                cb: {
                  success: (res) => {
                    setData((s) => ({
                      ...s,
                      modal: false,
                      description: "",
                    }));
                  },
                },
              });
            }}
          >
            {t("yes_delete") ?? "Yes, delete"}
          </Button>
        </div>
      </Modal>
    </Style>
  );
};

export default withTranslation("pdp")(memo(CancelComponent));
