import React from "react";
import ConfigContainer from "../../containers/config/ConfigContainer";
import styled from "styled-components";

const ConfigPageStyle = styled.div`
  min-height: 90vh;
  padding: 17px 30px 23px;
  background-color: #f7f7fa;
  .work_day_container {
    width: 100%;
    min-height: 85vh;
    background: #ffffff;
    border-radius: 10px;

    .work_title {
      padding: 22px 35px;
      border-bottom: 1px solid #f4f5f6;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #353945;
    }

    .work_day {
      width: 520px;
      margin: 32px 35px;
      .title {
        font-weight: 500;
        line-height: 24px;
      }
    }
  }
`;

const ConfigPage = () => {
  return (
    <ConfigPageStyle>
      <ConfigContainer />
    </ConfigPageStyle>
  );
};

export default ConfigPage;
