import React from "react";
import Consumer from "./../../context/auth/AuthConsumer";

const IsAuth = ({ children }) => {
  return (
    <>
      <Consumer>
        {({ isAuthenticated = false }) => {
          return isAuthenticated ? children : null;
        }}
      </Consumer>
    </>
  );
};

export default IsAuth;
