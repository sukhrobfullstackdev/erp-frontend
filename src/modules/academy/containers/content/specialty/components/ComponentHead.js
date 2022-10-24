import React from "react";
import { Col, Row } from "react-grid-system";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { withTranslation } from "react-i18next";
import Box from "../../../../../../components/elements/box";
import Search from "../../../../../../components/search";
import Button from "../../../../../../components/elements/button";
import Gridbtn from "../../../../../../components/gridbtn";
import Flex from "../../../../../../components/elements/flex";
import Icon from "../../../../../../components/elements/icon";

const Style = styled(Box)`
  .addBtn {
    button {
      display: flex;
      align-items: center;
      height: 34px;
      border-radius: 8px;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      text-transform: uppercase;
      padding-left: 11px;
      padding-right: 14px;
      .ui__icon__wrapper {
        transform: rotate(45deg);
        margin-right: 3px;
        .icon {
          width: 18px;
          height: 18px;
        }
      }
    }
  }
  a {
    &:hover {
      text-decoration: none;
    }
  }
`;

const ComponentHead = ({ hasModal = { create: true }, t, searchFields, searchFromView, ...rest }) => {
  const history = useHistory();
  const handleAdd = () => {
    history.push("/academic/content/specialty/add");
  };
  return (
    <Style sm>
      <Row>
        <Col xs={6}>
          <Search searchFields={searchFields} searchFromView={searchFromView} />
        </Col>
        <Col xs={6} className={"text-right"}>
          <Flex justify={"flex-end"} align={"center"}>
            <Link to={"/academic/academic-content/specialization/add"}>
              <Button success onCLick={handleAdd} className={"addBtn"}>
                <Icon icon={"icon-exit"} color={"#FCFCFD"} /> {t("add-specialization") ?? "Add specialization"}
              </Button>
            </Link>
            <Gridbtn />
          </Flex>
        </Col>
      </Row>
    </Style>
  );
};

export default withTranslation("pdp")(React.memo(ComponentHead));
