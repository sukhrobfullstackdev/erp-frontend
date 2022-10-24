import React, { useState } from "react";
import { get } from "lodash";
import ActionsApi from "services/api/actions";
import { connect } from "react-redux";

const MyComponent = ({ temp, setTemp }) => {
  console.log(temp);
  return (
    <div style={{ width: "250px" }}>
      <button
        onClick={() => {
          setTemp({ item: "232132", storeName: "temp" });
        }}
      >
        Test
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    temp: get(state, "api.temp", {}),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTemp: ({ item, storeName }) => {
      dispatch({
        type: ActionsApi.TEMP_DATA.REQUEST,
        payload: { item, storeName },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);
