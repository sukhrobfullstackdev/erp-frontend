import React from "react";
import { I18nextProvider, withTranslation } from "react-i18next";
import { connect } from "react-redux";
import configure from "./configure";

const I18n = ({ children }) => {
  return <I18nextProvider i18n={configure()}>{children}</I18nextProvider>;
};

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(I18n);
