import React from "react";
import styled from "styled-components";
import { Col, Row } from "react-grid-system";

const LanguageBarStyle = styled.div`
  background: #353945;
  padding: 24px;
  border-radius: 10px;
  margin-bottom: 10px;

  .languages {
    .languages__item {
      color: #fff;
      font-weight: 500;
      font-size: 18px;
      line-height: 12px;
      cursor: pointer;
      margin-left: 10px;
    }
  }
  .col {
    &:nth-child(2) {
      .languages__item {
        margin-left: 25px;
      }
    }
    &:nth-child(3) {
      .languages__item {
        margin-left: 40px;
      }
    }
  }
`;

const LanguageBar = ({ langs = ["O’ZBEKCHA", "ENGLISH", "РУССКИЙ"], ...rest }) => {
  return (
    <LanguageBarStyle {...rest}>
      <Row className="languages">
        {langs &&
          langs.map((lang, index) => (
            <Col className={"col"} key={index + 1} xs={4}>
              <div className="languages__item">{lang}</div>
            </Col>
          ))}
      </Row>
    </LanguageBarStyle>
  );
};

export default LanguageBar;
