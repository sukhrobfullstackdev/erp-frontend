import React, { memo } from "react";
import { get, isEmpty } from "lodash";
import TreeItem from "./treeItem";

const Tree = ({ options, childKey = "children", labelKey = "name", idKey = "id", onChange = () => "", defaultValue }) => {
  const onChangeHandling = (props) => onChange(props);

  const render = (options, ids = []) => (
    <>
      {options?.map((item) => {
        if (!isEmpty(String(get(item, idKey, "")))) ids = [...ids, get(item, idKey, "")];
        return (
          <TreeItem
            key={item[idKey] + get(item, labelKey, "")}
            header={get(item, labelKey, "")}
            headerData={{ ids }}
            onChange={onChangeHandling}
          >
            {render(get(item, childKey, []), ids)}
          </TreeItem>
        );
      })}
    </>
  );

  return <>{render(options)}</>;
};

export default memo(Tree);
