import React from "react";
import Box from "../../../../components/elements/box";
import { Row, Col } from "react-grid-system";

const ListContainer = ({ ...rest }) => {
  return (
    <Box>
      <Row>
        <Col xs={12}>Sales list page</Col>
      </Row>
    </Box>
  );
};

export default ListContainer;
