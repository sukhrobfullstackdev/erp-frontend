import React, { memo, useState, useEffect } from "react";
import { find, get, head, isEmpty, isEqual } from "lodash";
import GridView from "../../../../containers/GridView/GridView";
import IllnessGridScheme from "../../../../schema/IllnessGridScheme";
import FormDemo from "../../../../containers/Form/form-demo";
import { Col, Row } from "react-grid-system";
import Field from "../../../../containers/Form/field";
import Flex from "../../../../components/elements/flex";
import Button from "../../../../components/elements/button";
import Icon from "../../../../components/elements/icon";
import ApiActions from "../../../../services/api/actions";
import BranchScheme from "../../../../schema/BranchScheme";
import { connect } from "react-redux";
import Normalizer from "../../../../services/normalizer";
import { getSelectOptionsListFromData } from "../../../../utils";
import DepartmentScheme from "../../../../schema/DepartmentScheme";
import EmployeeCategoryTypeScheme from "../../../../schema/EmployeeCategoryTypeScheme";
import PositionScheme from "../../../../schema/PositionScheme";
import { withTranslation } from "react-i18next";

const ListContainer = ({
  t,
  getFormData,
  privilegeType,
  privilege,
  percent,
  fromCount,
  toCount,
  formdata,
  entities,
  ...rest
}) => {
  useEffect(() => {
    getFormData();
  }, []);
  privilegeType = getSelectOptionsListFromData(get(formdata, "data.result.data.privilegeType.options", []), "id", "name");

  const ModalBody = ({ addOrEdit, cancel, item, btnText = "Add", openModal, status, t }) => {
    const [privileges, setPrivileges] = useState(false);
    useEffect(() => {
      setPrivileges(get(item, "privilege"));
    }, []);

    let temp = {};
    if (isEmpty(item) && openModal && status) {
      temp = {
        resetData: {
          privilegeType: "",
          fromCount: "",
          toCount: "",
          percent: "",
          privilege: "",
          active: false,
        },
      };
    }

    return (
      <FormDemo
        formRequest={(data) => {
          !privileges
            ? (data.data = {
                toCount: parseInt(data.data.toCount),
                fromCount: parseInt(data.data.fromCount),
                percent: parseInt(data.data.percent),
                privilege: false,
                active: data.data.active,
              })
            : (data.data = {
                privilege: true,
                percent: parseInt(data.data.percent),
                privilegeTypeId: data.data.privilegeType,
                active: data.data.active,
              });
          addOrEdit(get(item, "id", null), data);
        }}
        {...temp}
      >
        <Row>
          <Col xs={12} className={"mb-15"}>
            {privileges ? (
              <Field
                type={"custom-select"}
                searchable={true}
                options={privilegeType}
                defaultValue={get(item, "privilegeType.values", "")}
                name={"privilegeType"}
                label={t("selected_privilege") ?? "SELECTED PRIVILEGE"}
                params={{ required: true }}
              />
            ) : (
              <>
                <Field
                  type={"input"}
                  property={{ type: "number" }}
                  name={"fromCount"}
                  defaultValue={get(item, "fromCount")}
                  label={t("dan") ?? "Dan"}
                  params={{ required: true }}
                />
                <Field
                  type={"input"}
                  property={{ type: "number" }}
                  defaultValue={get(item, "toCount")}
                  name={"toCount"}
                  label={t("gacha") ?? "Gacha"}
                  params={{ required: true }}
                />
              </>
            )}
            <Field
              type={"input"}
              property={{ type: "number" }}
              defaultValue={get(item, "percent")}
              name={"percent"}
              label={t("percent") ?? "percent"}
              params={{ required: true }}
            />
          </Col>
          <Col xs={12}>
            <Flex justify={"flex-end"} align={"center"}>
              {get(item, "privilege")}
              <Field
                className="privilage"
                onChange={setPrivileges}
                defaultValue={get(item, "privilege", privileges)}
                type={"checkbox"}
                inBtn
                name={"privilege"}
                label={
                  <>
                    {" "}
                    {t("privilege") ?? "Privilage"} <Icon icon="icon-question" className="questionIcon" />
                  </>
                }
              />
              <Field
                // onChange={(v) => console.log(v)}
                defaultValue={get(item, "active")}
                type={"checkbox"}
                inBtn
                name={"active"}
                label={
                  <>
                    {" "}
                    {t("active") ?? "Active"} <Icon icon="icon-question" className="questionIcon" />
                  </>
                }
              />
              <Button outlineDanger className="cancelBtn" onCLick={cancel}>
                {t("cancel") ?? "Cancel"}
              </Button>
              <Button success className="addBtn" type={"submit"}>
                {btnText}
              </Button>
            </Flex>
          </Col>
        </Row>
      </FormDemo>
    );
  };

  return (
    <>
      <GridView
        url={{
          list: "staff/v1/template-for-sick/get-all",
          one: "staff/v1/template-for-sick/get",
          add: "staff/v1/template-for-sick/add",
          update: "/staff/v1/template-for-sick/edit",
          delete: "staff/v1/template-for-sick/delete",
        }}
        storeName="illness-type-list"
        entityName="illness-grid"
        scheme={IllnessGridScheme}
        params={{}}
        disabledOnClose
        hasModal={{ create: true, update: true, delete: true }}
        ModalBody={ModalBody}
        dataForModal={{
          t,
        }}
        searchFields={[
          {
            name: "Title",
            id: "1",
            type: "name",
            customField: "name",
            searchable: true,
          },
        ]}
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
                Header: `${t("title") ?? "Title"}`,
                accessor: "name",
                width: 150,
              },

              {
                Header: `${t("percent") ?? "Percent"}`,
                accessor: "percent",
                width: 150,
                customColumn: ({ cell: { value } }) => value + " %",
              },
              {
                Header: `${t("status") ?? "Status"}`,
                accessor: "active",
                status: "true",
                width: 50,
              },
              {
                Header: `${t("action") ?? "Action"}`,
                accessor: "action",
                width: 50,
              },
            ],
          },
        ]}
        row={["id", "number", "name", "percent"]}
        modalTitle={t("department") ?? "DEPARTMENT"}
      />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    formdata: get(state, "api.hr-illness-form-data", {}),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFormData: () => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: "staff/v1/template-for-sick/get",
          method: "get",
          storeName: "hr-illness-form-data",
        },
      });
    },
  };
};
export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(ListContainer));
