import React from "react";
import { Row, Col } from "react-grid-system";
import { useHistory } from "react-router-dom";
import Button from "../../../../../components/elements/button";
import Box from "../../../../../components/elements/box";
import styled from "styled-components";

const ComponentHeadStyle = styled.div`
  button {
    padding: 7px 12px 6px;
    font-size: 14px;
    line-height: 21px;
  }
`;

const ComponentHead = ({ ...rest }) => {
  const history = useHistory();
  return (
    <ComponentHeadStyle>
      <Box sm>
        <Row>
          <Col xs={12} className={"text-right"}>
            <Button success onCLick={() => history.push("/role/create")}>
              Create new role
            </Button>
          </Col>
        </Row>
      </Box>
    </ComponentHeadStyle>
  );
};

export default ComponentHead;
