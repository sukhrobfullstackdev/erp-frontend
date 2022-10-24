import React from "react";
import Consumer from "../../context/auth/AuthConsumer";
const HasAccess = ({ children }) => {
  return (
    <>
      <Consumer>{(props) => children(props)}</Consumer>
    </>
  );
};

export default HasAccess;
