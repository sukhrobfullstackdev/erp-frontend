import React from "react";
import Consumer from "./../../context/auth/AuthConsumer";

const IsGuest = ({ children }) => {
  return (
    <>
      <Consumer>
        {({ isAuthenticated = false }) => {
          return !isAuthenticated ? children : null;
        }}
      </Consumer>
    </>
  );
};

export default IsGuest;
