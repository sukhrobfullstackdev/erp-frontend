import { memo } from "react";
import CustomIcon from "./cusotmIcon";
import { isEmpty } from "lodash";

const CustomHeader = ({ clickHeader = () => "", content = "", placeholder }) => {
  return (
    <div className={"clockPicker__header"} onClick={clickHeader}>
      <div className="clockPicker__header__content">{content}</div>
      {isEmpty(content) && <div className="clockPicker__header__placeholder">{placeholder}</div>}
      <div className="clockPicker__header__icon">
        <CustomIcon />
      </div>
    </div>
  );
};

export default memo(CustomHeader);
