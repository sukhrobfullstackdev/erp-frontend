import React from "react";
import { ThemeProvider } from "styled-components";
import { get } from "lodash";
import GlobalStyles from "./GlobalStyles";
import Wrapper from "../components/wrapper";
import { connect } from "react-redux";

const Theme = ({ mode, children }) => {
  return (
    <ThemeProvider theme={{ mode }}>
      <Wrapper>
        <GlobalStyles />
        {children}
      </Wrapper>
    </ThemeProvider>
  );
};
const mapStateToProps = (state) => {
  return {
    mode: get(state, "settings.mode", "light"),
  };
};
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Theme);
