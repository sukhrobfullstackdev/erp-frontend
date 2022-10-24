import React, { useState } from "react";
import { connect } from "react-redux";
import ComponentHead from "./components/ComponentHead";
import ListView from "../../../../containers/ListView/ListView";
import ComponentBody from "./components/ComponentBody";
import RoleScheme from "../../../../schema/RoleScheme";
const ListContainer = ({ ...rest }) => {
  return (
    <>
      <ListView
        storeName="role-list"
        entityName="role"
        url={`auth/v1/role/role-list`}
        deleteUrl={`/auth/v1/role/delete-role`}
        scheme={RoleScheme}
        ComponentBody={ComponentBody}
        ComponentHead={ComponentHead}
        params={{}}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
