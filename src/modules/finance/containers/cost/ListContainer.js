import { get } from "lodash";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import Table from "../../../../components/table/table";
import ApiActions from "../../../../services/api/actions";
import styled from "styled-components";
const Styled = styled.div`
  table {
    width: 100%;
  }
  td {
    background-color: transparent !important;
    font-size: 14px;
    font-weight: 500;
  }
  tr {
    background-color: #f4f5f6 !important;
  }
  td:last-child {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  th:last-child {
    text-align: center;
  }
  padding: 20px;
  .wrapper {
    padding: 20px;
  }
`;
const ListContainer = ({ getAllCostList, formData }) => {
  const data = get(formData, "result.data", []);
  useEffect(() => {
    getAllCostList();
  }, []);
  const columns = React.useMemo(
    () => [
      {
        Header: "a",
        columns: [
          {
            Header: "#",
            accessor: "number",

            width: 100,
          },
          {
            Header: "FILIAL",
            accessor: "department",
          },
          {
            Header: "SECTION",
            accessor: "branch",
          },
          {
            Header: "Cost Type",
            accessor: "type",
          },
          {
            Header: "QUANTUM",
            accessor: "amount",
          },
          {
            Header: "PAYMENT PAD",
            accessor: "paidAmount",
          },
          {
            Header: "CREATED DATE",
            accessor: "createDate",
            date: true,
            format: "dd/mm/yyyy",
          },

          {
            Header: "deadline",
            accessor: "deadline",
            date: true,
            format: "dd/mm/yyyy",
          },
          {
            Header: "STATUS",
            customStatus: true,
            accessor: "active",
            status: "true",
          },
          {
            Header: "MESSAGE COUNT",
            accessor: "hasMessage",
            message: true,
            // format: 'dd/mm/yyyy'
          },
        ],
      },
    ],
    []
  );
  return (
    <Styled>
      <div className="wrapper">
        <Table redirect={true} number={true} data={data} columns={columns} />
      </div>
    </Styled>
  );
};
const mapStateToProps = (state) => {
  return {
    formData: get(state, "api.cost-list-form.data", {}),
    isFetched: get(state, "api.cost-list-form.data.isFetched", false),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCostList: () => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          // config: attributes,
          method: "get",
          storeName: "cost-list-form",
          url: "finance/v1/expense-proposition/all",
        },
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
