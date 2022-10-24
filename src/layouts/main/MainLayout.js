import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import { get } from "lodash";
import Sidebar from "../../components/sidebar/sidebar";
import Flex from "../../components/elements/flex";
import Content from "../../components/content";
import Toastify from "../../components/toastify";
import OverlayLoader from "../../components/loader/overlay-loader";
import SystemSettings from "../../components/systemSettings";
import Actions from "../../modules/settings/actions";
import ApiActions from "../../services/api/actions";
import LanguageScheme from "../../schema/LanguageScheme";
import Normalizer from "../../services/normalizer";
import Submenu from "../../components/sidebar/submenu";
import AttachmentsViewer from "../../components/attachments-viewer";
import GlobalModal from "../../components/globalModal/globalModal";
import GlobalCells from "components/globalCells/globalCells";

const MainLayout = ({
  children,
  user,
  loading,
  mode,
  changeModeRequest,
  changeLangRequest,
  getLanguageList,
  languages,
  entities,
  lang,
  ...rest
}) => {
  useEffect(() => {
    getLanguageList();
  }, []);
  languages = Normalizer.Denormalize(languages, { result: { data: [LanguageScheme] } }, entities);
  const [showSubmenu, setSubmenu] = useState(false);
  return (
    <>
      {loading && <OverlayLoader />}
      <Flex>
        <Sidebar setSubmenu={setSubmenu} modules={get(user, "modules", [])} />
        <Submenu active={showSubmenu} setSubmenu={setSubmenu} modules={get(user, "modules", [])} />
        <SystemSettings
          lang={lang}
          changeLangRequest={changeLangRequest}
          languages={get(languages, "result.data", [])}
          {...{ mode, changeModeRequest }}
        />
        <Content>
          <Toastify />
          {children}
        </Content>
        <AttachmentsViewer />
        <GlobalModal />
        <GlobalCells />
      </Flex>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    entities: get(state, "normalizer.entities", {}),
    user: get(state, "auth.user", {}),
    loading: get(state, "settings.loading", false),
    mode: get(state, "settings.mode", "light"),
    languages: get(state, "normalizer.data.language-list", {}),
    lang: get(state, "settings.lang", "uz"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeModeRequest: (mode) => dispatch({ type: Actions.SET_MODE.REQUEST, payload: { mode } }),
    changeLangRequest: (lang) => dispatch({ type: Actions.SET_LANG.REQUEST, payload: { lang } }),
    getLanguageList: () => {
      const storeName = "language-list";
      const entityName = "language";
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: `auth/v1/auth/languages`,
          scheme: { data: [LanguageScheme] },
          storeName: storeName,
          entityName: entityName,
        },
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(memo(MainLayout));
