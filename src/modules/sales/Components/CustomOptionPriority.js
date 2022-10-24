import Icon from "components/elements/icon";
import { isArray, isEmpty } from "lodash";

const CustomOptionPriority = ({ options, selectHandling, selected, action, searchValue, valueKey, lableKey }) => {
  return isEmpty(options) ? (
    <div className="select__body__options__empty">
      {" "}
      {action.create && !isEmpty(searchValue) ? "Press Enter or click create button" : "Result not found"}{" "}
    </div>
  ) : (
    isArray(options) &&
      options.map(
        (other, index) =>
          (isEmpty(selected) ? other[valueKey] !== "CLEAR" : true) && (
              
                  <div className={"select__body__options__option"} key={other[valueKey]} onClick={() => selectHandling(other)}>
              <Icon
                mainClassName={"Icon"}
                icon={other[valueKey] === "CLEAR" ? "icon-exit" : "icon-flag2"}
                color={
                  other[valueKey] === "URGENT"
                    ? "rgb(245,0,0)"
                    : other[valueKey] === "HIGH"
                    ? "rgb(255,204,0)"
                    : other[valueKey] === "NORMAL"
                    ? "rgb(111,221,255)"
                    : other[valueKey] === "LOW"
                    ? "rgb(216, 216,216)"
                    : "#ff8176"
                }
              />

              {other[lableKey]}
              {!isEmpty(selected) && selected[other[valueKey]] === other[valueKey] && selected[other[valueKey]] !== "CLEAR" && (
                <Icon icon={"icon-check2"} color={"#2ea52c"} mainClassName={"checked"} />
              )}
            </div>
          )
      )
  );
};

const CustomHeaderPriority = ({ selected, clickHeader, valueKey }) => {
  return (
    <>
      <div className="select__header__content" onClick={clickHeader}>
        {isEmpty(selected) ? (
          <Icon icon="icon-flag2" color={"grey"} />
        ) : (
          <Icon
            icon="icon-flag2"
            color={
              selected[valueKey] === "URGENT"
                ? "rgb(245,0,0)"
                : selected[valueKey] === "HIGH"
                ? "rgb(255,204,0)"
                : selected[valueKey] === "NORMAL"
                ? "rgb(111,221,255)"
                : selected[valueKey] === "LOW"
                ? "rgb(216, 216,216)"
                : "grey"
            }
          />
        )}
      </div>
    </>
  );
};
export { CustomOptionPriority, CustomHeaderPriority };
