import React from "react";
import styled from "styled-components";
import Tabs from "../../../components/tabs";
import PrivacyTabComponent from "./PrivacyTabComponent";
import SummaryTabComponent from "./SummaryTabComponent";
import SocialNetworkTabComponent from "./SocialNetworkTabComponent";

const AccountBodyStyle = styled.div`
  margin-top: 70px;

  .tabs__list {
    background: none;

    &__tab {
      font-weight: 600;
      font-size: 14px;
      height: 32px;
      color: rgba(53, 57, 69, 1);
    }

    .active {
      font-weight: 300;
      font-size: 14px;
    }
  }
`;

const AccountBodyComponent = ({ register, operationAdd, operationUpdate }) => {
  return (
    <AccountBodyStyle>
      <Tabs
        rightList={[]}
        leftList={["Summary", "Social network", "Privacy", "History"]}
        leftContent={[
          <SummaryTabComponent register={register} />,
          <SocialNetworkTabComponent />,
          <PrivacyTabComponent register={register} operationAdd={operationAdd} operationUpdate={operationUpdate} />,
        ]}
      />
    </AccountBodyStyle>
  );
};

export default AccountBodyComponent;
