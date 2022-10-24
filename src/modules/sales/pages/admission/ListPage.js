import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Row, Col } from "react-grid-system";
import { checkTab } from "utils";
import Box from "../../../../components/elements/box";
import ListContainer from "../../containers/admission/ListContainer";

const ListPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
      checkTab(dispatch, pathname, "Admission list page");
  }, []);

  return (
    <>
        <Row>
          <Col xs={12}>
            <ListContainer />
          </Col>
        </Row>
    </>
  );
};

export default ListPage;
