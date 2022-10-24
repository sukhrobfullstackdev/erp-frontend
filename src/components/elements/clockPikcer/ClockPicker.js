import { memo, useState, useEffect } from "react";
import moment from "moment";
import { isNull, get, isNumber, isEmpty } from "lodash";
import OutsideClickHandler from "react-outside-click-handler/esm/OutsideClickHandler";
import { Style } from "./style";
import CustomHeaderComponent from "./components/customHeader";
import CustomBodyComponent from "./components/customBody";
import CustomFooterOfBodyComponent from "./components/customFooterOfBody";
import classNames from "classnames";

const ClockPicker = ({
  CustomHeader = CustomHeaderComponent,
  CustomBody = CustomBodyComponent,
  CustomFooterOfBody = CustomFooterOfBodyComponent,
  onChange = () => "",
  position,
  defaultValue,
  disabled,
  editable = true,
  onClose = () => "",
  defaultHideAnimation = false,
  placeholder = "Enter time...",
  format = "HH:mm",
  ...rest
}) => {
  const [data, setData] = useState({
    showBody: false,
    hour: "",
    minutes: "",
    position: null,
  });

  useEffect(() => {
    if (isNumber(defaultValue)) {
      let date = moment(defaultValue);
      setData((s) => ({ ...s, hour: date.get("hour"), minutes: date.get("minutes") }));
    } else if (isNull(defaultValue) || isEmpty(defaultValue)) setData((s) => ({ ...s, hour: "", minutes: "" }));
  }, [defaultValue]);

  const clickOutside = () => setData({ ...data, showBody: false });

  const clickHeader = (e) =>
    !disabled && setData((s) => ({ ...s, showBody: !s.showBody, position: e.target?.getBoundingClientRect() }));

  const submitHandling = (value) => {
    if (isNull(get(value, "hour", null)) && isNull(get(value, "minutes", null))) setData({ ...data, showBody: false });
    else if (!isNull(get(value, "hour", null)) && !isNull(get(value, "minutes", null))) {
      let time = moment().set("hour", get(value, "hour")).set("minute", get(value, "minutes"));
      let long = time.valueOf();
      onChange(long);
      setData({
        ...data,
        hour: get(value, "hour", ""),
        minutes: get(value, "minutes", ""),
        showBody: false,
      });
    }
  };
  const getContentForHeader = (hour, minutes) => {
    if (isNumber(hour) && isNumber(minutes)) return moment().set("hour", hour).set("minute", minutes).format(format);
    return "";
  };

  return (
    <Style
      {...{
        position: data.position,
        active: data.showBody,
        className: classNames("clockPicker", {
          active: data.showBody,
          defaultHideAnimation,
        }),
      }}
    >
      <OutsideClickHandler onOutsideClick={clickOutside}>
        <CustomHeader
          {...{
            clickHeader,
            placeholder,
            content: getContentForHeader(data.hour, data.minutes),
          }}
        />

        <div className="clockPicker__body">
          <CustomBody
            {...{
              CustomFooterOfBody,
              submitHandling,
            }}
          />
        </div>
      </OutsideClickHandler>
    </Style>
  );
};

export default memo(ClockPicker);
