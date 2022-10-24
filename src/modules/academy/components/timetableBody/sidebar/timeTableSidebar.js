import React, { useState } from "react";
import Icon from "../../../../../components/elements/icon";
import Tabs from "../../../../../components/tabs";
import GroupRow from "../../groupRow";
import { get } from "lodash";
import { withTranslation } from "react-i18next";
import { Styled } from "./style";
import SimpleBar from "simplebar-react";

const TimetableSidebar = ({
  groups,
  getGroups,
  setSidebarActive,
  getTimeTable,
  sidebarActive,
  close,
  setClose,
  history,
  match,
  timeTableTrigger,
}) => {
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchingValue, setSearchingValue] = useState("");
  const [groupId, setGroupId] = useState("");

  const list = ["ALL", "ACTIVE", "ARCHIVE"];

  const onCloseClick = () => {
    setClose((state) => !state);
  };

  const searchAndFilterGroups = (tab, search) => {
    if (tab) setActiveTab(activeTab);
    if (search) setSearchingValue(search);
    getGroups(`?filter=${tab || activeTab}&search=${search || searchingValue}`);
  };

  const getTimeTableByGroupId = (groupId) => {
    if (groupId) {
      getTimeTable({
        groupId,
        cb: {
          success: (res) => res,
          fail: (err) => {
            timeTableTrigger();
          },
        },
      });
      setSidebarActive(groupId);
      if (!get(match, "params.id") && !get(match, "params.timeTableId")) {
        let historyUrl = get(history, "location.pathname", "");
        historyUrl =
          historyUrl.lastIndexOf("/") === historyUrl.length - 1 ? historyUrl.substring(0, historyUrl.length - 1) : historyUrl;
        history.push(`${historyUrl}/${groupId}`);
      } else {
        let splitUrl = get(match, "url", "").split("/");
        console.log(splitUrl);
        get(match, "params.tabIndex", "")
          ? history.push(`${splitUrl.slice(0, splitUrl.length - 3).join("/")}/${groupId}`)
          : history.push(`${splitUrl.slice(0, splitUrl.length - 1).join("/")}/${groupId}`);
      }
    }
  };

  return (
    <Styled close={close}>
      <div className="groups">
        <div className="groups__search">
          <div className="search">
            <Icon icon="icon-search" />
            <input
              type="text"
              className="customInput"
              placeholder="Search..."
              onChange={(e) => searchAndFilterGroups(null, e.target.value)}
            />
            <Icon icon="icon-filter" />
          </div>
          <button className="closeSidebar" onClick={() => onCloseClick()}>
            <Icon icon="icon-double-arrow" className="iconArrow" color="#45B36B" />
          </button>
        </div>
        <div className="groups__status">
          <Tabs
            className={"tabsContainer"}
            leftList={list}
            rightList={[]}
            leftContent={[]}
            rightContent={[]}
            setActiveTab={(ind) => searchAndFilterGroups(list[ind], null)}
          />
        </div>
        <div className="groups__list">
          <SimpleBar style={{ maxHeight: "593px" }}>
            {get(groups, "result.data", []).map((value) => (
              <GroupRow
                key={get(value, "id", "")}
                className={`groupsAll ${sidebarActive === value.id && "groupActive"}`}
                onClick={() => getTimeTableByGroupId(get(value, "id", ""))}
                name={value.name}
                type={value.specialization.name}
                status={value.externalStatus}
              />
            ))}
          </SimpleBar>
        </div>
      </div>
    </Styled>
  );
};

export default withTranslation("pdp")(TimetableSidebar);
