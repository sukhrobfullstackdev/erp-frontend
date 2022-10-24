import React, { useState, memo } from "react";
import styled from "styled-components";
import { Col, Row } from "react-grid-system";
import { withTranslation } from "react-i18next";
import { isEmpty } from "lodash";
import AcademicDialog from "./AcademicDialog";
import Box from "../../../components/elements/box";
import CardComponent from "./CardComponent";
import Sortable from "../../../components/sortable";
import Label from "../../../components/elements/label";
import Select from "../../../components/elements/select/Select";
import Modal from "../../../components/elements/modal";

const Styled = styled.div`
  .select {
    margin-top: 5px;
  }
  .box {
    min-height: 85.9vh;
    padding: 30px 19px 0;
  }
  .sortable-list-col {
    padding-left: 19px !important;
    padding-right: 19px !important;
  }
`;

const ComponentBody = ({ data = [], t, options, setSelected, update, deleteItem, ...rest }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [cardData, setCardData] = useState(false);

  const editHandling = ({ data, id }) => {
    update({ data }, id);
    setOpenEditModal(false);
  };

  return (
    <Styled {...rest}>
      <Box gray className={"box"}>
        {!isEmpty(options) && (
          <Row style={{ marginBottom: "31px" }}>
            <Col xs={3}>
              <Label>{t("Select course") ?? "Select course"}</Label>
              <Select isSearchable={true} options={options} onChange={setSelected} />
            </Col>
          </Row>
        )}
        <Modal active={openEditModal}>
          <AcademicDialog add={editHandling} editableData={cardData} closeDialog={() => setOpenEditModal(false)} />
        </Modal>
        <Row>
          <Col xs={12}>
            <Sortable
              Item={({ ...rest }) => (
                <CardComponent
                  openModal={(data) => {
                    setOpenEditModal(true);
                    setCardData(data);
                  }}
                  del={(data) => deleteItem(data, data.id)}
                  module={isEmpty(options)}
                  {...rest}
                />
              )}
              data={data}
              colSize={3}
            />
          </Col>
        </Row>
      </Box>
    </Styled>
  );
};

export default withTranslation("pdp")(memo(ComponentBody));
