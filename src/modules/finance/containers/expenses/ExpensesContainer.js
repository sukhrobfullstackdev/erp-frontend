import { get } from "lodash";
import React, { memo } from "react";
import GridView from "../../../../containers/GridView/GridView";
import ExpensesScheme from "../../../../schema/ExpensesScheme";
import Icon from "../../../../components/elements/icon";
import Button from "../../../../components/elements/button";
import DataGrid from "../../../../containers/DataGrid";

const ExpensesContainer = ({ history }) => {
  return (
    <div>
      <DataGrid
        url={{
          ids: "finance/v1/expense-view/generic-view",
          data: "finance/v1/expense-view/data",
          viewOne: "finance/v1/expense-view/view-by-id",
          viewList: "finance/v1/expense-view/view-types",
          viewUpdate: "finance/v1/view/update-view",
        }}
        entityName={"expenses"}
        scheme={ExpensesScheme}
        redirectUrl={{ view: "/finance/finance/expenses/" }}
      />
    </div>
  );
};

export default memo(ExpensesContainer);
