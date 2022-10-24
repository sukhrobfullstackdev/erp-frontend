import React, { memo, useState } from "react";
import Button from "../../../components/elements/button";
import { withTranslation } from "react-i18next";
import Modal from "../../../components/elements/modal";
import Message from "../../../components/elements/message";
import styled from "styled-components";
import { useRouteMatch } from "react-router-dom";
import { get, isNull } from "lodash";

const Style = styled.div`
  .review_btn {
    button {
      margin: 0 5px;
      font-size: 12px;
      &:hover {
        background: #ffd166;
        color: #353945;
      }
    }
  }
  .modal {
    &__body {
      padding: 0;
      min-height: 15px;
      border: none;
      border-radius: 12px;
      .messageComponent {
        width: auto;
        max-width: 530px;
        .message {
          width: calc(100% - 70px);
        }
      }
    }
  }
`;

const ReviewComponent = ({ t, request, hasAccess }) => {
  const [openModal, setOpenModal] = useState(false);
  const match = useRouteMatch();

  return (
    <Style>
      {!isNull(hasAccess) && (
        <Button
          className={"review_btn"}
          xs
          semiBold
          bg={"#FFD166"}
          color={"#353945"}
          disabled={!hasAccess}
          onCLick={() => setOpenModal(true)}
        >
          {t("review") ?? "Review"}
        </Button>
      )}
      <Modal active={openModal}>
        <Message
          className={"messageComponent"}
          message={
            t("do_you_agree_to_transfer_the_application_to_review_status") ??
            "Arizani qayta ko'rib chiqish statusiga o'tishiga rozimisiz?"
          }
          status="info"
          yes={() => {
            request({
              method: "get",
              url: `finance/v1/expense-proposition/review/${get(match, "params.id", "")}`,
              cb: {
                success: (res) => {
                  setOpenModal(false);
                },
              },
            });
          }}
          no={() => {
            setOpenModal(false);
          }}
        />
      </Modal>
    </Style>
  );
};

export default withTranslation("pdp")(memo(ReviewComponent));
