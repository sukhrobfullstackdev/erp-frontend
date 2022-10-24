import React, { memo, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import Button from "../../../components/elements/button";
import Modal from "../../../components/elements/modal";
import { withTranslation } from "react-i18next";
import styled from "styled-components";
import DeleteModule from "../../../components/elements/deleteModule";

const Style = styled.div`
  .modal {
    &__body {
      padding: 0;
      min-height: 15px;
      border: none;
      border-radius: 12px;
    }
  }
  .deleteBtn {
    margin: 0 5px;
    button {
      border: 1px solid #ef466f;
    }
  }
`;

const DeleteComponent = ({ request, t, id }) => {
  const history = useHistory();
  const [data, setData] = useState({
    modal: false,
  });

  return (
    <Style>
      <Button className={"deleteBtn"} xs semiBold outlineDanger onCLick={() => setData((s) => ({ ...s, modal: true }))}>
        {t("delete") ?? "Delete"}
      </Button>

      <Modal active={data.modal}>
        <DeleteModule
          {...{
            // title: "",
            // des: "dfs",
            moduleName: "delete",
            yes: () => {
              request({
                method: "delete",
                url: `finance/v1/expense-proposition/delete/${id}`,
                cb: {
                  success: (res) => {
                    setData((s) => ({
                      ...s,
                      modal: false,
                    }));
                    history.push("/finance/expense-proposition");
                  },
                },
              });
            },
            cancel: () => setData((s) => ({ ...s, modal: false })),
          }}
        />
      </Modal>
    </Style>
  );
};

export default withTranslation("pdp")(memo(DeleteComponent));
