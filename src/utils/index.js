import { forEach, get, has, head, includes, toLower } from "lodash";
import moment from "moment";
import { toast } from "react-toastify";
import { countries, timezones } from "./constants";
import { store } from "store/Provider";
import Actions from "../modules/settings/actions";

const hasAccess = (items = [], can = "") => {
  let access = false;
  can = can.split(" ");
  items = items.map(({ name }) => name);
  can.map((item) => {
    if (includes(items, item)) {
      access = true;
    }
  });
  return access;
};

const saveFile = (file, name = moment(), extension = "xlsx") => {
  const blob = new Blob([file.data]);
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${name}.${extension}`;
  link.click();
  URL.revokeObjectURL(link.href);
};
const showError = (e, setError = (e) => console.log(e), isField = true) => {
  forEach(get(e, "response.data.errors", []), (error) => {
    if (has(error, "fieldName") && isField) {
      setError(get(error, "fieldName"), {
        type: "manual",
        message: get(error, "errorMsg"),
      });
    } else {
      toast.error(get(error, "errorMsg"));
    }
  });
};

const getPhoneWithMask = (phoneNumber) => {
  phoneNumber = phoneNumber.split("");
  phoneNumber.splice(4, 0, " ");
  phoneNumber.splice(7, 0, " ");
  phoneNumber.splice(11, 0, " ");
  phoneNumber.splice(14, 0, " ");
  phoneNumber.splice(12, 1, "*");
  phoneNumber.splice(13, 1, "*");
  phoneNumber.splice(15, 1, "*");
  phoneNumber.splice(16, 1, "*");
  return phoneNumber.join("");
};

const getQueryParams = (search, param = "phone") => {
  const query = new URLSearchParams(search);
  return atob(query.get(param));
};
const getIconName = (module = "") => {
  switch (module) {
    case "ACADEMIC":
      return "icon-home";
    case "ACCOUNT":
      return "icon-account";
    case "DOCS":
      return "icon-docs";
    case "HRM":
      return "icon-hrm";
    case "PROJECTS":
      return "icon-projects";
    case "REPORTS":
      return "icon-reports";
    case "SALES":
      return "icon-sales";
    case "SETTING":
      return "icon-settings";
    default:
      return "icon-home";
  }
};

const getUrlFromName = (name) => {
  return toLower(name).split(" ").join("/");
};

const getMaskFromPhoneNumber = (prefix) => {
  switch (prefix) {
    case "998":
      return " 99 999 99 99";
    case "7":
      return " 999 999 99 99";
    default:
      return;
  }
};
const getPlaceholderFromPhoneNumber = (prefix) => {
  switch (prefix) {
    case "998":
      return " -- --- -- --";
    case "7":
      return " --- --- -- --";
    case "907":
      return "--- -- --";
    default:
      return "Enter";
  }
};

const getSelectOptionsListFromData = (data = [], value = "id", label = "title", other) => {
  if (other)
    return (
      data.map((item) => ({
        ...item,
        value: item[value],
        label: item[label],
      })) || []
    );
  return data.map((item) => ({ value: item[value], label: item[label] })) || [];
};

const getSelectOptionsListFromListData = (data = []) => {
  return data.map((item) => ({ value: item, label: item } || []));
};

const cropText = (text) => {
  if (text?.length >= 20) {
    return text.slice(0, 18) + "...";
  }
  return text;
};
const getWordFromString = (string = "", length = 1) => {
  let title = string;
  if (length > 5) {
    title = head(string.split(" ")) || "";
  }
  return cropText(title);
};

function financial(x) {
  return Number.parseFloat(x).toFixed(2);
}

const addDetectClick = (setState, classes = []) => {
  window.addEventListener("click", function (e) {
    if (!classes.some((item) => e.target.classList.contains(item))) setState(false);
  });
};

const removeDetectClick = () => {
  window.removeEventListener("click", addDetectClick, false);
};

const hexToRgb = (hex) =>
  hex
    ? hex
        .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => "#" + r + r + g + g + b + b)
        .substring(1)
        .match(/.{2}/g)
        .map((x) => parseInt(x, 16))
        .join(",")
    : "";

function rgbaTohex(orig) {
  if (orig.startsWith("rgba")) {
    let numbers = orig.substring(5, orig.length - 1);
    numbers = numbers.split(",");
    if (numbers.length !== 4) return "error length";
    else {
      let red = Number(numbers[0]),
        green = Number(numbers[1]),
        blue = Number(numbers[2]),
        alpha = Number(numbers[3]);
      const isPercent = (red + (alpha || "")).toString().includes("%");

      if (typeof red === "string") {
        [red, green, blue, alpha] = red.match(/(0?\.?\d{1,3})%?\b/g).map((component) => Number(component));
      } else if (alpha !== undefined) {
        alpha = Number.parseFloat(alpha);
      }

      if (
        typeof red !== "number" ||
        typeof green !== "number" ||
        typeof blue !== "number" ||
        red > 255 ||
        green > 255 ||
        blue > 255
      ) {
        throw new TypeError("Expected three numbers below 256");
      }

      if (typeof alpha === "number") {
        if (!isPercent && alpha >= 0 && alpha <= 1) {
          alpha = Math.round(255 * alpha);
        } else if (isPercent && alpha >= 0 && alpha <= 100) {
          alpha = Math.round((255 * alpha) / 100);
        } else {
          throw new TypeError(`Expected alpha value (${alpha}) as a fraction or percentage`);
        }

        alpha = (alpha | (1 << 8)).toString(16).slice(1); // eslint-disable-line no-mixed-operators
      } else {
        alpha = "";
      }

      // TODO: Remove this ignore comment.
      // eslint-disable-next-line no-mixed-operators
      return `#${(blue | (green << 8) | (red << 16) | (1 << 24)).toString(16).slice(1) + alpha}`;
    }
  }
}

const search = (data = [], str = "", field = "name") => {
  return data.filter(
    (item) => includes(toLower(get(item, `${field}`)), toLower(str)) || includes(toLower(str), toLower(get(item, `${field}`)))
  );
};

const changeUrlWithoutRefresh = (url) => {
  window.history.pushState(null, "", url);
};

// function formatDate(format, date = new Date()) {
//     const map = {
//         mm: date.getMonth() + 1,
//         dd: date.getDate(),
//         yy: date.getFullYear().toString().slice(-2),
//         yyyy: date.getFullYear()
//     }
//     return format.replace(/mm|dd|yyyy|yy/gi, matched => map[matched])
//     return date.toLocaleDateString("en-US");
// }
function formatDate(date, format, utc) {
  let MMMM = [
    "\x00",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function ii(i, len) {
    let s = i + "";
    len = len || 2;
    while (s.length < len) s = "0" + s;
    return s;
  }

  let y = utc ? date.getUTCFullYear() : date.getFullYear();
  format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
  format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
  format = format.replace(/(^|[^\\])y/g, "$1" + y);

  let M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
  format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
  format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
  format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
  format = format.replace(/(^|[^\\])M/g, "$1" + M);

  let d = utc ? date.getUTCDate() : date.getDate();
  format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
  format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
  format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
  format = format.replace(/(^|[^\\])d/g, "$1" + d);

  let H = utc ? date.getUTCHours() : date.getHours();
  format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
  format = format.replace(/(^|[^\\])H/g, "$1" + H);

  let h = H > 12 ? H - 12 : H == 0 ? 12 : H;
  format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
  format = format.replace(/(^|[^\\])h/g, "$1" + h);

  let m = utc ? date.getUTCMinutes() : date.getMinutes();
  format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
  format = format.replace(/(^|[^\\])m/g, "$1" + m);

  let s = utc ? date.getUTCSeconds() : date.getSeconds();
  format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
  format = format.replace(/(^|[^\\])s/g, "$1" + s);

  let f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
  format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
  f = Math.round(f / 10);
  format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
  f = Math.round(f / 10);
  format = format.replace(/(^|[^\\])f/g, "$1" + f);

  let T = H < 12 ? "AM" : "PM";
  format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
  format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

  let t = T.toLowerCase();
  format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
  format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

  let tz = -date.getTimezoneOffset();
  let K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
  if (!utc) {
    tz = Math.abs(tz);
    let tzHrs = Math.floor(tz / 60);
    let tzMin = tz % 60;
    K += ii(tzHrs) + ":" + ii(tzMin);
  }
  format = format.replace(/(^|[^\\])K/g, "$1" + K);

  let day = (utc ? date.getUTCDay() : date.getDay()) + 1;
  format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
  format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

  format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
  format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

  format = format.replace(/\\(.)/g, "$1");

  return format;
}

function getCountry() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (timezone === "" || !timezone) return null;
  const _country = timezones[timezone].c[0];
  const country = countries[_country];
  return country;
}

function checkTab(dispatch, pathname, name) {
  let index = get(store.getState(), "settings.breadcrumbs", [])?.findIndex((obj) => obj.name === name);

  let res = get(store.getState(), `settings.breadcrumbs[index]`);
  if (pathname) {
    if (res) {
      dispatch({
        type: Actions.CHANGE_BREADCRUMB_ITEM.REQUEST,
        payload: { name, url: pathname, index },
      });
    } else {
      dispatch({
        type: Actions.ADD_BREADCRUMB_ITEM.REQUEST,
        payload: { item: { name, url: pathname } },
      });
    }
  }
}

const numberPrettier = (number) => new Intl.NumberFormat("fr-FR", { currency: "UZS" }).format(number);

const generateId = (len = 10) => {
  let box = "";
  for (let i = 0; len > i; i++) {
    box += Math.floor(Math.random() * 9);
  }
  return Math.floor(Math.random() * Number(box));
};
export {
  hasAccess,
  saveFile,
  showError,
  getPhoneWithMask,
  getQueryParams,
  getIconName,
  getUrlFromName,
  getMaskFromPhoneNumber,
  getPlaceholderFromPhoneNumber,
  getSelectOptionsListFromData,
  getWordFromString,
  cropText,
  financial,
  addDetectClick,
  removeDetectClick,
  hexToRgb,
  getSelectOptionsListFromListData,
  rgbaTohex,
  search,
  changeUrlWithoutRefresh,
  formatDate,
  getCountry,
  checkTab,
  numberPrettier,
  generateId,
};
