import React from "react";
import styled from "styled-components";
import { Col, Row } from "react-grid-system";
import { get, isNil } from "lodash";
import ComponentTable from "./ComponentTable";
import Box from "../../../components/elements/box";
import DeleteModalBody from "./DeleteModalBody";
import Modal from "../../../components/elements/modal";
import Title from "../../../components/elements/title";

const ComponentBodyStyle = styled.div`
  padding: 15px;
  background-color: #fff;
  margin-top: 30px;
  border-radius: 8px;

  .modal__body {
    min-height: 0;
    padding: 20px;

    h2 {
      &.title {
        font-weight: 600;
        font-size: 14px;
        line-height: 21px;
        color: #777e91;
        margin-left: 1px;
      }
    }
  }
`;

const ComponentBody = ({
  data = [],
  update = () => {},
  remove = () => {},
  addOrEdit = () => {},
  setOpenModal = () => {},
  getOneRequest = () => {},
  Form,
  ModalBody = DeleteModalBody,
  hasModal = {},
  open = false,
  closeModal = () => {},
  item = {},
  removeConfirm = {},
  columns = [],
  row = [],
  modalTitle = "",
  redirect = {},
  getAllOptions,
  dataForModal,
  disabledOnClose,
  ...rest
}) => {
  const ModalBodyItem = isNil(get(removeConfirm, "id", null)) ? ModalBody : DeleteModalBody;
  let items = data.map(({ ...row }, index) => ({
    ...row,
    number: index + 1,
    // status: row['active'] ? 'active' : 'in active',
    action: "action",
  }));
  return (
    <Box sm gray className="grid-body-box">
      <Row>
        <Col xs={12}>
          <ComponentBodyStyle {...rest}>
            <Modal active={open} onClose={() => !disabledOnClose && closeModal()}>
              <Title className="title" sm semiBold>
                {isNil(get(removeConfirm, "id", null))
                  ? !isNil(get(item, "entityName", null) || get(item, "result", null))
                    ? `EDIT ${modalTitle}`
                    : `ADD ${modalTitle}`
                  : `DELETE ${modalTitle}`}
              </Title>
              {!isNil(get(item, "entityName", null) || get(item, "result", null)) ? (
                get(item, "isFetched", false) ? (
                  <ModalBodyItem
                    item={get(item, "result.data", {})}
                    btnText={"Save"}
                    addOrEdit={(id, data) => addOrEdit(id, data)}
                    cancel={closeModal}
                    remove={remove}
                    hasModal={hasModal}
                    id={get(removeConfirm, "id", null)}
                    confirmText={get(removeConfirm, "name", "-")}
                    {...dataForModal}
                  />
                ) : (
                  "Loading ...."
                )
              ) : (
                <ModalBodyItem
                  item={get(item, "result.data", {})}
                  addOrEdit={(id, data) => addOrEdit(id, data)}
                  cancel={closeModal}
                  remove={remove}
                  id={get(removeConfirm, "id", null)}
                  btnText={"Add"}
                  hasModal={hasModal}
                  confirmText={get(removeConfirm, "name", "-")}
                  {...dataForModal}
                />
              )}
            </Modal>
            <ComponentTable
              data={items}
              columns={columns}
              remove={setOpenModal}
              update={getOneRequest}
              hasModal={hasModal}
              redirect={redirect}
            />
          </ComponentBodyStyle>
        </Col>
      </Row>
    </Box>
  );
};

export default ComponentBody;
