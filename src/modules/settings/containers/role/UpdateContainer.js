import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Col, Row } from "react-grid-system";
import { get } from "lodash";
import { useHistory } from "react-router-dom";
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
import { useParams } from "react-router-dom";
import RoleScheme from "../../../../schema/RoleScheme";
import Normalizer from "../../../../services/normalizer";
import Modul from "./components/Modul";
import modifyData from "./components/modifyData";

const UpdateContainer = ({ getFormDataRequest, editRoleFormData, updateRoleRequest, isFetched, entities, ...rest }) => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState([]);

  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    getFormDataRequest(id);
  }, []);

  const data = Normalizer.Denormalize(editRoleFormData, RoleScheme, entities);

  const update = ({ data, setError }) => {
    console.log(data);
    data = modifyData(data);

    setLoading(true);
    updateRoleRequest({
      id,
      attributes: {
        ...data,
        // modules: get(data, "modules")
      },
      formMethods: { setError, setLoading },
      cb: {
        success: ({ message = "SUCCESS" }) => {
          toast.success(message);
          history.push("/setting/auth/roles");
        },
        fail: (e) => {
          setLoading(false);
        },
      },
    });
  };

  if (!isFetched || loading) {
    return <InitialLoader />;
  }

  const getValueFromField = (data, name) => {};

  return (
    <div className="updateContainer">
      <Box sm></Box>
      <Box gray className={"mb-24"}>
        <FormDemo
          formRequest={update}
          setValueData={values}
          getValueFromField={getValueFromField}
          footer={
            <Flex justify={"flex-end"} className={"buttons mt-30"}>
              <Button className={"cancelBtn"} onCLick={() => history.push("/setting/auth/roles")} outlineDanger>
                CANCEL
              </Button>
              <Button type={"submit"} className="addBtn" success>
                UPDATE ROLE
              </Button>
            </Flex>
          }
        >
          <FormBox title={"EDIT ROLE"}>
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
          </FormBox>
          <Row>
            <Col xs={12} className="mt-24">
              <Modul data={data} setValues={setValues} />
            </Col>
          </Row>
        </FormDemo>
      </Box>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    editRoleFormData: get(state, "normalizer.data.edit-role-form-data.result.data", {}),
    isFetched: get(state, "normalizer.data.edit-role-form-data.isFetched", false),
    entities: get(state, "normalizer.entities", {}),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getFormDataRequest: (id) => {
      const storeName = "edit-role-form-data";
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
    updateRoleRequest: ({ id, attributes, formMethods, cb }) => {
      dispatch({
        type: ApiActions.OPERATION_UPDATE.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          url: `auth/v1/role/edit-role/${id}`,
        },
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdateContainer);
