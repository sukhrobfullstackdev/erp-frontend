import React from "react";
import { Row, Col } from "react-grid-system";
import ListView from "../../../../containers/ListView/ListView";
import ModuleScheme from "../../../../schema/ModuleScheme";
import ComponentBody from "./components/ComponentBody";
import LanguageBar from "../../../../components/elements/language-bar/language-bar";
import Box from "../../../../components/elements/box";

const ListContainer = ({ ...rest }) => {
  return (
    <Box className="modul-list-container-box" sm>
      <Row>
        <Col xs={12}>
          <ListView
            storeName="module-list"
            entityName="module"
            url={`auth/v1/setting/modules`}
            scheme={ModuleScheme}
            ComponentBody={ComponentBody}
            ComponentHead={() => null}
            params={{}}
          />
        </Col>
      </Row>
    </Box>
  );
};

export default ListContainer;
