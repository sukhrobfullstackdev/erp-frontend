import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Col, Row } from "react-grid-system";
import { get, slice } from "lodash";
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
import modifyData from "./components/modifyData";
import Modul from "./components/Modul";

const CreateContainer = ({ getFormDataRequest, addRoleFormData, addRoleRequest, ...rest }) => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getFormDataRequest();
  }, []);

  const create = ({ data, setError }) => {
    data = modifyData(data);

    setLoading(true);
    addRoleRequest({
      attributes: {
        ...data,
        // modules: get(addRoleFormData, "result.data.modules"),
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

  if (!get(addRoleFormData, "isFetched", false) || loading) {
    return <InitialLoader />;
  }

  const getValueFromField = (data, name) => {};

  return (
    <div className="createContainer">
      <Box sm></Box>
      <Box gray className={"mb-24"}>
        <FormDemo
          formRequest={create}
          setValueData={values}
          getValueFromField={getValueFromField}
          footer={
            <Flex justify={"flex-end"} className={"buttons mt-30"}>
              <Button className={"cancelBtn"} onCLick={() => history.push("/setting/auth/roles")} outlineDanger>
                CANCEL
              </Button>
              <Button type={"submit"} className="addBtn" success>
                ADD ROLE
              </Button>
            </Flex>
          }
        >
          <FormBox title={"NEW ROLE"}>
            <Row className="form-content-body">
              <Col xs={6}>
                <Field type={"input"} name={"name"} label={"Name"} params={{ required: true }} />
              </Col>
              <Col xs={6}>
                <Field
                  type={"custom-select"}
                  options={getSelectOptionsListFromData(get(addRoleFormData, "result.data.roleTypes", []), "name", "name")}
                  name={"roleType"}
                  label={"Role type"}
                  params={{ required: true }}
                />
              </Col>
              <Col xs={12} className={"mt-20"}>
                <Field type={"textarea"} name={"description"} label={"Description"} params={{ required: true }} />
              </Col>
            </Row>
          </FormBox>
          <Row>
            <Col xs={12} className="mt-24">
              <Modul data={get(addRoleFormData, "result.data", {})} setValues={setValues} />
            </Col>
          </Row>
        </FormDemo>
      </Box>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    addRoleFormData: get(state, "normalizer.data.add-role-form-data", {}),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getFormDataRequest: () => {
      const storeName = "add-role-form-data";
      dispatch({
        type: ApiActions.GET_ONE.REQUEST,
        payload: {
          url: "auth/v1/role/form-for-add-role",
          config: {
            params: {},
          },
          storeName: storeName,
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
export default connect(mapStateToProps, mapDispatchToProps)(CreateContainer);
