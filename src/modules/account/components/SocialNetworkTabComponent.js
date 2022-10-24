import React from "react";
import styled from "styled-components";
import { Col, Row } from "react-grid-system";
import Title from "../../../components/elements/title";
import Button from "../../../components/elements/button";
import Google from "../../../assets/icons/Google.svg";
import Github from "../../../assets/icons/Github.svg";
import Telegram from "../../../assets/icons/Telegram.svg";
import Linkedin from "../../../assets/icons/Linkind.svg";
import FormDemo from "../../../containers/Form/form-demo";

const StyledSocial = styled.div`
  .row {
    padding: 35px 0 30px;
    border-top: 1px solid #f4f5f6;
  }

  .col {
    padding-left: 10px !important;
    padding-right: 10px !important;

    button {
      width: 100%;
      padding-left: 14px;
      display: flex;
      align-items: center;
      border: 1px solid #e6e8ec;
      border-radius: 8px;
      height: 44px;
      background: #fcfcfd;
      font-weight: 600;

      &:hover {
        color: #353945;
        background: #f2fdf6;
        border: 1px solid #e2f5e9;
      }
    }
  }

  h2 {
    margin-bottom: 35px;
  }

  img {
    margin-right: 20px;
  }
`;
const SocialNetworkTabComponent = () => {
  return (
    <StyledSocial>
      <FormDemo
        mainClassName={"form_demo"}
        formRequest={""}
        footer={
          <Button className={"form_btn"} type={"submit"} disabled={true} success>
            Confirm
          </Button>
        }
      >
        <Row className={"row"}>
          <Col xs={12}>
            <Title fs={16} lHeight={24} semiBold>
              Connected Accounts
            </Title>
          </Col>
          <Col xs={2} className={"col"}>
            <Button>
              <img src={Google} alt={"google"} />
              Connect Google
            </Button>
          </Col>
          <Col xs={2} className={"col"}>
            <Button>
              <img src={Linkedin} alt={"linkedin"} />
              Connect LinkedIn
            </Button>
          </Col>
          <Col xs={2} className={"col"}>
            <Button>
              <img src={Github} alt={"github"} />
              Connect GitHub
            </Button>
          </Col>
          <Col xs={2} className={"col"}>
            <Button>
              <img src={Telegram} alt={"telegram"} />
              Connect Telegram
            </Button>
          </Col>
        </Row>
      </FormDemo>
    </StyledSocial>
  );
};

export default SocialNetworkTabComponent;
