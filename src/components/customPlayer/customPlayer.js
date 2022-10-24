import { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { get } from "lodash";
import ApiActions from "../../services/api/actions";

import playImg from "../../assets/icons/play.svg";
import stopImg from "../../assets/icons/stopRecord.svg";
import config from "../../config";

const Style = styled.div`
  display: flex;
  align-items: center;
  .playIcon {
    cursor: pointer;
  }
  .audio {
    height: 35px;
    width: 270px;
  }
`;

const CustomPlayer = ({ url = null, request, token }) => {
  const [state, setState] = useState({
    isPlay: false,
    file: null,
    audio: null,
  });

  // if (state.audio && state.isPlay) state.audio.play();

  const playClickHandling = () => {
    if (state.isPlay) {
      // state.audio.pause();
    } else {
      // setState(s => ({ ...s, isPlay: true, audio: new Audio(`${config.API_ROOT}${url}&token=${token}`) }));
      setState((s) => ({ ...s, isPlay: true }));
    }
  };

  const src = (file) => {
    return `${config.API_ROOT}${url}&token=${token}`;
  };

  return (
    <Style className={"audio-container"}>
      {/*{get(state,"isPlay",false) ? <img className={"stopIcon"} src={stopImg} alt={"play"} onClick={playClickHandling}/> : <img className={"playIcon"} src={playImg} alt={"play"} onClick={playClickHandling}/>}*/}
      {
        <audio preload="none" controls className={"audio"}>
          <source src={src(state.file)} type="audio/x-wav" />
        </audio>
      }
    </Style>
  );
};

const mapStateToProps = (state) => {
  return {
    token: get(state, "auth.token.accessToken", ""),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    request: ({ url, method = "get", cb }) => {
      dispatch({
        type: ApiActions.REQUEST.REQUEST,
        payload: {
          method,
          url,
          cb,
          config: { responseType: "blob" },
        },
      });
    },
  };
};

export default memo(connect(mapStateToProps, mapDispatchToProps)(CustomPlayer));
