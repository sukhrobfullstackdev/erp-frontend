import React, { memo } from "react";
import Icon from "../elements/icon";
import { TYPES } from "../../containers/DataGrid/types";
import { toLower } from "lodash";
import Text from "../elements/text";

const ignoreOption = (name) => {
  if (name === "SPECIAL_LABEL") return false;
  else if (name === "CALL_TYPE") return false;
  else if (name === "CALL_STATUS") return false;
  return true;
};

const AddField = ({ t, setAddColumn }) => {
  return (
    <>
      <div className="content__part">
        <div className="search_part">
          <input className="search" placeholder="Search" />
          <Icon icon="icon-search" />
        </div>
        <div className="add_new">
          {TYPES &&
            TYPES.map(
              ({ name }, index) =>
                ignoreOption(name) && (
                  <div
                    key={index + 1}
                    className="option"
                    onClick={() =>
                      setAddColumn((s) => ({
                        ...s,
                        name,
                        isOpen: true,
                      }))
                    }
                  >
                    <Icon size="sm" icon={`icon-${toLower(name)}`} />
                    <Text>{t(`${name}_CUSTOM_FIELD_TYPE`) ?? name}</Text>
                  </div>
                )
            )}
        </div>
      </div>
    </>
  );
};
export default memo(AddField);
