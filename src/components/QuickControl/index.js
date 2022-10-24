import Icon from "components/elements/icon";
import { get } from "lodash";
import React from "react";
import ReactTooltip from "react-tooltip";
import QuickControlWrapper from "./QuickControlWrapper";

export default function QuickControl({ btns, onClose, ...props }) {
  return (
    <QuickControlWrapper {...props}>
      <div className="controls">
        <ReactTooltip id="controlIconHover" />
        {btns.map(({ icon, onClick, name }) => {
          return (
            <button
              key={icon}
              onClick={onClick}
              data-tip={name}
              data-place={"bottom"}
              data-effect={"solid"}
              data-for={"controlIconHover"}
              className="control"
            >
              {<Icon icon={icon} color="#fff" />}
            </button>
          );
        })}
      </div>
      <div className="close">
        <button className="close-btn" onClick={onClose}>
          {<Icon icon={"icon-deleteDisabled"} color="#fff" />}
        </button>
      </div>
    </QuickControlWrapper>
  );
}
