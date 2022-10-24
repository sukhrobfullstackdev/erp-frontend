import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Col, Row } from "react-grid-system";
import { get } from "lodash";
import { useHistory, useParams } from "react-router-dom";
import Box from "../../../../components/elements/box";
import FormBox from "../../components/form-box";
import FormDemo from "../../../../containers/Form/form-demo";
import Field from "../../../../containers/Form/field";
import ApiActions from "../../../../services/api/actions";
import { InitialLoader } from "../../../../components/loader";
import { getSelectOptionsListFromData } from "../../../../utils";
import Flex from "../../../../components/elements/flex";
import Button from "../../../../components/elements/button";
import { toast } from "react-toastify";
import StickyTable from "../../../../components/sticky-table";
import RoleScheme from "../../../../schema/RoleScheme";
import Normalizer from "../../../../services/normalizer";

const CopyContainer = ({ getFormDataRequest, copyRoleFormData, addRoleRequest, isFetched, entities, ...rest }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    getFormDataRequest(id);
  }, []);
  const data = Normalizer.Denormalize(copyRoleFormData, RoleScheme, entities);
  const create = ({ data, setError }) => {
    setLoading(true);
    addRoleRequest({
      attributes: { ...data, modules: get(data, "modules") },
      formMethods: { setError, setLoading },
      cb: {
        success: ({ message = "SUCCESS" }) => {
          toast.success(message);
          history.push("/setting/auth/roles");
        },
      },
    });
  };
  if (!isFetched || loading) {
    return <InitialLoader />;
  }
  const getValueFromField = (data, name) => {};
  return (
    <div className="createContainer">
      <Box sm></Box>
      <Box gray className={"mb-24"}>
        <FormBox title={"COPY ROLE"}>
          <FormDemo
            formRequest={create}
            footer={
              <Flex justify={"flex-end"} className={"buttons mt-30"}>
                <Button className={"cancelBtn"} onCLick={() => history.push("/setting/auth/roles")} outlineDanger>
                  CANCEL
                </Button>
                <Button type={"submit"} className="addBtn" success>
                  COPY ROLE
                </Button>
              </Flex>
            }
          >
            <Row className="form-content-body">
              <Col xs={6}>
                <Field type={"input"} defaultValue={get(data, "name")} name={"name"} label={"Name"} params={{ required: true }} />
              </Col>
              <Col xs={6}>
                <Field
                  type={"custom-select"}
                  defaultValue={get(data, "roleType")}
                  options={getSelectOptionsListFromData(get(data, "roleTypes", []), "name", "name")}
                  name={"roleType"}
                  label={"Role type"}
                  params={{ required: true }}
                />
              </Col>
              <Col xs={12} className={"mt-20"}>
                <Field
                  type={"textarea"}
                  defaultValue={get(data, "description")}
                  name={"description"}
                  label={"Description"}
                  params={{ required: true }}
                />
              </Col>
            </Row>
          </FormDemo>
        </FormBox>
        <Row>
          <Col xs={12}>
            {get(data, "modules", []).map((module, index) => (
              <FormDemo getValueFromField={getValueFromField} mainClassName={"main-form-table mb-24"}>
                <div className="main-form-table-head">
                  <Field type={"checkbox"} name={"module"} />
                  {get(module, "name")}
                </div>
                <StickyTable className="stickyTable" data={get(module, "departments", [])} />
              </FormDemo>
            ))}
          </Col>
        </Row>
      </Box>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    copyRoleFormData: get(state, "normalizer.data.copy-role-form-data.result.data", {}),
    isFetched: get(state, "normalizer.data.copy-role-form-data.isFetched", false),
    entities: get(state, "normalizer.entities", {}),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getFormDataRequest: (id) => {
      const storeName = "copy-role-form-data";
      const entityName = "role";
      const scheme = { data: RoleScheme };
      dispatch({
        type: ApiActions.GET_ONE.REQUEST,
        payload: {
          url: `auth/v1/role/get-one-role/${id}`,
          config: {
            params: {},
          },
          storeName,
          entityName,
          scheme,
        },
      });
    },
    addRoleRequest: ({ attributes, formMethods, cb }) => {
      dispatch({
        type: ApiActions.OPERATION_ADD.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          url: "auth/v1/role/add-role",
        },
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CopyContainer);
