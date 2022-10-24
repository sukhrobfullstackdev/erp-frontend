import React from "react";
import { InitialLoader } from "../../components/loader";
import Consumer from "./../../context/auth/AuthConsumer";

const AuthLoader = ({ children }) => {
  return (
    <Consumer>
      {({ isFetched = false }) => {
        return isFetched ? children : <InitialLoader />;
      }}
    </Consumer>
  );
};

export default AuthLoader;
