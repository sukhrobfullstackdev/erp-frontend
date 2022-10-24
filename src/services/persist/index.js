import React from "react";
import { InitialLoader } from "../../components/loader";
import { persistor } from "../../store/Provider";
import { PersistGate } from "redux-persist/integration/react";

export default ({ children }) => (
  <PersistGate loading={<InitialLoader />} persistor={persistor}>
    {children}
  </PersistGate>
);
