import React, { memo } from "react";
import styled from "styled-components";
import { withTranslation } from "react-i18next";
import Button from "../../../components/elements/button";
import { isNull } from "lodash";

const Style = styled.div`
  .accept_btn {
    margin: 0 5px;
    button {
      font-size: 12px;
      &:hover {
        background: #45b36b;
        color: #fff;
      }
    }
  }
`;

const AcceptComponent = ({ t, id, request, setData = () => "", hasAccess }) => {
  return (
    <Style>
      {!isNull(hasAccess) && (
        <Button
          className={"accept_btn"}
          xs
          semiBold
          success
          disabled={!hasAccess}
          onCLick={() => setData((s) => ({ ...s, modal: true }))}
        >
          {t("accept") ?? "Accept"}
        </Button>
      )}
    </Style>
  );
};

export default withTranslation("pdp")(memo(AcceptComponent));
