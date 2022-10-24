import React from "react";
import ReactDOM from "react-dom";
import Theme from "./theme";
import Router from "./router";
import Auth from "./services/auth/Auth";
import Store from "./store";
import I18n from "./i18n/Provider";
import Persist from "./services/persist";

ReactDOM.render(
  <React.StrictMode>
    <Store>
      <Auth>
        <Persist>
          <I18n>
            <Theme>
              <Router />
            </Theme>
          </I18n>
        </Persist>
      </Auth>
    </Store>
  </React.StrictMode>,
  document.getElementById("root")
);
