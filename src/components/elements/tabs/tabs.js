import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { TabsStyles } from "./tabsStyles";
import { isArray } from "lodash";

export default function TabsComponent({ tabList = [], tabContent = [] }) {
  return (
    <TabsStyles>
      <Tabs className="tabs" selectedTabClassName="tabs__tab--selected" selectedTabPanelClassName="tabs__tab-panel--selected">
        <TabList className="tabs__tab-list">
          {isArray(tabList) &&
            tabList.map((value, index) => (
              <Tab className="tabs__tab" disabledClassName="tabs__tab--disabled" key={index + 1}>
                {value}
              </Tab>
            ))}
        </TabList>

        {isArray(tabContent) &&
          tabContent.map((value, index) => (
            <TabPanel className="tabs__tab-panel" key={index + 1}>
              {value}
            </TabPanel>
          ))}
      </Tabs>
    </TabsStyles>
  );
}
