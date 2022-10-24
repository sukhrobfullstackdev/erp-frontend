import React, { memo } from "react";
import { isEmpty } from "lodash";
import Button from "../../../../components/elements/button";

const isEqual = (type, str) => (type === str ? "1" : 0);

const ViewHeaderCreateBtn = ({ createButtonConfig = {}, reRender = () => {} }) => {
  const { text = "", buttonStyleType, Component, onClick = () => "" } = createButtonConfig;

  return isEmpty(createButtonConfig) ? (
    ""
  ) : Component ? (
    <Component {...{ reRender }} />
  ) : (
    <div>
      <Button success={isEqual(buttonStyleType, "success")} onCLick={onClick}>
        {text}
      </Button>
    </div>
  );
};

export default memo(ViewHeaderCreateBtn);
