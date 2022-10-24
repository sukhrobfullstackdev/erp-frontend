import Icon from "../elements/icon";
import { get, head } from "lodash";
const CustomFieldContainer = ({ data, children, type }) => {
  return (
    <div className="field__row">
      <div className="field__row__name">
        <Icon icon={`icon-${type.toLowerCase()}`} />
        <span>{get(data, "name")}</span>
      </div>
      <div className="field__row__option">{children}</div>
    </div>
  );
};

export default CustomFieldContainer;
