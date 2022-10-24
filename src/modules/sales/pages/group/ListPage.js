import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Row, Col } from "react-grid-system";
import { checkTab } from "utils";
import ListContainer from "../../containers/group/ListContainer";

const ListPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Group page");
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
