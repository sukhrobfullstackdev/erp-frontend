import { get, remove } from "lodash";
import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import Button from "../../../../components/elements/button";
import Dropdown from "../../../../components/elements/dropDown";
import Icon from "../../../../components/elements/icon";
import Field from "../../../../containers/Form/field";
import FormDemo from "../../../../containers/Form/form-demo";
import GridView from "../../../../containers/GridView/GridView";
import PayRollScheme from "../../../../schema/PayRollScheme";
import ApiActions from "../../../../services/api/actions";

const PayRollContainer = ({ addTableId, tableId, history, t }) => {
  const [checkbox, setCheckbox] = useState(false);
  const [checkboxId, setCheckboxId] = useState([]);

  const onheaderCheckbox = (e) => {
    setCheckbox(e);
  };

  const rowCheckboxHandling = (e, check) => {
    check ? setCheckboxId((s) => [...s, e]) : setCheckboxId((s) => [...s.filter((val) => val !== e)]);
  };

  return (
    <div>
      <GridView
        url={{
          list: "finance/v1/payroll/list",
        }}
        storeName="payRoll"
        entityName="payRoll"
        scheme={PayRollScheme}
        params={{}}
        buttonText=""
        ModalBody={() => ""}
        rightContent={
          <>
            <Button
              success
              onCLick={() => {
                addTableId({ item: checkboxId });
                history.push("/finance/finance/salary");
              }}
              className="makeStatement"
            >
              {t("apply") ?? "apply"}
            </Button>
            <Button className="makeFilter">
              {t("filter") ?? "Filter"}
              <span>
                <Icon icon="icon-filter-desc-center" color="#777E91;" />
              </span>
            </Button>
          </>
        }
        columns={[
          {
            Header: "Name",
            columns: [
              {
                Header: (
                  <FormDemo>
                    <Field type={"checkbox"} onChange={onheaderCheckbox} name="checkbox" />
                  </FormDemo>
                ),
                accessor: "sfds",
                customColumn: (e) => {
                  return (
                    <FormDemo>
                      <Field
                        type={"checkbox"}
                        defaultValue={checkbox}
                        name="handle"
                        onChange={(check) => rowCheckboxHandling(get(e, "cell.row.original.id", ""), check)}
                      />
                    </FormDemo>
                  );
                },
              },
              {
                Header: "#",
                accessor: "number",
                width: 100,
              },
              {
                Header: `${t("fio") ?? "FIO"}`,
                accessor: "fullName",
              },
              {
                Header: `${t("filial") ?? "FILIAL"}`,
                accessor: "branch",
              },
              {
                Header: `${t("section") ?? "SECTION"}`,
                accessor: "department",
              },
              {
                Header: `${t("position") ?? "POSITION"}`,
                accessor: "position",
              },
              {
                Header: `${t("categorie") ?? "CATEGORIE"}`,
                accessor: "employeeCategory",
              },
              {
                Header: `${t("all_categorie") ?? "ALL CATEGORIE"}`,
                accessor: "calculated",
              },
              {
                Header: `${t("all_given") ?? "ALL GIVEN"}`,
                accessor: "given",
              },
              {
                Header: `${t('the_rest') ?? "THE REST"}`,
                accessor: "residue",
              },
              {
                Header: `${t("action") ?? "ACTION"}`,
                accessor: "action",
              },
            ],
          },
        ]}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTableId: ({ item, storeName = "tableId" }) => {
      dispatch({
        type: ApiActions.TEMP_DATA.REQUEST,
        payload: {
          item,
          storeName,
        },
      });
    },
  };
};

export default withTranslation("pdp")(connect(null, mapDispatchToProps)(PayRollContainer));
