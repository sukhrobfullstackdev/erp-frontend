import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import MainLayout from "./main/MainLayout";
import AuthLayout from "./auth/AuthLayout";
import Toastify from "../components/toastify";

class LayoutManager extends Component {
  getLayout = (pathname) => {
    if (pathname === "/") {
      return "main";
    }
    if (/^\/auth(?=\/|$)/i.test(pathname)) {
      return "auth";
    }

    return "main";
  };

  getLayouts = () => {
    return {
      main: MainLayout,
      auth: AuthLayout,
    };
  };

  render() {
    const {
      children,
      location: { pathname },
    } = this.props;
    const Layout = this.getLayouts()[this.getLayout(pathname)];
    return (
      <>
        <Layout>{children}</Layout>
      </>
    );
  }
}

export default withRouter(LayoutManager);
