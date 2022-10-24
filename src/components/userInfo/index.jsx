import React, { useState } from "react";
import { Container, MainButton, ModalTop } from "./style";
import { Col, Row } from "react-grid-system";
import Card from "../../components/card";
import plus from "../../assets/images/plus-white.png";
import Icon from "../elements/icon";
import LeadModal from "./leadModal";
import AboutUser from "./modal";
import { get } from "lodash";

function UserInfo({ setLeadState, leadState, setSeachField = () => {}, searchLeadNumber }) {
  const [leadActive, setLeadActive] = useState(false);
  const [action, setAction] = useState();
  const searchLeadNumberData = get(searchLeadNumber, "mainLeadDTOList");
  const showLeadModal = (action) => {
    setLeadActive(!leadActive);
    setAction(action);
  };
  const addDefaultValue = (main) => {
    for (let i = 0; i < searchLeadNumberData?.length; i++) {
      if (searchLeadNumberData[i]?.enabled == true) {
        setLeadState((s) => ({
          ...s,
          searchDefaultValue: {
            number: searchLeadNumberData[i]?.phoneNumber,
            main: main,
          },
        }));
      }
    }
  };

  return (
    <Container>
      <div className="leadModal">
        <LeadModal
          leadActive={leadActive}
          showLeadModal={showLeadModal}
          action={action}
          setSeachField={setSeachField}
          onLeadClose={() => showLeadModal()}
        />
      </div>
      <AboutUser active={leadState.active} onClose={() => setLeadState((s) => ({ ...s, active: false }))}>
        <ModalTop>
          <button
            className="add-lead-btn"
            onClick={(e) => {
              e.preventDefault();
              addDefaultValue(true);
              showLeadModal("main");
            }}
          >
            <img src={plus} alt="plus" width="20px" height="20px" style={{ marginRight: "7px", marginLeft: "-5px" }} />
            NEW LEAD
          </button>
          <button
            className="hide-modal-btn"
            onClick={(e) => {
              e.preventDefault();
              setLeadState((s) => ({ ...s, active: false }));
            }}
          >
            <Icon icon="icon-arrow-bottom" />
          </button>
        </ModalTop>

        <Row>
          <Col md={6}>
            <Card
              dataArray={get(searchLeadNumber, "mainLeadDTOList", [])}
              style={{
                dislay: "flex",
                justifyContent: "start",
                marginLeft: "24px",
                marginBottom: "24px",
              }}
            />
          </Col>
          <Col md={6}>
            <Card
              showLeadModal={showLeadModal}
              justify={"space-between"}
              dataArray={get(searchLeadNumber, "additionalLeadDTOList", [])}
              isBtn
              addDefaultValue={addDefaultValue}
              setLeadState
              title="ADDITIONAL PHONES"
              style={{
                marginRight: "24px",
                marginBottom: "24px",
              }}
            />
          </Col>
        </Row>
      </AboutUser>
    </Container>
  );
}

export default UserInfo;
