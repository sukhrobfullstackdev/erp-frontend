import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Col, Row } from "react-grid-system";
import SearchAndAdd from "../../hr/components/searchAndAdd";
import Box from "../../../components/elements/box";
import Modal from "../../../components/elements/modal";
import AcademicDialog from "./AcademicDialog";
import { isEmpty, isNumber } from "lodash";

const Styled = styled.div`
  ${({ disable }) =>
    disable &&
    css`
      .searchAndAdd__right__btn {
        button {
          &:hover {
            background: #f4f5f6;
            color: #b1b5c4;
          }
        }
      }
    `}
`;
const Style = styled(Box)`
  &.header-box {
    padding: 0px 20px;
    height: 50px;
    .searchAndAdd__right {
      margin-top: -5px;
    }
  }
`;
const ComponentHead = ({ add = () => {}, addTitle = "ADD", selected, tip, buttonBindSelect, ...rest }) => {
  const [showModal, setShowModal] = useState(false);
  let isAllow = isNumber(selected) ? true : !buttonBindSelect;

  let dataForFormDemo = {};
  if (showModal) dataForFormDemo = { resetData: { name: "", description: "", active: false } };

  return (
    <Style sm className={"header-box"}>
      <Row>
        <Col xs={12}>
          <Modal active={showModal}>
            <AcademicDialog
              {...{
                dataForFormDemo,
                add,
              }}
              modalActive={showModal}
              selected={selected}
              label={addTitle}
              closeDialog={() => setShowModal(false)}
            />
          </Modal>
          <Styled {...rest} disable={!isAllow}>
            <SearchAndAdd
              buttonText={`+ ${addTitle}`}
              tip={isAllow ? tip : ""}
              openModalOrLink={() => isAllow && setShowModal(true)}
            />
          </Styled>
        </Col>
      </Row>
    </Style>
  );
};

export default ComponentHead;
