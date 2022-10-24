import React, { useState } from "react";
import AccountHeadComponent from "../components/AccountHeadComponent";
import AccountBodyComponent from "../components/AccountBodyComponent";
import ApiActions from "../../../services/api/actions";
import { connect } from "react-redux";

const AccountSettingsContainer = ({ operationUpdate, operationAdd }) => {
  const [register, setRegister] = useState(true);

  return (
    <>
      <AccountHeadComponent register={register} />
      <AccountBodyComponent operationUpdate={operationUpdate} operationAdd={operationAdd} register={register} />
    </>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    operationUpdate: ({ attributes, formMethods, url, cb }) => {
      dispatch({
        type: ApiActions.OPERATION_UPDATE.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          url,
        },
      });
    },
    operationAdd: ({ attributes, formMethods, url, cb, method = "get" }) => {
      dispatch({
        type: ApiActions.REQUEST.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          url,
          method,
        },
      });
    },
  };
};
export default connect(null, mapDispatchToProps)(AccountSettingsContainer);
