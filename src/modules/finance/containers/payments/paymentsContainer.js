import DataGrid from "containers/DataGrid";
import DynamicScheme from "schema/DynamicScheme";

const PaymentsContainer = () => {
  return (
    <>
      <DataGrid
        url={{
          ids: "finance/v1/payment-view/generic-view",
          data: "finance/v1/payment-view/data",
          viewOne: "finance/v1/payment-view/view-by-id",
          viewList: "finance/v1/payment-view/view-types",
          addOrEditCell: "finance/v1/view/update-view",
        }}
        entityName={"payments"}
        scheme={DynamicScheme("payments")}
        redirectUrl={{
          view: "/finance/finance/payments/",
        }}
      />
    </>
  );
};

export default PaymentsContainer;
