import React, { memo } from "react";
import ExpensePropositionScheme from "../../../../schema/ExpensePropositionScheme.js";
import Button from "../../../../components/elements/button";
import DataGrid from "../../../../containers/DataGrid";
import { withTranslation } from "react-i18next";

const ExpensePropositionContainer = ({ history, t }) => {
  return (
    <div>
      <DataGrid
        url={{
          ids: "finance/v1/expense-proposition-view/generic-view",
          data: "finance/v1/expense-proposition-view/data",
          viewOne: "finance/v1/expense-proposition-view/view-by-id",
          viewList: "finance/v1/expense-proposition-view/view-types",
          viewUpdate: "finance/v1/view/update-view",
          // viewAdd: 'sales/v1/view/add-view',
          // viewDelete: 'sales/v1/view/delete-view',
          // viewDuplicate: 'sales/v1/view/duplicate-view',
          // addCustomField: 'sales/v1/custom-field/add-custom-field',
          // editCustomField: 'sales/v1/custom-field/edit-custom-field',
          // addStatus: "sales/v1/lead-status/add-lead-status",
          // addOrEditCell: "sales/v1/lead-view/edit-row-data"
        }}
        customLeftElement={
          <Button
            className={"btn-border-radius-8"}
            success
            onCLick={() => history.push("/finance/finance/expense-proposition-item/create")}
            style={{ margin: "0 5px" }}
          >
            {t("create") ?? "Create"}
          </Button>
        }
        entityName={"expense-proposition"}
        scheme={ExpensePropositionScheme}
        redirectUrl={{
          view: "/finance/finance/expense-proposition/",
          itemOpen: "/finance/finance/expense-proposition-item/",
        }}
      />

      {/* <GridView
        url={{
          list: "finance/v1/expense-proposition/all",
        }}
        storeName="expenseProposition"
        entityName="expenseProposition"
        scheme={ExpensePropositionScheme}
        params={{}}
        buttonText=''
        ModalBody ={ ()=>""}
        hideSearch = {"true"}
        rightContent= {<>
          <Button
              success
              onCLick={()=> history.push("/finance/finance/expense-proposition-item/create")}
              className='makeStatement'>apply</Button>
          <Button className="makeFilter">
            Filter
            <span>
              <Icon icon="icon-filter-desc-center" color="#777E91;" />
            </span>
          </Button>
        </>}
        columns={[
          {
            Header: "Name",
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
                Header: "CREATED",
                accessor: "createDate",
                date: true,
                format: "dd / mm / yyyy",
              },

              {
                Header: "deadline",
                accessor: "deadline",
                date: true,
                format: "dd / mm / yyyy",
              },
              {
                Header: "STATUS",
                accessor: "status",
                customColumn: ({ cell }) => {
                  return (
                    <div  style= {{backgroundColor: `${get(cell, 'value.colorCode', 'grey') }`, width: '97px', height: '28px', display: 'grid', placeItems: 'center center', color: '#fff', borderRadius: '4px' }} >{get(cell, "value.name","")}</div>
                )},
                className: 'colorViewer'
              },
                {
                    Header: 'MESSAGE COUNT',
                    accessor: 'hasMessage',
                    message: false,
                    format: 'dd/mm/yyyy',
                    status: 'hasMessage',
                    customColumnFalse: <div className="hasMessage"><Icon className="commentIcon" icon="icon-comment-table" color='#777E91' /></div>,
                    customColumnTrue: <div className="hasMessage falsyMessage"><Icon className="commentIcon" icon="icon-comment-table" color="#353945" /> <span className="circle"></span> </div>
                },
            ],
            clickRow: (row) => {
              history.push(`/finance/finance/expense-proposition-item/${get(row, "id","")}`)
            }
          },
        ]}
      /> */}
    </div>
  );
};

export default withTranslation("pdp")(memo(ExpensePropositionContainer));
