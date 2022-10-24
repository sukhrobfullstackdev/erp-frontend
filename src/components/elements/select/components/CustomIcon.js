import React, { memo } from "react";
import { isEmpty } from "lodash";
import Icon from "../../icon";

const CustomIcon = ({ isMulti, selected, isClearAll, clearAll, clickHeader }) => {
  return isClearAll && selected.length ? (
    <div className={"select__header__clearAll"} onClick={clearAll}>
      Clear All
    </div>
  ) : isMulti && !isEmpty(selected) ? (
    <div className="select__header__selectedNumber">{selected.length > 1 ? `+${selected.length}` : 1}</div>
  ) : (
    <div className={"select__header__iconContainer"} onClick={clickHeader}>
      <Icon
        mainClassName="select__header__bottomArrow"
        className="select__header__bottomArrow"
        iconClassName="select__header__bottomArrow"
        icon={"icon-bottom-arrow"}
        color="#353945"
      />
    </div>
  );
};

export default memo(CustomIcon);
