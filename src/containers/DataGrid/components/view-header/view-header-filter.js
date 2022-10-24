import React, { useMemo } from "react";
import { get } from "lodash";
import Filter from "../filter/Filter";
import Dropdown from "../../../../components/elements/dropDown/dropdown";
import Button from "../../../../components/elements/button";
import Icon from "../../../../components/elements/icon";

const ViewHeaderFilter = ({ view, filter, filterView }) => {
  const columns = useMemo(() => get(view, "columns", []).filter((item) => item.filterable), [view]);

  return (
    <div>
      <Dropdown
        className="dropDown__filter"
        button={
          <Button className="filterBtn" outline_success>
            Filter <Icon size="sm" icon="icon-filter" color="#45B36B" />
          </Button>
        }
      >
        <Filter columns={columns} filterView={filterView} filter={filter} />
      </Dropdown>
    </div>
  );
};

export default ViewHeaderFilter;
