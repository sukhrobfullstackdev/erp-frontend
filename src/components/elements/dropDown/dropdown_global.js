import React, { memo, useEffect, useState } from "react";
import { isArray, get, isNumber } from "lodash";
import { connect } from "react-redux";
import ApiActions from "../../../services/api/actions";

const Dropdown = ({
  button,
  options,
  children,
  className = "",
  sizeAuto = false,
  isClose,
  active,
  onClose = () => "",
  onChange = () => "",
  clickButton = () => "",
  isFixed = false,
  getXandY = () => "",
  fixedConfig = {
    xAdditional: 0,
    bodyHeight: 80,
  },
  setTemp,
}) => {
  const [show, setShow] = useState(false);
  const [lastPosition, setLastPosition] = useState({});

  let yLocalAdditional = 0;

  if (isNumber(get(fixedConfig, "bodyHeight")) && window.innerHeight - lastPosition.y < get(fixedConfig, "bodyHeight")) {
    yLocalAdditional = get(fixedConfig, "bodyHeight") - (window.innerHeight - lastPosition.y) + 10;
  }

  const handleToggle = (e) => {
    e.stopPropagation();
    show && onClose();
    onChange(!show);
    setShow((s) => !s);
    isFixed &&
      setLastPosition((s) => ({
        x: get(e, "clientX", 0),
        y: get(e, "clientY", 0),
      }));
    isFixed &&
      getXandY({
        x: get(e, "clientX", 0),
        y: get(e, "clientY", 0),
        other: e,
      });
    clickButton();
  };

  useEffect(() => {
    if (isClose) setShow(false);
  }, [isClose]);

  useEffect(() => {
    if (active) setShow(true);
    else if (active === false) setShow(false);
  }, [active]);

  useEffect(() => {
    globalSubmit(show);
  }, [show, lastPosition]);

  const globalSubmit = (show) => {
    const data = show
      ? {
          children,
          options,
          show,
          sizeAuto,
          setShow,

          onChange,
          onClose,

          isFixed,
          lastPosition,
          fixedConfig,
          yLocalAdditional,
        }
      : { show };

    setTemp(data, "dropdownGlobalData");
  };

  return (
    <div className="dropDown__button" onClick={handleToggle}>
      {button}
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    setTemp: (data, storeName) => {
      dispatch({
        type: ApiActions.TEMP_DATA.SUCCESS,
        payload: {
          item: data,
          storeName: storeName,
        },
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(memo(Dropdown));
