import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { Row, Col } from "react-grid-system";
import Box from "components/elements/box";
import Card from "../../Components/card";
import styled from "styled-components";
import Dropdown from "components/elements/dropDown";
import Icon from "components/elements/icon";
import Tabs from "components/tabs";
import InvoiceStyle from "./InvoiceStyle";
import Select from "components/elements/select";

const InvoiceContainer = () => {
  const [userAction, setUserAction] = useState([
    { name: "Want to buy", value: "buy" },
    { name: "Want to sell", value: "sell" },
  ]);
  return (
    <InvoiceStyle>
      <Box>
        <Row>
          <Col xs={4}>
            <div className="card user-card">
              <div className="user-card_head">
                <span className="user-card_name">
                  <h4>James morris</h4>
                </span>
                <Dropdown button={<Icon icon="icon-more-dots" color="#fff" />}>
                  <div>
                    <span className="drop-down-item .first" onClick={() => console.log("summary")}>
                      Summary
                    </span>
                    <span className="drop-down-item" onClick={() => console.log("edit")}>
                      Edit
                    </span>
                  </div>
                </Dropdown>
              </div>
              <div className="user-card_content card">
                <div>
                  <div className="user-card_content-select">
                    <Select type={"custom-select"} options={userAction} labelKey={"name"} valueKey={"value"} />
                  </div>
                  <div className="user-card_content-title">IN0163</div>
                </div>
                <div>
                  <div className="user-card_content-progressbar">
                    <div className="progressbar-content"></div>
                  </div>
                </div>
              </div>
            </div>
            <Tabs
              leftList={["Info", "Setting"]}
              leftContent={[
                <>
                  <div className="info_list card">
                    <div className="info_list-item">
                      <span className="key">Assigned</span>
                      <span className="key">Alice</span>
                    </div>
                    <div className="info_list-item">
                      <span className="key">Budget</span>
                      <span className="value">0 UZS</span>
                    </div>
                    <hr />
                    <div className="info_list-item">
                      <span className="key">Assigned</span>
                      <span className="value">Alice</span>
                    </div>
                    <div className="info_list-item">
                      <span className="key">Assigned</span>
                      <span className="value">Alice</span>
                    </div>
                  </div>
                </>,
                <>gdgfdgdf23423</>,
              ]}
              rightList={[]}
            />
          </Col>
          <Col xs={8}></Col>
        </Row>
      </Box>
    </InvoiceStyle>
  );
};

export default memo(InvoiceContainer);
